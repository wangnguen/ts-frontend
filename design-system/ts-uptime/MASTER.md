# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** TS Uptime
**Updated:** 2026-05-22
**Category:** SaaS Uptime Monitoring
**Style:** Neo-Brutalism — Rounded (inspired by LearnHub educational platform)

---

## Color Palette

| Role             | Hex                    | CSS Variable              |
| ---------------- | ---------------------- | ------------------------- |
| CTA / Primary    | `#22C55E`              | `--cta`                   |
| CTA Hover        | `#16A34A`              | `--cta-dark`              |
| Primary Light    | `rgba(34,197,94,0.10)` | `--color-primary-light`   |
| Accent (coral)   | `#FDBCB4`              | `--primary`               |
| Secondary (blue) | `#ADD8E6`              | `--secondary`             |
| Background       | `#FFF9F5`              | `--bg-cream`              |
| Surface          | `#FFFFFF`              | `--color-surface`         |
| Surface 2        | `#FFF9F5`              | `--color-surface-2`       |
| Text (dark)      | `#2D3748`              | `--text` / `--color-text` |
| Muted            | `#64748B`              | `--color-muted`           |
| Border (subtle)  | `rgba(45,55,72,0.15)`  | `--color-border`          |
| Border 2         | `#E2E8F0`              | `--color-border-2`        |

> **Alias variables** (backwards-compat with existing components):
> `--color-primary` = `#22C55E` · `--color-primary-hover` = `#16A34A` · `--color-accent` = `#FDBCB4` · `--color-secondary` = `#ADD8E6` · `--color-bg` = `#FFFFFF`

### Status Colors

| Status      | Hex       | CSS Variable          |
| ----------- | --------- | --------------------- |
| Up          | `#22C55E` | `--color-up`          |
| Up Hover    | `#16A34A` | `--color-up-hover`    |
| Down        | `#EF4444` | `--color-down`        |
| Warning     | `#F59E0B` | `--color-warning`     |
| Pending     | `#3B82F6` | `--color-pending`     |
| Maintenance | `#A855F7` | `--color-maintenance` |

---

## Typography

- **Heading font:** Fredoka — rounded, chunky display
- **Body font:** Nunito — rounded sans-serif
- **Weights:** 400, 500, 600, 700, 800
- **Google Fonts:**

```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
```

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Fredoka', sans-serif;
}
body {
  font-family: 'Nunito', system-ui, sans-serif;
}
```

- Body: 16px minimum, line-height 1.5–1.75
- Headings: `font-extrabold` (800), Fredoka — appears large and friendly
- Labels: `font-semibold` (600), `text-sm`
- Muted/caption: `font-medium` (500), `text-xs`/`text-sm`

---

## Shadows (Neo-Brutalism Offset)

No blur. All shadows are flat, solid-color offsets.

```css
--clay-shadow-sm: 2px 2px 0 #2d3748;
--clay-shadow-md: 4px 4px 0 #2d3748;
--clay-shadow-lg: 6px 6px 0 #2d3748, inset 0 -4px rgba(0, 0, 0, 0.08);
--clay-shadow-btn: 4px 4px 0 #2d3748;
--clay-shadow-btn-hover: 2px 2px 0 #2d3748;
```

**Hover press effect:** shadow shrinks + element moves toward shadow direction:

```css
/* default */
box-shadow: 4px 4px 0 var(--text);
/* hover   */
box-shadow: 2px 2px 0 var(--text);
transform: translate(2px, 2px);
```

---

## Background

```css
body {
  background: var(--bg-cream); /* #fff9f5 */
}
```

No gradient, no blur — clean warm cream.

---

## Component Specs

### Clay Card

```css
.clay-card {
  background: #ffffff;
  border-radius: 24px;
  border: 3px solid var(--text); /* #2d3748 */
  box-shadow:
    6px 6px 0 var(--text),
    inset 0 -4px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
}
.clay-card:hover {
  box-shadow:
    4px 4px 0 var(--text),
    inset 0 -4px rgba(0, 0, 0, 0.08);
  transform: translate(2px, 2px);
}
```

Usage in JSX: `<div className="clay-card p-8">`

### Soft Clay (feature cards — no border)

```css
.soft-clay {
  background: #ffffff;
  border-radius: 24px;
  box-shadow:
    rgba(0, 0, 0, 0.08) 0px 8px 30px,
    rgba(0, 0, 0, 0.05) 0px -4px inset;
}
```

### Blob Decorations (auth pages)

```css
.clay-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.25; /* solid, NO blur */
  pointer-events: none;
  z-index: 0;
}
/* Animation variants: blob-float | blob-float-delay | blob-float-slow */
```

**Blob color palette** (use inline style):

```
var(--primary)            /* coral pink #fdbcb4  */
var(--secondary)          /* light blue #add8e6  */
rgba(152,255,152,0.40)    /* mint green          */
rgba(230,230,250,0.50)    /* lavender            */
```

### Primary Button

Use CSS class `.btn-primary` — do **not** write inline styles for primary buttons.

```css
.btn-primary {
  background: var(--cta); /* #22c55e */
  color: #ffffff;
  font-weight: 700;
  border-radius: 16px;
  border: 3px solid var(--text); /* #2d3748 */
  box-shadow: 4px 4px 0 var(--text);
  padding: 0.875rem 1.75rem;
}
/* Hover: box-shadow 2px 2px, transform translate(2px,2px) */
/* Disabled: opacity 0.6 */
```

JSX usage:

```tsx
<button className="btn-primary text-sm">Label</button>
<button className="btn-primary w-full text-sm">Full-width</button>
<Link to="/path" className="btn-primary text-sm">Link button</Link>
```

### Secondary Button

```css
.btn-secondary {
  background: var(--secondary); /* light blue #add8e6 */
  color: var(--text);
  font-weight: 700;
  border-radius: 16px;
  border: 3px solid var(--text);
  box-shadow: 4px 4px 0 var(--text);
  padding: 0.875rem 1.75rem;
}
```

### Save / Submit Button (forms)

```tsx
// Use SaveButton component — it wraps .btn-primary
<SaveButton loading={loading} text="Lưu thay đổi" />

