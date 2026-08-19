/* ═══════════════════════════════════════════════════════════════════════
   PORTFOLIO — BEHAVIOUR
   Everything here is progressive enhancement: with JavaScript switched
   off the page still renders, reads and navigates correctly.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. Theme toggle ─────────────────────────────────────────────────
     Three states: no stored choice (follow the OS), "light", "dark".
     The stored choice is written to <html data-theme> so CSS can win
     over the prefers-color-scheme media query in both directions.      */

  var STORAGE_KEY = "portfolio-theme";
  var toggle = document.getElementById("themeToggle");

  function osPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var stored = root.getAttribute("data-theme");
    if (stored === "dark" || stored === "light") return stored;
    return osPrefersDark() ? "dark" : "light";
  }

  function syncToggleLabel() {
    if (!toggle) return;
    var isDark = currentTheme() === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode */ }
    syncToggleLabel();
  }

  // Restore a previous choice. (An inline script in <head> would avoid the
  // one-frame flash; kept here to leave index.html script-free.)
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
    else root.removeAttribute("data-theme");
  } catch (e) {
    root.removeAttribute("data-theme");
  }
  syncToggleLabel();

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ── 2. Mobile menu ─────────────────────────────────────────────── */

  var menuBtn = document.getElementById("menuToggle");
  var nav = document.getElementById("primaryNav");

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close after picking a destination, or on Escape.
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuBtn.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 820) closeMenu();
    });
  }

  /* ── 3. Header hairline once the page has scrolled ──────────────── */

  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── 4. Active section in the nav ───────────────────────────────── */

  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']")) : [];
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── 5. Reveal on scroll ────────────────────────────────────────── */

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // Small stagger so a row of cards arrives in sequence.
        entry.target.style.transitionDelay = Math.min(i * 60, 240) + "ms";
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ── 6. Copy-email button ───────────────────────────────────────── */

  var copyBtn = document.getElementById("copyEmail");
  var copyLabel = document.getElementById("copyLabel");

  if (copyBtn && copyLabel && navigator.clipboard) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(copyBtn.dataset.email).then(function () {
        var original = copyLabel.textContent;
        copyLabel.textContent = "Copied";
        copyBtn.setAttribute("aria-live", "polite");
        setTimeout(function () { copyLabel.textContent = original; }, 1800);
      }).catch(function () {
        copyLabel.textContent = "Press Ctrl+C";
      });
    });
  } else if (copyBtn) {
    copyBtn.hidden = true;   // no clipboard API — hide rather than dead-end
  }

  /* ── 7. Footer year ─────────────────────────────────────────────── */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
