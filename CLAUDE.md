# CLAUDE.md — al-amin.github.io

## Purpose
Personal portfolio website for Al Amin — AI Engineer, MCP Architect, GenAI Platform Builder. Deployed via GitHub Pages at https://al-amin.github.io.

## Architecture
Single-page static site. No build step, no frameworks, no dependencies.

```
index.html          → Complete SPA with all 9 sections
css/variables.css   → Design tokens (colors, typography, spacing, shadows)
css/style.css       → All component styles, responsive, print, animations
js/main.js          → Nav, typing effect, scroll reveal, mobile menu, back-to-top
assets/favicon.svg  → Geometric "A" in teal
.nojekyll           → Skip Jekyll processing on GitHub Pages
```

## Design Tokens (css/variables.css)
- Dark theme: `--bg-primary: #0a0f1c`, `--accent: #00BFA6` (teal)
- Typography: Inter (body) + JetBrains Mono (code/metrics)
- Breakpoints: 640px, 768px, 1024px (mobile-first)

## Content Sections
1. **Nav** — Fixed top, blur backdrop, hamburger on mobile
2. **Hero** — Typing effect (3 titles), 2 CTAs, 3 social links
3. **About** — Bio + 6 metric cards (209+ tools, 42x faster, 90%, 10+ yrs, 9 systems, 100+ devs)
4. **Projects** — 5 cards (MCP Collection featured, GenAI Lab, Hackathon RAG, CI/CD, Teams MCP)
5. **Skills** — 5 categories with pills
6. **Experience** — Vertical timeline, 6 roles
7. **Certifications** — 6 cert cards in grid
8. **Contact** — Email, LinkedIn, GitHub + availability indicator
9. **Footer** — Copyright, social icons, back-to-top

## Content Source
All content comes from `alamin-resume-related/profile/master_resume.md` in the Career Command Center repo. The website is a derivative — update the source first, then sync.

## Editing Content
- **Text changes**: Edit directly in `index.html` section content
- **New project**: Add a `<article class="project-card reveal">` block in the projects grid
- **New certification**: Add a `<div class="cert-card reveal">` block in certs grid
- **Style changes**: Modify tokens in `variables.css`, components in `style.css`
- **New section**: Add HTML section, add nav link, add styles

## Deployment
Push to `master` branch → GitHub Pages auto-deploys within 1-2 minutes.

```bash
git add -A && git commit -m "Update portfolio content" && git push origin master
```

## Performance Budget
- Total page weight: < 75KB (excluding Google Fonts)
- No external JS libraries
- No images (all SVG inline)
- Lighthouse targets: 95+ Performance, 100 Accessibility, 100 SEO, 100 Best Practices

## Accessibility
- Skip-to-content link
- ARIA labels on all interactive elements
- Focus-visible outlines
- Keyboard navigation (hamburger, focus trap in mobile menu, escape to close)
- `prefers-reduced-motion: reduce` → all animations disabled
- Semantic HTML5 landmarks (nav, main, section, footer)
- Screen reader text via `.sr-only` class

## Confidentiality Rules
This is a PUBLIC website. Follow these rules:
- Use generic project names: "enterprise MCP Server Collection", "GenAI Lab platform"
- Include all metrics (209+, 42x, 60-80%, 90%, 44%) — these showcase impact
- Include all technologies — safe to mention
- NEVER include: internal URLs, IP addresses, internal system names, auth details, proxy configs, internal repo links, PR numbers, internal team names
- "Allianz Technology" as employer is public and safe
- Frame by IMPACT, not implementation specifics

## Testing
```bash
# Local preview
python3 -m http.server 8000
# Then open http://localhost:8000

# Validate HTML
npx html-validate index.html

# Lighthouse (requires Chrome)
npx lighthouse https://al-amin.github.io --output=json
```
