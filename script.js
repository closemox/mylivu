/* ═══════════════════════════════════════════════════════
   Desktop: thumb-row click → swap first slide image
   ═══════════════════════════════════════════════════════ */
const desktopFirstSlideImg = document.querySelector('.hero-slide img');
const desktopThumbs = document.querySelectorAll('.thumb');

desktopThumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const img = thumb.querySelector('img');
    if (!img || !desktopFirstSlideImg) return;

    desktopThumbs.forEach((t) => t.classList.remove('selected'));
    thumb.classList.add('selected');

    desktopFirstSlideImg.style.opacity = '0';
    window.setTimeout(() => {
      desktopFirstSlideImg.src = img.src;
      desktopFirstSlideImg.style.opacity = '1';
    }, 140);
  });
});

if (desktopFirstSlideImg) {
  desktopFirstSlideImg.style.transition = 'opacity .18s ease';
}

/* ═══════════════════════════════════════════════════════
   Mobile: swipe via scroll-snap  ←→  thumbnail strip sync
   ═══════════════════════════════════════════════════════ */
const heroTrack = document.getElementById('heroTrack');
const mobileThumbStrip = document.getElementById('mobileThumbStrip');
const mThumbs = mobileThumbStrip
  ? Array.from(mobileThumbStrip.querySelectorAll('.mthumb'))
  : [];
const heroSlides = heroTrack
  ? Array.from(heroTrack.querySelectorAll('.hero-slide'))
  : [];

let currentIndex = 0;

function setActiveThumb(index) {
  if (index === currentIndex && mThumbs[index]?.classList.contains('active')) return;
  currentIndex = index;
  mThumbs.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  // scroll the strip so the active thumb is centred
  const active = mThumbs[index];
  if (active && mobileThumbStrip) {
    const stripRect = mobileThumbStrip.getBoundingClientRect();
    const thumbRect = active.getBoundingClientRect();
    const offset =
      thumbRect.left - stripRect.left - stripRect.width / 2 + thumbRect.width / 2;
    mobileThumbStrip.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

// Use IntersectionObserver to detect which slide is in view
if (heroTrack && heroSlides.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = heroSlides.indexOf(entry.target);
          if (idx !== -1) setActiveThumb(idx);
        }
      });
    },
    { root: heroTrack, threshold: 0.5 }
  );
  heroSlides.forEach((slide) => io.observe(slide));
}

// Thumbnail tap → scroll hero to that slide
mThumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    if (!heroTrack) return;
    const slide = heroSlides[i];
    if (slide) {
      heroTrack.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }
    setActiveThumb(i);
  });
});

/* ═══════════════════════════════════════════════════════
   Sticky CTA
   ═══════════════════════════════════════════════════════ */
const stickyCta = document.querySelector('.sticky-cta');
const mainAddButton = document.querySelector('.purchase .add');

if (stickyCta && mainAddButton) {
  const toggleStickyCta = () => {
    const rect = mainAddButton.getBoundingClientRect();
    stickyCta.classList.toggle('is-visible', rect.bottom < 0);
  };
  toggleStickyCta();
  window.addEventListener('scroll', toggleStickyCta, { passive: true });
  window.addEventListener('resize', toggleStickyCta);
}
