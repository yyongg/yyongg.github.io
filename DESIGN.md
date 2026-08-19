# Design spec

The moodboard behind the build: wireframe, type, colour, spacing, components.
Everything here is already implemented in `assets/css/styles.css` — this document
explains *why*, so you can extend it without breaking the system.

**Design goal:** a recruiter lands, and inside 30 seconds knows *what you do*,
*how good you are at it*, and *how to reach you*. Every decision below serves that.

---

## 1. Wireframe, section by section

Mobile is the source of truth; desktop is the same order in wider columns.

### Header — sticky, 68px

```
┌──────────────────────────────────────────────────────────────┐
│ [YK] Yong Kang        Projects Case study About Skills … ☾ ☰ │
└──────────────────────────────────────────────────────────────┘
```
Transparent until you scroll, then a 1px hairline appears. Nav collapses to a
drawer below 820px. Current section is underlined in accent as you scroll.

### 1. Hero — the 5-second read

```
  ● Open to ML / data science roles · available now      ← status pill

  I build machine learning systems that
  SURVIVE CONTACT WITH REAL DATA.                        ← h1, 18ch max, accent
                                                            highlight on 2nd half
  Machine Learning Engineer / Boston, MA / ET (UTC−5)    ← role + location + tz

  Forecasting pipelines, RL agents and geospatial data
  products — built end to end, measured against honest
  baselines…                                             ← 2-line value prop

  [ View projects → ]  [ Contact me ]   ⌗ GitHub         ← primary / secondary / quiet

  ───────────────────────────────────────────────────
  Top 500          68.4%          3.03M × 93        8   ← proof before the fold
  of 950,000+…     error cut…     row pipeline…     …
```

Four numbers sit above the fold on purpose. They are the whole pitch: someone who
reads nothing else has still seen a Kaggle rank and an error reduction.
2-up on mobile, 4-up from 760px.

### 2. Featured projects — the scan layer

```
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  cover  16:9  │  │               │  │               │
├───────────────┤  │               │  │               │
│ CATEGORY      │  │               │  │               │
│ Project name  │  │               │  │               │
│ Problem: …    │  │      ×6       │  │               │
│ ┏━━━━━━━━━━━┓ │  │               │  │               │
│ ┃ THE METRIC┃ │  │               │  │               │  ← accent-tinted box:
│ ┃ what it is┃ │  │               │  │               │    the only thing that
│ ┗━━━━━━━━━━━┛ │  │               │  │               │    must survive skimming
│ context line  │  │               │  │               │
│ [chip][chip]  │  │               │  │               │
│ Code →        │  │               │  │               │
└───────────────┘  └───────────────┘  └───────────────┘

ALSO ON GITHUB
┌──────────────────────────┐ ┌──────────────────────────┐
│ SMS Spam Classifier      │ │ Deep-Q Cart-Pole         │  ← 2 minor projects,
│ one line · 97.01%        │ │ one line · live physics  │    one line each
└──────────────────────────┘ └──────────────────────────┘
```

1 column → 2 at 700px → 3 at 1040px. Every card carries the same five slots in the
same order, so the eye can compare cards vertically without re-reading labels.
The whole card is clickable (stretched link off the title).

### 3. Case study — the depth layer

```
CASE STUDY
Teaching an agent Monopoly — and learning to measure it
lede…

┌── 01 Problem ──┐ ┌── 02 Approach ─┐ ┌── 03 Results ──┐
│ why it is hard │ │ ▪ decision     │ │ before → after │
│ what the goal  │ │ ▪ decision     │ │ ┌────────────┐ │
│ was            │ │ ▪ decision     │ │ │ table      │ │
│                │ │ ▪ decision     │ │ └────────────┘ │
│                │ │                │ │ outcome + the  │
│                │ │                │ │ honest caveat  │
└────────────────┘ └────────────────┘ └────────────────┘

┃ Pull-quote: the two bugs worth the whole project
```

Three literal columns for problem → approach → results, so the shape of the
narrative is visible before a word is read. Stacks vertically below 900px.

### 4. About

```
┌────────────────────────────┐  ┌──────────────────┐
│ ABOUT                      │  │ QUICK FACTS      │
│ Hi, I'm Yong Kang.         │  │ Focus       …    │
│ lede (larger, display font)│  │ Core stack  …    │
│ 2 short paragraphs         │  │ Based in    …    │
│ ┌ What I'm looking for ──┐ │  │ Open to     …    │
│ └────────────────────────┘ │  │ Reply time  …    │
└────────────────────────────┘  └──────────────────┘
```

