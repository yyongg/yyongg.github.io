# Portfolio — static site

A single-page, project-first portfolio. **No build step, no dependencies, no framework.**
Three files do the work: `index.html` (content), `assets/css/styles.css` (looks),
`assets/js/main.js` (theme toggle, mobile menu, small niceties).

Deploys to GitHub Pages by pushing. That's it.

---

## 1. Look at it right now

**The quickest way:** open `index.html` by double-clicking it. Everything works
except a few browser features that dislike `file://` URLs (the copy-email button,
mainly).

**The proper way** — serve it over a real local address. Pick whichever you have:

```bash
# Python (already on most machines)
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>. Press `Ctrl+C` in the terminal to stop.

> If you use VS Code, the **Live Server** extension does the same thing with a
> "Go Live" button in the status bar, and reloads when you save.

---

## 2. Files

```
Portfolio/
├── index.html              ← all the words. This is the file you edit most.
├── assets/
│   ├── css/styles.css      ← all the styling. Colours & type live at the top.
│   ├── js/main.js          ← theme toggle, mobile menu, scroll reveal
│   └── img/
│       ├── favicon.svg     ← the little browser-tab icon
│       ├── cover-robots.svg
│       ├── cover-monopoly.svg
│       ├── cover-sales.svg
│       ├── cover-energy.svg
│       ├── cover-clickbait.svg
│       └── cover-housing.svg
├── .nojekyll               ← tells GitHub Pages to serve files as-is. Don't delete.
├── DESIGN.md               ← wireframe, palette, type scale, component list
└── README.md               ← you are here
```

---

## 3. ⚠️ Before you publish — fill in the 8 placeholders

Open `index.html` and search for **`EDIT ME`**. There are eight marked spots.
Three of them contain guesses I made from your GitHub account — **check them.**

| # | Where | What to change | Currently |
|---|-------|----------------|-----------|
| 1 | `<head>` | Page title, description, author | "Yong Kang" — **verify your name spelling** |
| 2 | Hero | Availability line | "Open to ML / data science roles · available now" |
| 3 | Hero | Job title, city, timezone | **"Boston, MA / ET (UTC−5)" is a guess** |
| 4 | Hero | Email in the "Contact me" button | `yongg2719@gmail.com` |
| 5 | About | The four About sentences — rewrite in your voice | placeholder prose |
| 6 | About | Quick-facts box (location, availability) | **also a guess** |
| 7 | Contact | Email button + Copy-email button | `yongg2719@gmail.com` |
| 8 | Contact | **LinkedIn URL** | `YOUR-LINKEDIN-HANDLE` — **this link is broken until you fix it** |

Also update these three, which are not marked but are yours:

- The `YK` initials in the header logo (`class="brand-mark"`) and in `assets/img/favicon.svg`.
- The name in the footer.
- `<meta property="og:url">` — set it to your final site URL.

### Optional extras

- **Social preview image.** Make a 1200×630 PNG, save it as `assets/img/og.png`,
  then uncomment the two `og:image` lines in `<head>`. This is what LinkedIn and
  Slack show when someone pastes your link.
- **Résumé.** Drop `resume.pdf` into `assets/`, then uncomment the résumé line in
  the Contact section.
- **Testimonial.** In the Proof section there's a commented-out `<figure class="testimonial">`.
  Delete the `<!--` and `-->` around it and fill in a real quote when you have one.

---

## 4. Editing content

### Change a project card

Each card is one `<li class="card">` block in the Featured Projects section,
labelled `CARD 1` … `CARD 6`. Copy one, change these five things:

```html
<p class="card-kicker">Category · Category</p>          <!-- small grey label -->
<h3 class="card-title"><a href="LINK">Project name</a></h3>
<p class="card-problem"><b>Problem:</b> one sentence.</p>
<span class="metric-num">THE NUMBER</span>              <!-- the big orange bit -->
<span class="metric-label">what the number means</span>
```

**Rule of thumb:** the `metric-num` should be the single thing a recruiter
remembers. A percentage, a rank, a score, a scale. Never a sentence.

### Reorder projects

Cut and paste whole `<li class="card">` blocks. Put your strongest work first —
most people never scroll past the first row.

### Add a cover image

Replace `assets/img/cover-*.svg` with a screenshot (16:9, ideally 1280×720 PNG or
JPG) and update the `src` in the card. Keep `alt=""` — the covers are decorative
because the title next to them already says what the project is.

### Change the colours

Everything is at the top of `styles.css` under **1. DESIGN TOKENS**. Change
`--accent` in *both* the `:root` block (light) and the two dark blocks. See
`DESIGN.md` for the palette and the contrast ratios you need to keep.

---

## 5. Publish on GitHub Pages

You have two choices. **Option A gives you the shorter, better URL.**

### Option A — `yyongg.github.io` (recommended)

Your site lands at **`https://yyongg.github.io`**.

