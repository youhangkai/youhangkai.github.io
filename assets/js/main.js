/* Hangkai You — site behavior: theme, filters, reveal, nav state */
(function () {
  "use strict";

  /* ---- theme toggle (initial theme already set inline in <head>) ---- */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      toggle.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  /* ---- sticky header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- publication filters ---- */
  var filterBar = document.querySelector(".filters");
  if (filterBar) {
    var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub"));
    var empty = document.querySelector(".empty-note");
    var buttons = Array.prototype.slice.call(filterBar.querySelectorAll(".filter"));

    // fill in counts
    buttons.forEach(function (btn) {
      var key = btn.getAttribute("data-filter");
      var n = key === "all" ? pubs.length : pubs.filter(function (p) { return p.getAttribute("data-type") === key; }).length;
      var span = btn.querySelector(".count");
      if (span) span.textContent = n;
    });

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var key = btn.getAttribute("data-filter");
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var shown = 0;
      pubs.forEach(function (p) {
        var match = key === "all" || p.getAttribute("data-type") === key;
        p.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "block";
    });
  }
})();
