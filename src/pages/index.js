import './index.css';

import {editButton, addButton, avaEditButton, formElement, addForm,
  avaForm, nameInput, jobInput, pageConf, formConfig} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Токен: 611f87d3-15db-448a-8813-81293f26a18d
//Идентификатор группы: cohort-25

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '611f87d3-15db-448a-8813-81293f26a18d',
    'Content-Type': 'application/json'
  }
});

function loadUserAndCards() {

  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      userInfo.setUserInfo(user.name, user.about);
      userInfo.setUserAvatar(user.avatar);
      userInfo.setUserId(user._id);

      cardList.clear();
      cards.forEach(card => {
        cardList.addItemServ(createCard(card));
      });
    })
    .catch((err) => {
      console.log(err)
    });

}

loadUserAndCards();

const popupWithImage = new PopupWithImage(pageConf.imagePopupSel);

const userInfo = new UserInfo({nameSelector: pageConf.profileName, infoSelector: pageConf.profileInfo, avaSelector: pageConf.avatar});

function createCard(data) {

  const card = new Card(data, pageConf.templateSel, {
    handleCardClick: () => {
      popupWithImage.open({name: data.name, link: data.link});
    },
    handleDeleteClick: () => {
      deletePopup.open(data._id, card._element);
    },
    handleLike: () => {
          api.setLike(data._id)
          .then((res) => {
            card.updateLikes(res.likes.length)
          })
          .catch((err) => {
            console.log(err);
          })
      },
      handleDislike: () => {
        api.deleteLike(data._id)
          .then((res) => {
            card.updateLikes(res.likes.length)
          })
          .catch((err) => {
            console.log(err);
          })
      },
    userId: userInfo.getUserInfo().id
  })

  const newCard = card.generateCard();

  return newCard;
}

const editPopup = new PopupWithForm(
  pageConf.editPopupSel,
  (data) => {
    editPopup.renderLoading(true);
    api.updateUserInfo(data['name-input'], data['job-input'])
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {editPopup.renderLoading(false);})
  },
  ()=>{formEditValidator.hideErrors();}
);

const addPopup = new PopupWithForm(
  pageConf.addPopupSel,
  (data) => {
    addPopup.renderLoading(true);
    api.addNewCard(data['place-input'], data['link-input'])
    .then((result) => {
      cardList.addItem(createCard(result));
      formAddValidator.disableButton();
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {addPopup.renderLoading(false);})
    //cardList.addItem(createCard(data['place-input'], data['link-input']));

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
        deletePopup.deleteCard();
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
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {avatarPopup.renderLoading(false);})
  },
  ()=>{avaEditValidator.hideErrors();}
);

const cardList = new Section(pageConf.containerSel);

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

const formEditValidator = new FormValidator(formConfig, formElement);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(formConfig, addForm);
formAddValidator.enableValidation();

const avaEditValidator = new FormValidator(formConfig, avaForm);
avaEditValidator.enableValidation();
