# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** TS Uptime
**Updated:** 2026-05-15
**Category:** SaaS Uptime Monitoring
**Style:** Claymorphism — Light

---

## Color Palette

| Role            | Hex                     | CSS Variable            |
| --------------- | ----------------------- | ----------------------- |
| Primary         | `#7C3AED`               | `--color-primary`       |
| Primary Hover   | `#6D28D9`               | `--color-primary-hover` |
| Primary Light   | `rgba(124,58,237,0.08)` | `--color-primary-light` |
| Secondary       | `#F97316`               | `--color-secondary`     |
| Accent          | `#EC4899`               | `--color-accent`        |
| Background From | `#EEF2FF`               | `--color-bg-from`       |
| Background Mid  | `#F5F3FF`               | `--color-bg-mid`        |
| Background To   | `#FFF0F9`               | `--color-bg-to`         |
| Surface         | `#FFFFFF`               | `--color-surface`       |
| Surface 2       | `#F8F7FF`               | `--color-surface-2`     |
| Border          | `rgba(124,58,237,0.12)` | `--color-border`        |
| Border 2        | `#E5E7EB`               | `--color-border-2`      |
| Text            | `#1E1B4B`               | `--color-text`          |
| Text 2          | `#3730A3`               | `--color-text-2`        |
| Muted           | `#6B7280`               | `--color-muted`         |

### Status Colors

| Status      | Hex       | CSS Variable          |
| ----------- | --------- | --------------------- |
| Up          | `#10B981` | `--color-up`          |
| Up Hover    | `#059669` | `--color-up-hover`    |
| Down        | `#EF4444` | `--color-down`        |
| Warning     | `#F59E0B` | `--color-warning`     |
| Pending     | `#3B82F6` | `--color-pending`     |
| Maintenance | `#A855F7` | `--color-maintenance` |

---

## Typography

- **Font:** Plus Jakarta Sans (heading + body)
- **Weights:** 300, 400, 500, 600, 700, 800
- **Google Fonts:**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
```

- Body: 16px minimum, line-height 1.5–1.75
- Headings: `font-extrabold` (800), tight tracking
- Labels: `font-semibold` (600), `text-sm`
- Muted/caption: `font-medium` (500), `text-xs`/`text-sm`

---

## Shadows (Clay)

```css
--clay-shadow-sm: 0 4px 12px rgba(124, 58, 237, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
--clay-shadow-md: 0 12px 32px rgba(124, 58, 237, 0.14), 0 4px 12px rgba(0, 0, 0, 0.07);
--clay-shadow-lg:
  0 24px 56px rgba(124, 58, 237, 0.16), 0 8px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);
--clay-shadow-btn: 0 8px 24px rgba(124, 58, 237, 0.45), 0 3px 8px rgba(0, 0, 0, 0.12);
--clay-shadow-btn-hover: 0 12px 32px rgba(124, 58, 237, 0.55), 0 4px 10px rgba(0, 0, 0, 0.14);
```

---

## Background

```css
body {
  background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 40%, #fff0f9 100%);
  background-attachment: fixed;
}
```

---

## Component Specs

### Clay Card

```css
.clay-card {
  background: #ffffff; /* --color-surface */
  border-radius: 28px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  box-shadow: var(--clay-shadow-lg);
}
```

Usage in JSX: `<div className="clay-card p-8">`

### Blob Decorations

```css
.clay-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;
}
/* Animation variants: blob-float | blob-float-delay | blob-float-slow */
```

**Blob color palette** (use inline style):

```
rgba(167,139,250,0.35)  /* violet-400  */
rgba(249,115,22,0.22)   /* orange-400  */
rgba(236,72,153,0.20)   /* pink-500    */
rgba(16,185,129,0.18)   /* emerald-500 */
```

### Primary Button

```tsx
style={{
  background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
  color: "#FFFFFF",
  boxShadow: "var(--clay-shadow-btn)",
  borderRadius: "16px",  // rounded-2xl
  padding: "12px 16px",
}}

// Hover
background: "linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)"
boxShadow: "var(--clay-shadow-btn-hover)"
transform: "translateY(-2px)"

// Disabled
background: "linear-gradient(135deg, #C4B5FD, #DDD6FE)"
boxShadow: "none"
```

### Secondary / Outline Button

```tsx
style={{
  background: "transparent",
  border: "2px solid rgba(124,58,237,0.3)",
  color: "var(--color-primary)",
  borderRadius: "16px",
}}

// Hover
background: "rgba(124,58,237,0.06)"
borderColor: "var(--color-primary)"
```

### Google / Social Button

```tsx
style={{
  background: "#FFFFFF",
  border: "2px solid #E5E7EB",
  color: "var(--color-text)",
  boxShadow: "var(--clay-shadow-sm)",
  borderRadius: "16px",
}}

// Hover
borderColor: "rgba(124,58,237,0.3)"
boxShadow: "var(--clay-shadow-md)"
transform: "translateY(-1px)"
```

### Input Field

```tsx
className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-gray-400"
style={{
  background: "var(--color-surface-2)",   // #F8F7FF
  border: "2px solid rgba(124,58,237,0.15)",
  color: "var(--color-text)",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
}}

// Focus
borderColor: "var(--color-primary)"
boxShadow: "0 0 0 4px rgba(124,58,237,0.12)"
background: "#FFFFFF"

