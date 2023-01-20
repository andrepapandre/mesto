import { Card, cardsArray } from "../components/Card.js";
import { FormValidator, selectors } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
import { data } from "browserslist";
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
const popupImages = document.querySelector(".popup_image");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//

const validationforAddCard = new FormValidator(selectors, formElementEdit);
const validationforEditCard = new FormValidator(selectors, formElementAdd);

//
const popupImage = new PopupWithImage(popupImages);
function handleCardClick(name, link) {
  popupImage.openPopup(name, link);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup
const obj = {
  nameSelector: "profile__name",
  jobSelector: "profile__name-info",
};
const obje = { name: nameInput, job: jobInput };

const userInfo = new UserInfo(obj);

const popupEdit = new PopupWithForm(popupEditProfile, editFormSubmitHandler);

popupProfileOpenBtn.addEventListener("click", () => {
  const one = userInfo.getUserInfo();
  nameInput.value = one.name;
  jobInput.value = one.job;
  popupEdit.getInputValues();
  popupEdit.openPopup();
});
const editFormSubmitHandler = (dataUser) => {
  userInfo.setUserInfo(dataUser);
  //?
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions

const handleSubmitAdd = () => {
  addCard.addItem();
  addCard.renderItems();
//?
  popup.closePopup();
};
const cardData = { link: inputLink.value, name: inputName.value };

const addCard = new Section(
  {
    items: [cardData],
    renderer: (item) => {
      createCard([(item.name, item.link)]);
    },
  },
  "elements"
);

const popup = new PopupWithForm(popupAddCard, handleSubmitAdd);
popupCardOpenBtn.addEventListener("click", () => {
  popup.openPopup();
  validationforAddCard.resetValidation();
});
;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// render and create cards

const createCard = (item) => {
  const cardRender = new Card(item, templateCard, handleCardClick);
  const cardElement = cardRender.generateCard();
  container.prepend(cardElement);
  return cardElement;
};

const cardsContainer = new Section({
  items: cardsArray,
  renderer: (item) => {
    createCard(item);
  },
});

cardsContainer.renderItems();

validationforAddCard.enableValidation();

validationforEditCard.enableValidation();
