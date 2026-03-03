/**
 * main.js — al-amin.github.io
 * Navigation, typing effect, scroll reveal, mobile menu, back-to-top.
 * Each feature is independent and wrapped in try/catch for graceful degradation.
 */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Fixed nav shadow on scroll + active link highlighting */
  function initNavigation() {
    var nav = document.querySelector('.nav');
    var links = document.querySelectorAll('.nav__link');
    var sections = document.querySelectorAll('section[id]');
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20);

      // Active link
      var scrollPos = window.scrollY + 100;
      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          links.forEach(function (link) {
            link.classList.toggle(
              'nav__link--active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /** Mobile hamburger menu with focus trap, escape key, outside click */
  function initMobileMenu() {
    var btn = document.querySelector('.nav__hamburger');
    var menu = document.querySelector('.nav__mobile');
    if (!btn || !menu) return;

    var isOpen = false;

    function toggle(open) {
      isOpen = typeof open === 'boolean' ? open : !isOpen;
      btn.setAttribute('aria-expanded', String(isOpen));
      menu.classList.toggle('nav__mobile--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        var firstLink = menu.querySelector('.nav__link');
        if (firstLink) firstLink.focus();
      }
    }

    btn.addEventListener('click', function () { toggle(); });

    // Close on link click
    menu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () { toggle(false); });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        toggle(false);
        btn.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
        toggle(false);
      }
    });

    // Focus trap inside mobile menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen) return;
      var focusable = menu.querySelectorAll('a, button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /** Typing effect cycling through titles */
  function initTypingEffect() {
    var el = document.getElementById('typing-text');
    if (!el) return;

    var titles = [
      'AI Engineer',
      'MCP Architect',
      'GenAI Platform Builder'
    ];

    // If reduced motion, show static text
    if (reducedMotion) {
      el.textContent = titles.join(' | ');
      var cursor = document.querySelector('.hero__cursor');
      if (cursor) cursor.style.display = 'none';
      return;
    }

    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var pauseMs = 0;

    function tick() {
      var current = titles[titleIndex];

      if (pauseMs > 0) {
        pauseMs -= 50;
        setTimeout(tick, 50);
        return;
      }

      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          pauseMs = 2000;
        }
      } else {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          titleIndex = (titleIndex + 1) % titles.length;
        }
      }

      var speed = isDeleting ? 40 : 80;
      setTimeout(tick, speed);
    }

    tick();
  }

  /** Scroll reveal using IntersectionObserver */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // If reduced motion or no IntersectionObserver, show everything
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('reveal--visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  /** Back to top button */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('back-to-top--visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /** Initialize all features — each independently wrapped */
  document.addEventListener('DOMContentLoaded', function () {
    var features = [
      ['navigation', initNavigation],
      ['mobile menu', initMobileMenu],
      ['typing effect', initTypingEffect],
      ['scroll reveal', initScrollReveal],
      ['back to top', initBackToTop]
    ];

    features.forEach(function (pair) {
      try {
        pair[1]();
      } catch (err) {
        console.warn('[main.js] Failed to init ' + pair[0] + ':', err);
      }
    });
  });
})();