// Or manually:
<button type="submit" disabled={loading} className="btn-primary text-sm px-5 py-2.5">
  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
</button>
```

### Google / Social Button

```tsx
style={{
  background: '#FFFFFF',
  border: '2px solid var(--text)',
  color: 'var(--color-text)',
  boxShadow: 'var(--clay-shadow-sm)',  /* 2px 2px 0 #2d3748 */
  borderRadius: '16px',
}}
// Hover: boxShadow var(--clay-shadow-md), transform translate(2px,2px)
```

### Input Field

```tsx
className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all duration-200 placeholder:text-gray-400"
style={{
  background: 'var(--color-surface-2)',   /* #fff9f5 */
  border: '2px solid var(--color-border)',
  color: 'var(--color-text)',
}}

// Focus
borderColor: 'var(--cta)'
boxShadow: '0 0 0 3px rgba(34,197,94,0.15)'
background: '#FFFFFF'

// Error
borderColor: 'var(--color-down)'   /* #ef4444 */
boxShadow: '0 0 0 3px rgba(239,68,68,0.12)'
```

### OTP Input Cell

```tsx
style={{
  width: 46, height: 54,
  background: digit ? 'rgba(34,197,94,0.07)' : 'var(--color-surface-2)',
  border: digit ? '2px solid rgba(34,197,94,0.5)' : '2px solid var(--color-border)',
  color: digit ? 'var(--cta)' : 'var(--color-text)',
  borderRadius: '16px',
}}
// Focus: borderColor var(--cta), boxShadow 0 0 0 3px rgba(34,197,94,0.15)
```

### Icon Container (step screens)

```tsx
// Default
style={{
  background: 'var(--color-primary-light)',  /* rgba(34,197,94,0.10) */
  border: '2px solid rgba(34,197,94,0.25)',
  borderRadius: '16px',
  width: 64, height: 64,
}}

// Success variant (same — green is already the primary)
background: 'var(--color-primary-light)'
border: '2px solid rgba(34,197,94,0.3)'
```

### Logo / Avatar Icon Container

```tsx
// Logo (sidebar, auth pages)
style={{
  background: 'var(--cta)',
  border: '2px solid var(--text)',
  boxShadow: '3px 3px 0 var(--text)',
  borderRadius: '12px',  /* rounded-xl */
}}

// Avatar (user initials)
style={{
  background: 'var(--primary)',  /* coral pink */
  border: '2px solid var(--text)',
  boxShadow: '2px 2px 0 var(--text)',
  borderRadius: '9999px',  /* rounded-full */
}}
```

### Progress Bar (multi-step)

```tsx
// Active step
background: 'var(--cta)'
border: '2px solid var(--text)'
boxShadow: '2px 2px 0 var(--text)'
color: '#FFFFFF'

// Completed step
background: 'var(--color-primary-light)'
color: 'var(--cta)'

// Pending step
background: '#E5E7EB'
color: '#9CA3AF'

// Connector (completed)
background: 'var(--cta)'

