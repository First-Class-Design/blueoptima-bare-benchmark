/* =====================================================================
   THEME
   Light is the default for everyone. The toggle in the navigation
   switches to dark (and back), and the choice is remembered in this
   browser. Loaded in <head> so the saved theme applies before first paint.
   ===================================================================== */
(function () {
  "use strict";
  const KEY = "bare-theme";
  const root = document.documentElement;

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* storage blocked: stay on light */ }
  root.dataset.theme = saved === "dark" ? "dark" : "light";

  function syncToggles() {
    const dark = root.dataset.theme === "dark";
    document.querySelectorAll(".theme-toggle").forEach(b => {
      b.setAttribute("aria-pressed", String(dark));
      b.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  document.addEventListener("click", e => {
    if (!e.target.closest(".theme-toggle")) return;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, root.dataset.theme); } catch (err) { /* not remembered, still switches */ }
    syncToggles();
  });
  // The Webflow navbar only has the toggle in its desktop buttons, which are hidden on
  // small screens, so give the mobile menu its own copy.
  function addMobileToggle() {
    const toggle = document.querySelector(".theme-toggle");
    const holder = document.querySelector(".nav_mobile-buttons .button-holder");
    if (toggle && holder && !holder.querySelector(".theme-toggle")) holder.prepend(toggle.cloneNode(true));
  }

  document.addEventListener("DOMContentLoaded", () => { addMobileToggle(); syncToggles(); });
})();
