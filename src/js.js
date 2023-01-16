import { Card, cardsArray } from "../components/Card.js";
import { FormValidator, selectors } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css";

///////////////////////////////////n////////////////////////////////////////////////////////////////////////////////////////////////////
// global scope
const nameInput = document.getElementById("popup__input-name");
const jobInput = document.getElementById("popup__input-job");
const namer = document.querySelector(".profile__name");
const jober = document.querySelector(".profile__name-info");
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupCardOpenBtn = document.querySelector(".profile__add-btn");
const popupEditProfile = document.querySelector(".popup_edit");
const popupAddCard = document.querySelector(".popup_add");

const formElementEdit = document.querySelector(".popup__form-edit");
const formElementAdd = document.querySelector(".popup__form-add");
const templateCard = document.querySelector(".template");
const container = document.querySelector(".elements");
const inputLink = document.getElementById("popup__input-link");
const inputName = document.getElementById("popup__input-title");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// general functions

const testt = new Popup(popupEditProfile);
testt.setEventListeners();

const testt1 = new Popup(popupAddCard);
testt1.setEventListeners();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// img popup: handlers

function handleCardClick(name, link) {
  const card = new PopupWithImage(name, link);
  card.openPopup();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup: handlers and functions
const editFormSubmitHandler = (event) => {
  event.preventDefault();
  userInfo.setUserInfo(dataUser);
  const popup = new Popup(popupEditProfile);
  popup.closePopupWindow();
};

popupProfileOpenBtn.addEventListener("click", () => {
  nameInput.value = fan.namer.textContent;
  jobInput.value = fan.jober.textContent;
  validationforEditCard.resetValidation();
  const classpopup = new Popup(popupEditProfile);
  classpopup.openPopup();
});

formElementEdit.addEventListener("submit", editFormSubmitHandler);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
popupCardOpenBtn.addEventListener("click", () => {
  validationforAddCard.resetValidation();
  const popup = new Popup(popupAddCard);
  popup.openPopup();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Card.js submit and generation cards from array

function createCard(item) {
  const cardRender = new Card(item, templateCard, handleCardClick);
  const cardElement = cardRender.generateCard();
  return cardElement;
}

const handleSubmitAdd = (event) => {
  event.preventDefault();
  const setCard = { link: inputLink.value, name: inputName.value };
  container.prepend(createCard(setCard));
  const popup = new Popup(popupAddCard);
  popup.closePopupWindow();
};
formElementAdd.addEventListener("submit", handleSubmitAdd);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FormValidator.js validation enable
const validationforAddCard = new FormValidator(selectors, formElementAdd);
validationforAddCard.enableValidation();

const validationforEditCard = new FormValidator(selectors, formElementAdd);
validationforEditCard.enableValidation();

const cardsRender = new Section({
  items: cardsArray,
  renderer: (item) => {
    const card = new Card(
      item,
      templateCard,
      handleCardClick

      // openPopup,
      // closePopupWindow
    );
    const carding = card.generateCard();
    container.prepend(carding);
  },
});
cardsRender.renderItems();
