# Requirements: GUDBRO Verticals v1.2

**Defined:** 2026-01-30
**Core Value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## v1.2 Requirements

### Code Fixes

- [ ] **CFIX-01**: Tours compiles without TypeScript errors (remove tsconfig exclusion for soups DB types)
- [ ] **CFIX-02**: Tours uses CSS variables for brand colors instead of hardcoded Tailwind values
- [ ] **CFIX-03**: Wellness /staff/[slug] has explicit back link to staff list page
- [ ] **CFIX-04**: Zero ESLint warnings in Wellness (currently 19)
- [ ] **CFIX-05**: Zero placeholder links (href="#") in Tours and Workshops (currently 3)

### E2E Infrastructure

- [ ] **E2EI-01**: Playwright config extended with per-vertical projects (8 verticals, mobile + desktop viewports)
- [ ] **E2EI-02**: Shared test fixtures (BasePwaPage, viewport helpers, vertical registry)
- [ ] **E2EI-03**: Page load smoke test for every vertical (page loads without JS errors)
- [ ] **E2EI-04**: BottomNav navigation test for every vertical (all links work)
- [ ] **E2EI-05**: Responsive viewport test for every vertical (mobile 375px, tablet 768px, desktop 1280px)

### Visual & Quality

- [ ] **VISQ-01**: Visual regression baselines captured for every vertical (toHaveScreenshot)
- [ ] **VISQ-02**: PWA manifest validation for every vertical (name, icons, theme_color present)
- [ ] **VISQ-03**: Visual QA checklist documented for physical device testing

## Future Requirements

### CI Integration (deferred to v1.3+)

- **CI-01**: GitHub Actions matrix pipeline for per-vertical E2E execution
- **CI-02**: Automated visual regression comparison on PR
- **CI-03**: Test impact analysis with --only-changed

### Advanced Testing (deferred to v1.3+)

- **ADV-01**: Accessibility audit per vertical (a11y)
- **ADV-02**: i18n/RTL viewport tests
- **ADV-03**: Performance budgets (LCP, CLS thresholds)

## Out of Scope

| Feature                         | Reason                                                                 |
| ------------------------------- | ---------------------------------------------------------------------- |
| Offline/Service Worker testing  | Playwright PWA install support limited (Issue #26875); high flake risk |
| Cross-browser parity testing    | Chromium-only sufficient for smoke tests; multi-browser adds CI cost   |
| Real Supabase integration tests | Only accommodations has backend; mock-data verticals don't need it     |
| Comprehensive E2E user flows    | Smoke tests only (3-5 per vertical); full E2E is separate milestone    |
| Test data management            | 7/8 verticals use inline mock data; no DB fixtures needed              |

## Traceability

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| CFIX-01     | 9     | Pending |
| CFIX-02     | 9     | Pending |
| CFIX-03     | 9     | Pending |
| CFIX-04     | 9     | Pending |
| CFIX-05     | 9     | Pending |
| E2EI-01     | 10    | Pending |
| E2EI-02     | 10    | Pending |
| E2EI-03     | 11    | Pending |
| E2EI-04     | 11    | Pending |
| E2EI-05     | 11    | Pending |
| VISQ-01     | 12    | Pending |
| VISQ-02     | 12    | Pending |
| VISQ-03     | 12    | Pending |

**Coverage:**

- v1.2 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0

---

_Requirements defined: 2026-01-30_
_Last updated: 2026-01-30 after roadmap creation_
