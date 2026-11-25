# Portfolio

A single-page static site. No build step, no dependencies, no framework.
It is published with GitHub Pages at <https://yyongg.github.io/>.

## Files

```
Portfolio/
├── index.html              all the content: the project list and every details panel
├── assets/
│   ├── css/styles.css      all the styling; colours and fonts are at the top
│   ├── js/main.js          opens and closes the project details panel
│   └── img/
│       ├── favicon.svg
│       └── projects/       one folder per project (conway/, archerfish/, scanner/, …)
│                           with its photos, figures, clips, video posters and thumb
├── .nojekyll               tells GitHub Pages to serve files as-is. Don't delete.
├── DESIGN.md               layout, type, colour and the reasoning behind them
└── README.md
```

## Preview it locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly mostly works too,
but YouTube may refuse to play the demo videos on a page opened from a file.

## How the project panel works

Each project appears twice in `index.html`, tied together by one id:

1. A row in the list: `<a class="row" href="#monopoly">`
2. A details block further down: `<article class="detail" id="monopoly">`

Clicking the row opens the details block in a side panel. The address becomes
`…/#monopoly`, so you can send someone a link straight to one project.

## Add a project

1. Copy one `<li>…</li>` row in the Projects section. Change the `href`, title,
   description and the stack/date line.
2. Copy one `<article class="detail">` block. Give it the same id as the `href`
   (without the `#`), and set the `<h2>` id to `<id>-title`.
3. Keep the rows and the articles in the same order. The panel's Previous and Next
   links follow the order of the articles.
4. Put its images in a new folder, `assets/img/projects/<id>/`.

A thumbnail is optional. If the project has no image, leave the `<img>` out of the
row and it becomes a text-only row.

## Add an image

Use something from the project itself: a plot, a screenshot, a photo, a clip.
Save photos as JPEG and plots, CAD and screenshots as PNG.

- **Figure in a panel.** Put the file in the project's folder and copy an existing
  `<figure>` block. Set `width` and `height` to the file's real pixel size so the
  page does not jump while it loads. Add `class="fig-medium"`, `fig-narrow`,
  `fig-small` or `fig-portrait` to the `<figure>` if the image should not span the
  full width.
- **Two photos side by side.** Copy a `<figure class="fig-pair">` block (the
  archerfish panel has two). Pick photos of about the same shape, and write the
  caption so it still reads right when the photos stack on a phone.
- **Thumbnail for a row.** A 480 by 320 crop saved as `thumb.jpg` (or `.png`) in the
  project's folder.

## Add a YouTube video

Copy the `<a class="video-link" …>` figure from the Conway panel and change:

- `href` to the video's YouTube address, and `data-youtube` to its id (the part
  after `v=`).
- The poster: a frame from the video saved as `demo-poster.jpg` in the project's
  folder, with its real `width` and `height`. The player takes the same shape, so a
  vertical video needs a vertical poster (and `class="fig-portrait"`).
- The running time in the `duration` label.

The player only loads when someone presses play.

## Change the colours or fonts

They are the custom properties at the top of `assets/css/styles.css`. `DESIGN.md`
lists what each one is used for.

## Where the numbers come from

Every figure and number on the site comes from the matching repository (its
README, its notebook outputs, its write-up or its code), from the project's demo
video, or from photos of the build. Awards and placements come from the resume. If
you update a project, update its row and its panel too.
