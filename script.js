// ===== Certificate lightbox =====
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalClose = document.getElementById('certModalClose');
const certModalBackdrop = document.getElementById('certModalBackdrop');

function openCertModal(imgSrc, title) {
  if (!certModal) return;
  certModalImg.src = imgSrc;
  certModalImg.alt = title;
  certModalTitle.textContent = title;
  certModal.classList.add('open');
  document.body.classList.add('cert-modal-active');
}
function closeCertModal() {
  if (!certModal) return;
  certModal.classList.remove('open');
  document.body.classList.remove('cert-modal-active');
}

document.querySelectorAll('.cred-card').forEach(card => {
  card.addEventListener('click', () => {
    openCertModal(card.dataset.certImg, card.dataset.certTitle);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCertModal(card.dataset.certImg, card.dataset.certTitle);
    }
  });
});
certModalClose?.addEventListener('click', closeCertModal);
certModalBackdrop?.addEventListener('click', closeCertModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});
// Cegah klik-kanan (save image) & drag khusus di area sertifikat
certModal?.addEventListener('contextmenu', (e) => e.preventDefault());
certModalImg?.addEventListener('dragstart', (e) => e.preventDefault());

// ===== Project detail gallery =====
const galleryEl = document.querySelector('.gallery');

if (galleryEl) {
  const slides = Array.from(
    galleryEl.querySelectorAll('.gallery-slide')
  );

  const dotsContainer = galleryEl.querySelector('.gallery-dots');
  const caption = galleryEl.querySelector('.gallery-caption');

  let current = 0;

  // Buat dot otomatis sesuai jumlah slide
  if (dotsContainer) {
    dotsContainer.innerHTML = '';

    slides.forEach((slide, i) => {
      const dot = document.createElement('button');

      dot.className = 'gallery-dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);

      dot.addEventListener('click', () => {
        goTo(i);
      });

      dotsContainer.appendChild(dot);
    });
  }

  // Ambil dot setelah dibuat
  const dots = Array.from(
    galleryEl.querySelectorAll('.gallery-dot')
  );

  function goTo(index) {
    current = (index + slides.length) % slides.length;

    // Ganti gambar
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });

    // Ganti dot aktif
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    // Ganti caption
    if (caption) {
      caption.textContent =
        slides[current].dataset.caption || '';
    }
  }

  // Tombol kiri
  galleryEl
    .querySelector('.gallery-zone-prev')
    ?.addEventListener('click', () => {
      goTo(current - 1);
    });

  // Tombol kanan
  galleryEl
    .querySelector('.gallery-zone-next')
    ?.addEventListener('click', () => {
      goTo(current + 1);
    });

  // Keyboard kiri / kanan
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goTo(current - 1);
    }

    if (e.key === 'ArrowRight') {
      goTo(current + 1);
    }
  });

  // Mulai dari slide pertama
  goTo(0);
}

// ===== Welcome intro overlay =====
const introEl = document.getElementById('intro');
if (introEl) {
  setTimeout(() => {
    document.body.classList.remove('intro-active');
  }, 3300);
  introEl.addEventListener('click', () => {
    document.body.classList.remove('intro-active');
    introEl.classList.add('no-anim');
  });
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Tech stack horizontal scroll buttons =====
const techScroll = document.getElementById('techScroll');
const techPrev = document.getElementById('techPrev');
const techNext = document.getElementById('techNext');

function techScrollBy(dir) {
  if (!techScroll) return;
  const amount = techScroll.clientWidth * 0.6;
  techScroll.scrollBy({ left: dir * amount, behavior: 'smooth' });
}
techPrev?.addEventListener('click', () => techScrollBy(-1));
techNext?.addEventListener('click', () => techScrollBy(1));

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  '.about-card, .tech-item, .offer-card, .project-card, .contact-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .6s cubic-bezier(.22,.61,.36,1) ${(i % 4) * 0.06}s, transform .6s cubic-bezier(.22,.61,.36,1) ${(i % 4) * 0.06}s`;
  revealObserver.observe(el);
});