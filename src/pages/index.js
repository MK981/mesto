import './index.css';

import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form_type_edit'); //форма попап
const addForm = document.querySelector('.popup__form_type_add'); //форма попап 2

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const pageConf = {
  imagePopupSel: '.popup_type_image',
  editPopupSel: '.popup_type_edit-form',
  addPopupSel: '.popup_type_add-card',
  profileName: '.profile__name',
  profileInfo: '.profile__description',
  containerSel: '.elements',
  templateSel: '#el-template'
};

const popupWithImage = new PopupWithImage(pageConf.imagePopupSel);

const userInfo = new UserInfo({nameSelector: pageConf.profileName, infoSelector: pageConf.profileInfo});

function createCard(place, link) {
  const card = new Card(place, link, pageConf.templateSel, {
    handleCardClick: () => {
      popupWithImage.open({name: place, link: link});
    }
  }).generateCard();

  return card;
}

const editPopup = new PopupWithForm(
  pageConf.editPopupSel,
  (data) => {
    userInfo.setUserInfo(data['name-input'], data['job-input']);
    editPopup.close();
  },
  ()=>{formEditValidator.hideErrors();}
);

const addPopup = new PopupWithForm(
  pageConf.addPopupSel,
  (data) => {
    cardList.addItem(createCard(data['place-input'], data['link-input']));

    formAddValidator.disableButton();
    addPopup.close();
  },
  ()=>{formAddValidator.hideErrors();}
);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  }
}, pageConf.containerSel);

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
