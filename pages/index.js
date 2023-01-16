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
//
const classPopupEdit = new Popup(popupEditProfile);
classPopupEdit.setEventListeners();

const classPopupAdd = new Popup(popupAddCard);
classPopupAdd.setEventListeners();

const validationforAddCard = new FormValidator(selectors, formElementEdit);
const validationforEditCard = new FormValidator(selectors, formElementAdd);

function handleCardClick(name, link) {
  const card = new PopupWithImage(name, link);
  card.openPopup();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup
const obj = { namer, jober };
const userInfo = new UserInfo(obj);
const fan = userInfo.getUserInfo();

const editFormSubmitHandler = (event) => {
  event.preventDefault();
  // -
  const popup = new Popup(popupEditProfile);
  popup.closePopupWindow();
};

popupProfileOpenBtn.addEventListener("click", () => {
  nameInput.value = fan.namer.textContent;
  jobInput.value = fan.jober.textContent;
  validationforEditCard.resetValidation();
  const popupWithForm = new PopupWithForm(popupEditProfile, editFormSubmitHandler);
  popupWithForm.openPopup();
  popupWithForm.setEventListeners();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
popupCardOpenBtn.addEventListener("click", () => {
  validationforAddCard.resetValidation();
  const popup = new Popup(popupAddCard);
  popup.openPopup();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// render and create cards

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

const cardsRender = new Section({
  items: cardsArray,
  renderer: (item) => {
    const card = new Card(
      item,
      templateCard,
      handleCardClick
    );
    const carding = card.generateCard();
    container.prepend(carding);
  },
});
cardsRender.renderItems();

validationforAddCard.enableValidation();

validationforEditCard.enableValidation();
