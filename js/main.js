/* ─────────────────────────────────────────────
 * KisanYantra marketing site — main JS
 * No dependencies. Just IntersectionObserver +
 * a couple of small modules that no-op on pages
 * that don't have the relevant DOM.
 * ─────────────────────────────────────────────*/

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ─── Preloader ─── */
  window.addEventListener('load', () => {
    const pre = $('#preloader');
    if (!pre) return;
    setTimeout(() => pre.classList.add('is-done'), 250);
    setTimeout(() => pre.remove(), 800);
  });

  /* ─── Year ─── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Nav scroll state ─── */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Reveal on scroll ─── */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = $$('.reveal');
  if (revealEls.length && !reduced) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else if (reduced) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Auto-tag a few common patterns
  $$('.section-head, .feature-row, .how-step, .lang-chip, .stats__item, .equip-card, .quote-card').forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      el.dataset.delay = (i % 4).toString();
      if (!reduced && window.IntersectionObserver) {
        const io2 = new IntersectionObserver(
          (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible');
              io2.unobserve(e.target);
            }
          }),
          { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
        );
        io2.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    }
  });

  /* ─── Stats counter ─── */
  const statNums = $$('.stats__num');
  if (statNums.length) {
    const animateNum = (el) => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
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
  if (langCycle && !reduced) {
    let words = [];
    try { words = JSON.parse(langCycle.dataset.words || '[]'); } catch (_) {}
    if (words.length) {
      let i = 0;
      setInterval(() => {
        i = (i + 1) % words.length;
        langCycle.classList.remove('is-flipping');
        void langCycle.offsetWidth;
        langCycle.textContent = words[i];
        langCycle.classList.add('is-flipping');
      }, 2000);
    }
  }

  /* ─── Equipment grid filter (equipment.html) ─── */
  const filterChips = $$('.equipment__filters .chip');
  const equipmentGrid = $('#equipmentGrid');
  if (filterChips.length && equipmentGrid) {
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.forEach((c) => c.classList.toggle('is-active', c === chip));
        const filter = chip.dataset.filter;
        $$('.equip-card', equipmentGrid).forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ─── Legal-page TOC active link on scroll ─── */
  const tocLinks = $$('.legal-toc a');
  if (tocLinks.length) {
    const headings = tocLinks
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    if (headings.length) {
      const tocIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const id = e.target.id;
              tocLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      headings.forEach((h) => tocIO.observe(h));
    }
  }
})();
