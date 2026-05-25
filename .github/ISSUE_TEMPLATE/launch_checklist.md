---
name: Site launch checklist
about: Tasks to be completed before laucnh
title: 'Site launch checklist'
labels: 'checklist'
assignees: ''
---

**Site launch checklist**

## Generic To do's

### Design

- [ ] All pages match mobile designs
- [ ] All pages match tablet designs
- [ ] All pages match desktop designs
- [ ] Site uses woff2 font format (with approriate loading stratergy)

### SEO and meta data

- [ ] All pages have approriate titles
- [ ] All pages have approriate descriptions
- [ ] All pages fallback to default open graph images
- [ ] Revelant pages are included in the sitemap
- [ ] All links have discernable meaning
- [ ] Public pages aren't blocked by robots
- [ ] Site has a favicon and apple/icon files
- [ ] Has at least 100 on lighthouse

### Accessibility

- [ ] The site should be navigatable without a mouse
- [ ] Colour contrasts tests pass
- [ ] All buttons and links have discernable meaning
- [ ] Semantic markup is used, no touch/click events on divs
- [ ] Has at least 95 on lighthouse

### Security

- [ ] No secrets are exposed
- [ ] No react action modules exposing private methods
- [ ] Uses an approriate content policy

### Performance

- [ ] Site has at least 85 lighthouse score
- [ ] Approriate code splitting used
- [ ] Only send/receive data required

### Tests and Linting

- [ ] Critical paths have supporting e2e/unit tests
- [ ] Utilities have unit tests
- [ ] No linting errors or warnings
- [ ] Type checking passes, no `any`'s
- [ ] No clashing tailwind classes

### CMS

- [ ] Fields are appropriately labed
- [ ] Fields have instructions where neccessary
- [ ] Blocks are documented
- [ ] Live preview is working for all routes
- [ ] Required fields are marked as required

## Project specific
