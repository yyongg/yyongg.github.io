# Design notes

How the site is put together and why, so it can be extended without drifting.
Everything described here is implemented in `index.html`, `assets/css/styles.css`
and `assets/js/main.js`.

**Goal:** a plain page that reads like a person wrote it. One column, one typeface,
one link colour. The projects carry the page, and every picture on it comes out of
the project it illustrates.

---

## 1. Page structure

```
YongKang Lu                                  Projects  Background  Contact
──────────────────────────────────────────────────────────────────────────
I'm an electrical and computer engineering student at Olin College…   ← lead
Two short paragraphs, then email / GitHub / LinkedIn

Projects
  Hardware and embedded
  ────────────────────────────────────────────────────────────
  Title                                            ┌─────────┐
  One or two sentences, with the result.           │ photo,  │
  Stack · date                                     │ figure  │
  ────────────────────────────────────────────────  └─────────┘
  Title                                            (no image if the
  …                                                 project has none)
  Machine learning and data
  Algorithms and signal processing

Background        Education / Experience / Awards on the left
  Skills          same two-column layout

Contact           one sentence
```

- The header is not sticky and holds the only `<h1>`.
- The intro's first sentence is set larger. It is a statement of fact, not a slogan.
- The intro and the project order present hardware and software as equal interests:
  hardware and embedded projects come first, machine learning second.
- Projects are rows in a list, grouped by area, strongest first within a group.
- Background and Skills are definition lists (`<dl>`), labels in grey.

## 2. Project details panel

Selecting a row opens that project in a panel that slides in from the right, over
the page. Nothing navigates away; the GitHub link is inside the panel.

- The panel is a native `<dialog>` opened with `showModal()`, which gives focus
  trapping, Escape to close and an inert page behind it for free.
- The URL gets the project's hash (`#monopoly`), so a project can be linked to
  directly, and the browser's Back button closes the panel.
- Close with the button, Escape, a click outside, or Back. Previous and Next step
  through the projects without stacking up history entries.
- Short silent clips play when their panel opens and pause when it closes. They do
  not autoplay if the visitor has asked for reduced motion.
- Demo videos on YouTube start as a poster frame with a "Play video" label and the
  running time. Selecting it swaps in the player from `youtube-nocookie.com`, in place.
  Moving to another project or closing the panel puts the poster back, which stops
  the video. Nothing is requested from YouTube until someone presses play, and
  without JavaScript the poster is a plain link to the video.
- Without JavaScript the same `<article>` blocks are laid out at the bottom of the
  page and the row links jump to them.

Each panel follows the same order: title, date and stack, links, a paragraph on
what it is, results, figures, how it works, and what did not work.

## 3. Visuals

**Every image, clip, table and code excerpt comes from the project itself:** its
repository, its demo video, or photos and CAD of the build. Nothing is drawn for
the site.

| Project | Source of the visuals |
|---------|-----------------------|
| RISC-V processor | Loop and poster from the repo's demo clip `demo_video.MOV` (four whole LED cycles, cropped square, re-encoded to MP4 without audio); the seven figures in the repo's `media/` folder; the thumbnail is a crop of `waveform_alu_store_load.png`; numbers from those figures, the project report, `cpu_tb.sv` and the code |
| Pong | Poster and thumbnail from the demo video (the same video is on YouTube); figures from the repo's `media/` folder, with `sim_frame.png` scaled up 2× with nearest-neighbour and `sim_gameplay.gif` re-encoded as a silent MP4 loop; FPGA resources and timing from the Vivado reports that `build.tcl` writes; test results from the simulation logs |
| Conway's Game of Life | Poster and thumbnail from the repo's demo clip `IMG_7503.MOV` (the same clip is on YouTube); `test_results.png`, the GTKWave trace |
| Archerfish | Build photos and CAD screenshots supplied by YongKang; poster from the YouTube demo |
| IR scanner | Build photo, CAD and schematic supplied by YongKang; `python/calibration_fit.png` |
| FPGA mini-projects | `demo_video.MOV` from Miniproject-1, re-encoded to MP4 without audio |
| Monopoly | `docs/assets/*.png` in the repo |
| Cart-pole | Poster and thumbnail from the YouTube project overview |
| Grid load, House prices, Spam | Plot outputs saved inside each repo's `computational_essay.ipynb` |
| FFT | `benchmark.png` and `a440_spectrum.png` in the DSA repo's FFT folder |

Each project has its own folder in `assets/img/projects/`. Photos are JPEG; plots,
CAD and screenshots are PNG. Row thumbnails (`thumb.jpg` or `thumb.png`) are
480 by 320 crops of the same material. A few supplied photos and CAD views are not
on the page yet (other angles of the same parts); they stay in their project's
folder.

A project with no visual gets no thumbnail and a text-only panel, usually with a
table or a short code excerpt copied from the source. That is deliberate: an empty
slot is better than an invented picture.

Figures in the panel link to the full-size file, because the dashboards are dense.
Two photos of similar shape can sit side by side (`fig-pair`); they stack on phones.
The GTKWave trace keeps its real size and scrolls sideways (`fig-scroll`), because
shrinking it makes the signal values unreadable.

## 4. Type

One family: **IBM Plex Sans** (400, 500, 600), with **IBM Plex Mono** for code
excerpts only. Both fall back to system fonts.

| Use | Size |
|-----|------|
| Body | 17px (16px on phones), line height 1.6 |
| Lead sentence | 26px |
| Name in header | 20px |
| Section heading | 22px |
| Project title | 18px |
| Panel title | 28px |
| Meta, captions, tables | 14 to 15px |

Text columns stop at about 40rem so lines stay readable.

## 5. Colour

Light only. The project figures are white-background charts, so a white page lets
them sit in the layout without frames or cards.

| Token | Hex | Use |
|-------|-----|-----|
| `--page` | `#ffffff` | background |
| `--ink` | `#15181c` | text |
| `--muted` | `#5d6670` | dates, captions, secondary text (5.8:1 on white) |
| `--rule` | `#e1e4e8` | hairlines, image borders |
| `--tint` | `#f5f7f9` | row hover, code blocks |
| `--link` | `#1b47c4` | links and project titles (7.9:1 on white) |

Blue appears only on things that can be clicked. If you change `--link`, keep at
least 4.5:1 contrast against white.

## 6. What was left out on purpose

No hero banner, badges, stat strip, icon set, tag chips, card shadows, gradients,
scroll animations or dark-mode toggle. The only motion is the panel sliding in, and
the only overlay is the play label on a video poster. Corners are 3 to 4px. Rules
are 1px.

## 7. Content rules

1. **Only claim what the repository shows.** Every number on the site traces to a
   README, a notebook output, a write-up or the code in the linked repo. Awards and
   placements come from YongKang's resume.
2. **Say what did not work.** The Monopoly and grid-load panels both end on
   limitations.
3. **Plain sentences.** What it is, what it does, what the result was.
4. **Mark unfinished work.** A project still being built says "in progress" in the
   list and in its panel.
5. **School dates.** Education shows the expected graduation year (2028) only, with
   no start year for college and no dates for high school.