// Connector (pending)
background: '#E5E7EB'
```

### Status Bar

```tsx
style={{
  background: 'rgba(34,197,94,0.08)',
  border: '1.5px solid rgba(34,197,94,0.2)',
  borderRadius: '9999px',
}}
// Dot: background var(--color-up), class="status-pulse"
// Text color: var(--cta-dark) #16a34a
```

### Error Banner

```tsx
style={{
  background: 'rgba(239,68,68,0.07)',
  border: '2px solid rgba(239,68,68,0.18)',
  color: '#B91C1C',
  borderRadius: '16px',
}}
```

### Warning Banner

```tsx
style={{
  background: 'rgba(245,158,11,0.07)',
  border: '2px solid rgba(245,158,11,0.18)',
}}
// Icon/text color: #D97706 / #92400E
```

### Divider

```tsx
// Line only
<div className="h-px my-5" style={{ background: 'var(--color-border-2)' }} />

// With text
<div className="flex items-center gap-3 my-5">
  <div className="flex-1 h-px" style={{ background: 'var(--color-border-2)' }} />
  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9CA3AF' }}>
    {text}
  </span>
  <div className="flex-1 h-px" style={{ background: 'var(--color-border-2)' }} />
</div>
```

### Link (inline)

```tsx
style={{ color: 'var(--cta)' }}
onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cta-dark)')}
onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cta)')}
```

### Sidebar (AppLayout)

```tsx
// Sidebar wrapper
style={{
  background: 'var(--color-surface)',
  borderRight: '3px solid var(--text)',
  boxShadow: '4px 0 0 rgba(45,55,72,0.06)',
}}

// Active NavLink
style={{
  background: 'var(--cta)',
  border: '2px solid var(--text)',
  boxShadow: '3px 3px 0 var(--text)',
}}
// className: text-white

// Inactive NavLink hover
className: "hover:bg-(--color-primary-light) hover:text-(--color-primary)"
```

---

## Page Layout (Auth)

```tsx
// Wrapper
<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

// Blob decorations (place before content, absolute)
<div className="clay-blob blob-float w-80 h-80 -top-20 -left-20"
     style={{ background: 'var(--primary)' }} />
<div className="clay-blob blob-float-delay w-64 h-64 top-1/3 -right-16"
     style={{ background: 'var(--secondary)' }} />
<div className="clay-blob blob-float-slow w-96 h-96 -bottom-32 left-1/4"
     style={{ background: 'rgba(152,255,152,0.40)' }} />

// Content container
<div className="w-full max-w-md relative z-10">

// Header section
<div className="text-center mb-8">
  <AuthLogo />
  <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-text)' }}>...</h1>
  <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-muted)' }}>...</p>
</div>

// Card
<AuthCard>  {/* clay-card p-8 */}
  ...
</AuthCard>
```

---

## Spacing & Border Radius

| Usage                | Value    | Tailwind       |
| -------------------- | -------- | -------------- |
| Clay card            | `24px`   | `rounded-3xl`  |
| Button, Input, OTP   | `16px`   | `rounded-2xl`  |
| Icon container       | `16px`   | `rounded-2xl`  |
| Logo icon            | `12px`   | `rounded-xl`   |
| Status pill          | `9999px` | `rounded-full` |
| Warning/Error banner | `16px`   | `rounded-2xl`  |

| Padding            | Usage                |
| ------------------ | -------------------- |
| `p-8`              | Clay card content    |
| `px-4 py-3`        | Input fields         |
| `0.875rem 1.75rem` | `.btn-primary` (CSS) |
| `px-5 py-2.5`      | Compact buttons      |
| `p-3.5`            | Banners              |

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

/* Button hover: translate(2px,2px) + shadow shrink — 150ms */
/* Input focus ring: 200ms ease */
/* Link color: transition-colors (150ms) */
/* Clay card hover: translate(2px,2px) — 200ms */
```

---

## Anti-Patterns (Do NOT Use)

- ❌ Dark mode — project is light only
- ❌ Purple gradients — `linear-gradient(135deg, #7C3AED...)` is the old style
- ❌ `linear-gradient` for buttons — use `.btn-primary` class
- ❌ Soft blur shadows — `box-shadow: 0 12px 32px rgba(...)` is the old claymorphism style
- ❌ Glassmorphism (`backdrop-filter`)
- ❌ Emojis as icons — use SVG (Heroicons, Lucide)
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ `translateY(-2px)` hover lift — use `translate(2px, 2px)` press toward shadow
- ❌ Low contrast text (maintain 4.5:1 minimum)
- ❌ Instant state changes — always `transition-all duration-200`
- ❌ Invisible focus states

---

## Pre-Delivery Checklist

- [ ] No purple gradients — all CTAs use `.btn-primary` or `var(--cta)`
- [ ] Cards use `.clay-card` or `border: 2–3px solid var(--text)` + offset shadow
- [ ] No emojis used as icons (SVG only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states use press effect (`translate(2px,2px)`) not lift (`translateY(-2px)`)
- [ ] Light mode text contrast ≥ 4.5:1
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Auth pages have blob decorations with `.clay-blob .blob-float*`
- [ ] CSS variables used (not raw hex) wherever possible
