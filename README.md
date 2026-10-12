# Lurnix — Project-Based Technology Learning Platform

> **"Learn by Building. Grow by Creating."**  
> An open, production-grade learning platform by [DropOutLab](https://github.com/dropoutlab-dev).

Official Platform Repository: [`https://github.com/dropoutlab-dev/lurnix`](https://github.com/dropoutlab-dev/lurnix)  
Domain: [`lurnix.tech`](https://lurnix.tech)

---

## 🚀 Overview

**Lurnix** is an offline-first, local-first web application and developer learning platform built by DropOutLab. It teaches modern full-stack web engineering and software craft with a foundational **"Learn Git Before Learning Code"** methodology and hands-on, project-driven progression (**Learn → Build → Evolve**).

The platform features:
- **12-Week Structured Curriculum**: 191+ lessons and 30+ verified hands-on projects spanning HTML, CSS, JavaScript, React, Node.js, and Full-Stack systems.
- **Embedded Terminal Sandbox**: In-browser command-line environment and live code execution sandbox.
- **Git-Backed Student Workspace Engine (v3)**: Direct integration with GitHub where students maintain automated week/lesson sub-branches, commit homework, and track GitHub Pages live deployments.
- **100DaysOfCode Journal**: Real-time study logs, WakaTime-style activity tracking, and streak analytics.
- **Mentor Review & Verifiable Credentials**: Instructor command center (`/root`), homework evaluation (0–100 scale, letter grades), revision workflow, and cryptographically verified graduation certificates.
- **Offline & PWA Resilience**: Background sync queue, service worker caching, and persistent offline state.

---

## 🌟 Core Architecture

```text
CURRICULUM UPSTREAM / STARTER
https://github.com/dropoutlab-dev/lurnix-starter (or upstream curriculum)
         │ (1 Student = 1 Persistent Fork)
         ▼
STUDENT GITHUB WORKSPACE
https://github.com/{studentGithubUsername}/lurnix-workspace
         │
         ├── main
         ├── week-00 ──► week-00/lesson-00-01
         ├── week-01 ──► week-01/lesson-01-01
         │           ──► week-01/lesson-01-02
         │           ──► week-01/lesson-01-03
         └── ...
```

---

## 🛠 Local Setup & Development

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/dropoutlab-dev/lurnix.git
cd lurnix

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Environment Variables
Configure `.env` as required (see `.env.example`):
- `GEMINI_API_KEY`: Server-side Gemini AI features.
- `APP_URL`: Host application URL for OAuth redirects.
- `ROOT_MASTER_KEY`: Instructor dashboard administrative access key.
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: GitHub OAuth application credentials.
- `GITHUB_CALLBACK_URL`: Server-side OAuth callback endpoint.

### Scripts
```bash
# Start full-stack development server (Express backend + Vite middleware on Port 3000)
npm run dev

# Run TypeScript typechecks and linting
npm run lint

# Run automated test suite
npm test

# Production build (Vite SPA + Node.js bundle)
npm run build

# Start production server
npm start
```

---

## 🔒 Security & Privacy Principles

- **Zero Client Token Storage**: No GitHub access tokens, app secrets, or credentials stored in client `localStorage` or exposed to the browser.
- **Server-Side API Proxy**: All external GitHub API interactions, OAuth token exchanges, and sensitive operations execute through backend proxy endpoints.
- **Path Traversal Defense**: All file and asset operations validate against path traversal attacks.
- **Idempotency**: All mutation endpoints use deterministic idempotency keys to prevent duplicate commits or submissions.

---

## 📄 License

MIT License © 2026 [DropOutLab](https://github.com/dropoutlab-dev).
