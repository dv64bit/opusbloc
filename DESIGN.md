---
name: Quiet Luxury — Editorial Monochrome
version: 1.0.0
description: >
  Gallery-grade monochrome design language distilled from two premium real-estate
  sites: Sobha Privy Collection (Dubai residences) and 360 Lexington Avenue (Manhattan
  offices). Full-bleed photography supplies all colour; the UI is ink, white, and
  hairlines. Light uppercase serif display type, a tightly tracked grotesk for
  information, slow cinematic easing.

colors:
  # ── Core (brand has NO chromatic accent — photography is the colour) ──
  primary: "#1A1919" # Ink. Primary CTA fill, headings, body text on light
  on-primary: "#FFFFFF"
  primary-hover: "#717170" # Stone. Primary button hover/active fill (source: --t-button-primary-hover-background)
  primary-disabled: "#71717066" # Stone @ 40%
  ink-deep: "#111213" # Dark-section surface, giant numerals, nav on light
  canvas: "#FFFFFF" # Default page surface
  paper: "#F5F5F5" # Alternate light band / image placeholder
  umber: "#2E2520" # Warm near-black. Optional dark band behind warm interiors
  on-dark: "#FFFFFF"

  # ── Text tiers (light surfaces) ──
  text: "{colors.primary}"
  text-muted: "#1A1919A6" # Ink @ 65% → 5.4:1 on white (AA). Captions, meta, body-sm
  text-faint: "#1A191980" # Ink @ 50% → 3.4:1. SOURCE value; ≥24px text or ornamental numerals ONLY
  text-ordinal: "#1A19194D" # Ink @ 30%. List counters "1." "2." (decorative)

  # ── Text tiers (dark surfaces) ──
  on-dark-muted: "#FFFFFF99" # White @ 60% → 7.2:1 on ink-deep (AA). Secondary copy on dark
  on-dark-faint: "#FFFFFF66" # White @ 40% → 3.8:1. SOURCE value; inactive nav / ≥24px only

  # ── Lines (always alpha of ink or white, never a solid grey) ──
  line: "#1A191933" # Ink @ 20%. Input underlines, select borders, dividers
  line-subtle: "#1A19191A" # Ink @ 10%. Tag outlines, table rules, image inset keyline
  line-on-dark: "#FFFFFF29" # White @ 16%. Dividers and glass fill on dark/photo

  # ── Overlays ──
  glass: "#FFFFFF29" # White @ 16% + backdrop-blur 12px. Nav/pills over photography
  scrim: "#11121366" # Ink-deep @ 40%. Photo darkening under white type
  scrim-soft: "#1112130A" # Ink-deep @ 4%. Hover wash on light cards

  # ── Feedback (used sparingly, forms only) ──
  error: "#930000" # Oxblood, 9.4:1 on white

  # ── Brand (Opus Bloc brass, sampled from the logo). Rare + purposeful ──
  brand: "#B3924F" # Marks, lines, text on dark (6.4:1 on ink-deep). 2.9:1 on white: never small text on light
  brand-strong: "#7D6A3C" # Brass text on light surfaces (5.3:1 on white, AA)
  focus-ring: "{colors.primary}"

