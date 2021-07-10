import './index.css';

import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avaEditButton = document.querySelector('.profile__edit-avatar');
const formElement = document.querySelector('.popup__form_type_edit'); //форма попап
const addForm = document.querySelector('.popup__form_type_add'); //форма попап 2
const avaForm = document.querySelector('.popup__form_type_avatar');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const pageConf = {
  imagePopupSel: '.popup_type_image',
  editPopupSel: '.popup_type_edit-form',
  addPopupSel: '.popup_type_add-card',
  deletePopup: '.popup_type_delete',
  avaEditPopup: '.popup_type_avatar',
  profileName: '.profile__name',
  profileInfo: '.profile__description',
  avatar: '.profile__avatar',
  idSelector: '.profile__id',
  containerSel: '.elements',
  templateSel: '#el-template',
  templateSelNoDel: '#el-template-nodelete'
};

const idUser = document.querySelector(pageConf.idSelector);

//Токен: 611f87d3-15db-448a-8813-81293f26a18d
//Идентификатор группы: cohort-25

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '611f87d3-15db-448a-8813-81293f26a18d',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
.then((result) => {
  userInfo.setUserInfo(result.name, result.about);
  userInfo.setUserAvatar(result.avatar);
  userInfo.setUserId(result._id);
})
.catch((err) => {
  console.log(err);
});

function loadCards() {
  api.getInitialCards()
  .then((result) => {
    cardList.clear();
    result.forEach(card => {
      /*api.getUserInfo()
      .then((result) => {
        if(result._id === card.owner._id) {
          cardList.addItem(createCard(card.name, card.link, card.likes.length, 1));
        } else {
          cardList.addItem(createCard(card.name, card.link, card.likes.length, 2));
        }
      })
      .catch((err) => {
        console.log(err);
      });*/
      if(idUser.textContent === card.owner._id) {
        cardList.addItem(createCard(card.name, card.link, card.likes.length, card.likes, card._id, 1));
      } else {
        cardList.addItem(createCard(card.name, card.link, card.likes.length, card.likes, card._id, 2));
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

loadCards();

const popupWithImage = new PopupWithImage(pageConf.imagePopupSel);

const userInfo = new UserInfo({nameSelector: pageConf.profileName, infoSelector: pageConf.profileInfo, avaSelector: pageConf.avatar, idSelector: pageConf.idSelector});

function createCard(place, link, likes, likesArray, cardId, idType) {

  const card = new Card(place, link, likes, likesArray, pageConf.templateSel, idType, cardId, {
    handleCardClick: () => {
      popupWithImage.open({name: place, link: link});
    },
    handleDeleteClick: () => {
      deletePopup.open(cardId);
    },
    handleLike: () => {
          api.setLike(cardId)
          .then(() => {

          })
          .catch((err) => {
            console.log(err);
          })
      },
      handleDislike: () => {
        api.deleteLike(cardId)
          .then(() => {

          })
          .catch((err) => {
            console.log(err);
          })
      },
    userId: userInfo.getUserInfo().id
  }).generateCard();

  return card;
}

const editPopup = new PopupWithForm(
  pageConf.editPopupSel,
  (data) => {
    //userInfo.setUserInfo(data['name-input'], data['job-input']);

    editPopup.renderLoading(true);
    api.updateUserInfo(data['name-input'], data['job-input'])
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {editPopup.renderLoading(false);})
    editPopup.close();
  },
  ()=>{formEditValidator.hideErrors();}
);

const addPopup = new PopupWithForm(
  pageConf.addPopupSel,
  (data) => {
    addPopup.renderLoading(true);
    api.addNewCard(data['place-input'], data['link-input'])
    .then((result) => {
      cardList.addItem(createCard(result.name, result.link, result.likes.length, result.likes, result._id, 1));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {addPopup.renderLoading(false);})
    //cardList.addItem(createCard(data['place-input'], data['link-input']));

    formAddValidator.disableButton();
    addPopup.close();
  },
  ()=>{formAddValidator.hideErrors();}
);

const deletePopup = new PopupDelete(
  pageConf.deletePopup,
  (cardId) => {
    deletePopup.renderLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        deletePopup.close();
        loadCards();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {deletePopup.renderLoading(false);})
  }
);

const avatarPopup = new PopupWithForm(
  pageConf.avaEditPopup,
  (data) => {
    avatarPopup.renderLoading(true);
    api.updateAvatar(data['ava-input'])
    .then((result) => {
      userInfo.setUserAvatar(result.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {avatarPopup.renderLoading(false);})
    avatarPopup.close();
  },
  ()=>{avaEditValidator.hideErrors();}
);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  }
}, pageConf.containerSel);

//cardList.renderer();

popupWithImage.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

editButton.addEventListener('click', function () {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.info;

  editPopup.open();
});

addButton.addEventListener('click', function () {
  addPopup.open();
});

avaEditButton.addEventListener('click', function () {
  avatarPopup.open();
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

const avaEditValidator = new FormValidator(formConfig, avaForm);
avaEditValidator.enableValidation();