Prose on the left for humans, a scannable `<dl>` on the right for people in a
hurry. Body text is capped at 64ch — past that, reading speed drops.

### 5. Skills — 6 groups, 2×3 / 3×2

Grouped by *use*, not alphabetically: Machine learning · Data & pipelines ·
Evaluation & rigour · Domains · Engineering · Interfaces & visualisation.
"Evaluation & rigour" is a deliberate group — it's the differentiator most
portfolios don't claim.

### 6. Proof — "what I'm known for"

Three cards: icon, claim, the evidence with a number, and the project it came from.
Habits, not adjectives. A commented-out testimonial block sits below, ready for a
real quote.

### 7. Contact — narrow, centred, terminal

```
CONTACT
Let's talk about your data problem.
lede…
[ ✉ you@email.com ]  [ ⧉ Copy email ]
in LinkedIn    ⌗ GitHub
```

Two ways to take the email (click through, or copy) because recruiters do both.

---

## 2. Typography

| Role | Family | Weights | Why |
|------|--------|---------|-----|
| Display — headings, metrics, brand | **Space Grotesk** | 500 / 600 / 700 | Geometric with quirks in the `g` and `k`. Reads modern-technical without going sci-fi. |
| Body — everything you read | **Inter** | 400 / 500 / 600 | Designed for screens; large x-height stays legible at 14px. |
| Mono — chips, eyebrows, stats, labels | **JetBrains Mono** | 500 | Signals "engineer" and gives micro-labels a distinct texture at small sizes. |

Each has a full system fallback stack, so a blocked font request degrades quietly.

### Scale — fluid via `clamp()`, ~1.25 ratio

| Token | Mobile → Desktop | Used for |
|-------|------------------|----------|
| `--fs-micro` | 12px | eyebrows, chips, stat captions |
| `--fs-sm` | 14px | card body, table cells, buttons |
| `--fs-base` | 16 → 17px | body copy |
| `--fs-md` | 17 → 19px | ledes, section intros |
| `--fs-lg` | 18.4 → 22px | h3, about lede |
| `--fs-xl` | 23 → 32px | metric numbers, stat strip |
| `--fs-2xl` | 28 → 40px | h2 |
| `--fs-3xl` | 36 → 62px | h1 |

Nothing below 12px, ever. Body never below 16px on mobile — smaller triggers
iOS zoom-on-focus and fails readability guidance.

### Rules of thumb

- **Line height:** 1.08 display / 1.28 headings / 1.65 body. Big type needs less.
- **Tracking:** negative on display (−0.032em at h1), `+0.14em` on uppercase micro
  labels — uppercase without extra tracking is genuinely harder to read.
- **Measure:** 64ch body, 56ch ledes, 18ch for the h1 so it breaks into a block.
- `text-wrap: balance` on headings, `pretty` on paragraphs — kills orphans for free.

---

## 3. Colour

One accent, used sparingly. A warm burnt orange against warm neutrals: "modern
tech" without the blue every other developer portfolio uses, and warm enough to
read as human.

### Light (default)

| Token | Hex | Contrast | Use |
|-------|-----|----------|-----|
| `--bg` | `#faf9f7` | — | page. Warm off-white, not `#fff` — less glare |
| `--bg-alt` | `#f2f0ec` | — | alternating section bands |
| `--surface` | `#ffffff` | — | cards |
| `--border` | `#e5e1d9` | — | hairlines |
| `--text` | `#16181d` | **15.5:1** | body |
| `--text-muted` | `#55595f` | **6.7:1** | secondary copy |
| `--accent` | `#b3541e` | **5.0:1** on white | links, metrics, primary button |
| `--accent-soft` | `#fbeee2` | — | metric-box fill, highlight |
| `--teal` | `#1f6f63` | — | availability dot only |

### Dark

| Token | Hex | Contrast |
|-------|-----|----------|
| `--bg` | `#0e1013` | — |
| `--surface` | `#16191e` | — |
| `--text` | `#eceef1` | 16.6:1 |
| `--text-muted` | `#a0a6ae` | **7.8:1** |
| `--accent` | `#f0913f` | **8.0:1** |

