export default class MoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};

    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.more-label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Переглянути ще';
    this.refs.spinner.classList.add('is-hidden');
    this.refs.spinner.classList.remove('spinner-icon');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Загружається...';
    this.refs.spinner.classList.remove('is-hidden');
    this.refs.spinner.classList.add('spinner-icon');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
