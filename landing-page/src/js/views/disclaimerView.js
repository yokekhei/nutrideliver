import View from './View.js';

class DisclaimerView extends View {
  _parentElement = document.querySelector('.disclaimer__content');
  _errorMessage = 'We could not find the disclaimer content. Please try again!';
  _message;
  _disclaimerSection = document.querySelector('.disclaimer');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _init() {
    this._disclaimerSection.addEventListener(
      'click',
      this._toggleAccordion.bind(this)
    );
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.disclaimer__btn');
    if (!btn) return;
    if (this._disclaimerSection.classList.contains('disclaimer__open')) {
      this._disclaimerSection.classList.remove('disclaimer__open');
    } else {
      this._disclaimerSection.classList.add('disclaimer__open');
    }
  }

  _generateMarkup() {
    return `
      <p class="disclaimer__text">
        The "${this._data.companyName}-Inspired Web Redesign" webpage showcased here is a
        project designed and developed by ${this._data.developerName} for educational and
        portfolio demonstration purposes only. It is not affiliated with
        ${this._data.domainName}, nor is it intended to impersonate or represent
        ${this._data.companyName}'s official website in any manner.
      </p>
      <p class="disclaimer__text strong">Key Points:</p>
      <ol class="disclaimer__items">
        <li class="disclaimer__text">
          <span class="strong">Educational Showcase:</span> This webpage is
          part of ${this._data.developerName}'s web developer portfolio and serves as an
          educational tool to demonstrate web development and design skills.
        </li>
        <li class="disclaimer__text">
          <span class="strong">Inspired by ${this._data.companyName}:</span> The design of this
          webpage is inspired by ${this._data.domainName} to showcase proficiency
          in web design and development, including HTML, CSS, and
          JavaScript.
        </li>
        <li class="disclaimer__text">
          <span class="strong">No Official Affiliation:</span> This project
          has no official affiliation or endorsement from
          ${this._data.domainName}.
        </li>
        <li class="disclaimer__text">
          <span class="strong">Not for Commercial Use:</span> This webpage
          is not intended for commercial use, and it does not facilitate
          actual commercial transactions.
        </li>
      </ol>
      <p class="disclaimer__text strong">
        Respect for Copyright and Branding:
      </p>
      <p class="disclaimer__text">
      ${this._data.developerName} respects ${this._data.companyName}'s intellectual property rights and branding
        guidelines. The use of ${this._data.companyName}'s design elements is solely for the
        purpose of educational demonstration, and no attempt is made to
        infringe upon any rights held by ${this._data.domainName}.
      </p>
      <p class="disclaimer__text strong">Please Note:</p>
      <p class="disclaimer__text">
        While every effort has been made to accurately mimic the appearance
        of ${this._data.companyName}'s website, this project is a design exercise and should
        not be mistaken for or used as the actual ${this._data.domainName}
        website.
      </p>
      <p class="disclaimer__text">
        If you have any questions or concerns regarding this project, please
        feel free to contact
        <a
          href="${this._data.contactUrl}"
          target="_blank"
          class="text-link disclaimer__link"
          >${this._data.developerName}</a>.
      </p>
  `;
  }
}

export default new DisclaimerView();
