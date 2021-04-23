let editButton = document.querySelector('.profile__rectangle');
let closeButton = document.querySelector('.popup__close');
let profName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let popup = document.querySelector('.popup');
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

function showPopup() {
  nameInput.value = profName.textContent;
  jobInput.value = description.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    profName.textContent = nameValue;
    description.textContent = jobValue;

    closePopup();
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
