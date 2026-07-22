(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Page loader (yin-yang) ---------------- */
  var loader = document.getElementById("site-loader");
  if (loader) {
    var minDelay = reduceMotion ? 150 : 550;
    var hideLoader = function () {
      loader.classList.add("is-hidden");
      setTimeout(function () {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    };
    var start = Date.now();
    window.addEventListener("load", function () {
      var elapsed = Date.now() - start;
      var wait = Math.max(0, minDelay - elapsed);
      setTimeout(hideLoader, wait);
    });
    /* fallback in case load never fires cleanly */
    setTimeout(hideLoader, 3500);
  }

  /* ---------------- Typewriter (home page status line) ---------------- */
  var typeEl = document.getElementById("typeline-text");
  if (typeEl) {
    var phrases = [
      "triaging alerts...",
      "writing CTF writeups...",
      "learning DFIR...",
      "reading Windows event logs...",
      "leading NovaRun..."
    ];

    if (reduceMotion) {
      typeEl.textContent = phrases[0];
    } else {
      var pi = 0, ci = 0, deleting = false;

      function tick() {
        var current = phrases[pi];
        if (!deleting) {
          ci++;
          typeEl.textContent = current.slice(0, ci);
          if (ci === current.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
          }
          setTimeout(tick, 55);
        } else {
          ci--;
          typeEl.textContent = current.slice(0, ci);
          if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(tick, 300);
            return;
          }
          setTimeout(tick, 28);
        }
      }
      setTimeout(tick, 400);
    }
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealTargets = document.querySelectorAll(
    ".exhibit-card, .repo-row, .log-row, .pill-group, .exhibit-featured, .exhibit-pending, .block-head"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  }
})();
