(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setHeaderOffset() {
    var ann = document.querySelector(".announcement-bar");
    var head = document.getElementById("site-header");
    var h = (ann ? ann.offsetHeight : 0) + (head ? head.offsetHeight : 0);
    doc.style.setProperty("--header-offset", h + "px");
  }

  function onScrollHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }

  /* Mobile nav */
  function initNav() {
    var openBtn = document.getElementById("nav-open");
    var closeBtn = document.getElementById("nav-close");
    var drawer = document.getElementById("mobile-nav");
    var backdrop = document.getElementById("nav-backdrop");
    if (!openBtn || !drawer) return;

    function openDrawer() {
      drawer.hidden = false;
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      closeBtn && closeBtn.focus();
    }

    function closeDrawer() {
      drawer.hidden = true;
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      openBtn.focus();
    }

    openBtn.addEventListener("click", openDrawer);
    closeBtn && closeBtn.addEventListener("click", closeDrawer);
    backdrop && backdrop.addEventListener("click", closeDrawer);
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });

    drawer.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        closeDrawer();
      });
    });
  }

  /* Fake search → scroll to shop */
  function initSearchFake() {
    var btn = document.getElementById("search-fake");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var el = document.getElementById("shop");
      if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* Hero intro */
  function initHero() {
    var prose = document.querySelector(".hero__prose");
    if (!prose) return;
    if (reduceMotion) {
      prose.classList.add("is-visible");
      return;
    }
    requestAnimationFrame(function () {
      prose.classList.add("is-visible");
    });
  }

  /* Scroll reveal */
  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (reduceMotion) {
      nodes.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /* Product carousel */
  function initCarousel() {
    var el = document.getElementById("product-scroll");
    var prev = document.getElementById("prod-prev");
    var next = document.getElementById("prod-next");
    var bar = document.getElementById("scroll-progress");
    if (!el || !prev || !next || !bar) return;

    function maxScroll() {
      return el.scrollWidth - el.clientWidth;
    }

    function update() {
      var max = maxScroll();
      var p = max <= 0 ? 1 : el.scrollLeft / max;
      bar.style.width = Math.max(0, Math.min(100, p * 100)) + "%";
      prev.disabled = el.scrollLeft <= 2;
      next.disabled = el.scrollLeft >= max - 2;
    }

    function step(dir) {
      var card = el.querySelector(".product-card");
      var delta = card ? card.offsetWidth + 24 : el.clientWidth * 0.74;
      el.scrollBy({ left: dir * delta, behavior: reduceMotion ? "auto" : "smooth" });
    }

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    prev.addEventListener("click", function () {
      step(-1);
    });
    next.addEventListener("click", function () {
      step(1);
    });
    update();
  }

  /* Before / after */
  function initBeforeAfter() {
    var root = document.getElementById("before-after");
    var handle = document.getElementById("ba-handle");
    if (!root || !handle) return;

    var dragging = false;

    function setPos(clientX) {
      var rect = root.getBoundingClientRect();
      var x = ((clientX - rect.left) / rect.width) * 100;
      x = Math.max(4, Math.min(96, x));
      root.style.setProperty("--pos", x + "%");
    }

    function onDown(e) {
      dragging = true;
      var x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setPos(x);
    }
    function onMove(e) {
      if (!dragging) return;
      var x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setPos(x);
    }
    function onUp() {
      dragging = false;
    }

    root.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    root.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    root.addEventListener("click", function (e) {
      if (e.target === handle || handle.contains(e.target)) return;
      setPos(e.clientX);
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function onResize() {
    setHeaderOffset();
  }

  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  setHeaderOffset();
  onScrollHeader();
  initNav();
  initSearchFake();
  initHero();
  initReveal();
  initCarousel();
  initBeforeAfter();
  initYear();
})();
