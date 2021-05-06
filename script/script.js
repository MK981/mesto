const editButton = document.querySelector('.profile__edit-button');
const profName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__add-button');
const elContainer = document.querySelector('.elements');

const editPopup = document.querySelector('.popup_type_edit-form'); //первый попап
const closeButtonF = document.querySelector('.popup__close_type_edit');

const addPopup = document.querySelector('.popup_type_add-card'); //второй попап
const closeButtonS = document.querySelector('.popup__close_type_add');

const imagePopup = document.querySelector('.popup_type_image'); //попап картинки
const closeButtonT = document.querySelector('.popup__close_type_image');

const formElement = document.querySelector('.popup__form_type_edit'); //форма попап 1
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const addForm = document.querySelector('.popup__form_type_add'); //форма попап 2
const placeInput = addForm.querySelector('.popup__input_type_place');
const linkInput = addForm.querySelector('.popup__input_type_link');

const elTemplate = document.querySelector('#el-template').content;

function fillForm () {
  nameInput.value = profName.textContent;
  jobInput.value = description.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profName.textContent = nameInput.value;
    description.textContent = jobInput.value;

    closePopup(editPopup);
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

  const element = elTemplate.querySelector('.elements__card').cloneNode(true);

  const elImage = element.querySelector('.elements__img');

  elImage.src = link;
  elImage.alt = name;
  element.querySelector('.elements__name').textContent = name;

  //кнопка лайка
  element.querySelector('.elements__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  //удаление
  element.querySelector('.elements__delete').addEventListener('click', function(evt) {
    evt.target.closest('.elements__card').remove();
  });

  //попап
  elImage.addEventListener('click', function(evt) {
    const imageLink = imagePopup.querySelector('.popup__img');
    const imageText = imagePopup.querySelector('.popup__text');

    openPopup(imagePopup);

    imageLink.src = evt.target.src;
    imageLink.alt = name;
    imageText.textContent = name;

  });

  return element;
}

initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  elContainer.append(newCard);
});


function addFormSubmit (evt) {
  evt.preventDefault();

  const newCard = createCard(placeInput.value, linkInput.value);
  elContainer.prepend(newCard);

  closePopup(addPopup);
}


editButton.addEventListener('click', function () {
  fillForm();
  openPopup(editPopup);
});
addButton.addEventListener('click', function () {openPopup(addPopup);});
closeButtonF.addEventListener('click', function () {closePopup(editPopup)});
closeButtonS.addEventListener('click', function () {closePopup(addPopup)});
closeButtonT.addEventListener('click', function () {closePopup(imagePopup)});
formElement.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addFormSubmit);
