const heroImage = document.querySelector(".hero-image img");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const img = thumb.querySelector("img");
    if (!img || !heroImage) return;

    thumbs.forEach((item) => item.classList.remove("selected"));
    thumb.classList.add("selected");
    heroImage.style.opacity = "0";

    window.setTimeout(() => {
      heroImage.src = img.src;
      heroImage.style.opacity = "1";
    }, 130);
  });
});

if (heroImage) {
  heroImage.style.transition = "opacity .18s ease";
}

const stickyCta = document.querySelector(".sticky-cta");
const mainAddButton = document.querySelector(".purchase .add");

if (stickyCta && mainAddButton) {
  const toggleStickyCta = () => {
    const rect = mainAddButton.getBoundingClientRect();
    stickyCta.classList.toggle("is-visible", rect.bottom < 0);
  };

  toggleStickyCta();
  window.addEventListener("scroll", toggleStickyCta, { passive: true });
  window.addEventListener("resize", toggleStickyCta);
}
