// public/assets/js/features/onboarding.js
import { $ } from "../ui.js";

export function initOnboarding({
  splashId = "splash",
  slidesId = "slides",
  nextBtnId = "nextBtn",
  prevBtnId = "prevBtn",
  dotsId = "dots",
  startBtnId = "startBtn",
} = {}) {
  const splash = $(splashId);
  const slides = $(slidesId);
  const nextBtn = $(nextBtnId);
  const prevBtn = $(prevBtnId);
  const dots = $(dotsId);
  const startBtn = $(startBtnId);

  const items = [...slides.querySelectorAll("[data-slide]")];
  let i = 0;

  function renderDots() {
    if (!dots) return;
    dots.innerHTML = items.map((_, idx) =>
      `<span class="inline-block h-2 w-2 rounded-full ${idx===i ? "bg-emerald-400" : "bg-white/20"}"></span>`
    ).join("");
  }

  function show(idx) {
    i = Math.max(0, Math.min(items.length - 1, idx));
    items.forEach((el, k) => el.classList.toggle("hidden", k !== i));
    prevBtn?.classList.toggle("opacity-40", i === 0);
    prevBtn?.toggleAttribute("disabled", i === 0);
    const last = i === items.length - 1;
    nextBtn?.classList.toggle("hidden", last);
    startBtn?.classList.toggle("hidden", !last);
    renderDots();
  }

  // splash: tampil 1.2s lalu masuk slides
  if (splash && slides) {
    setTimeout(() => {
      splash.classList.add("hidden");
      slides.classList.remove("hidden");
      show(0);
    }, 1200);
  } else {
    show(0);
  }

  nextBtn?.addEventListener("click", () => show(i + 1));
  prevBtn?.addEventListener("click", () => show(i - 1));

  // swipe mobile
  let startX = 0;
  slides?.addEventListener("touchstart", (e) => startX = e.touches[0].clientX, { passive: true });
  slides?.addEventListener("touchend", (e) => {
    const dx = (e.changedTouches[0].clientX - startX);
    if (Math.abs(dx) < 50) return;
    if (dx < 0) show(i + 1); else show(i - 1);
  }, { passive: true });

  renderDots();
}
