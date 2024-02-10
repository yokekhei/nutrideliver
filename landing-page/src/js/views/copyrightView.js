import View from './View.js';

class CopyrightView extends View {
  _parentElement = document.querySelector('.year');

  _init() {
    const currentYear = new Date().getFullYear();
    this._parentElement.textContent = currentYear;
  }
}

export default new CopyrightView();