typography:
  # Families (licensed originals → free substitutes; use first available)
  #   display: "TT Ramillas" 300 → "Cormorant Garamond" 300 / "Cormorant" 300
  #   sans:    "TT Commons Pro" 500/600 or "Instrument Sans" 400/500 (free, Google Fonts)
  #   script:  "Altesse Std 64pt" (Adobe Fonts) → "Pinyon Script" 400
  # Sizes are the 1440px desktop values. See Layout → fluid scaling for other widths.
  display-hero:
    fontFamily: "TT Ramillas, Cormorant Garamond, Times New Roman, serif"
    fontSize: 114px # 48 mobile · 90 tablet · 114 @1440 · 160 @1920 · 180 @2400
    fontWeight: 300
    lineHeight: 0.965
    letterSpacing: 0.02em
    textTransform: uppercase
  display-1:
    fontFamily: "TT Ramillas, Cormorant Garamond, Times New Roman, serif"
    fontSize: 80px # 36 · 60 · 80 · 110 · 128
    fontWeight: 300
    lineHeight: 1.0625
    letterSpacing: 0.02em
    textTransform: uppercase
  display-2:
    fontFamily: "TT Ramillas, Cormorant Garamond, Times New Roman, serif"
    fontSize: 50px # 28 · 40 · 50 · 70 · 80
    fontWeight: 300
    lineHeight: 1.0
    letterSpacing: 0.02em
    textTransform: uppercase
  display-3:
    fontFamily: "TT Ramillas, Cormorant Garamond, Times New Roman, serif"
    fontSize: 28px # 22 · 22 · 28 · 36 · 42
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0.02em
    textTransform: uppercase
  script-accent:
    fontFamily: "Altesse Std 64pt, Pinyon Script, cursive"
    fontSize: 100px # 60 · 80 · 100 · 140 · 160
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
  numeral-giant:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 370px # viewport-driven: clamp(160px, 26vw, 460px)
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.03em
  title-xl:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 74px # 40 mobile · 56 tablet · 74 desktop (110 for a single page H1)
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.03em
  title-lg:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 48px # 32 · 40 · 48
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.03em
  title-md:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 40px # 28 · 32 · 40
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.03em
  title-sm:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.03em
  lead:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.02em
  body:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 16px # 13–14px below 980px
    fontWeight: 500 # 400 if using Instrument Sans at ≤16px on dark
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-long:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.333
    letterSpacing: 0
  body-sm:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: -0.03em
  label:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 13px # 11px below 1440px
    fontWeight: 600
    lineHeight: 1.385
    letterSpacing: 0.08em
    textTransform: uppercase
  caption:
    fontFamily: "Instrument Sans, TT Commons Pro, Helvetica Neue, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: -0.03em

spacing:
  # 4px base; section rhythm jumps in large, deliberate steps (20 → 40 → 80 → 160).
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 20px # mobile page gutter, default flex gap
  "6": 24px
  "8": 40px # desktop page gutter, card text inset (mobile)
  "10": 60px # overlay text inset on full-bleed cards
  "12": 80px # section padding-block (default)
  "16": 120px # large section padding / overlay inset (desktop)
  "20": 160px # hero breathing room
  "24": 240px # between "chapters" of a long scroll
  gutter-mobile: "{spacing.5}"
  gutter-desktop: "{spacing.8}"
  section-y: "{spacing.12}"

rounded:
  none: 0px # DEFAULT. Images, cards, sections, inputs, tabs
  xs: 2px # tooltips, tiny chips
  sm: 5px # media controls
  md: 8px # glass panels / floating menus
  pill: 9999px # ALL buttons (source: radius = height / 2)
  circle: 50% # icon buttons, map pins, cursor follower

borders:
  hairline: "1px solid {colors.line}"
  hairline-subtle: "1px solid {colors.line-subtle}"
  hairline-dark: "1px solid {colors.line-on-dark}"
  image-keyline: "inset 0 0 0 1px {colors.line-subtle}"

elevation:
  flat: none # default for everything
  glass: "backdrop-filter: blur(12px); background: {colors.glass}"
  glass-strong: "backdrop-filter: blur(16px); background: {colors.glass}"
  glass-button: "0 2px 4px 0 rgba(0,0,0,0.10), 0 1px 0 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.15)"
  focus: "0 0 0 2px {colors.focus-ring}"

motion:
  ease-luxe: "cubic-bezier(0.7, 0, 0.3, 1)" # symmetric in-out. UI states, fades, menu
  ease-glide: "cubic-bezier(0.29, 0.52, 0.5, 1)" # long soft landing. Image reveals, parallax, scale
  ease-spring: "spring(bounce: 0, duration: 1s)" # Framer-style; bounce ≤ 0.2 max
  duration-instant: 200ms
  duration-ui: 400ms # colour / border / underline changes
  duration-fade: 1000ms # opacity reveals
  duration-reveal: 1400ms # transform, clip-path, filter on imagery & type
  duration-scene: 1600ms # section-to-section scene transitions
  duration-hero: 2400ms # first-load hero only
  stagger-line: 40ms # per line of display text (+1000ms base)
  stagger-char: 20ms # per character of hero text (+1400ms base)

breakpoints:
  sm: 568px
  md: 810px
  lg: 1024px
  xl: 1440px # design reference width
  2xl: 1920px
  3xl: 2400px
---

## Overview

