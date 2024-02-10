// Credits:
// - https://github.com/jonasschmedtmann/complete-javascript-course/blob/master/18-forkify/final/src/js/views/View.js

import icons from 'url:../../img/sprite.svg';

export default class View {
  _data;
  _alertPosition;

  init() {
    this._init();
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    if (this._alertPosition) {
      this._parentElement.style.top = this._alertPosition.y + 'px';
    }
  }

  update(data) {
    if (!data) this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#spinner-outline"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    if (this._alertPosition) {
      const spinnerEl = this._parentElement.querySelector('.spinner');
      spinnerEl.style.top = this._alertPosition.y + 'px';
    }
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#warning-outline"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    if (this._alertPosition) {
      const errorEl = this._parentElement.querySelector('.error');
      errorEl.style.top = this._alertPosition.y + 'px';
    }
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#happy-outline"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    if (this._alertPosition) {
      const messageEl = this._parentElement.querySelector('.message');
      messageEl.style.top = this._alertPosition.y + 'px';
    }
  }

  refresh() {
    this._clear();
  }

  hide() {
    this._hide();
  }

  display() {
    this._display();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getPosition() {
    const coords = this._parentElement.getBoundingClientRect();
    return {
      x: coords.left + window.pageXOffset,
      y: coords.top + window.pageYOffset,
    };
  }

  _setAlertPosition(position) {
    this._alertPosition = position;
  }
}
