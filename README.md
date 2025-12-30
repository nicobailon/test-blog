# Blog Templates

This directory contains the Astro blog template that gets scaffolded when users create a new blog via the API.

## Development

```bash
npm install
npm run dev
# http://localhost:4321/
```

Edit files and see changes immediately with hot reload.

## Structure

```
templates/
  src/
    components/     # Reusable Astro components
    layouts/        # Page layouts (Base, PostLayout)
    pages/          # Route pages
    styles/         # Global CSS (www-sacred design system)
    content/        # Demo blog posts (not included in scaffold)
    config.ts       # Site configuration exports
    lib/            # Utilities
  public/
    images/         # Demo images (not included in scaffold)
  config.json       # Dev config (replaced per-blog)
```

## After Making Changes

Rebuild the scaffold before deploying the API:

```bash
cd ..
npm run build:scaffold
```

This generates `src/lib/scaffold.ts` with all template content embedded.

## Key Files

- `src/styles/global.css` - All CSS variables and component styles
- `src/config.ts` - Reads config.json and exports typed configuration
- `src/layouts/PostLayout.astro` - Blog post layout with breadcrumbs, avatar, etc.
- `src/components/Avatar.astro` - www-sacred avatar pattern (uses slot for adjacent content)

## Design System

Uses www-sacred (sacred.computer) design patterns:
- Monospace typography (JetBrains Mono)
- Character-based spacing (ch units)
- Box-shadow borders instead of CSS borders
- Neon green (light) / orange (dark) accent colors
- 80ch max-width for terminal aesthetic

## Component Patterns

### Avatar with content
```astro
<Avatar src="/images/avatar.png">
  <div>Name and bio here</div>
</Avatar>
```

### Button
```astro
<Button icon=">" text="SUBMIT" href="/path" />
```

### Card
```astro
<Card title="SECTION TITLE">
  Content here
</Card>
```
