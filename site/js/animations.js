/* ============================================
   HANUKREAJEA — Scroll Animations & Interactions
   Specs: 500ms hover, 636 stiffness, 24 dampening
   IntersectionObserver for scroll-driven reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== STAGGER CHILDREN =====
  document.querySelectorAll('.stagger-children').forEach(container => {
    Array.from(container.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
          const current = Math.round(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  counters.forEach(c => counterObserver.observe(c));

  // ===== ACCORDION =====
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasActive = item.classList.contains('active');
      // Close all other open accordion items
      item.closest('.accordion-group')?.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const t = i.querySelector('.accordion-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      // Toggle current
      if (!wasActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== CONTACT FORM (Formspree + Toast) =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn ? btn.textContent : 'Send';
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; btn.classList.add('opacity-75', 'cursor-not-allowed'); }

      const formAction = form.getAttribute('action') || '';

      if (formAction && formAction.includes('formspree.io') && !formAction.includes('YOUR_FORM_ID')) {
        // Real Formspree submission
        try {
          const data = new FormData(form);
          const response = await fetch(formAction, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            if (btn) { btn.textContent = originalText; btn.disabled = false; btn.classList.remove('opacity-75', 'cursor-not-allowed'); }
            showToast('Message sent! We\'ll be in touch shortly.', 'success');
            form.reset();
          } else {
            if (btn) { btn.textContent = originalText; btn.disabled = false; btn.classList.remove('opacity-75', 'cursor-not-allowed'); }
            showToast('Something went wrong. Please email us directly.', 'error');
          }
        } catch (err) {
          if (btn) { btn.textContent = originalText; btn.disabled = false; btn.classList.remove('opacity-75', 'cursor-not-allowed'); }
          showToast('Network error. Please try again or email us.', 'error');
        }
      } else {
        // Demo mode: form not configured — show error instead of fake success
        await new Promise(r => setTimeout(r, 1200));
        if (btn) { btn.textContent = originalText; btn.disabled = false; btn.classList.remove('opacity-75', 'cursor-not-allowed'); }
        showToast('⚠️ Form not configured yet. Please contact us directly at info@hanukreajea.com', 'error');
      }
    });
  }

  // ===== TOAST NOTIFICATION =====
  window.showToast = function(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  // ===== PARALLAX HERO (subtle) =====
  const heroSection = document.querySelector('.hero-parallax');
  if (heroSection) {
    window.addEventListener('scroll', throttle(() => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, 100));
  }

  // ===== PRE-POPULATE CONTACT FORM FROM URL PARAMS =====
  prefillContactForm();

});

// Pre-populate contact form subject from URL params
function prefillContactForm() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (!service) return;
  const select = document.getElementById('subject');
  if (!select) return;
  const options = select.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value.toLowerCase().includes(service.toLowerCase())) {
      select.selectedIndex = i;
      break;
    }
  }
}
