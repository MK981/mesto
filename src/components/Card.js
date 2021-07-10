class Card {

  constructor(name, link, likes, likesArray, tempSelector, idType, cardId, {handleCardClick, handleDeleteClick, handleLike, handleDislike, userId}) {
    this._name = name;
    this._link = link;
    this._likes = likes;

    this._likesArray = likesArray;

    this._tempSelector = tempSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._idType = idType;
    this._cardId = cardId;

    this._userId = userId;
  }

  _getTemplate() {
      const elTemplate = document.querySelector(this._tempSelector).content;
      const element = elTemplate.querySelector('.elements__card').cloneNode(true);
      return element;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__img');
    this._delete = this._element.querySelector('.elements__delete');
    this._like = this._element.querySelector('.elements__like');
    this._setEventListeners();


    if(this._idType === 2) {
      this._delete.remove();
    }

    if (this._likesArray.some((like) => like._id === this._userId)) {
      this._like.classList.add('elements__like_active');
    }

    this._likeNumber = this._element.querySelector('.elements__like-number');
    this._likeNumber.textContent = this._likes;

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      if(this._like.classList.contains('elements__like_active')) {
        this._deleteLike();
      } else {
        this._setLike();
      }
    });

    this._delete.addEventListener('click', () => {
      this._setDeleteClick();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _setLike() {
    this._handleLike();
    this._like.classList.toggle('elements__like_active');
    this._plusLike();
  }

  _deleteLike() {
    this._handleDislike();
    this._like.classList.toggle('elements__like_active');
    this._minusLike();
  }

  _setDeleteClick() {
    //evt.target.closest('.elements__card').remove();
    this._handleDeleteClick();
  }


  _plusLike() {
    this._likeNumber.textContent = this._likes + 1;
  }

  _minusLike() {
    this._likeNumber.textContent = this._likes - 1;
  }

}

export default Card;
