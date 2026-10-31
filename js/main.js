document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) links.classList.remove('open');
    });
  }

  const current = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '/' && href === '/') ||
        (current === '/index.html' && href === '/')) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        answer.style.maxHeight = '0';
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          status.textContent = 'Message sent! We\'ll get back to you soon.';
          status.className = 'form-status success';
          form.reset();
        } else {
          throw new Error('Failed');
        }
      } catch {
        status.textContent = 'Something went wrong. Please email us directly.';
        status.className = 'form-status error';
      }

      btn.textContent = original;
      btn.disabled = false;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
