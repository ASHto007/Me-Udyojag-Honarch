---
name: Saffron Vanguard
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#564336'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8a7263'
  outline-variant: '#ddc1b0'
  surface-tint: '#944b00'
  primary: '#944b00'
  on-primary: '#ffffff'
  primary-container: '#e27500'
  on-primary-container: '#482100'
  inverse-primary: '#ffb783'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#5e5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#939292'
  on-tertiary-container: '#2b2b2b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc5'
  primary-fixed-dim: '#ffb783'
  on-primary-fixed: '#301400'
  on-primary-fixed-variant: '#713700'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-xxl: 4rem
---

## Brand & Style

This design system embodies an aspirational grassroots entrepreneurship movement across Maharashtra. The brand visualizes resilience, determination, and community progress. The emotional tone is dignified, energizing, deeply grounded in regional enterprise, yet modern and scalable.

The design movement blends **Warm Editorial Modernism** with purposeful tactile restraint:
- **Clean Structure**: Crisp structural containers, high typographic contrast, and ample whitespace balance narrative depth with enterprise clarity.
- **Grassroots Resonance**: Warm, sun-drenched saffron and terracotta tonalities evoke energy and industrious optimism without slipping into decorative folklore.
- **Accessible Dignity**: Premium, professional layout models establish trust for institutional partners, banks, and self-made founders alike.

## Colors

The color palette leverages the energetic resonance of industrial saffron tempered by solid structural neutrals:

- **Primary Accent (`#E27500`)**: Vivid Saffron Orange. Used for primary calls-to-action, success anchors, active indicators, and high-impact editorial underlines.
- **Dark Neutral (`#333333`)**: Charcoal. Serves as the primary content ink, headers, and grounded contrast surfaces.
- **Medium Neutral (`#6D6D6D`)**: Slate Stone. Used for metadata, captions, secondary narratives, and low-priority icons.
- **Surface Accent / Border (`#EAEAEA`)**: Light Neutral. Defines structural boundaries, divider rules, subtle card outlines, and hover states.
- **Canvas (`#FFFFFF` & `#F9F9FB`)**: Crisp, multi-layered background foundations separating focal editorial modules from utility surfaces.

## Typography

The type system is engineered for dual Latin and Devanagari clarity. While **Plus Jakarta Sans** and **Inter** govern Latin display and body metrics, they are matched with system-level Devanagari font stacks (`Noto Sans Devanagari`, `Tiro Devanagari Marathi`) using equivalent optical line-height adjustments.

- **Headlines (`Plus Jakarta Sans`)**: Geometric, open apertures with broad, friendly proportions that maintain dignity and assertiveness at display scale.
- **Body Text (`Inter`)**: High x-height, neutral rhythm, and robust legibility across small digital screens and dense regional case studies.
- **Multilingual Alignment**: When rendering Marathi strings, line-height multipliers increase by 10-15% across headings to accommodate upper and lower diacritic marks (matras) without clipping.

## Layout & Spacing

The layout model uses a responsive 12-column editorial grid on desktop and tablet, collapsing to 4 columns on mobile viewports:

- **Desktop (1024px and above)**: 12 columns with `gutter: 1.5rem` and outer page `margin: 3rem`. Content max-width is locked at `1280px` for optimal reading rhythm.
- **Tablet (768px – 1023px)**: 8 columns with `gutter: 1.25rem` and `margin: 2rem`. Multi-card blocks compress to double-column rows.
- **Mobile (Up to 767px)**: 4 columns with `gutter-mobile: 1rem` and `margin-mobile: 1.25rem`. Complex modular stats wrap vertically.

Vertical cadence relies on dynamic module rhythms: generous `space-xxl` separation between thematic chapters (e.g., Founder Showcases to Registration), while component internals follow compact `space-xs` through `space-md` multiples.

## Elevation & Depth

This system avoids synthetic neon glows or overly deep drop-shadows, opting for grounded, sunlit tactile depth:

- **Surface Layers**: Structural hierarchy is established through contrast planes (`#FFFFFF` resting on `#F9F9FB`), bounded by hairline boundaries (`#EAEAEA`, 1px solid).
- **Ambient Sunlit Shadows**: Used sparingly on floating interactives and active cards:
  - *Resting Card*: `0px 2px 6px -1px rgba(51, 51, 51, 0.05), 0px 1px 3px -1px rgba(51, 51, 51, 0.03)`
  - *Elevated / Hover*: `0px 12px 24px -4px rgba(226, 117, 0, 0.08), 0px 4px 8px -2px rgba(51, 51, 51, 0.04)`
- **Emphasized Focus Layers**: Modals and dropdown flyouts apply a warm neutral scrim overlay (`rgba(51, 51, 51, 0.45)`) combined with a soft blur filter.

## Shapes

The interface adopts a balanced geometry (Level 2):

- **Standard Elements (0.5rem / 8px)**: Inputs, buttons, utility tooltips, and badges.
- **Structural Modules (1rem / 16px)**: Standard cards, article cards, and data stat boards.
- **Hero Containers (1.5rem / 24px)**: Major editorial banners, community spotlight carousels, and visual callouts.

Sharp enough to project corporate and institutional credibility, yet rounded enough to maintain a welcoming, grassroots community feel.

## Components

### Buttons
- **Primary**: Background `#E27500`, label text `#FFFFFF`, border-radius `0.5rem`, padding `0.75rem 1.5rem`. Hover shifts to `#C56300` with subtle upward transform (`-1px`).
- **Secondary / Charcoal**: Background `#333333`, label text `#FFFFFF`, border-radius `0.5rem`.
- **Outline**: Transparent background, 1.5px solid border in `#EAEAEA`, text `#333333`. Hover background `#F9F9FB` with border `#6D6D6D`.

### Chips & Badges
- **Status & Sector Badges**: Compact padding (`0.25rem 0.75rem`), radius `0.5rem`, font `label-sm`.
- **Warm Accent Variant**: Tinted background (`rgba(226, 117, 0, 0.1)`), label text `#E27500`.
- **Neutral Filter Chips**: Background `#FFFFFF`, 1px border `#EAEAEA`, text `#6D6D6D`. Active filter changes text to `#333333` and border to `#E27500`.

### Cards & Modular Blocks
- **Community Story Card**: White background, 1px `#EAEAEA` border, `1rem` corner radius. Features high-bleed photographic headers, bold Marathi/English dual headlines, and micro meta labels.
- **Impact Stat Block**: Background `#F9F9FB`, left-hand 4px vertical accent bar in `#E27500`, showcasing bold metric numbers (`headline-xl`) paired with charcoal labels.

### Input Fields & Controls
- **Text Inputs**: Height `3rem`, padding `0.75rem 1rem`, background `#FFFFFF`, border `1px solid #EAEAEA`, corner radius `0.5rem`. Focus transition produces border `#E27500` and a `0 0 0 3px rgba(226, 117, 0, 0.15)` focus ring.
- **Checkboxes & Radios**: Custom controls styled in `#333333` neutral unchecked, transitioning to solid `#E27500` fill with sharp white glyph indicators upon selection.

### Lists
- **Resource Directory Rows**: Divided by 1px `#EAEAEA` rules, alternating subtle hover tones (`#F9F9FB`), with trailing directional chevrons in `#6D6D6D`.