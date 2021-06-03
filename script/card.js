import{ openPopup, imagePopup, imageLink, imageText } from './index.js';

class Card {

  constructor(name, link, tempSelector) {
    this._name = name;
    this._link = link;

    this._tempSelector = tempSelector;
  }

  _getTemplate() {
    const elTemplate = document.querySelector(this._tempSelector).content;
    const element = elTemplate.querySelector('.elements__card').cloneNode(true);

    return element;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
      this._setLikeClick(evt);
    });

    this._element.querySelector('.elements__delete').addEventListener('click', (evt) => {
      this._setDeleteClick(evt);
    });

    this._element.querySelector('.elements__img').addEventListener('click', () => {
      this._setImageClick();
    });
  }

  _setLikeClick(evt) {
    evt.target.classList.toggle('elements__like_active');
  }

  _setDeleteClick(evt) {
    evt.target.closest('.elements__card').remove();
  }

  _setImageClick() {
    openPopup(imagePopup);

    imageLink.src = this._link;
    imageLink.alt = this._name;
    imageText.textContent = this._name;
  }
}

export default Card;
