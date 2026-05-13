document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Slideshow
  const slides = document.querySelectorAll('.slideshow-slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  const progressBar = document.querySelector('.slideshow-progress-bar');
  if (!slides.length) return;

  let current = 0;
  const interval = 4000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    progressBar.style.animation = 'none';
    progressBar.offsetHeight;
    progressBar.style.animation = 'progressFill ' + (interval / 1000) + 's linear infinite';
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      resetTimer();
    });
  });

  let timer = setInterval(() => goTo((current + 1) % slides.length), interval);

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo((current + 1) % slides.length), interval);
  }
});
