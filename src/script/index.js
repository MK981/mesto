import '../pages/index.css';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form_type_edit'); //форма попап
const addForm = document.querySelector('.popup__form_type_add'); //форма попап 2

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

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

const popupWithImage = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

const editPopup = new PopupWithForm(
  '.popup_type_edit-form',
  (data) => {
    userInfo.setUserInfo(data['name-input'], data['job-input']);
    editPopup.close();
  }
);

const addPopup = new PopupWithForm(
  '.popup_type_add-card',
  (data) => {
    const newData = [data];
    const newCard = new Section({
      items: newData,
      renderer: (item) => {
        const card = new Card(item['place-input'], item['link-input'], '#el-template', {
          handleCardClick: () => {
            popupWithImage.open({name: item['place-input'], link: item['link-input']});
          }
        }).generateCard();
        newCard.addItem(card);
      }
    }, '.elements');

    newCard.renderer();

    formAddValidator.disableButton();
    addPopup.close();
  }
);


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.link, '#el-template', {
    handleCardClick: () => {
      popupWithImage.open({link: item.link, name: item.name});
    }
  }
    ).generateCard();
    cardList.addItem(newCard);
  }
}, '.elements');

cardList.renderer();

popupWithImage.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();


editButton.addEventListener('click', function () {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;

  editPopup.open();
});

addButton.addEventListener('click', function () {
  addPopup.open();
});

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const formEditValidator = new FormValidator(formConfig, formElement);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(formConfig, addForm);
formAddValidator.enableValidation();
