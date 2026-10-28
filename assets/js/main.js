/* Portfolio behaviour: the project details panel and the footer year.

   Each project row links to "#<id>". With JavaScript, the matching
   <article class="detail"> opens in a side panel and the URL keeps the hash,
   so a project can be linked to directly and Back closes the panel.
   Without JavaScript the details are laid out at the bottom of the page and
   the same links jump to them.

   Demo videos hosted on YouTube start as a poster frame that links to the
   video. Selecting one swaps in the player, and leaving the project puts the
   poster back, which also stops playback. Nothing loads from YouTube until
   someone presses play. */

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var root = document.documentElement;
  var panel = document.getElementById("panel");
  if (!panel || !root.classList.contains("js")) return;

  var scroller = document.getElementById("panelScroll");
  var count = document.getElementById("panelCount");
  var prev = document.getElementById("panelPrev");
  var next = document.getElementById("panelNext");
  var closeButton = document.getElementById("panelClose");
  var details = Array.prototype.slice.call(panel.querySelectorAll(".detail"));
  var ids = details.map(function (d) { return d.id; });
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The project the URL points at, or null.
  function currentId() {
    var id = location.hash.slice(1);
    return ids.indexOf(id) === -1 ? null : id;
  }

  function titleOf(i) {
    return details[i].querySelector("h2").textContent;
  }

  function playVideo(link) {
    var poster = link.querySelector("img");
    var frame = document.createElement("iframe");
    frame.className = "video-frame";
    frame.src = "https://www.youtube-nocookie.com/embed/" + link.getAttribute("data-youtube") +
      "?autoplay=1&rel=0&playsinline=1";
    frame.title = "Video: " + link.closest(".detail").querySelector("h2").textContent;
    frame.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    frame.style.aspectRatio = poster.getAttribute("width") + " / " + poster.getAttribute("height");
    link.hidden = true;
    link.parentNode.insertBefore(frame, link);
    frame.focus({ preventScroll: true });
  }

  function stopVideos() {
    Array.prototype.forEach.call(panel.querySelectorAll("video"), function (v) { v.pause(); });
    Array.prototype.forEach.call(panel.querySelectorAll(".video-frame"), function (frame) {
      frame.nextElementSibling.hidden = false;
      frame.parentNode.removeChild(frame);
    });
  }

  function show(id) {
    var i = ids.indexOf(id);
    var before = (i + ids.length - 1) % ids.length;
    var after = (i + 1) % ids.length;

    stopVideos();
    details.forEach(function (d, j) { d.hidden = j !== i; });
    panel.setAttribute("aria-labelledby", id + "-title");
    count.textContent = "Project " + (i + 1) + " of " + ids.length;
    prev.href = "#" + ids[before];
    prev.querySelector("span").textContent = ": " + titleOf(before);
    next.href = "#" + ids[after];
    next.querySelector("span").textContent = ": " + titleOf(after);

    if (!panel.open) {
      panel.showModal();
      root.classList.add("panel-open");
    }
    scroller.scrollTop = 0;

    // A link inside the previous project (e.g. "infrared scanner") was just
    // hidden along with it. Move focus to the new title so it stays in the panel.
    var focused = document.activeElement;
    var from = focused && focused.closest ? focused.closest(".detail") : null;
    if (from && from.hidden) {
      var heading = details[i].querySelector("h2");
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }

    // The clips are short and silent, so they play like an animated figure.
    if (!reduceMotion) {
      Array.prototype.forEach.call(details[i].querySelectorAll("video"), function (v) {
        var started = v.play();
        if (started && started.catch) started.catch(function () {});
      });
    }
  }

  // Make the panel match the URL. Runs on load and on Back / Forward.
  function sync() {
    var id = currentId();
    if (id) show(id);
    else if (panel.open) panel.close();
  }

  // Any in-page link to a project opens the panel instead of jumping, and a
  // video poster plays in place. Modified clicks keep their usual behaviour.
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var video = e.target.closest("a[data-youtube]");
    if (video) {
      e.preventDefault();
      playVideo(video);
      return;
    }
    var link = e.target.closest("a[href^='#']");
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    if (ids.indexOf(id) === -1) return;

    e.preventDefault();
    // Moving between projects inside the panel replaces the entry, so one
    // press of Back always closes the panel.
    if (panel.open) history.replaceState(history.state, "", "#" + id);
    else history.pushState({ panel: true }, "", "#" + id);
    show(id);
  });

  closeButton.addEventListener("click", function () {
    panel.close();
  });

  // A click on the dimmed area outside the panel lands on the dialog itself.
  panel.addEventListener("click", function (e) {
    if (e.target === panel) panel.close();
  });

  // Fires for the Close button, the backdrop, Escape and Back alike.
  panel.addEventListener("close", function () {
    root.classList.remove("panel-open");
    stopVideos();
    if (!currentId()) return;   // closed by Back: the URL is already right
    if (history.state && history.state.panel) history.back();
    else history.replaceState(null, "", location.pathname + location.search);
  });

  window.addEventListener("popstate", sync);
  window.addEventListener("hashchange", sync);

  // On a direct link the panel opens with focus on Close, then the browser
  // scrolls to the "#<id>" target and moves focus to the page. Put it back.
  window.addEventListener("load", function () {
    if (panel.open && !panel.contains(document.activeElement)) closeButton.focus();
  });
  sync();
})();