**If you change the accent, keep ≥4.5:1 against `--surface` in light and against
`--bg` in dark.** Check at <https://webaim.org/resources/contrastchecker/>.
The dark accent is deliberately lighter than the light one — the same hex cannot
pass on both grounds.

### Discipline

- Accent appears on: links, metric numbers, primary button, eyebrows, active nav
  underline, the h1 highlight. Nothing else.
- Colour never carries meaning alone. The green/yellow/red map cover has a labelled
  legend; the results table pairs colour with the words "before" and "after".
- Theming: light tokens on bare `:root`; dark redefined twice — once under
  `prefers-color-scheme` guarded by `:not([data-theme="light"])`, once under
  `[data-theme="dark"]` — so the toggle wins in **both** directions.

---

## 4. Spacing & shape

A 4px base. Only these steps exist:

```
--sp-1  4px   --sp-2  8px   --sp-3 12px   --sp-4 16px   --sp-5 24px
--sp-6 32px   --sp-7 48px   --sp-8 64px   --sp-9 96px   --sp-10 128px
```

| Token | Value | Use |
|-------|-------|-----|
| `--section-y` | `clamp(3.5rem, 8vw, 7rem)` | vertical section rhythm |
| `--gutter` | `clamp(1.25rem, 5vw, 2.5rem)` | page side padding |
| `--wrap-max` | `1180px` | content column |

**Radii:** 6px chips · 10px small panels · 16px cards · pill buttons.
**Shadows:** two only. `--shadow-1` at rest, `--shadow-2` on hover — no third tier.

**Breakpoints:** 640 · 700 · 760 · 820 (nav) · 860 · 900 · 1040px. Each exists
because a specific layout broke there, not on a device-name grid.

---

## 5. Component list

| Component | Class | Notes |
|-----------|-------|-------|
| Skip link | `.skip-link` | Hidden until focused. First tab stop. |
| Sticky header | `.site-header` | Blurred scrim; `.is-stuck` adds the hairline. |
| Brand mark | `.brand-mark` | Initials in an accent tile. |
| Nav + drawer | `.nav`, `.nav.is-open` | `.is-active` tracks scroll position. |
| Theme toggle | `#themeToggle` | 3 states: OS / forced light / forced dark. `aria-pressed`. |
| Menu button | `#menuToggle` | `aria-expanded`, closes on Escape and on resize. |
| Status pill | `.status` | Availability + pulse dot. |
| Buttons | `.btn-primary` `.btn-ghost` `.btn-quiet` | 48px min height. |
| Icon button | `.icon-btn` | 44×44. |
| Arrow link | `.link-arrow` | Arrow slides 3px on hover. |
| Stat strip | `.stat-strip` | 2-up → 4-up at 760px. |
| Project card | `.card` | Media / kicker / title / problem / metric / note / chips / links. |
| Metric box | `.metric` | Tinted panel. **One per card, never two.** |
| Tech chip | `.chips li` | Mono, nowrap. |
| Mini project row | `.mini-list` | Name + line + metric, one row. |
| Case step | `.case-step` | Numbered `01`/`02`/`03`. |
| Tick list | `.tick-list` | Square accent markers. |
| Results table | `.results-table` | Wrapped in `.table-scroll` — scrolls itself, page never does. |
| Pull-quote | `.pullquote` | Accent left rule. |
| Facts list | `.facts` | `<dl>` — real semantics, not a fake table. |
| Skill group | `.skill-group` | Heading + chip cloud. |
| Proof card | `.proof-card` | Icon, claim, evidence, source. |
| Testimonial | `.testimonial` | Commented out until a real quote exists. |
| Contact block | `.contact-inner` | Mailto + copy button + socials. |
| Reveal | `.reveal` | Fade-up on scroll. Disabled under reduced-motion; `.no-js` fallback keeps content visible. |

---

## 6. Content rules

These matter more than the CSS:

1. **One number per card.** Two numbers is zero numbers.
2. **Problem first, tools last.** Recruiters filter on the problem; engineers verify with the tools.
3. **Only claim what a link can prove.** Every metric here traces to a repo README.
4. **State a limitation somewhere.** The case study says the agent isn't beating its
   benchmark yet. That reads as seniority — it is the most credible sentence on the page.
5. **Cut any paragraph over four lines.** If it needs more, it needs a write-up of its own.
