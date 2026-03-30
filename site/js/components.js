/* ============================================
   HANUKREAJEA — Shared Components
   Injects Header, Footer, Mobile Nav into every page
   ============================================ */

// ===== THROTTLE UTILITY =====
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Current page detection & Path prefixing for deep links (e.g. /blog/post.html)
const fullPath = window.location.pathname;
const isSubDir = fullPath.includes('/blog/') && !fullPath.endsWith('/blog.html');
const pathPrefix = isSubDir ? '../' : '';

const currentPage = fullPath.split('/').pop() || 'index.html';

function isActive(page) {
  if (page === 'index.html' && (currentPage === '' || currentPage === 'index.html' || currentPage === '/')) return true;
  return currentPage === page;
}

function navClass(page) {
  return `nav-link${isActive(page) ? ' active' : ''}`;
}

function getUrl(path) {
  return pathPrefix + path;
}

// ===== HEADER =====
function renderHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" id="main-nav">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <a href="${getUrl('index.html')}" class="flex items-center gap-3 shrink-0 group">
            <img src="${getUrl('images/logo-dark.webp')}" alt="Hanukreajea Logo" class="w-auto transition-transform duration-300 group-hover:scale-105" id="nav-logo" style="height: 48px;">
          </a>
          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-8" id="nav-links-container">
            <a href="${getUrl('index.html')}" class="${navClass('index.html')}">Home</a>
            <div class="relative group">
              <button class="nav-link flex items-center gap-1" id="services-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                Services
                <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-3 z-50 text-left" style="min-width: 380px; width: max-content;">
                
                <a href="${getUrl('services-consulting.html')}" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden">
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-evergreen-600 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold-500 group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/30 group-hover/item:scale-110">
                    <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 text-[15px] group-hover/item:text-gold-600 transition-colors whitespace-nowrap">Business Consulting</div>
                    <div class="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">Legal, regulatory &amp; compliance</div>
                  </div>
                </a>

                <a href="${getUrl('services-company-registration.html')}" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden">
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-evergreen-600 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold-500 group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/30 group-hover/item:scale-110">
                    <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 text-[15px] group-hover/item:text-gold-600 transition-colors whitespace-nowrap">Company Registration</div>
                    <div class="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">Entity formation &amp; licensing</div>
                  </div>
                </a>

                <a href="${getUrl('services-tax-compliance.html')}" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden">
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-evergreen-600 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold-500 group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/30 group-hover/item:scale-110">
                    <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 text-[15px] group-hover/item:text-gold-600 transition-colors whitespace-nowrap">Tax Compliance</div>
                    <div class="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">GDT filings &amp; tax advisory</div>
                  </div>
                </a>

                <a href="${getUrl('services-labor-law.html')}" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item relative overflow-hidden">
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-evergreen-600 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold-500 group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-lg group-hover/item:shadow-gold-500/30 group-hover/item:scale-110">
                    <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 text-[15px] group-hover/item:text-gold-600 transition-colors whitespace-nowrap">Labor Law Compliance</div>
                    <div class="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">HR compliance &amp; employment law</div>
                  </div>
                </a>

                <div class="h-px bg-gray-100 my-2 mx-3"></div>

                <a href="${getUrl('services-trade.html')}" class="flex items-center gap-4 p-3 rounded-xl hover:bg-evergreen-50 transition-all duration-300 group/item relative overflow-hidden">
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-evergreen-600 flex items-center justify-center flex-shrink-0 group-hover/item:bg-evergreen-600 group-hover/item:text-white transition-all duration-300 group-hover/item:shadow-lg group-hover/item:shadow-evergreen-500/30 group-hover/item:scale-110">
                    <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900 text-[15px] group-hover/item:text-evergreen-700 transition-colors whitespace-nowrap">Agricultural Trade</div>
                    <div class="text-[13px] text-gray-500 mt-0.5 whitespace-nowrap">Import &amp; export solutions</div>
                  </div>
                </a>
              </div>
            </div>
            <a href="${getUrl('about.html')}" class="${navClass('about.html')}">About</a>
            <a href="${getUrl('team.html')}" class="${navClass('team.html')}">Team</a>
            <a href="${getUrl('blog.html')}" class="${navClass('blog.html')}">Insights</a>
            <a href="${getUrl('case-studies.html')}" class="${navClass('case-studies.html')}">Case Studies</a>
            <a href="${getUrl('faq.html')}" class="${navClass('faq.html')}">FAQ</a>
          </div>
          <!-- CTA + Mobile Toggle -->
          <div class="flex items-center gap-4">
            <a href="${getUrl('contact.html')}" class="btn btn-primary btn-sm hidden lg:inline-flex">Get Started</a>
            <button class="lg:hidden p-2" id="mobile-toggle" aria-label="Open menu" aria-expanded="false">
              <svg class="w-6 h-6 text-white" id="mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-overlay" id="mobile-overlay"></div>

    <!-- Mobile Nav Panel -->
    <div class="mobile-nav" id="mobile-nav">
      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center gap-3">
          <img src="${getUrl('images/logo-dark.webp')}" alt="Hanukreajea Logo" style="height: 44px; width: auto;">
          <div class="flex flex-col justify-center">
            <span class="font-serif font-bold text-lg leading-none tracking-wide text-gold-500">HANUKREAJEA</span>
            <span class="text-[9px] font-bold tracking-[0.2em] text-gold-500/80 uppercase mt-1">Business Solution</span>
          </div>
        </div>
        <button id="mobile-close" class="p-2" aria-label="Close menu">
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="flex flex-col gap-1">
        <a href="${getUrl('index.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('index.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Home</a>
        <a href="${getUrl('services-consulting.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('services-consulting.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Business Consulting</a>
        <a href="${getUrl('services-company-registration.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('services-company-registration.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Company Registration</a>
        <a href="${getUrl('services-tax-compliance.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('services-tax-compliance.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Tax Compliance</a>
        <a href="${getUrl('services-labor-law.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('services-labor-law.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Labor Law Compliance</a>
        <a href="${getUrl('services-trade.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('services-trade.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Agricultural Trade</a>
        <a href="${getUrl('about.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('about.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">About</a>
        <a href="${getUrl('team.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('team.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Team</a>
        <a href="${getUrl('blog.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('blog.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Insights</a>
        <a href="${getUrl('case-studies.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('case-studies.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Case Studies</a>
        <a href="${getUrl('faq.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('faq.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">FAQ</a>
        <a href="${getUrl('contact.html')}" class="block py-3 px-4 rounded-lg text-lg font-medium ${isActive('contact.html') ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'}">Contact</a>
        <div class="mt-6 pt-6 border-t border-gray-200">
          <a href="${getUrl('contact.html')}" class="btn btn-primary w-full text-center">Get Started</a>
        </div>
      </div>
    </div>
  `;

  // Mobile nav toggle
  const toggle = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const overlay = document.getElementById('mobile-overlay');
  const mobileNav = document.getElementById('mobile-nav');

  function openMobile() { mobileNav.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; if (toggle) toggle.setAttribute('aria-expanded', 'true'); }
  function closeMobile() { mobileNav.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; if (toggle) toggle.setAttribute('aria-expanded', 'false'); }

  if (toggle) toggle.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (overlay) overlay.addEventListener('click', closeMobile);

  // ===== SERVICES DROPDOWN — HOVER + KEYBOARD =====
  const servicesBtn = document.getElementById('services-dropdown-btn');
  const servicesGroup = servicesBtn ? servicesBtn.closest('.relative.group') : null;
  const servicesDropdown = servicesGroup ? servicesGroup.querySelector('.absolute') : null;

  if (servicesBtn && servicesGroup && servicesDropdown) {
    let closeTimer = null;

    function openServicesDropdown() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      servicesDropdown.classList.add('opacity-100', 'visible');
      servicesDropdown.classList.remove('opacity-0', 'invisible');
      servicesBtn.setAttribute('aria-expanded', 'true');
    }

    function closeServicesDropdown(delay) {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        servicesDropdown.classList.remove('opacity-100', 'visible');
        servicesDropdown.classList.add('opacity-0', 'invisible');
        servicesBtn.setAttribute('aria-expanded', 'false');
        closeTimer = null;
      }, delay || 0);
    }

    // ── HOVER: open on mouseenter, close on mouseleave with small delay ──
    servicesGroup.addEventListener('mouseenter', () => openServicesDropdown());
    servicesGroup.addEventListener('mouseleave', () => closeServicesDropdown(120));

    // ── KEYBOARD: focusin opens, focusout closes, Escape closes ──
    servicesGroup.addEventListener('focusin', () => openServicesDropdown());
    servicesGroup.addEventListener('focusout', (e) => {
      if (!servicesGroup.contains(e.relatedTarget)) closeServicesDropdown(0);
    });

    servicesBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeServicesDropdown(0); servicesBtn.focus(); }
      // Space/Enter toggles the dropdown (doesn't navigate to a page)
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = servicesBtn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeServicesDropdown(0) : openServicesDropdown();
      }
    });

    servicesDropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeServicesDropdown(0); servicesBtn.focus(); }
    });

    // ── CLICK on the Services button: toggle dropdown, don't navigate ──
    servicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = servicesBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeServicesDropdown(0) : openServicesDropdown();
    });

    // Close dropdown when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!servicesGroup.contains(e.target)) closeServicesDropdown(0);
    });
  }

  // Sticky nav background on scroll
  const nav = document.getElementById('main-nav');
  const navLogo = document.getElementById('nav-logo');
  const mobileIcon = document.getElementById('mobile-icon');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
      if (navLogo) navLogo.src = getUrl('images/logo-dark.webp');
      if (mobileIcon) { mobileIcon.classList.remove('text-white'); mobileIcon.classList.add('text-gray-700'); }
      navLinks.forEach(link => link.style.color = 'var(--evergreen)');
    } else {
      nav.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
      // logo-dark.webp works on both dark and transparent backgrounds
      if (navLogo) navLogo.src = getUrl('images/logo-dark.webp');
      if (mobileIcon) { mobileIcon.classList.remove('text-gray-700'); mobileIcon.classList.add('text-white'); }
      navLinks.forEach(link => link.style.color = 'white');
    }
  }

  window.addEventListener('scroll', throttle(updateNavScroll, 100));
  // Trigger on load
  updateNavScroll();
}

// ===== FOOTER =====
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <footer class="bg-gray-900 text-gray-300">
      <!-- Main Footer -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand Column -->
          <div class="lg:col-span-1">
            <a href="${getUrl('index.html')}" class="flex items-center gap-3 group mb-5 inline-flex">
              <img src="${getUrl('images/steak-logo-png.webp')}" alt="Hanukreajea Logo" class="transition-transform duration-300 group-hover:scale-105" style="height: 80px; width: auto;">
            </a>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              Bridging strategy and execution in business consulting and agricultural trade across Cambodia and the ASEAN region.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gold-600 flex items-center justify-center transition-colors has-tooltip" aria-label="Facebook">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span class="tooltip-text">Facebook</span>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gold-600 flex items-center justify-center transition-colors has-tooltip" aria-label="LinkedIn">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span class="tooltip-text">LinkedIn</span>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gold-600 flex items-center justify-center transition-colors has-tooltip" aria-label="Telegram">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <span class="tooltip-text">Telegram</span>
              </a>
            </div>
          </div>

          <!-- Services Column -->
          <div>
            <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul class="space-y-3 text-sm">
              <li><a href="services-consulting.html" class="hover:text-amber-400 transition-colors">Business Consulting</a></li>
              <li><a href="services-consulting.html#regulatory" class="hover:text-amber-400 transition-colors">Regulatory Compliance</a></li>
              <li><a href="services-consulting.html#documentation" class="hover:text-amber-400 transition-colors">Business Documentation</a></li>
              <li><a href="services-trade.html" class="hover:text-amber-400 transition-colors">Agricultural Trade</a></li>
              <li><a href="services-trade.html#import-export" class="hover:text-amber-400 transition-colors">Import &amp; Export</a></li>
            </ul>
          </div>

          <!-- Company Column -->
          <div>
            <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul class="space-y-3 text-sm">
              <li><a href="about.html" class="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="team.html" class="hover:text-amber-400 transition-colors">Our Team</a></li>
              <li><a href="blog.html" class="hover:text-amber-400 transition-colors">Insights &amp; News</a></li>
              <li><a href="faq.html" class="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="privacy-policy.html" class="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div>
            <h4 class="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul class="space-y-4 text-sm">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Phnom Penh, Cambodia</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:info@hanukreajea.com" class="hover:text-amber-400 transition-colors">info@hanukreajea.com</a>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+85512345678" class="hover:text-amber-400 transition-colors">+855 12 345 678</a>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 mt-0.5 shrink-0" fill="#229ED9" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <a href="https://t.me/hanukreajea" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors">@hanukreajea <span class="text-xs text-gray-500">(Telegram)</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-500">&copy; ${year} Hanukreajea Business Solution Co., Ltd. All rights reserved.</p>
          <div class="flex gap-6 text-xs text-gray-500">
            <a href="privacy-policy.html" class="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="faq.html" class="hover:text-amber-400 transition-colors">FAQ</a>
            <a href="contact.html" class="hover:text-amber-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ===== BACK TO TOP BUTTON =====
function renderBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 100));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== PRELOADER =====
function renderPreloader() {
  const pre = document.createElement('div');
  pre.className = 'preloader';
  pre.id = 'preloader';
  pre.innerHTML = `
    <div class="preloader-inner">
      <img src="${getUrl('images/steak-logo-png.webp')}" alt="Hanukreajea" class="preloader-logo">
      <div class="preloader-bar-wrap">
        <div class="preloader-bar"></div>
      </div>
      <p class="preloader-tagline">HANUKREAJEA BUSINESS SOLUTION</p>
    </div>
  `;
  document.body.prepend(pre);

  // Phase 1 — logo + tagline animate in (CSS handles this via animation)
  // Phase 2 — after load + minimum display time, fade the whole splash out upward
  let loadTimeReached = false;
  let minimumTimeReached = false;

  function dismissPreloader() {
    if (loadTimeReached && minimumTimeReached) {
      pre.classList.add('hiding');
      setTimeout(() => pre.remove(), 750);
    }
  }

  // Ensure minimum 1.2s visibility for premium feel
  setTimeout(() => {
    minimumTimeReached = true;
    dismissPreloader();
  }, 1200);

  if (document.readyState === 'complete') {
    loadTimeReached = true;
    dismissPreloader();
  } else {
    window.addEventListener('load', () => {
      loadTimeReached = true;
      dismissPreloader();
    });
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderPreloader();
  renderHeader();
  renderFooter();
  renderBackToTop();

  // Post-render cleanup & enhancements
  setTimeout(() => {
    // 1. Standardize breadcrumb separators
    const breadcrumbSpans = document.querySelectorAll('nav span.text-evergreen-200, nav span.mx-2, .breadcrumb-separator');
    breadcrumbSpans.forEach(span => {
      span.textContent = '›';
      span.className = 'mx-2 text-gold-400 font-bold opacity-70';
    });

    // 2. Inject real social links
    const socialLinks = {
      facebook: 'https://www.facebook.com/hanukreajea',
      linkedin: 'https://www.linkedin.com/company/hanukreajea',
      telegram: 'https://t.me/hanukreajea',
      whatsapp: 'https://wa.me/85512345678'
    };

    document.querySelectorAll('a[href="#"]').forEach(a => {
      const aria = (a.getAttribute('aria-label') || '').toLowerCase();
      const text = (a.textContent || '').toLowerCase();

      if (aria.includes('facebook') || text.includes('facebook')) a.href = socialLinks.facebook;
      else if (aria.includes('linkedin') || text.includes('linkedin')) a.href = socialLinks.linkedin;
      else if (aria.includes('telegram') || text.includes('telegram')) a.href = socialLinks.telegram;
      else if (aria.includes('whatsapp') || text.includes('whatsapp')) a.href = socialLinks.whatsapp;
    });
  }, 100);
});
