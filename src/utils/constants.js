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
  containerSel: '.elements',
  templateSel: '#el-template',
  templateSelNoDel: '#el-template-nodelete'
};

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

export {editButton, addButton, avaEditButton, formElement, addForm, avaForm, nameInput, jobInput, pageConf, formConfig};
