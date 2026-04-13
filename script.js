/* =============================================
   NEXUS — Premium Phone Store
   Main JavaScript
   ============================================= */

'use strict';

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
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
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
})();

/* ─────────────────────────────────────────────
   NAVBAR SCROLL
───────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ─────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────── */
(function initMobileMenu() {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!burger || !mobileMenu) return;

  let open = false;

  burger.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);

    // Animate burger
    const spans = burger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      mobileMenu.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
})();

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
          );
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing
      const ease = 1 - Math.pow(1 - progress, 3);
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
   NEWSLETTER FORM
───────────────────────────────────────────── */
(function initNewsletter() {
  const form = document.getElementById('nl-form');
  const success = document.getElementById('nl-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 1000);
  });
})();

/* ─────────────────────────────────────────────
   PRODUCT FILTER (Products Page)
───────────────────────────────────────────── */
(function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-brand]');
  const sortSelect = document.getElementById('sort-select');
  const grid = document.getElementById('shop-grid');
  if (!filterBtns.length) return;

  let currentFilter = 'all';

  function applyFilters() {
    cards.forEach(card => {
      const brand = card.dataset.brand;
      const visible = currentFilter === 'all' || brand === currentFilter;

      if (visible) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
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
      const value = sortSelect.value;
      const cardsArray = Array.from(cards);

      cardsArray.sort((a, b) => {
        if (value === 'price-asc') return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        if (value === 'price-desc') return parseInt(b.dataset.price) - parseInt(a.dataset.price);
        if (value === 'name') return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return 0;
      });

      if (grid) {
        cardsArray.forEach(card => grid.appendChild(card));
      }
    });
  }
})();

/* ─────────────────────────────────────────────
   ADD TO CART (Products Page)
───────────────────────────────────────────── */
(function initCart() {
  const btns = document.querySelectorAll('.card-btn');
  const toast = document.getElementById('cart-toast');
  if (!btns.length || !toast) return;

  let toastTimeout;

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.product-card');
      const name = card ? card.querySelector('.card-name')?.textContent : 'Ürün';

      // Button feedback
      const orig = btn.textContent;
      btn.textContent = '✓ Eklendi';
      btn.style.background = 'rgba(0,212,255,0.2)';
      btn.style.color = 'var(--accent)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);

      // Toast
      clearTimeout(toastTimeout);
      toast.classList.add('show');
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
    });
  });
})();

/* ─────────────────────────────────────────────
   MULTI-STEP CONTACT FORM
───────────────────────────────────────────── */
let currentStep = 1;
const TOTAL_STEPS = 3;

function updateStepUI(step) {
  // Hide all steps
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  // Show current
  const current = document.getElementById('step-' + step);
  if (current) current.classList.add('active');

  // Update step indicators
  document.querySelectorAll('.step-dot').forEach((dot, idx) => {
    dot.classList.remove('active', 'completed');
    if (idx + 1 === step) dot.classList.add('active');
    if (idx + 1 < step) dot.classList.add('completed');
  });

  // Update step lines
  document.querySelectorAll('.step-line').forEach((line, idx) => {
    line.classList.toggle('active', idx + 1 < step);
  });
}

function validateStep(step) {
  let valid = true;

  function showError(id, errorId) {
    const input = document.getElementById(id);
    const err = document.getElementById(errorId);
    if (!input) return true;
    const empty = !input.value.trim();
    const isEmail = input.type === 'email';
    const emailInvalid = isEmail && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    const invalid = empty || emailInvalid;
    input.classList.toggle('error', invalid);
    if (err) err.classList.toggle('show', invalid);
    if (invalid) valid = false;
    return !invalid;
  }

  if (step === 1) {
    showError('fname', 'fname-err');
    showError('lname', 'lname-err');
    showError('email', 'email-err');
  }

  if (step === 2) {
    // Subject
    const subject = document.getElementById('subject');
    const subjectErr = document.getElementById('subject-err');
    if (subject && !subject.value) {
      subject.classList.add('error');
      if (subjectErr) subjectErr.classList.add('show');
      valid = false;
    } else if (subject) {
      subject.classList.remove('error');
      if (subjectErr) subjectErr.classList.remove('show');
    }

    // Message
    const msg = document.getElementById('message');
    const msgErr = document.getElementById('message-err');
    if (msg && !msg.value.trim()) {
      msg.classList.add('error');
      if (msgErr) msgErr.classList.add('show');
      valid = false;
    } else if (msg) {
      msg.classList.remove('error');
      if (msgErr) msgErr.classList.remove('show');
    }

    // Consent
    const consent = document.getElementById('consent');
    const consentErr = document.getElementById('consent-err');
    if (consent && !consent.checked) {
      if (consentErr) consentErr.classList.add('show');
      valid = false;
    } else if (consentErr) {
      consentErr.classList.remove('show');
    }
  }

  return valid;
}

function buildPreview() {
  const grid = document.getElementById('preview-grid');
  if (!grid) return;

  const fields = [
    { label: 'Ad', id: 'fname' },
    { label: 'Soyad', id: 'lname' },
    { label: 'E-posta', id: 'email' },
    { label: 'Telefon', id: 'phone' },
    { label: 'Konu', id: 'subject' },
  ];

  const msgEl = document.getElementById('message');
  const msgValue = msgEl ? msgEl.value : '';

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

  if (msgValue) {
    const div = document.createElement('div');
    div.className = 'preview-item';
    div.style.gridColumn = '1 / -1';
    div.innerHTML = `<label>Mesaj</label><span>${msgValue.length > 100 ? msgValue.slice(0, 100) + '…' : msgValue}</span>`;
    grid.appendChild(div);
  }
}

window.nextStep = function (from) {
  if (!validateStep(from)) return;
  currentStep = from + 1;
  if (currentStep === TOTAL_STEPS) buildPreview();
  updateStepUI(currentStep);
};

window.prevStep = function (from) {
  currentStep = from - 1;
  updateStepUI(currentStep);
};

window.resetForm = function () {
  const form = document.getElementById('contact-form');
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
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Character counter
  const msgArea = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      const len = Math.min(msgArea.value.length, 500);
      charCount.textContent = len;
      if (msgArea.value.length > 500) {
        msgArea.value = msgArea.value.slice(0, 500);
      }
    });
  }

  // Clear errors on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errId = input.id + '-err';
      const err = document.getElementById(errId);
      if (err) err.classList.remove('show');
    });
  });

  // Form submit
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
   PARALLAX HERO ORBs
───────────────────────────────────────────── */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const strength = (i + 1) * 12;
      orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  });
})();

/* ─────────────────────────────────────────────
   CARD HOVER TILT
───────────────────────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = (y - cy) / cy * -5;
      const rotateY = (x - cx) / cx * 5;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
})();

/* ─────────────────────────────────────────────
   SMOOTH PAGE TRANSITIONS
───────────────────────────────────────────── */
(function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', (e) => {
        // Only same-origin
        if (link.hostname !== window.location.hostname) return;
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });

  // Fade in on load
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
})();

/* ─────────────────────────────────────────────
   INIT ON DOM READY
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial reveals for elements in view
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });
});
