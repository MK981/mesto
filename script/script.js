let editButton = document.querySelector('.profile__rectangle');
let closeButton = document.querySelector('.popup__close');
let name1 = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

function showPopup() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
}

function closePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

nameInput.value = name1.textContent;
jobInput.value = description.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    name1.textContent = nameValue;
    description.textContent = jobValue;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
