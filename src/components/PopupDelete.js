import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, del) {
    super(popupSelector);

    this._delete = del;

    this._deleteButton = this._popup.querySelector('.popup__submit_type_delete');

    this._submitBt = this._popup.querySelector('.popup__submit');
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {  //перезапис
    super.setEventListeners();

    this._deleteButton.addEventListener('click', () => {
      this._delete(this._cardId);
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitBt.textContent = 'Удаление...';
    } else {
      this._submitBt.textContent = 'Да';
    }
  }

  deleteCard() {
    this._card.remove();
  }

}
