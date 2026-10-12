/**
 * Caveman Background Sync Worker
 * Pushes queued local state mutations to server with retry logic
 */

import { SyncMutation } from '../types';
import { loadSyncQueue, saveSyncQueue, loadLastSyncedAt, saveLastSyncedAt } from './storage';

let isWorkerRunning = false;

export interface SyncStatus {
  isSyncing: boolean;
  pendingCount: number;
  lastSyncedAt: number | null;
}

export type SyncStatusListener = (status: SyncStatus) => void;

const syncListeners: Set<SyncStatusListener> = new Set();

export function subscribeSyncStatus(listener: SyncStatusListener): () => void {
  syncListeners.add(listener);
  const queue = loadSyncQueue();
  const pendingCount = queue.filter(item => item.status === 'pending' || item.status === 'failed' || item.status === 'syncing').length;
  listener({
    isSyncing: isWorkerRunning,
    pendingCount,
    lastSyncedAt: loadLastSyncedAt()
  });
  return () => {
    syncListeners.delete(listener);
  };
}

export function notifySyncListeners(isSyncingOverride?: boolean): void {
  const queue = loadSyncQueue();
  const pendingCount = queue.filter(item => item.status === 'pending' || item.status === 'failed' || item.status === 'syncing').length;
  const isSyncing = isSyncingOverride !== undefined ? isSyncingOverride : isWorkerRunning;
  const lastSyncedAt = loadLastSyncedAt();
  syncListeners.forEach(listener => {
    try {
      listener({ isSyncing, pendingCount, lastSyncedAt });
    } catch (err) {
      console.error('Error in sync listener:', err);
    }
  });
}

export function queueMutation(type: SyncMutation['type'], payload: any): SyncMutation {
  const mutation: SyncMutation = {
    id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    type,
    payload,
    timestamp: Date.now(),
    status: 'pending',
    retryCount: 0
  };

  const currentQueue = loadSyncQueue();
  const updatedQueue = [...currentQueue, mutation];
  saveSyncQueue(updatedQueue);
  notifySyncListeners();

  // Trigger immediate background sync
  processSyncQueue();

  return mutation;
}

export async function sendMutationToServer(mutation: SyncMutation): Promise<boolean> {
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mutation)
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (err) {
    // Network or server error - gracefully handle offline fallback
    return false;
  }
}

export async function processSyncQueue(): Promise<{ success: boolean; syncedCount: number; remainingCount: number }> {
  if (isWorkerRunning) {
    const queue = loadSyncQueue();
    const pending = queue.filter(item => item.status === 'pending' || item.status === 'failed');
    return { success: false, syncedCount: 0, remainingCount: pending.length };
  }

  const queue = loadSyncQueue();
  const pending = queue.filter(item => item.status === 'pending' || item.status === 'failed');

  if (pending.length === 0) {
    if (!loadLastSyncedAt()) {
      saveLastSyncedAt(Date.now());
    }
    notifySyncListeners(false);
    return { success: true, syncedCount: 0, remainingCount: 0 };
  }

  isWorkerRunning = true;
  notifySyncListeners(true);

  const remainingQueue: SyncMutation[] = [];
  let syncedCount = 0;

  for (const item of queue) {
    if (item.status === 'synced') {
      continue; // Remove already synced items from local persistent queue
    }

    if (item.status === 'pending' || item.status === 'failed') {
      item.status = 'syncing';
      saveSyncQueue(queue);

      const success = await sendMutationToServer(item);

      if (success) {
        item.status = 'synced';
        syncedCount++;
      } else {
        item.status = 'failed';
        item.retryCount += 1;
        remainingQueue.push(item);
      }
    } else {
      remainingQueue.push(item);
    }
  }

  saveSyncQueue(remainingQueue);
  if (syncedCount > 0 || remainingQueue.length === 0) {
    saveLastSyncedAt(Date.now());
  }

  isWorkerRunning = false;
  notifySyncListeners(false);

  return { success: true, syncedCount, remainingCount: remainingQueue.length };
}

export async function triggerManualSync(): Promise<{ success: boolean; syncedCount: number; remainingCount: number }> {
  return await processSyncQueue();
}

export function startBackgroundSyncWorker(intervalMs: number = 10000): () => void {
  // Ensure an initial lastSyncedAt timestamp is established
  if (!loadLastSyncedAt()) {
    saveLastSyncedAt(Date.now());
  }

  // Run once immediately
  processSyncQueue();

  // Schedule periodic background worker run
  const intervalId = setInterval(() => {
    processSyncQueue();
  }, intervalMs);

  return () => clearInterval(intervalId);
}
