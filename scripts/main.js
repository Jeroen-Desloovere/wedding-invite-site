/* ============================================================
   WEDDING WEBSITE — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation scroll behaviour --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile nav toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Countdown Timer --- */
  const weddingDate = new Date('2026-09-05T16:00:00');

  function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    const days    = document.getElementById('cd-days');
    const hours   = document.getElementById('cd-hours');
    const minutes = document.getElementById('cd-minutes');
    const seconds = document.getElementById('cd-seconds');

    if (!days) return;

    if (diff <= 0) {
      ['days','hours','minutes','seconds'].forEach(id => {
        const el = document.getElementById('cd-' + id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    days.textContent    = String(d).padStart(2, '0');
    hours.textContent   = String(h).padStart(2, '0');
    minutes.textContent = String(m).padStart(2, '0');
    seconds.textContent = String(s).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* --- Scroll fade-in observer --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });

  /* --- RSVP Form --- */
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    const guestSelect = document.getElementById('guests');
    const additionalGuests = document.getElementById('additional-guests');
    const additionalGuestFields = additionalGuests
      ? Array.from(additionalGuests.querySelectorAll('[data-additional-guest]'))
      : [];
    const otherDietCheckbox = rsvpForm.querySelector('input[name="diet"][value="other"]');
    const otherDietDetails = document.getElementById('diet-other-details');
    const otherDietInput = document.getElementById('diet-other');

    function renderAdditionalGuests() {
      if (!guestSelect || !additionalGuests) return;

      const totalGuests = Number(guestSelect.value) || 1;
      const additionalCount = Math.max(totalGuests - 1, 0);

      additionalGuestFields.forEach((field, index) => {
        const shouldShow = index < additionalCount;
        const input = field.querySelector('input');

        field.hidden = !shouldShow;

        if (input) {
          input.disabled = !shouldShow;
          input.required = shouldShow;

          if (!shouldShow) {
            input.value = '';
          }
        }
      });
    }

    function toggleOtherDietDetails() {
      if (!otherDietCheckbox || !otherDietDetails || !otherDietInput) return;

      const shouldShow = otherDietCheckbox.checked;
      otherDietDetails.hidden = !shouldShow;
      otherDietInput.disabled = !shouldShow;
      otherDietInput.required = shouldShow;

      if (!shouldShow) {
        otherDietInput.value = '';
      }
    }

    if (guestSelect) {
      guestSelect.addEventListener('change', renderAdditionalGuests);
      renderAdditionalGuests();
    }

    if (otherDietCheckbox) {
      otherDietCheckbox.addEventListener('change', toggleOtherDietDetails);
      toggleOtherDietDetails();
    }

    rsvpForm.addEventListener('submit', e => {
      e.preventDefault();

      if (!rsvpForm.checkValidity()) {
        rsvpForm.reportValidity();
        return;
      }

      const btn = rsvpForm.querySelector('.btn--primary');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(rsvpForm);
      const body = new URLSearchParams(formData).toString();

      fetch(rsvpForm.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form submission failed');
        }

        rsvpForm.style.display = 'none';
        const success = document.getElementById('rsvp-success');
        const successMessage = document.getElementById('rsvp-success-message');
        const attendance = formData.get('attendance');

        if (successMessage) {
          successMessage.textContent = attendance === 'no'
            ? "We've received your RSVP and are sorry you cannot make it. Thank you for letting us know."
            : "We've received your RSVP and cannot wait to celebrate with you. See you in September!";
        }

        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })
      .catch(() => {
        btn.textContent = 'Send My RSVP';
        btn.disabled = false;
        alert('Sorry, something went wrong while sending your RSVP. Please try again.');
      });

      return;
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
