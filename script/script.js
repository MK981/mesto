let editButton = document.querySelector('.profile__rectangle');
let profName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let addButton = document.querySelector('.profile__add-button');
let elContainer = document.querySelector('.elements');

let firstPopup = document.querySelector('.popup'); //первый попап
let closeButtonF = document.querySelector('.popup__close');

let secondPopup = document.querySelector('.sec-popup'); //второй попап
let closeButtonS = document.querySelector('.sec-popup__close');

let imagePopup = document.querySelector('.image-popup'); //попап картинки
let closeButtonT = document.querySelector('.image-popup__close');

let formElement = document.querySelector('.popup__form'); //форма попап 1
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

let secondForm = document.querySelector('.sec-popup__form'); //форма попап 2
let placeInput = secondForm.querySelector('.sec-popup__input_type_place');
let linkInput = secondForm.querySelector('.sec-popup__input_type_link');

function showPopup(type) {
  if(type === 1) {
    nameInput.value = profName.textContent;
    jobInput.value = description.textContent;
    firstPopup.classList.add('popup_opened');
  } else {
    secondPopup.classList.add('sec-popup_opened');
  }
}

function closePopup(type) {
  if(type === 1) {
    firstPopup.classList.remove('popup_opened');
  } else if (type === 2)  {
    secondPopup.classList.remove('sec-popup_opened');
  } else {
    imagePopup.classList.remove('image-popup_opened');
  }
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    profName.textContent = nameValue;
    description.textContent = jobValue;

    closePopup(1);
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

function add () {

  for (let i=0 ; i < initialCards.length ; i++) {

    const elTemplate = document.querySelector('#el-template').content;
    const element = elTemplate.querySelector('.elements__element').cloneNode(true);

    element.querySelector('.elements__img').src = initialCards[i].link;
    element.querySelector('.elements__img').alt = initialCards[i].name;
    element.querySelector('.elements__name').textContent = initialCards[i].name;

    //кнопка лайка
    element.querySelector('.elements__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('elements__like_active');
    });

    //удаление
    element.querySelector('.elements__delete').addEventListener('click', function(evt) {
      //console.log(evt);
      evt.target.offsetParent.remove();
    });

    //попап
    element.querySelector('.elements__overlay').addEventListener('click', function(evt) {

      let imageLink = imagePopup.querySelector('.image-popup__img');
      let imageText = imagePopup.querySelector('.image-popup__text');

      imagePopup.classList.add('image-popup_opened');

      imageLink.src = evt.path[1].children[0].src;
      imageLink.alt = evt.path[1].children[0].alt;
      imageText.textContent = evt.path[1].children[2].children[0].textContent;


      //console.log(evt);
      //evt.path[1].children[2].children[0].textContent;
    });

    elContainer.append(element);
  }

}

add();

function secondFormSubmit (evt) {
  evt.preventDefault();

  const elTemplate = document.querySelector('#el-template').content;
  const element = elTemplate.querySelector('.elements__element').cloneNode(true);

  element.querySelector('.elements__img').src = linkInput.value;
  element.querySelector('.elements__img').alt = placeInput.value;
  element.querySelector('.elements__name').textContent = placeInput.value;


  //кнопка лайка
  element.querySelector('.elements__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  //удаление
  element.querySelector('.elements__delete').addEventListener('click', function(evt) {
    evt.target.offsetParent.remove();
  });

  //попап
  element.querySelector('.elements__overlay').addEventListener('click', function(evt) {

    let imageLink = imagePopup.querySelector('.image-popup__img');
    let imageText = imagePopup.querySelector('.image-popup__text');

    imagePopup.classList.add('image-popup_opened');

    imageLink.src = evt.path[1].children[0].src;
    imageLink.alt = evt.path[1].children[0].alt;
    imageText.textContent = evt.path[1].children[2].children[0].textContent;

  });

  elContainer.prepend(element);

  closePopup(2);
}


editButton.addEventListener('click', function () {showPopup(1);});
addButton.addEventListener('click', function () {showPopup(2);});
closeButtonF.addEventListener('click', function () {closePopup(1)});
closeButtonS.addEventListener('click', function () {closePopup(2)});
closeButtonT.addEventListener('click', function () {closePopup(3)});
formElement.addEventListener('submit', formSubmitHandler);
secondForm.addEventListener('submit', secondFormSubmit);
