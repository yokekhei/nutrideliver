import View from './View.js';

class OverlayView extends View {
  _parentElement = document.querySelector('.overlay');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _hide() {
    this._parentElement.classList.add('u-hidden');
  }

  _display() {
    this._parentElement.classList.remove('u-hidden');
  }
}

export default new OverlayView();