1. On GitHub, click **New repository**.
2. Name it exactly **`yyongg.github.io`** — the name must match your username.
3. Set it **Public**. Do not tick "Add a README" (you already have one).
4. Click **Create repository**.
5. In this folder, run:

```bash
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/yyongg/yyongg.github.io.git
git push -u origin main
```

6. In the repo, go to **Settings → Pages**. Under *Build and deployment*, set
   **Source: Deploy from a branch**, **Branch: `main`**, **Folder: `/ (root)`**, and **Save**.
7. Wait 1–2 minutes, then open **https://yyongg.github.io**.

### Option B — a project repo, e.g. `portfolio`

Same steps, but name the repo whatever you like. Your URL becomes
`https://yyongg.github.io/portfolio/`.

**One extra step for Option B:** the site lives in a subfolder, so update the
absolute URL in `<head>`:

```html
<meta property="og:url" content="https://yyongg.github.io/portfolio/">
```

All the other paths in the site are relative, so they work either way.

### Updating the live site later

```bash
git add .
git commit -m "Update project metrics"
git push
```

GitHub rebuilds in about a minute. If you don't see the change, hard-refresh
(`Ctrl+Shift+R`) — the browser caches aggressively.

### Custom domain (optional)

Buy a domain, then in **Settings → Pages → Custom domain** enter it and save.
GitHub creates a `CNAME` file in your repo. At your registrar, add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `yyongg.github.io` |

Then tick **Enforce HTTPS**. DNS can take a few hours to propagate.

---

## 6. What's already handled

**Accessibility**

- Skip-to-content link, semantic landmarks, one `<h1>` and a clean heading order.
- Every colour pair meets WCAG AA — body text is 6.7:1 (light) and 7.8:1 (dark).
- Fully keyboard operable; a visible focus ring on everything focusable.
- Touch targets are at least 44×44px.
- `prefers-reduced-motion` turns off every animation.
- The theme toggle and menu button announce their state via `aria-pressed` / `aria-expanded`.

**Performance**

- No framework, no bundler. Three text files plus seven SVGs.
- Covers are SVG (a few KB each) and lazy-loaded below the fold.
- Google Fonts is the only external request, with `preconnect` and `display=swap`.

**Robustness**

- With JavaScript disabled the page still renders and navigates fully.
- Dark mode follows the OS by default; the toggle overrides and remembers.

---

## 7. Troubleshooting

**The page is unstyled / no colours.**
`styles.css` isn't loading. Check that the folder is `assets/css/` exactly —
lowercase, and check the file didn't get saved as `styles.css.txt`.

**Cards or sections are invisible.**
The scroll-reveal animation needs `main.js`. Confirm `assets/js/main.js` exists.
Open the browser console (`F12`) and look for a red 404.

**Fonts look wrong / generic.**
You're offline, or Google Fonts is blocked. The site falls back to system fonts
by design — it still looks fine, just less distinctive.

**GitHub Pages shows a 404 or my README instead of the site.**
The file must be named `index.html` (lowercase) in the repo root, and Settings →
Pages must point at `main` / `/ (root)`. Give it two minutes after saving.

**My changes aren't showing up live.**
Confirm the push landed (`git log origin/main -1`), then hard-refresh with `Ctrl+Shift+R`.

---

## 8. Fact-check note

Every metric on this site was taken from the README of the matching repository —
the Kaggle rank, `0.402` RMSLE, `68.4%`, `31.5%`, `97.01%`, `3.03M × 93`, `94 tests`.
If you update a project, update the card too. **A number a recruiter can't verify
is worse than no number.**

The clickbait card deliberately shows dataset size rather than an accuracy figure,
because that repo doesn't publish one. If you run `clickbait-evaluate`, put the
real test F1 in that card — it will be the stronger claim.