// Error
borderColor: "var(--color-down)"          // #EF4444
boxShadow: "0 0 0 4px rgba(239,68,68,0.12)"
```

### OTP Input Cell

```tsx
style={{
  width: 46, height: 54,
  background: digit ? "rgba(124,58,237,0.07)" : "var(--color-surface-2)",
  border: digit ? "2px solid rgba(124,58,237,0.5)" : "2px solid rgba(124,58,237,0.15)",
  color: digit ? "var(--color-primary)" : "var(--color-text)",
  boxShadow: digit ? "0 4px 12px rgba(124,58,237,0.15)" : "inset 0 2px 4px rgba(0,0,0,0.04)",
  borderRadius: "16px",
}}

// Focus
borderColor: "var(--color-primary)"
boxShadow: "0 0 0 4px rgba(124,58,237,0.12)"
```

### Icon Container (step screens)

```tsx
style={{
  background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.12))",
  border: "2px solid rgba(124,58,237,0.2)",
  boxShadow: "0 8px 24px rgba(124,58,237,0.15)",
  borderRadius: "16px",  // rounded-2xl
  width: 64, height: 64,
}}
```

**Success variant (green):**

```tsx
background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.12))'
border: '2px solid rgba(16,185,129,0.3)'
boxShadow: '0 8px 24px rgba(16,185,129,0.2)'
```

### Progress Bar (multi-step)

```tsx
// Active step
background: 'linear-gradient(135deg, #7C3AED, #A855F7)'
boxShadow: '0 4px 12px rgba(124,58,237,0.4)'
color: '#FFFFFF'

// Completed step
background: 'rgba(124,58,237,0.15)'
color: 'var(--color-primary)'

// Pending step
background: '#E5E7EB'
color: '#9CA3AF'

// Connector (completed)
background: 'linear-gradient(90deg, #7C3AED, #A855F7)'

// Connector (pending)
background: '#E5E7EB'
```

### Status Bar

```tsx
style={{
  background: "rgba(16,185,129,0.08)",
  border: "1.5px solid rgba(16,185,129,0.2)",
  borderRadius: "9999px",
}}
// Dot: background var(--color-up), class="status-pulse"
// Text color: #059669
```

### Error Banner

```tsx
style={{
  background: "rgba(239,68,68,0.07)",
  border: "2px solid rgba(239,68,68,0.18)",
  color: "#B91C1C",
  borderRadius: "16px",
}}
```

### Warning Banner

```tsx
style={{
  background: "rgba(245,158,11,0.07)",
  border: "2px solid rgba(245,158,11,0.18)",
}}
// Icon/text color: #D97706 / #92400E
```

### Divider

```tsx
// Line only
<div className="h-px my-5" style={{ background: "#E5E7EB" }} />

// With text
<div className="flex items-center gap-3 my-5">
  <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
    {text}
  </span>
  <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
</div>
```

### Link (inline)

```tsx
style={{ color: "var(--color-primary)" }}
onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-hover)")}
onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
```

---

## Page Layout (Auth)

```tsx
// Wrapper
<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

// Content container
<div className="w-full max-w-md relative z-10">

// Header section
<div className="text-center mb-8">
  <AuthLogo />
  <h1 className="text-3xl font-extrabold" style={{ color: "var(--color-text)" }}>...</h1>
  <p className="text-sm mt-2 font-medium" style={{ color: "var(--color-muted)" }}>...</p>
</div>

// Card
<AuthCard>  {/* clay-card p-8 */}
  ...
</AuthCard>
```

---

## Spacing & Border Radius

| Usage                | Value    | Tailwind                  |
| -------------------- | -------- | ------------------------- |
| Auth card            | `28px`   | `rounded-[28px]` / custom |
| Button, Input, OTP   | `16px`   | `rounded-2xl`             |
| Icon container       | `16px`   | `rounded-2xl`             |
| Status pill          | `9999px` | `rounded-full`            |
| Warning/Error banner | `16px`   | `rounded-2xl`             |

| Padding     | Usage             |
| ----------- | ----------------- |
| `p-8`       | Clay card content |
| `px-4 py-3` | Input fields      |
| `py-3 px-4` | Buttons           |
| `p-3.5`     | Banners           |

---

## Animation

```css
/* Blob float: 8s / 10s / 13s ease-in-out infinite */
.blob-float {
  animation: blob-float 8s ease-in-out infinite;
}
.blob-float-delay {
  animation: blob-float 10s ease-in-out infinite 2s;
}
.blob-float-slow {
  animation: blob-float 13s ease-in-out infinite 4s;
}

/* Status dot pulse */
.status-pulse {
  animation: status-pulse 2s ease-in-out infinite;
}

/* Button hover: translateY(-2px) + shadow — 200ms ease */
/* Input focus ring: 200ms ease */
/* Link color: transition-colors (150ms) */
```

---

## Anti-Patterns (Do NOT Use)

- ❌ Dark mode — project is light only
- ❌ Glassmorphism (`backdrop-filter`) — style is claymorphism
- ❌ Emojis as icons — use SVG (Heroicons, Lucide)
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ Layout-shifting hovers (scale transforms)
- ❌ Low contrast text (maintain 4.5:1 minimum)
- ❌ Instant state changes — always `transition-all duration-200`
- ❌ Invisible focus states

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (SVG only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Light mode text contrast ≥ 4.5:1
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Blob decorations present with correct class + inline color
- [ ] Clay card used for all form containers
- [ ] CSS variables used (not raw hex) wherever possible
