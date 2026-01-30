# Physical Device QA Checklist

> Manual testing checklist for all GUDBRO vertical PWAs on real devices.
> Use this as a template before each release.

## Target Devices

Test on at least these device categories:

- [ ] **iPhone SE** (small iOS, 375px) - Safari
- [ ] **Mid-range Android** (e.g., Samsung Galaxy A54, 393px) - Chrome
- [ ] **iPad** (tablet, 768px+) - Safari
- [ ] **Desktop** (1280px+) - Chrome (sanity check only)

---

## Common Checks (All Verticals)

Apply these checks to **every** vertical PWA.

### Layout

- [ ] No horizontal overflow (no sideways scroll)
- [ ] Proper spacing between sections (no overlapping content)
- [ ] Content fits within the viewport width
- [ ] Safe area insets respected (notch, home indicator)
- [ ] Bottom navigation does not overlap page content

### Touch Targets

- [ ] All interactive elements are at least 44x44px
- [ ] Buttons have adequate spacing (no accidental taps on neighbors)
- [ ] Links are easily tappable without zooming

### Typography

- [ ] Text is legible at default zoom level
- [ ] Sufficient color contrast (text vs background)
- [ ] No text truncation that hides critical information
- [ ] Font sizes appropriate for mobile reading

### Navigation

- [ ] Bottom navigation is reachable with thumb (one-handed use)
- [ ] All navigation links respond to tap within 100ms
- [ ] Back navigation works as expected (browser back button)
- [ ] Active state is visible on current navigation item

### Scroll

- [ ] Smooth scrolling throughout the app
- [ ] No janky or stuttering scroll behavior
- [ ] Scroll position is maintained when navigating back
- [ ] Long lists scroll performantly

### Images

- [ ] Images load within 3 seconds on simulated 3G
- [ ] Proper aspect ratios maintained (no stretching)
- [ ] No broken image placeholders visible
- [ ] Images have appropriate alt text (screen reader)

### Forms

- [ ] Keyboard opens when tapping input fields
- [ ] Content not obscured by on-screen keyboard
- [ ] Form submission works and shows feedback
- [ ] Input validation messages are visible

### PWA

- [ ] "Add to Home Screen" prompt works
- [ ] Splash screen displays correctly
- [ ] Standalone mode works (no browser chrome)
- [ ] App icon appears correctly on home screen
- [ ] Manifest loads without errors (DevTools > Application)

---

## Per-Vertical Checks

### coffeeshop

- [ ] Menu category horizontal scroll works smoothly
- [ ] Item detail modal opens and closes correctly
- [ ] Order summary shows correct items and totals
- [ ] Cart interaction (add/remove/quantity) is responsive
- [ ] Price formatting correct for selected currency
- [ ] Language switcher works across all pages

### wellness

- [ ] Service cards display with images and pricing
- [ ] Staff profile images load correctly
- [ ] Category filter updates displayed services
- [ ] Booking/contact CTA buttons are functional
- [ ] Service detail page shows full description

### laundry

- [ ] Service tier pricing cards are readable
- [ ] LaundryForm drawer opens and closes smoothly
- [ ] Service selection works (checkboxes/toggles)
- [ ] Pricing summary updates dynamically
- [ ] WhatsApp/contact CTA links open correctly

### pharmacy

- [ ] Symptom search input works with autocomplete
- [ ] Product grid displays with images and prices
- [ ] Info page navigation between sections is smooth
- [ ] Product detail shows dosage and safety info
- [ ] Category filtering works correctly

### workshops

- [ ] Workshop cards display with dates and pricing
- [ ] About page scrolls smoothly with rich content
- [ ] WhatsApp CTA links open with pre-filled message
- [ ] Workshop detail shows schedule and requirements
- [ ] Image gallery loads correctly

### gym

- [ ] Course/class schedule displays correctly
- [ ] Day pass cards show pricing tiers
- [ ] Membership tier comparison is readable
- [ ] Facility images load and display properly
- [ ] Contact/booking CTA buttons work

### tours

- [ ] Tour cards display with images and pricing
- [ ] Category filter updates tour list
- [ ] Tour detail page shows full itinerary
- [ ] Booking form fields work correctly
- [ ] Map/location elements render (if applicable)

### accommodations

- [ ] Booking mode home page loads correctly
- [ ] Search and filter controls work on mobile
- [ ] Property cards display with images
- [ ] Date picker is usable on small screens
- [ ] In-stay dashboard navigation works (if applicable)

---

## Notes

- Record device model, OS version, and browser version for each test session
- Screenshot any issues found and attach to the relevant GitHub issue
- Re-test after fixes are deployed
- Priority: Fix any P0 (crash/unusable) and P1 (broken flow) issues before release
