import View from './View.js';

class NavigationView extends View {
  _parentElement = document.querySelector('.header');

  _init() {
    this._setMobileNavigation();
    this._setSmoothScolling();
    this._setStickyNavigation();
  }

  _setMobileNavigation() {
    const btnNav = document.querySelector('.header-nav__mobile-btn');
    btnNav.addEventListener('click', this._toggleNavMenu.bind(this));
  }

  _setSmoothScolling() {
    const allLinks = document.querySelectorAll('a:link');
    allLinks.forEach(link => {
      link.addEventListener(
        'click',
        this._handleScrollFromLink.bind(this, link)
      );
    });
  }

  _setStickyNavigation() {
    const sectionHeroEl = document.querySelector('.section-hero');
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];

        if (!ent.isIntersecting) {
          document.body.classList.add('sticky');
        } else {
          document.body.classList.remove('sticky');
        }
      },
      {
        root: null, // in the view port
        threshold: 0,
        rootMargin: '-80px',
      }
    );

    obs.observe(sectionHeroEl);
  }

  _toggleNavMenu() {
    this._parentElement.classList.toggle('nav-open');
  }

  _handleScrollFromLink(link, e) {
    //prevent default of moving to section by #
    e.preventDefault();

    const href = link.getAttribute('href');

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    if (href !== '#' && href.startsWith('#')) {
      const section = document.querySelector(href);
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }

    if (link.classList.contains('header-nav__link'))
      this._parentElement.classList.toggle('nav-open');
  }
}

export default new NavigationView();
