// Sticky nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Reveal on scroll
const reveal = (els) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
};
const targets = document.querySelectorAll(
  '.section__head, .service, .why__item, .about__copy, .about__media, .contact__copy, .contact__form, .hero__stats li'
);
targets.forEach(el => el.classList.add('reveal'));
reveal(targets);

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (no backend — opens email client with prefilled message)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const message = (data.get('message') || '').toString().trim();

  if (!name || !phone || !message) {
    showNote('Uzupełnij wymagane pola: imię, telefon i opis zlecenia.', 'error');
    return;
  }

  const subject = encodeURIComponent(`Zapytanie ze strony — ${name}`);
  const body = encodeURIComponent(
    `Imię i nazwisko: ${name}\nTelefon: ${phone}\nE-mail: ${email || '—'}\n\nZakres prac:\n${message}\n\n— wysłano ze strony instalekotech.pl`
  );
  window.location.href = `mailto:biuro@instalekotech.pl?subject=${subject}&body=${body}`;
  showNote('Otwarto Twojego klienta poczty. Jeśli się nie otworzył, napisz bezpośrednio na biuro@instalekotech.pl.', 'success');
});

function showNote(text, type) {
  note.hidden = false;
  note.textContent = text;
  note.classList.remove('is-success', 'is-error');
  note.classList.add(type === 'success' ? 'is-success' : 'is-error');
}

// Subtle parallax on hero cards
const cards = document.querySelectorAll('.card-3d');
if (cards.length && window.matchMedia('(pointer: fine)').matches) {
  const visual = document.querySelector('.hero__visual');
  if (visual) {
    visual.addEventListener('mousemove', (e) => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cards.forEach((c, i) => {
        const depth = (i + 1) * 6;
        c.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0) rotate(var(--r))`;
      });
    });
    visual.addEventListener('mouseleave', () => {
      cards.forEach(c => { c.style.transform = ''; });
    });
  }
}
