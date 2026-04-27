/* =============================================
   NEXUS — Premium Phone Store
   Main JavaScript
   ─────────────────────────────────────────────
   Etkileşimler:
   1.  Özel İmleç (Custom Cursor)
   2.  Navbar Scroll Efekti
   3.  Mobil Menü (Açılır/Kapanır) ★
   4.  Scroll Reveal Animasyonu
   5.  Sayaç / İstatistik Animasyonu ★
   6.  Newsletter Formu
   7.  Ürün Filtresi (Products Sayfası)
   8.  Sepete Ekle (Toast Bildirimi)
   9.  Çok Adımlı İletişim Formu
   10. Parallax Hero Orb'ları
   11. Kart Hover Tilt Efekti
   12. Dark Mode Toggle ★
   13. Slider (Müşteri Yorumları) ★
   14. Sekmeli İçerik (Tabs) ★
   15. Modal Pencere ★
   16. Yukarı Çık Butonu ★
   17. Rapor Formu
   ============================================= */

'use strict';

/* ─────────────────────────────────────────────
   1. ÖZEL İMLEÇ
───────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
})();

/* ─────────────────────────────────────────────
   2. NAVBAR SCROLL
───────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ─────────────────────────────────────────────
   3. MOBİL MENÜ (Açılır/Kapanır) ★
───────────────────────────────────────────── */
(function initMobileMenu() {
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!burger || !mobileMenu) return;

  let open = false;

  function setMenu(state) {
    open = state;
    mobileMenu.classList.toggle('open', open);
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    }
  }

  burger.addEventListener('click', () => setMenu(!open));

  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => setMenu(false))
  );

  // ESC ile kapat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setMenu(false);
  });
})();

/* ─────────────────────────────────────────────
   4. SCROLL REVEAL
───────────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
          );
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   5. SAYAÇ / İSTATİSTİK ANİMASYONU ★
───────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function update(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
})();

/* ─────────────────────────────────────────────
   6. NEWSLETTER FORMU
───────────────────────────────────────────── */
(function initNewsletter() {
  const form    = document.getElementById('nl-form');
  const success = document.getElementById('nl-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 1000);
  });
})();

/* ─────────────────────────────────────────────
   7. ÜRÜN FİLTRESİ (Products Sayfası)
───────────────────────────────────────────── */
(function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.product-card[data-brand]');
  const sortSelect = document.getElementById('sort-select');
  const grid       = document.getElementById('shop-grid');
  if (!filterBtns.length) return;

  let currentFilter = 'all';

  function applyFilters() {
    cards.forEach(card => {
      const brand   = card.dataset.brand;
      const visible = currentFilter === 'all' || brand === currentFilter;
      if (visible) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const value      = sortSelect.value;
      const cardsArray = Array.from(cards);
      cardsArray.sort((a, b) => {
        if (value === 'price-asc')  return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        if (value === 'price-desc') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
        if (value === 'name')       return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return 0;
      });
      if (grid) cardsArray.forEach(card => grid.appendChild(card));
    });
  }
})();

/* ─────────────────────────────────────────────
   8. SEPETE EKLE (Toast Bildirimi)
───────────────────────────────────────────── */
(function initCart() {
  const btns  = document.querySelectorAll('.card-btn');
  const toast = document.getElementById('cart-toast');
  if (!btns.length || !toast) return;

  let toastTimeout;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent      = '✓ Eklendi';
      btn.style.background = 'rgba(0,212,255,0.2)';
      btn.style.color      = 'var(--accent)';
      setTimeout(() => {
        btn.textContent      = orig;
        btn.style.background = '';
        btn.style.color      = '';
      }, 1500);

      clearTimeout(toastTimeout);
      toast.classList.add('show');
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
    });
  });
})();

/* ─────────────────────────────────────────────
   9. ÇOK ADIMLI İLETİŞİM FORMU
───────────────────────────────────────────── */
let currentStep = 1;
const TOTAL_STEPS = 3;

function updateStepUI(step) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const current = document.getElementById('step-' + step);
  if (current) current.classList.add('active');

  document.querySelectorAll('.step-dot').forEach((dot, idx) => {
    dot.classList.remove('active', 'completed');
    if (idx + 1 === step) dot.classList.add('active');
    if (idx + 1 < step)  dot.classList.add('completed');
  });

  document.querySelectorAll('.step-line').forEach((line, idx) => {
    line.classList.toggle('active', idx + 1 < step);
  });
}

