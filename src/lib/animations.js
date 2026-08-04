// Hargrove Research - Premium Motion & Scroll Effects
// Inspired by: Awwwards-winning sites, Stripe, Apple

(function() {
  'use strict';

  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== PARALLAX EFFECTS =====
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.scrollY;
    
    // Parallax hero orbs
    document.querySelectorAll('.hero__orb').forEach((orb, i) => {
      const speed = 0.1 + (i * 0.05);
      orb.style.transform = `translateY(${scrolled * speed * -1}px)`;
    });

    // Parallax grid background
    const grid = document.querySelector('.hero__bg-grid');
    if (grid) {
      grid.style.backgroundPositionY = `${scrolled * 0.2}px`;
    }

    ticking = false;
  }

  function requestParallax() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // ===== HOVER RIPPLE EFFECT =====
  function initHoverEffects() {
    document.addEventListener('click', function(e) {
      if (e.target.matches('.btn')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;

        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      }
    });
  }

  // ===== COUNTER ANIMATION =====
  function initCounters() {
    const observerOptions = {
      threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const animate = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(animate);
            } else {
              counter.textContent = target;
            }
          };

          animate();
          countObserver.unobserve(counter);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-count]').forEach(counter => {
      counter.textContent = '0';
      countObserver.observe(counter);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== STAGGED CHILD ANIMATION =====
  function initStaggerAnimation() {
    document.querySelectorAll('.stagger-container').forEach(container => {
      const children = container.querySelectorAll('> *');
      children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, 100 * i);
      });
    });
  }

  // ===== CURSOR FOLLOWER (OPTIONAL) =====
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', function(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    // Create subtle cursor glow effect on interactive elements
    const targets = document.querySelectorAll('a, button, .interactive');
    
    targets.forEach(target => {
      target.addEventListener('mouseenter', function() {
        this.style.cursor = 'none';
      });
      
      target.addEventListener('mouseleave', function() {
        this.style.cursor = '';
      });
    });

    requestAnimationFrame(animateCursor);
  }

  // ===== LAZYPIC IMAGE FADE-IN =====
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ===== SIGNAL BAR INFINITE SCROLL =====
  function initSignalBar() {
    const bar = document.querySelector('.signal-bar__content');
    if (bar && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
      // Enhanced smooth scrolling for signal bar
      bar.style.animationDuration = '90s'; // Slower, more elegant
    }
  }

  // ===== HEADER SCROLL BEHAVIOR =====
  function initHeaderBehavior() {
    const header = document.getElementById('site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (header) {
        if (currentScroll > 10) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 150) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===== MAP/CHART ANIMATIONS =====
  function initChartAnimations() {
    const charts = document.querySelectorAll('svg path[d*="M"]');
    
    charts.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = length;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            path.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            path.style.strokeDashoffset = '0';
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(path);
    });
  }

  // ===== INIT ALL =====
  function init() {
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initHoverEffects();
    initSignalBar();
    initHeaderBehavior();
    initChartAnimations();
    
    window.addEventListener('scroll', requestParallax, { passive: true });
    
    console.log('🚀 Hargrove Research - Motion effects initialized');
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