**Quiet luxury, told like an architecture monograph.** The interface steps back so photography of space, light, and material can do the selling. Colour is almost absent: one brass brand accent, used sparingly, and everything else chromatic comes from the images: travertine, walnut, brushed brass, Gulf blue, Manhattan limestone. The UI is ink (#1A1919), white, and translucent hairlines.

This language comes from two references and keeps what they share:

- **Sobha Privy Collection** gives it emotion: very large light (300) serif display set in uppercase with +0.02em tracking, a calligraphic script word used as a "signature" accent, slow 1.4s reveals on a long ease-out curve, and line-by-line staggered type.
- **360 Lexington** gives it precision: a neo-grotesk at −0.03em tracking and 100% line-height, giant numerals sized from the viewport, frosted-glass navigation (blur 12px, white 16%) laid over full-bleed photos, bracketed indices like `[1]` and `01`, and dark ink sections.

Together they read as **airy, slow, confident, and rare.** Density is low. A screen usually holds one idea: one headline, one image, one short paragraph, one quiet action. The luxury comes from restraint and scale contrast (a 114px headline above 13px tracked labels), not from ornament, gradients, or gold.

What it optimises for: emotional first impression, unhurried scrolling, and the sense that nothing on the page is accidental.

## Colors

The palette is monochrome on purpose, with one exception: Opus Bloc brass. Brass marks **brand, progress and value**, nothing else. Any other accent hue would compete with the photography and cheapen it.

**Brass allow-list (keep it this short):** logo (the middle diamond and "BLOC"); onboarding progress fill; the active bottom-nav indicator; money and return figures (portfolio gain, projected yield and return); the verified-state icon; and the hero numeral on a property. Use `brand` on dark surfaces and for lines and marks, and `brand-strong` for brass text on light. Never use brass for buttons, body text, backgrounds or borders of content cards.

| Token                   | Value              | Role and rule                                                                                                             |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `primary` (Ink)         | #1A1919            | Body text, headings, primary button fill, focus ring. A warm off-black, never pure #000.                                  |
| `primary-hover` (Stone) | #717170            | The **only** hover colour for filled buttons. 4.9:1 with white.                                                           |
| `ink-deep`              | #111213            | Dark bands, footer, giant numerals, nav text on light pages. Slightly cooler than Ink. Use it for surfaces, Ink for text. |
| `canvas`                | #FFFFFF            | Default page surface. Pages are mostly white.                                                                             |
| `paper`                 | #F5F5F5            | Alternate band, image placeholders while images load. Never use it for cards on white.                                    |
| `umber`                 | #2E2520            | Optional warm dark band beside wood or brass interiors. At most one per page.                                             |
| `text-muted`            | Ink @ 65%          | Secondary copy and captions on light surfaces (AA-safe).                                                                  |
| `text-faint`            | Ink @ 50%          | Source value. Only for text ≥24px, or decorative numerals and ordinals.                                                   |
| `on-dark-muted`         | White @ 60%        | Secondary copy on dark or photo backgrounds (AA-safe).                                                                    |
| `on-dark-faint`         | White @ 40%        | Source value. Inactive nav items and large type only.                                                                     |
| `line` / `line-subtle`  | Ink @ 20% / 10%    | Every divider, input underline, and tag outline. Lines are alpha, never a solid grey.                                     |
| `glass`                 | White @ 16% + blur | Nav bars and pills that float over photography.                                                                           |
| `scrim`                 | #111213 @ 40%      | Darkens photos under white type. Use a bottom gradient, never a flat box.                                                 |
| `scrim-soft`            | #111213 @ 4%       | Hover wash on light list rows and cards. The only hover "background" allowed.                                             |
| `text-ordinal`          | Ink @ 30%          | Decorative list counters ("1.", "2.") in long-form text.                                                                  |
| `error`                 | #930000            | Form validation only. Oxblood, not red.                                                                                   |
| `brand` (Brass)         | #B3924F            | Opus Bloc brass. Logo, progress fill, active tab, money figures and numerals on dark. Lines and marks on light.           |
| `brand-strong`          | #7D6A3C            | Brass text on light surfaces (projected returns). 5.3:1 on white.                                                         |

**Hierarchy comes from opacity, not hue.** Make a second tier of text by lowering the alpha of Ink or White (100 → 65 → 50 → 30), never by adding a grey hex. This keeps text tinted correctly on any background, photos included.

**Theme inversion.** Dark sections swap Ink and White. Keep the same alpha ladder (White 100 / 60 / 40 / 16). Dark bands use `ink-deep`, never `#000`. Pure black is reserved for video letterboxing.

## Typography

There are three voices, each with one job. Don't swap them.

1. **Display serif (`display-*`)**: TT Ramillas Light; free substitute Cormorant Garamond 300. Always **UPPERCASE, weight 300, +0.02em, line-height about 1.0**. Use it for emotional statements and section titles. Break lines by meaning: one to three words per line, set with explicit `<br>`s, e.g. "SOME CREATIONS / MERIT A PLACE".
2. **Grotesk (`title-*`, `body*`, `label`, `caption`)**: Instrument Sans (free) or TT Commons Pro. Large sizes are **sentence case, weight 400, −0.03em, line-height 1.0**, for information headlines such as "Prime Midtown Location", numbers, and stats. Small sizes carry all UI and body copy.
3. **Script accent (`script-accent`)**: Altesse; free substitute Pinyon Script. **One word or short phrase per page, at most.** Put it beneath or overlapping a serif headline, like a signature, e.g. the word "Sublime" closing a sentence. Never use it for UI.

| Style                           | Desktop @1440                       | Mobile            | Use                                                      |
| ------------------------------- | ----------------------------------- | ----------------- | -------------------------------------------------------- |
| `display-hero`                  | 114 / 0.965                         | 48                | Hero statement only. One per page.                       |
| `display-1`                     | 80 / 1.06                           | 36                | Chapter openers                                          |
| `display-2`                     | 50 / 1.0                            | 28                | Section titles                                           |
| `display-3`                     | 28 / 1.25                           | 22                | Card and tenet titles ("EXPANSIVE / SPACES")             |
| `script-accent`                 | 100 / 1.0                           | 60                | Signature word                                           |
| `numeral-giant`                 | clamp(160px, 26vw, 460px)           | n/a               | Address numbers, years, a big stat. Bleeds off the edge. |
| `title-xl` / `lg` / `md` / `sm` | 74 / 48 / 40 / 24                   | 40 / 32 / 28 / 24 | Information headlines                                    |
| `lead`                          | 18 / 1.4                            | 16                | Intro paragraph under a headline                         |
| `body`                          | 16 / 1.25                           | 13–14             | Default copy, max 44ch                                   |
| `body-long`                     | 15 / 1.33                           | 14                | Multi-paragraph text, max 60ch                           |
| `label`                         | 13 / 1.385, UPPERCASE, +0.08em, 600 | 11                | Eyebrows, buttons, tabs, form labels, nav                |
| `caption`                       | 12 / 1.16                           | 12                | Footnotes, ©, credits, index numbers                     |

**Rules**

- Tracking is opposite by voice: the serif and labels tracked **positive** (+0.02em / +0.08em), the grotesk tracked **negative** (−0.03em). Never put negative tracking on uppercase.
- The jump between display and body sizes is deliberately extreme, roughly 7×. Don't fill it with medium sizes. Skipping levels is part of the look.
- Display line-height sits near 1.0. Body line-height never goes above 1.4. Nothing is loosely leaded.
- Paragraph copy is short, 2–4 lines, and sits in a narrow column (`max-width: 44ch`) offset from the headline, never centred under it.
- Use `font-display: swap`. Trim the leading optically: the source uses cap-height offsets (`--fos`/`--foe`), and `text-box: trim-both cap alphabetic` is the modern equivalent.

### Fluid scaling

The source scales every px value between viewport widths. Reproduce it with clamp, using 1440px as the anchor:
`font-size: clamp(<mobile>, <desktop / 14.4>vw, <3xl value>)`, e.g. display-hero `clamp(48px, 7.9vw, 180px)`. Spacing tokens ≥40px scale the same way: `calc(var(--space) * clamp(0.5, 100vw / 1440px, 1.33))`.

## Layout

- **Base unit 4px.** Section rhythm moves in big jumps: 20 → 40 → 80 → 160 → 240px. Breathing room is the main material. If a section looks finished, add 40px more.
- **Gutters:** 20px on mobile, 40px from `md` up. No max-width container for imagery. **Photos go full-bleed** (100vw, often 100svh). Text columns float inside the bleed, offset to a grid line.
- **Grid:** 12 columns, 20px gap. Text blocks take 4–5 columns, placed **asymmetrically**: a headline from column 1, its paragraph from column 7 or 8. Symmetric centring is reserved for hero statements and the closing CTA.
- **Section padding:** `80px` top and bottom by default, `120–160px` around hero and chapter breaks.
- **Overlay type on cards:** inset 60px (desktop) or 40px (mobile) from the card edge. Title top-left, supporting text bottom-left.
- **Sticky storytelling:** long sections pin (`position: sticky`) while images or text swap inside them. A slim progress indicator ("1 — 4", or a 1px line filling) sits at the edge.
- **Indices everywhere:** list items, tenets, and locations carry a quiet index, `01` `02` or `[1] [2]` or `1 — 4`, in `caption` or `label` style at `text-faint`.
- **Breakpoints:** 568 / 810 / 1024 / 1440 (reference) / 1920 / 2400. Design big screens on purpose: type keeps growing up to 2400px instead of capping at 1280.

## Elevation & Depth

**Flat. Depth comes from photography, scale, and translucency, never from drop shadows.**

- Cards, sections, and images have **no shadow**. Separate layers with a 1px alpha hairline (`line`, `line-subtle`), or let a full-bleed image change the ground.
- **Glass** is the only floating layer. Use it for the nav bar, menu pills, and filter chips over photos: `backdrop-filter: blur(12px)` (16px for larger panels) on `glass` (white 16%) with white text. Give a glass button the source's triple whisper-shadow `glass-button` (2px soft drop, 1px dark line, 1px white inner keyline). Nothing heavier.
- **Scrims** sit between photo and type: a bottom-up linear gradient from `scrim` (ink-deep @ 40%) to transparent. Never put text in a solid box.
- Images may carry `image-keyline` (inset 1px ink @ 10%) so white interiors don't dissolve into a white page.
- Layering is z-index plus motion: parallax (`ease-glide`, 1.4s) creates depth, not shadow.

## Shapes

- **Square by default.** Images, cards, sections, inputs, tabs, and dividers all have **0 radius**. Architecture photography wants hard edges.
- **Buttons are always pills** (`rounded.pill`, radius = height / 2). This is the one soft shape, so the hand-held element contrasts with the architectural frame.
- **Circles** (50%) for icon buttons, close (×), carousel arrows, map pins, play buttons, and an optional cursor follower.
- **8px** only on floating glass panels such as menus and popovers. Never on content cards.
- Borders are **1px, always alpha** (20% default, 10% subtle, 16% white on dark). Never 2px, except the focus ring.
- Ornament is limited to thin rules and the em-dash range "1 — 4". No icons as decoration, no badges, no gradients on shapes.

## Components

**Button: primary.** Pill, `primary` fill, `on-primary` text in `label` style (13px, 600, UPPERCASE, +0.08em). Height 44px (source visual is 30px; keep a 44px hit area), padding-inline 20–24px, optional 10px icon gap. Hover: fill → `primary-hover` (Stone) over 400ms `ease-luxe`. Disabled: `primary-disabled` (Stone @ 40%). One per view.

**Button: outline.** Pill, transparent, 1px `primary` border, Ink label. On dark: white border at 100%. Variants:

- _tag_: border `line-subtle`, for filters and categories.
- _plus_: border Ink @ 20% → 50% on hover, with a "+" icon, for "open the map" or "expand".

**Button: glass.** Pill on `glass` + blur 12px + `glass-button` shadow, white label. Use it only over imagery.

**Link.** No padding. 1px underline as `border-bottom` at Ink @ 15%, going to 100% on hover over 400ms. Heading links ("Explore Offices →") use `title-sm` plus a small arrow that shifts 4px on hover.

**Tabs.** `label` style, 1px bottom border transparent → Ink when active, padding-bottom equal to the section spacing. No pill background.

**Navigation.** Transparent over the hero, white text. Wordmark on the left, 2–3 `label` links plus an outline pill CTA ("Contact") on the right, and a "Menu" text toggle (not a hamburger icon) on mobile. When it becomes sticky, switch to glass. The full-screen menu is an `ink-deep` overlay with large `title-xl` links indexed `[1]…[4]` and the © line at the bottom.

**Hero.** 100svh full-bleed image or muted looping video, with a bottom `scrim`. The `display-hero` statement breaks over 2–4 lines and reveals line by line (stagger 40ms, 1000ms base, `ease-glide`, translateY 100% → 0 inside an overflow-hidden mask). A secondary circular "open" action and a small `label` cue ("SCROLL") sit near the bottom.

**Feature / tenet card.** Full-bleed or tall image (aspect 4:5 or 3:4), radius 0. Index `01` in `caption` at top-left. `display-3` title split over two lines ("EXPANSIVE / SPACES"). `body-long` paragraph at most 4 lines, bottom-left, inset 60px. On hover, the image scales 1.0 → 1.04 over 1.4s `ease-glide`. The text doesn't move.

**Stat / address block.** A `numeral-giant` in `ink-deep` (or White on dark) cropped by the viewport edge, with a `label` above and a single `body` line below ("2-minute walk to Grand Central").

**Location list.** Rows separated by `line-subtle` hairlines, `[n]` index in `caption` at `text-faint`, name in `title-sm`, distance right-aligned in `caption`. On hover, the row shifts 8px right and its hairline goes to 100%.

**Image slider.** Hard-edged slides, a counter "2 — 4" in `label`, and circular outline arrow buttons. The transition is a clip-path wipe (`inset(0 100% 0 0)` → `inset(0)`) over 1.4s `ease-glide`, never a fade-slide carousel.

**Form.** `label` above each field. Inputs have **no box**: a 1px `line` bottom border only, radius 0, body text, and transparent background. Focus: border → Ink, plus `elevation.focus` for keyboard users. Error: `error` text 12px below the field, with the border turning `error`. Submit is a primary pill button.

**Footer.** `ink-deep` band, wordmark, `[1]…` indexed links in `title-sm`, `caption` © line at `on-dark-faint`. It's generous, at least 160px tall before the legal line.

**Loader / intro (optional).** On first load, a short wordmark or numeral sequence (≤2.4s), then the hero reveals. Show it once per session. Skip it entirely under `prefers-reduced-motion`.

### Motion contract

- Two curves only. **`ease-luxe` (0.7, 0, 0.3, 1)** for UI state changes (colour, border, menu open) at 400ms, and for opacity fades at 1000ms. **`ease-glide` (0.29, 0.52, 0.5, 1)** for anything spatial: transform, clip-path, filter, parallax, at 1400ms.
- Reveals trigger once, when an element enters the viewport at about 15%. They don't reverse on scroll-up.
- Things that animate: opacity, transform, clip-path, image scale, underline width. Things that never animate: layout (width/height/top), colour on body text, and anything bouncy (spring bounce ≤ 0.2).
- Nothing is faster than 200ms. Luxury is unhurried.
- `@media (prefers-reduced-motion: reduce)`: drop transforms and staggers, keep 200ms opacity fades.

## Do's and Don'ts

**Do**

- Let one full-bleed photograph own each section. Pick warm, naturally lit, architectural images with plenty of negative space, and use them at 100vw.
- Set emotional headlines in uppercase light serif, broken by hand into short lines of 1–3 words.
- Pair a huge headline with a tiny tracked uppercase label. Scale contrast is the luxury signal.
- Build every secondary colour from an alpha of Ink or White.
- Index things: `01`, `[1]`, `1 — 4`. It reads as curated and catalogued.
- Write few words. Every paragraph should be 2–4 lines, in a column no wider than 44–60ch.
- Use 1.4s `ease-glide` for imagery and 400ms `ease-luxe` for UI.
- Keep buttons pill-shaped and everything else square.
- Use the AA-safe muted tokens (`text-muted`, `on-dark-muted`) for any text under 24px.

**Don't**

- Don't add accent colours beyond brand brass, and don't widen the brass allow-list. No brand blue, no gradient CTA, no brass buttons. If something needs emphasis, make it bigger or isolate it with whitespace.
- Don't use drop shadows on cards, rounded image corners, or "card grids with padding and a border". Images are hard-edged and full-bleed, or they don't appear.
- Don't use pure #000 for text or surfaces. Ink is #1A1919, dark bands are #111213.
- Don't use bold display weights. Display is 300 (serif) or 400 (grotesk), never 600+.
- Don't use the script face more than once per page, or for anything clickable.
- Don't use emojis, decorative icon sets, stock badges ("★ Premium"), or busy hover effects. Icons are limited to arrow, plus, close, play, and pin, drawn at a 1px stroke.
- Don't centre-stack everything. Offset text to grid columns. Centring is reserved for the hero and the closing CTA.
- Don't use snappy 150ms ease-out or springy bounces, and don't animate on scroll-up.
- Don't fill the space between display and body with "medium" headings. Skip levels.
- Don't use dense layouts. Never show more than three cards in a row on desktop, and prefer one or two.

---

## Appendix: drop-in tokens

### CSS custom properties

```css
:root {
  --ink: #1a1919;
  --ink-rgb: 26 25 25;
  --ink-deep: #111213;
  --stone: #717170;
  --umber: #2e2520;
  --canvas: #fff;
  --paper: #f5f5f5;
  --error: #930000;
  --text: var(--ink);
  --text-muted: rgb(var(--ink-rgb) / 0.65);
  --text-faint: rgb(var(--ink-rgb) / 0.5);
  --line: rgb(var(--ink-rgb) / 0.2);
  --line-subtle: rgb(var(--ink-rgb) / 0.1);
  --on-dark-muted: rgb(255 255 255 / 0.6);
  --on-dark-faint: rgb(255 255 255 / 0.4);
  --glass: rgb(255 255 255 / 0.16);
  --scrim: rgb(17 18 19 / 0.4);

  --font-display: "TT Ramillas", "Cormorant Garamond", "Times New Roman", serif;
  --font-sans: "Instrument Sans", "TT Commons Pro", "Helvetica Neue", Arial, sans-serif;
  --font-script: "Altesse Std 64pt", "Pinyon Script", cursive;

  --fs-hero: clamp(48px, 7.9vw, 180px);
  --fs-d1: clamp(36px, 5.55vw, 128px);
  --fs-d2: clamp(28px, 3.47vw, 80px);
  --fs-d3: clamp(22px, 1.95vw, 42px);
  --fs-script: clamp(60px, 6.94vw, 160px);
  --fs-numeral: clamp(160px, 26vw, 460px);
  --fs-title-xl: clamp(40px, 5.14vw, 110px);
  --fs-title-lg: clamp(32px, 3.33vw, 48px);
  --fs-body: clamp(14px, 1.11vw, 16px);
  --fs-label: clamp(11px, 0.9vw, 13px);

  --gutter: 20px;
  --section-y: 80px;
  --radius-pill: 9999px;

  --ease-luxe: cubic-bezier(0.7, 0, 0.3, 1);
  --ease-glide: cubic-bezier(0.29, 0.52, 0.5, 1);
  --dur-ui: 400ms;
  --dur-fade: 1000ms;
  --dur-reveal: 1400ms;
}
@media (min-width: 810px) {
  :root {
    --gutter: 40px;
  }
}

.display {
  font-family: var(--font-display);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1;
}
.title {
  font-family: var(--font-sans);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
}
.label {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: var(--fs-label);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.385;
}
```

### Tailwind v4

```css
@theme {
  --color-ink: #1a1919;
  --color-ink-deep: #111213;
  --color-stone: #717170;
  --color-umber: #2e2520;
  --color-paper: #f5f5f5;
  --color-error: #930000;
  --font-display: "TT Ramillas", "Cormorant Garamond", serif;
  --font-sans: "Instrument Sans", "TT Commons Pro", "Helvetica Neue", Arial, sans-serif;
  --font-script: "Altesse Std 64pt", "Pinyon Script", cursive;
  --ease-luxe: cubic-bezier(0.7, 0, 0.3, 1);
  --ease-glide: cubic-bezier(0.29, 0.52, 0.5, 1);
  --breakpoint-sm: 568px;
  --breakpoint-md: 810px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
  --breakpoint-2xl: 1920px;
  --breakpoint-3xl: 2400px;
}
/* muted text: text-ink/65 · lines: border-ink/20 · glass: bg-white/16 backdrop-blur-md */
```

### Free font loading

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Instrument+Sans:wght@400;500;600&family=Pinyon+Script&display=swap"
  rel="stylesheet"
/>
```