function validateStep(step) {
  let valid = true;

  function check(id, errId) {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    if (!input) return;
    const empty        = !input.value.trim();
    const emailInvalid = input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    const invalid      = empty || emailInvalid;
    input.classList.toggle('error', invalid);
    if (err) err.classList.toggle('show', invalid);
    if (invalid) valid = false;
  }

  if (step === 1) {
    check('fname', 'fname-err');
    check('lname', 'lname-err');
    check('email', 'email-err');
  }

  if (step === 2) {
    ['subject', 'message'].forEach(id => check(id, id + '-err'));
    const consent    = document.getElementById('consent');
    const consentErr = document.getElementById('consent-err');
    if (consent && !consent.checked) {
      if (consentErr) consentErr.classList.add('show');
      valid = false;
    } else if (consentErr) consentErr.classList.remove('show');
  }

  return valid;
}

function buildPreview() {
  const grid = document.getElementById('preview-grid');
  if (!grid) return;
  const fields = [
    { label: 'Ad',      id: 'fname'   },
    { label: 'Soyad',   id: 'lname'   },
    { label: 'E-posta', id: 'email'   },
    { label: 'Telefon', id: 'phone'   },
    { label: 'Konu',    id: 'subject' },
  ];
  grid.innerHTML = '';
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (el && el.value) {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = `<label>${f.label}</label><span>${el.value}</span>`;
      grid.appendChild(div);
    }
  });
  const msg = document.getElementById('message');
  if (msg && msg.value) {
    const div = document.createElement('div');
    div.className = 'preview-item';
    div.style.gridColumn = '1 / -1';
    div.innerHTML = `<label>Mesaj</label><span>${msg.value.length > 100 ? msg.value.slice(0, 100) + '…' : msg.value}</span>`;
    grid.appendChild(div);
  }
}

window.nextStep = function(from) {
  if (!validateStep(from)) return;
  currentStep = from + 1;
  if (currentStep === TOTAL_STEPS) buildPreview();
  updateStepUI(currentStep);
};

window.prevStep = function(from) {
  currentStep = from - 1;
  updateStepUI(currentStep);
};

window.resetForm = function() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.reset();
    form.style.display = '';
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
    currentStep = 1;
    updateStepUI(1);
  }
  if (success) success.classList.remove('show');
};

(function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;

  const msgArea   = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      charCount.textContent = Math.min(msgArea.value.length, 500);
      if (msgArea.value.length > 500) msgArea.value = msgArea.value.slice(0, 500);
    });
  }

  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = document.getElementById(input.id + '-err');
      if (err) err.classList.remove('show');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    const btn = document.getElementById('submit-btn');
    if (btn) btn.classList.add('loading');
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.classList.add('show');
    }, 1500);
  });
})();

/* ─────────────────────────────────────────────
   10. PARALLAX HERO ORB'LARI
───────────────────────────────────────────── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
    const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    orbs.forEach((orb, i) => {
      const s = (i + 1) * 12;
      orb.style.transform = `translate(${dx * s}px, ${dy * s}px)`;
    });
  });
})();

/* ─────────────────────────────────────────────
   11. KART HOVER TİLT EFEKTİ
───────────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x  = e.clientX - left;
      const y  = e.clientY - top;
      const rx = (y - height / 2) / (height / 2) * -5;
      const ry = (x - width  / 2) / (width  / 2) *  5;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();

/* ─────────────────────────────────────────────
   12. DARK MODE TOGGLE ★
───────────────────────────────────────────── */
(function initDarkMode() {
  // Kaydedilmiş tema veya sistem tercihi
  const savedTheme  = localStorage.getItem('nexus-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = savedTheme || (prefersDark ? 'dark' : 'light');

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('nexus-theme', t);
    // Tüm toggle butonlarını güncelle
    document.querySelectorAll('.dark-mode-btn, .nav-dark-toggle').forEach(btn => {
      btn.textContent = t === 'dark' ? '☀️' : '🌙';
      btn.title       = t === 'dark' ? 'Açık Moda Geç' : 'Koyu Moda Geç';
    });
  }

  applyTheme(theme);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('dark-mode-btn') ||
        e.target.classList.contains('nav-dark-toggle')) {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
    }
  });
})();

