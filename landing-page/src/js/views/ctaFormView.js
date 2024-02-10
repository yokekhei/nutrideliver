import View from './View.js';

class CtaFormView extends View {
  _parentElement = document.querySelector('.cta__form');
  _ctaFormInputItemsEl = this._parentElement.querySelectorAll('.form-item');

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener(
      'submit',
      this._handleSubmit.bind(this, handler)
    );
  }

  _handleSubmit(handler, e) {
    e.preventDefault();

    const dataArr = [...new FormData(this._parentElement)];
    const data = Object.fromEntries(dataArr);
    const dataObject = {
      subject: 'Sign up',
      emailBody: `Full Name: ${data.full_name}<br>
      Email Address: ${data.email}<br>
      Social Media: ${data.select_where}`,
      viewPosition: this._getPosition(),
    };

    handler(dataObject);
    this._reset();
  }

  _reset() {
    this._ctaFormInputItemsEl.forEach(e => {
      const input = e.querySelector('input') || e.querySelector('select');
      input.value = '';
    });
  }
}

export default new CtaFormView();
