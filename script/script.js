let editButton = document.querySelector('.profile__edit-button');
let profName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let addButton = document.querySelector('.profile__add-button');
let elContainer = document.querySelector('.elements');

let firstPopup = document.querySelector('.popup_type_edit-form'); //первый попап
let closeButtonF = document.querySelector('.popup__close_type_edit');

let secondPopup = document.querySelector('.popup_type_add-card'); //второй попап
let closeButtonS = document.querySelector('.popup__close_type_add');

let imagePopup = document.querySelector('.popup_type_image'); //попап картинки
let closeButtonT = document.querySelector('.popup__close_type_image');

let formElement = document.querySelector('.popup__form_type_edit'); //форма попап 1
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

let secondForm = document.querySelector('.popup__form_type_add'); //форма попап 2
let placeInput = secondForm.querySelector('.popup__input_type_place');
let linkInput = secondForm.querySelector('.popup__input_type_link');

function fillForm () {
  nameInput.value = profName.textContent;
  jobInput.value = description.textContent;
}

function openPopup(popup) {
  fillForm();
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profName.textContent = nameInput.value;
    description.textContent = jobInput.value;

    closePopup(firstPopup);
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const elTemplate = document.querySelector('#el-template').content;
  const element = elTemplate.querySelector('.elements__card').cloneNode(true);

  let elImage = element.querySelector('.elements__img');

  elImage.src = link;
  elImage.alt = name;
  element.querySelector('.elements__name').textContent = name;

  //кнопка лайка
  element.querySelector('.elements__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  //удаление
  element.querySelector('.elements__delete').addEventListener('click', function(evt) {
    evt.target.closest('div').remove();
  });

  //попап
  element.querySelector('.elements__overlay').addEventListener('click', function(evt) {
    let imageLink = imagePopup.querySelector('.popup__img');
    let imageText = imagePopup.querySelector('.popup__text');

    imagePopup.classList.add('popup_opened');

    imageLink.src = evt.path[1].children[0].src;
    imageLink.alt = evt.path[1].children[0].alt;
    imageText.textContent = evt.path[1].children[2].children[0].textContent;
  });

  return element;
}

initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  elContainer.append(newCard);
});


function secondFormSubmit (evt) {
  evt.preventDefault();

  const newCard = createCard(placeInput.value, linkInput.value);
  elContainer.prepend(newCard);

  closePopup(secondPopup);
}


editButton.addEventListener('click', function () {openPopup(firstPopup);});
addButton.addEventListener('click', function () {openPopup(secondPopup);});
closeButtonF.addEventListener('click', function () {closePopup(firstPopup)});
closeButtonS.addEventListener('click', function () {closePopup(secondPopup)});
closeButtonT.addEventListener('click', function () {closePopup(imagePopup)});
formElement.addEventListener('submit', formSubmitHandler);
secondForm.addEventListener('submit', secondFormSubmit);
