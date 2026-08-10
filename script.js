
document.addEventListener('DOMContentLoaded', () => {

  
  const header = document.querySelector('.site-header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });


  
  const sections = document.querySelectorAll('main section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.main-nav a[href^="#"]');

  const setActiveLink = (id) => {
    navAnchors.forEach(a => {
      const isMatch = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('active', isMatch && !a.classList.contains('btn'));
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  }


  
  const revealTargets = document.querySelectorAll(
    '.feature-card, .menu-card, .about-box, .section-head, .hero-inner, .cta-inner'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in-view'));
  }


  
  const headerHeight = () => header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
