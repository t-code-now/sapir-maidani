(function () {
  'use strict';

  var WHATSAPP_NUMBER = '972504222251';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header style on scroll
  var header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
    header.classList.add('scrolled');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // Facebook link (fill data-facebook-url in index.html when available)
  var fb = document.getElementById('facebookLink');
  if (fb) {
    var fbUrl = fb.getAttribute('data-facebook-url');
    if (fbUrl) {
      fb.href = fbUrl;
      document.getElementById('facebookLabel').textContent = 'לעמוד הפייסבוק';
    } else {
      fb.removeAttribute('target');
      fb.style.opacity = '0.6';
      fb.style.cursor = 'default';
      fb.addEventListener('click', function (e) { e.preventDefault(); });
    }
  }

  // Contact form -> opens WhatsApp with a ready message
  var form = document.getElementById('contactForm');
  var errorEl = document.getElementById('formError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var mode = form.querySelector('input[name="mode"]:checked').value;
    var message = form.message.value.trim();

    var phoneOk = /^[0-9+\-\s()]{9,}$/.test(phone);
    if (!name || !phoneOk) {
      errorEl.classList.remove('hidden');
      return;
    }
    errorEl.classList.add('hidden');

    var text = 'היי ספיר, אשמח לשמוע פרטים על תרפיית ממדים 🌿\n' +
      'שם: ' + name + '\n' +
      'טלפון: ' + phone + '\n' +
      'סוג מפגש: ' + mode +
      (message ? '\n' + 'הודעה: ' + message : '');

    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
