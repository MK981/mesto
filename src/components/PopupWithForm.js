import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit, errors) {
    super(popupSelector);
    this._submit = submit;

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};

    this._hideErrors = errors;

    this._submitBt = this._popup.querySelector('.popup__submit');
  }

  _getInputValues() {

    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {  //перезапис
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
  });
  }

  close() {  //перезапис
    super.close();

    this._form.reset();
    this._hideErrors();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitBt.textContent = 'Сохранение...';
    } else {
      this._submitBt.textContent = 'Сохранить';
    }
  }
}