/* ─────────────────────────────────────────────
   13. SLİDER (Müşteri Yorumları) ★
───────────────────────────────────────────── */
(function initSlider() {
  const track   = document.getElementById('slider-track');
  const dotsWrap= document.getElementById('slider-dots');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  if (!track) return;

  const slides    = track.querySelectorAll('.slide');
  const total     = slides.length;
  let   current   = 0;
  let   autoTimer = null;

  // Dot'ları oluştur
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className   = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Yorum ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Touch / Swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAuto();
  });

  startAuto();
})();

/* ─────────────────────────────────────────────
   14. SEKMELİ İÇERİK (Tabs) ★
───────────────────────────────────────────── */
(function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes= document.querySelectorAll('.tab-pane');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.getElementById('tab-' + target);
      if (pane) pane.classList.add('active');
    });
  });
})();

/* ─────────────────────────────────────────────
   15. MODAL PENCERE ★
───────────────────────────────────────────── */
(function initModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  function openModal()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = '';       }

  // Tüm modal açma butonları
  document.querySelectorAll('[data-modal="open"], .open-modal-btn').forEach(btn =>
    btn.addEventListener('click', openModal)
  );

  // Kapatma butonları
  document.querySelectorAll('[data-modal="close"], .modal-close-btn').forEach(btn =>
    btn.addEventListener('click', closeModal)
  );

  // Overlay dışına tıkla
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // ESC tuşu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();

/* ─────────────────────────────────────────────
   16. YUKARI ÇIK BUTONU ★
───────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────────
   17. RAPOR FORMU
───────────────────────────────────────────── */
(function initReportForm() {
  const form    = document.getElementById('report-form');
  const success = document.getElementById('report-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.report-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor...'; }
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 1200);
  });
})();

/* ─────────────────────────────────────────────
   INIT — DOM READY
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Görünür alandaki reveal elemanlarını hemen göster
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) el.classList.add('visible');
  });
});

/* ─────────────────────────────────────────────
   SAYFA GEÇİŞ ANİMASYONU
───────────────────────────────────────────── */
(function initPageTransitions() {
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity    = '1';
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (link.hostname && link.hostname !== window.location.hostname) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity    = '0';
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });
})();

/* ─────────────────────────────────────────────
   18. ÜRÜN DEĞERLENDİRME FORMU ★
───────────────────────────────────────────── */
(function initReviewForm() {
  const form    = document.getElementById('review-form');
  const success = document.getElementById('review-success');
  if (!form) return;

  /* Yıldız etiketi */
  const starLabels = ['', 'Kötü', 'Orta', 'İyi', 'Çok İyi', 'Mükemmel'];
  const starLabelEl = document.getElementById('star-label');
  document.querySelectorAll('.star-rating input').forEach(input => {
    input.addEventListener('change', () => {
      if (starLabelEl) starLabelEl.textContent = starLabels[input.value] || '';
      const ratingErr = document.getElementById('rv-rating-err');
      if (ratingErr) ratingErr.classList.remove('show');
    });
  });

  /* Karakter sayacı */
  const commentArea = document.getElementById('rv-comment');
  const charNum     = document.getElementById('rv-char-num');
  if (commentArea && charNum) {
    commentArea.addEventListener('input', () => {
      charNum.textContent = Math.min(commentArea.value.length, 800);
      if (commentArea.value.length > 800) commentArea.value = commentArea.value.slice(0, 800);
    });
  }

  /* Anlık hata temizleme */
  form.querySelectorAll('.review-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('rv-error');
      const err = document.getElementById(input.id + '-err');
      if (err) err.classList.remove('show');
    });
  });

  /* Doğrulama */
  function validateReview() {
    let valid = true;

    function checkField(id, errId, minLen) {
      const el  = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!el) return;
      const empty = !el.value.trim();
      const tooShort = minLen && el.value.trim().length < minLen;
      const emailBad = el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      const invalid = empty || tooShort || emailBad;
      el.classList.toggle('rv-error', invalid);
      if (err) err.classList.toggle('show', invalid);
      if (invalid) valid = false;
    }

    checkField('rv-product', 'rv-product-err');
    checkField('rv-name',    'rv-name-err');
    checkField('rv-email',   'rv-email-err');
    checkField('rv-title',   'rv-title-err');
    checkField('rv-comment', 'rv-comment-err', 20);

    /* Yıldız kontrolü */
    const starChecked = form.querySelector('.star-rating input:checked');
    const ratingErr   = document.getElementById('rv-rating-err');
    if (!starChecked) {
      if (ratingErr) ratingErr.classList.add('show');
      valid = false;
    } else {
      if (ratingErr) ratingErr.classList.remove('show');
    }

    /* Tavsiye kontrolü */
    const recChecked = form.querySelector('[name="recommend"]:checked');
    const recErr     = document.getElementById('rv-recommend-err');
    if (!recChecked) {
      if (recErr) recErr.classList.add('show');
      valid = false;
    } else {
      if (recErr) recErr.classList.remove('show');
    }

    /* KVKK Checkbox */
    const consent    = document.getElementById('rv-consent');
    const consentErr = document.getElementById('rv-consent-err');
    if (consent && !consent.checked) {
      if (consentErr) consentErr.classList.add('show');
      valid = false;
    } else if (consentErr) {
      consentErr.classList.remove('show');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateReview()) return;
    const btn = document.getElementById('review-submit-btn');
    if (btn) btn.classList.add('loading');
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 1400);
  });
})();

