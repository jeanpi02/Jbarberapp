---
name: Prestige Booking
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002204'
  on-tertiary-container: '#469446'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is engineered for a premium SaaS booking experience, blending the efficiency of a productivity tool with the high-end aesthetic of luxury service industries. The brand personality is professional, authoritative, and impeccably organized.

The visual style follows a **Modern Corporate** aesthetic with **Minimalist** influences. It prioritizes clarity and high-end finishes through generous whitespace, sophisticated color anchoring, and a focus on structural elegance. The emotional response should be one of immediate trust, ease of use, and a "white-glove" digital service feel.

## Colors
The palette is built on high-contrast foundations to ensure both accessibility and a premium atmosphere.

- **Primary (Deep Charcoal):** Used for typography, navigation bars, and grounding elements. It provides a weight that feels more sophisticated than pure black.
- **Accent (Royal Gold):** Reserved for primary calls to action, high-priority highlights, and active states. Use sparingly to maintain its impact.
- **Success (Emerald):** Used for confirmation states, "Available" indicators, and completed bookings.
- **Backgrounds:** The primary interface uses a soft white (#FAFAFA), with secondary containers using a slightly cooler grey (#F4F4F5) to create subtle depth without relying on heavy borders.

## Typography
This design system utilizes **Inter** for its systematic, utilitarian, and modern qualities. The hierarchy is strictly enforced through weight changes and subtle negative letter-spacing on larger headings to create a "tight," editorial look.

- **Headings:** Use Semi-Bold (600) or Bold (700) weights. 
- **Body:** Stick to Regular (400) for long-form text and Medium (500) for interactive elements like button labels.
- **Data/Labels:** Use the `label-sm` style for metadata, table headers, and small UI descriptors to maintain a clean, organized grid.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a strictly defined maximum container width for desktop readability. 

- **Grid:** A 12-column grid is used for desktop, collapsing to 4 columns on mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Responsive Behavior:** On mobile devices, side margins tighten to 16px to maximize screen real estate for calendar views. On desktop, generous 40px margins ensure the content feels airy and premium.
- **Booking Flows:** For scheduling, use a centered "Focus Mode" layout (max-width 800px) to remove distractions during the checkout or selection process.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and tonal layering. 

- **Surface Layers:** The main background is level 0. Cards and containers reside on level 1, featuring a very soft, highly diffused shadow (e.g., `0 4px 20px rgba(0,0,0,0.04)`). 
- **Interactive Depth:** On hover, cards should subtly lift by increasing shadow spread.
- **Modals & Overlays:** Use a heavier shadow and a backdrop blur (12px) to focus attention on the booking interaction while maintaining context of the background.
- **Outlines:** Use a 1px border (#E5E5E5) for inactive form fields and non-elevated containers.

## Shapes
This design system employs a **Rounded** shape language to soften the professional charcoal palette and make the interface feel approachable.

- **Cards & Primary Containers:** Use `rounded-xl` (24px) for a modern, high-end feel.
- **Buttons & Inputs:** Use `rounded-lg` (16px) to maintain consistency with the cards.
- **Avatars:** Use full circles (pill-shaped) to distinguish human elements from functional UI blocks.

## Components
Consistent component styling ensures a cohesive experience across the provider and client views.

- **Buttons:** 
  - *Primary:* Royal Gold background with Deep Charcoal text. High-contrast, no shadow.
  - *Secondary:* Deep Charcoal background with White text.
  - *Ghost:* No background, Deep Charcoal border.
- **Interactive Calendar:** Time slots should be styled as pill-shaped chips. Available slots use a white background with a subtle border; selected slots transition to Royal Gold.
- **Cards:** Used for professional profiles and service listings. They must include a large corner radius (24px), subtle shadow, and generous internal padding (24px).
- **Input Fields:** Use a tall height (48px+) with a light grey background (#F4F4F5) that transitions to a Royal Gold border on focus. Label text should sit above the field in `label-md`.
- **Skeleton Loaders:** Use a soft pulsing animation with the #F4F4F5 base color.
- **Mobile FAB:** A primary action button (e.g., "Book Now") should be anchored to the bottom right using the Royal Gold accent to remain accessible at all times.