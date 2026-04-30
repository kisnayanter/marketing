/* ─────────────────────────────────────────────
 * KisanYantra marketing site — main interactions
 * No framework, just modern vanilla.
 * ─────────────────────────────────────────────*/

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ─── Preloader ─── */
  window.addEventListener('load', () => {
    const pre = $('#preloader');
    if (!pre) return;
    setTimeout(() => pre.classList.add('is-done'), 350);
    setTimeout(() => pre.remove(), 1200);
  });

  /* ─── Year ─── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Smooth scroll (Lenis) ─── */
  let lenis = null;
  if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ─── Nav scroll state ─── */
  const nav = $('#nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── Reveal on scroll (IntersectionObserver) ─── */
  const revealEls = $$('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* Auto-tag every section-head, tile, persona-panel, quote-card, step etc. as .reveal */
  $$([
    '.section-head',
    '.tile',
    '.persona-panel__copy',
    '.persona-panel__visual',
    '.quote-card',
    '.how-flow__steps li',
    '.lang-chip',
    '.stats__item',
  ].join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = (i % 4).toString();
  });

  // re-observe newly tagged
  if (window.IntersectionObserver) {
    const io2 = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    $$('.reveal').forEach((el) => io2.observe(el));
  }

  /* ─── Persona switcher ─── */
  const tabs    = $$('.persona-tab');
  const panels  = $$('.persona-panel');
  const indicator = $('.persona-tab__indicator');

  function moveIndicator(toEl) {
    if (!indicator || !toEl) return;
    const tabsBox = toEl.parentElement.getBoundingClientRect();
    const r = toEl.getBoundingClientRect();
    indicator.style.width = `${r.width}px`;
    indicator.style.transform = `translateX(${r.left - tabsBox.left - 6}px)`;
  }
  function selectPersona(name) {
    tabs.forEach((t) => {
      const active = t.dataset.persona === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) moveIndicator(t);
    });
    panels.forEach((p) => p.classList.toggle('is-active', p.dataset.persona === name));
  }

  tabs.forEach((t) => t.addEventListener('click', () => selectPersona(t.dataset.persona)));

  // initial position + on resize
  const initialActive = $('.persona-tab.is-active') || tabs[0];
  if (initialActive) {
    requestAnimationFrame(() => moveIndicator(initialActive));
    window.addEventListener('resize', () => moveIndicator($('.persona-tab.is-active')));
  }

  /* ─── Stats counter ─── */
  const statNums = $$('.stats__num');
  if (statNums.length) {
    const animateNum = (el) => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * eased);
        el.textContent = `${v}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const sIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateNum(e.target);
          sIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    statNums.forEach((n) => sIO.observe(n));
  }

  /* ─── Language word cycler ─── */
  const langCycle = $('#langCycle');
  if (langCycle) {
    let words = [];
    try { words = JSON.parse(langCycle.dataset.words || '[]'); } catch (_) { /* noop */ }
    if (words.length) {
      let i = 0;
      setInterval(() => {
        i = (i + 1) % words.length;
        langCycle.classList.remove('is-flipping');
        // Force reflow to restart animation
        void langCycle.offsetWidth;
        langCycle.textContent = words[i];
        langCycle.classList.add('is-flipping');
      }, 1800);
    }
  }

  /* ─── 3D revolving equipment carousel ─── */
  const carouselRing = $('#carouselRing');
  const carouselStage = $('#carouselStage');
  if (carouselRing && carouselStage) {
    // 30 equipment images that exist in /assets/equipment
    const items = [
      ['tractor.png', 'Tractor'],
      ['harvester.png', 'Harvester'],
      ['rotavator.png', 'Rotavator'],
      ['plough.png', 'Plough'],
      ['sprayer.png', 'Sprayer'],
      ['thresher.png', 'Thresher'],
      ['cultivator.png', 'Cultivator'],
      ['baler.png', 'Baler'],
      ['drone.png', 'Drone'],
      ['drip_system.png', 'Drip system'],
      ['dryer.png', 'Dryer'],
      ['duster.png', 'Duster'],
      ['flame_weeder.png', 'Flame weeder'],
      ['grader.png', 'Grader'],
      ['harrow.png', 'Harrow'],
      ['maize_harvester.png', 'Maize harvester'],
      ['planter.png', 'Planter'],
      ['potato_digger.png', 'Potato digger'],
      ['power_tiller.png', 'Power tiller'],
      ['pump.png', 'Pump'],
      ['rain_gun.png', 'Rain gun'],
      ['reaper.png', 'Reaper'],
      ['seed_drill.png', 'Seed drill'],
      ['sprinkler.png', 'Sprinkler'],
      ['tiller.png', 'Tiller'],
      ['trailer.png', 'Trailer'],
      ['transplanter.png', 'Transplanter'],
      ['truck.png', 'Truck'],
      ['water_pump.png', 'Water pump'],
      ['winnower.png', 'Winnower'],
    ];

    const setRingItems = () => {
      const styles = getComputedStyle(carouselStage);
      const ringRadius = parseFloat(styles.getPropertyValue('--ring-radius')) || 480;
      const stepDeg = 360 / items.length;

      carouselRing.innerHTML = '';
      items.forEach(([file, name], i) => {
        const card = document.createElement('div');
        card.className = 'carousel__card';
        const angle = i * stepDeg;
        card.style.transform = `rotateY(${angle}deg) translateZ(${ringRadius}px)`;
        card.innerHTML = `<img src="assets/equipment/${file}" alt="${name}" loading="lazy" /><span>${name}</span>`;
        carouselRing.appendChild(card);
      });
    };
    setRingItems();
    let resizeT = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(setRingItems, 200);
    });

    // Drag-to-spin
    let drag = null; // { startX, startRot }
    let manualRotation = 0;
    const setRotation = (deg) => {
      manualRotation = deg;
      // Pause CSS animation by class; apply transform inline
      carouselRing.classList.add('is-dragging');
      carouselRing.style.transform = `translate(-50%, -50%) rotateY(${deg}deg)`;
    };
    const releaseRotation = () => {
      carouselRing.classList.remove('is-dragging');
      // Restart animation from current position by removing inline transform
      carouselRing.style.transform = '';
    };
    const onDown = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      drag = { startX: x, startRot: manualRotation };
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!drag) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setRotation(drag.startRot + (x - drag.startX) * 0.5);
    };
    const onUp = () => {
      if (!drag) return;
      drag = null;
      releaseRotation();
    };
    carouselStage.addEventListener('mousedown', onDown);
    carouselStage.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }

  /* ─── Hero parallax (mouse-tilt on the orbit) ─── */
  const heroVisual = $('.hero__visual');
  const heroOrbit  = $('.hero__orbit');
  if (heroVisual && heroOrbit && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      heroOrbit.style.transform = `rotateX(${y * -10}deg) rotateY(${x * 14}deg)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroOrbit.style.transform = '';
    });
  }

  /* ─── How-it-works tractor-along-path (GSAP ScrollTrigger if present) ─── */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const path = $('#howPath');
    if (path) {
      const total = path.getTotalLength();
      path.style.strokeDasharray = total;
      path.style.strokeDashoffset = total;
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.how__flows',
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
    }

    // Subtle parallax on hero hills
    gsap.to('.hero__hills--back',  { yPercent: -25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__hills--front', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
})();
