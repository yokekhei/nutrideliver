import View from './View.js';
import icons from 'url:../../img/sprite.svg';
import overlayView from './overlayView.js';

class ModalView extends View {
  _parentElement = document.querySelector('.modal');

  addHandlerLoadData(handler) {
    window.addEventListener('load', handler);
  }

  _init() {
    document.addEventListener('keydown', this._keyDownHandler.bind(this));
  }

  _keyDownHandler(e) {
    if (
      e.key === 'Escape' &&
      !this._parentElement.classList.contains('u-hidden')
    ) {
      this._hide();
    }
  }

  _display() {
    this._parentElement
      .querySelector('.modal__close-btn')
      .addEventListener('click', this._hide.bind(this));
    this._parentElement.classList.remove('u-hidden');
  }

  _hide() {
    this._parentElement.classList.add('u-hidden');
    overlayView.hide();
  }

  _generateMarkup() {
    return `
      <svg class="modal__icon--status" name="${this._data.statusIconName}">
          <use xlink:href="${icons}#${this._data.statusIconName}"></use>
        </svg>
        <h4 class="heading-tertiary modal__title">
          ${this._data.title}
        </h4>
        <button class="modal__close-btn">
          <svg class="modal__icon--close" name="close-outline">
            <use xlink:href="${icons}#close-outline"></use>
          </svg>
        </button>
        <div class="modal__text">
          ${this._data.message}
        </div>
      `;
  }
}

export default new ModalView();
