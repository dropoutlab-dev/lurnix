# Lurnix Design System & Brand Identity Specification

**Brand:** Lurnix
**Domain:** `lurnix.tech`
**Tagline:** Learn by Building. Grow by Creating.
**Philosophy:** Learn → Build → Evolve

---

## 1. Product Identity & Design Principles

Lurnix is a modern, project-based technology learning platform focused on programming, practical software engineering, and future tech skills.

- **Minimal:** Clean, distraction-free surfaces that elevate curriculum content and code.
- **Modern:** Contemporary dark & light schemes, sleek glassmorphism panels, and crisp borders.
- **Developer-Friendly:** Terminal-first typography, JetBrains Mono code editors, and keyboard focus rings.
- **Learning-Focused:** Visual progress gauges, streak widgets, and interactive code verification.
- **Accessible (WCAG AA):** Strictly enforced contrast ratios ($\ge 4.5:1$ for normal text, $\ge 3:1$ for controls and large text).
- **Responsive:** Fluid typography and layouts tested across 360px, 390px, 768px, and 1280px viewports.
- **Consistent & Maintainable:** Centralized CSS custom properties in `:root` and `.dark` / `[data-theme="dark"]`.

---

## 2. Typography Specification

### Font Stacks
```css
--font-sans: "Inter", "Noto Sans Bengali", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Typographic Scale
| Level | Font Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| **Hero Heading** | 48px (`text-5xl`) / 32px (mobile) | 1.15 | 800 / 900 | Landing page hero statements |
| **Page Heading** | 32px (`text-3xl`) / 26px (mobile) | 1.25 | 700 / 800 | Top level views (Syllabus, Profile) |
| **Section Heading** | 24px (`text-2xl`) | 1.3 | 600 / 700 | Module and chapter titles |
| **Card Heading** | 18px (`text-lg`) | 1.35 | 600 | Cards, widgets, modal titles |
| **Body Text** | 16px (`text-base`) | 1.5 | 400 | Primary explanatory copy & theory |
| **Supporting Text** | 14px (`text-sm`) | 1.45 | 400 / 500 | Form helpers, metadata, descriptions |
| **Button Text** | 14px (`text-sm`) | 1.2 | 600 / 700 | Interactive buttons & badges |
| **Code & Terminal** | 14px (`text-xs` / `text-sm`) | 1.6 | 400 / 500 | Terminal prompts, editor lines, diffs |

---

## 3. Color Token System

### Dark Theme (`[data-theme="dark"]`, `.dark`)
| Token | Value | Role | Contrast vs Background |
|---|---|---|---|
| `--color-background` | `#0B1020` | Root canvas | Base canvas |
| `--color-surface` | `#111827` | Cards, panels, modals | Surface elevation |
| `--color-text` | `#FFFFFF` | Primary text headings & body | **19.8:1** (WCAG AAA) |
| `--color-text-muted` | `#94A3B8` | Secondary labels & metadata | **8.2:1** (WCAG AAA) |
| `--color-primary` | `#22D3EE` | Vibrant cyan accent & focus | **13.5:1** (WCAG AAA) |
| `--color-primary-hover`| `#38BDF8` | Cyan hover glow | Interactive state |
| `--color-success` | `#34D399` | Completion & emerald badges | **12.8:1** (WCAG AAA) |
| `--color-border` | `#273449` | Subtle panel dividers | Surface contrast |

### Light Theme (`[data-theme="light"]`, `:root`)
| Token | Value | Role | Contrast vs Background |
|---|---|---|---|
| `--color-background` | `#F8FAFC` | Root canvas | Base canvas |
| `--color-surface` | `#FFFFFF` | Cards, panels, elevated sheets | Pure white surface |
| `--color-text` | `#0F172A` | Deep slate primary text | **16.5:1** (WCAG AAA) |
| `--color-text-muted` | `#475569` | Secondary slate labels | **7.4:1** (WCAG AAA) |
| `--color-primary` | `#0891B2` | Cyan accent for controls & large text | **3.5:1** (WCAG AA large) |
| `--color-primary-text`| `#0E7490` | Semantic text accent (normal text) | **5.1:1** (WCAG AA normal) |
| `--color-success` | `#059669` | Success badges & checks | **3.6:1** (WCAG AA large) |
| `--color-success-text`| `#047857` | Semantic success text (normal text) | **5.2:1** (WCAG AA normal) |
| `--color-border` | `#E2E8F0` | Subtle light dividers | Divider contrast |

---

## 4. Accessibility & Viewport Standards

1. **Focus Ring Visibility:**
   ```css
   button:focus-visible, a:focus-visible, input:focus-visible {
     outline: none;
     box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--primary);
   }
   ```
2. **Keyboard Navigation:** All interactive elements support Tab, Enter, and Space keys.
3. **Responsive Breakpoints:**
   - `Mobile S/M (360px - 390px)`: Compact stacked cards, bottom navigation bar with icons.
   - `Tablet (768px)`: 2-column grids for modules and daily goals.
   - `Desktop (1280px)`: Full multi-pane terminal, sidebar navigation, and detailed code sandboxes.