window.resetReviewForm = function() {
  const form    = document.getElementById('review-form');
  const success = document.getElementById('review-success');
  if (form) {
    form.reset();
    form.style.display = '';
    form.querySelectorAll('.rv-error').forEach(el => el.classList.remove('rv-error'));
    form.querySelectorAll('.review-error').forEach(el => el.classList.remove('show'));
    const btn = document.getElementById('review-submit-btn');
    if (btn) btn.classList.remove('loading');
    const starLabelEl = document.getElementById('star-label');
    if (starLabelEl) starLabelEl.textContent = 'Puan seçmek için yıldıza tıklayın';
    const charNum = document.getElementById('rv-char-num');
    if (charNum) charNum.textContent = '0';
  }
  if (success) success.classList.remove('show');
};

/* ─────────────────────────────────────────────
   19. GERİ BİLDİRİM FORMU ★
───────────────────────────────────────────── */
(function initFeedbackForm() {
  const form    = document.getElementById('feedback-form');
  const success = document.getElementById('fb-success');
  if (!form) return;

  /* Karakter sayacı */
  const msgArea  = document.getElementById('fb-message');
  const charNum  = document.getElementById('fb-char-num');
  if (msgArea && charNum) {
    msgArea.addEventListener('input', () => {
      charNum.textContent = Math.min(msgArea.value.length, 600);
      if (msgArea.value.length > 600) msgArea.value = msgArea.value.slice(0, 600);
    });
  }

  /* Anlık hata temizleme */
  form.querySelectorAll('.fb-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('fb-error-border');
      const err = document.getElementById(input.id + '-err');
      if (err) err.classList.remove('show');
    });
  });

  /* Doğrulama */
  function validateFeedback() {
    let valid = true;

    function checkField(id, errId, minLen) {
      const el  = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!el) return;
      const empty    = !el.value.trim();
      const tooShort = minLen && el.value.trim().length < minLen;
      const emailBad = el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      const invalid  = empty || tooShort || emailBad;
      el.classList.toggle('fb-error-border', invalid);
      if (err) err.classList.toggle('show', invalid);
      if (invalid) valid = false;
    }

    checkField('fb-name',    'fb-name-err');
    checkField('fb-email',   'fb-email-err');
    checkField('fb-type',    'fb-type-err');
    checkField('fb-message', 'fb-message-err', 15);

    /* Memnuniyet kontrolü */
    const satChecked = form.querySelector('[name="satisfaction"]:checked');
    const satErr     = document.getElementById('fb-sat-err');
    if (!satChecked) {
      if (satErr) satErr.classList.add('show');
      valid = false;
    } else {
      if (satErr) satErr.classList.remove('show');
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateFeedback()) return;
    const btn = document.getElementById('fb-submit-btn');
    if (btn) btn.classList.add('loading');
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }, 1200);
  });
})();

window.resetFeedbackForm = function() {
  const form    = document.getElementById('feedback-form');
  const success = document.getElementById('fb-success');
  if (form) {
    form.reset();
    form.style.display = '';
    form.querySelectorAll('.fb-error-border').forEach(el => el.classList.remove('fb-error-border'));
    form.querySelectorAll('.fb-error').forEach(el => el.classList.remove('show'));
    const btn = document.getElementById('fb-submit-btn');
    if (btn) btn.classList.remove('loading');
    const charNum = document.getElementById('fb-char-num');
    if (charNum) charNum.textContent = '0';
  }
  if (success) success.classList.remove('show');
};
