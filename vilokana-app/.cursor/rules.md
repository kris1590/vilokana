---
description: Project rules and conventions for folder structure, architecture, and agent behavior
alwaysApply: true
---

# Project Rules and Conventions

This document defines non-negotiable rules for folder structure, responsibilities, coding standards, and agent behavior. All contributors (human or AI agents) must follow these rules strictly.

## 1. App Router and Page Architecture

### 1.1 Slug Based Routing

All dynamic pages must live under:

- `/app/[...slug]/`

This folder:

- Handles all page level routing
- Resolves pages based on CMS driven slugs
- Must not contain reusable UI components or section implementations

**Rules:**

- Do not create additional route folders unless explicitly approved
- Page files must contain only orchestration logic (data fetching, layout composition)
- No visual section markup inside page files

## 2. Components Architecture

### 2.1 /components

Contains reusable, generic React components.

**Examples:** Buttons, Cards, Typography, Layout primitives, UI utilities

**Rules:**

- Components must be stateless or minimally stateful
- Components must be CMS agnostic
- No Sanity queries inside components
- No page specific logic inside components
- Components must not represent full page sections

## 3. Sections System

### 3.1 /app/sections

Contains page sections, not pages and not generic components.

Each file:

- Represents a full visual or content section (e.g. Hero, Testimonials, CTA)
- Consumes Sanity provided data
- Composes UI using components from `/components`

**Rules:**

- Each section must accept typed props
- Each section must be fully self contained
- Sections must not fetch data
- No routing logic inside sections

### 3.2 Section Mapping

`/app/sectionsMapper.tsx` is the single source of truth for mapping Sanity section types to section components.

- Sanity section `_type` → Section Component (in `/app/sections`)

**Rules:**

- Every Sanity section schema must be registered here
- No conditional rendering logic inside pages
- Do not duplicate mappings anywhere else

## 4. Sanity CMS Structure

### 4.1 /sanity

Contains all CMS related logic only.

### 4.2 Queries

`/sanity/lib/queries.ts` contains all GROQ queries.

**Rules:**

- No GROQ queries outside this file
- Queries must be clearly named
- Queries must be reusable
- Queries should be typed wherever possible

### 4.3 Schema Types

`/sanity/schemaTypes` defines the entire Sanity schema system.

- **/documents** — Top level Sanity documents (e.g. `page`, `siteSettings`)
- **/objects** — Reusable schema objects (CTAs, content blocks)
- **/schemas** — Schema composition and structure, organizes schema exports
- **/index.ts** — Exports all schemas; only file Sanity uses to register schemas

**Rules:**

- No schema duplication
- No inline schemas inside React components or sections
- Every section must map to a Sanity schema object

## 5. Agents System

### 5.1 .agents Folder

Contains AI agent definitions. Each agent has a clearly defined responsibility and operates only within its declared skill domain.

**Rules:**

- Agents must respect this rules file
- Agents must stay within their scoped responsibilities
- Agents must not invent new architecture
- Agents must not bypass folder conventions

## 6. Type Safety and Contracts

- TypeScript is mandatory across the codebase
- Sanity data must be typed
- Sanity data must be validated at the boundary between query and section

**Rules:**

- No usage of `any`
- No implicit `unknown`
- Shared types must be reused across sections when applicable

## 7. Data Flow Rules

Correct data flow:

```
Sanity → GROQ Query → Page → Sections → Components
```

**Rules:**

- Components must never fetch data
- Sections must never query Sanity
- Pages must not contain visual markup
- Pages are responsible only for orchestration

## 8. Naming Conventions

- File names: camelCase or kebab-case (use consistently)
- React components: PascalCase
- Section components: live under `/app/sections`
- Sanity `_type` values: camelCase
- Section component names must match their Sanity schema `_type`

**Example:**

- Sanity schema `_type`: `heroSection`
- Section file: `/app/sections/HeroSection.tsx`
- Section component: `HeroSection`

## 9. Performance and Clean Code

- Server Components are preferred by default
- Client Components only when required
- Avoid unnecessary `useEffect` hooks
- Inline styles are not allowed
- Prefer Tailwind CSS utility classes

## 10. Prohibited Practices

- No business logic inside UI components
- No hardcoded content that belongs in the CMS
- No duplicate schemas, queries, or sections
- No responsibility leakage across architectural layers

## 11. Enforcement Rule

Any change that breaks folder responsibility, bypasses section mapping, or violates data flow rules **must be rejected or refactored immediately**.

## Guiding Principle

- **CMS** drives structure  
- **Pages** orchestrate  
- **Sections** compose  
- **Components** remain pure  

This architecture is intentional and must be respected.
