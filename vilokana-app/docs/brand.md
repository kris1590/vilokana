# Vilokana Brand & Design System

**Purpose:** Non-profit foundation + private school for underprivileged children.  
**Guiding principle:** Calm, trustworthy, human-centered. Rural, educational, hopeful.

---

## Brand identity

- **Warm** — Approachable, caring, community-oriented.
- **Trustworthy** — Transparent, reliable, donor- and parent-friendly.
- **Minimal** — Clear hierarchy, no visual noise.
- **Accessible** — Readable, sufficient contrast, inclusive.
- **Rural + educational + hopeful** — Nature-inspired, growth, opportunity.

### Brand personality

- Calm, grounded, human.
- Not corporate, not flashy.
- Suitable for donors, parents, educators.

### Emotional direction

- Safety and belonging.
- Growth and possibility.
- Integrity and care.

---

## Design tokens (reference)

All tokens are implemented in `app/globals.css`. Use semantic names only; no hardcoded colors or fonts in components or sections.

### Colors (semantic)

| Role            | Use |
|-----------------|-----|
| **Primary**     | Main actions, key headings, trust and growth. |
| **Secondary**   | Supporting UI, subtle emphasis, calm. |
| **Accent**      | CTAs, highlights, hope and warmth. |
| **Neutral (bg)**| Page and section backgrounds. |
| **Text**        | Primary and muted text. |
| **Success**     | Confirmations, positive feedback (subtle). |
| **Warning**     | Caution (subtle). |
| **Error**       | Errors, destructive actions (subtle). |

### Typography

- **Primary font (headings):** Serif — authority and warmth.
- **Secondary font (body):** Sans-serif — readability and clarity.
- Scale: h1–h6, body, small — defined in `global.css`; use design-system classes only.

### Spacing & layout

- Consistent spacing scale (no magic numbers).
- Max-width containers for content.
- Vertical rhythm for sections.

---

## Agent responsibilities

- **Brand / Design (theme-factory, brand doc):** Identity, tokens, emotional direction.
- **CSS / Styling (tailwind-design-system, daisyui):** All tokens in `global.css`, Tailwind base, DaisyUI theme. No component-level brand decisions.
- **Component:** Reusable components in `/components`; Tailwind + DaisyUI only; no business logic.
- **Section:** Apply design system in `/app/sections`; use only `/components`; no styling outside the design system.

---

*CMS drives structure. Pages orchestrate. Sections compose. Components remain pure. Design system governs all visuals.*
