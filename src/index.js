import { Card } from "./Card.js";
import { FormValidator, selectors } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import "./index.css";
import { data } from "browserslist";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
const cardsArray = [
  {
    name: "global",
    link: "https://sun9-73.userapi.com/impg/_YoBTxB92NMr1IdSshxkRlLnn2wvRSlF9w12Vw/NOhZGBD4yXY.jpg?size=1904x2160&quality=95&sign=89abaa5af7e093d9934de4273a9871c5&type=album",
  },
  {
    name: "global",
    link: "https://sun9-71.userapi.com/impg/HyLqNDTSnYbnPlxl5vJnbml-4CkDwcELRgIeXg/k6GZFq9le8w.jpg?size=1440x1920&quality=96&sign=fbd8b02761e2b4d14a2238f0ee6d6976&type=album",
  },
  {
    name: "global",
    link: "https://sun9-17.userapi.com/impg/09WUpzaX_zLhj_8l1wTXKBe-SZ_m8hc2eHzTCg/501hU48FAAA.jpg?size=1440x2160&quality=96&sign=f68ebcf000aa4ded60705e1ee56e075b&type=album",
  },
  {
    name: "global ",
    link: "https://sun9-80.userapi.com/impg/J-YoK7n8aW6uDxsEW2YMXXkRVi6WC-BF5_ibhg/yQd2JJuzlB8.jpg?size=1439x2160&quality=96&sign=38666c3dc2862d4fd467b07d06375ce1&type=album",
  },
  {
    name: "global",
    link: "https://sun9-39.userapi.com/impg/1ib61IMjI3TnVNUKJXI7fhbnZlI1CvGrpjDgLA/ROykMLgPE3g.jpg?size=1620x2160&quality=96&sign=9535bd64b2ed2c0873dc9a595f9f2308&type=album",
  },
  {
    name: "global",
    link: "https://sun9-81.userapi.com/impf/eNlPx6YoJwByg7Kz4ilHxCb8fG8-OSo6RV_tAQ/2rTNqv2egRc.jpg?size=1620x2160&quality=96&sign=d398f728015806fa9f1ab85e9c238063&type=album",
  },
];
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

function editFormSubmitHandler() {
  userInfo.setUserInfo();
  //не могу взять данные полей инпутов, туда никак ничего не приходит
}

const popupEdit = new PopupWithForm(".popup_edit", editFormSubmitHandler);
const userInfo = new UserInfo(obj);

popupProfileOpenBtn.addEventListener("click", function () {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.job;
  popupEdit.openPopup();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
function handleSubmitAdd() {
  const cardData = { link: inputLink.value, name: inputName.value };
  const card = createCard(cardData);
  cardsContainer.addItem(card);
  popupCard.closePopup();
  //не могу взять данные полей инпутов, туда никак ничего не приходит
}
const popupCard = new PopupWithForm(".popup_add", handleSubmitAdd);

popupCardOpenBtn.addEventListener("click", () => {
  popupCard.openPopup();
  validationforAddCard.resetValidation();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// render and create cards

const createCard = (item) => {
  const cardRender = new Card(item, templateCard, handleCardClick);
  const cardElement = cardRender.generateCard();
  container.prepend(cardElement);
  return cardElement;
};
const cardsContainer = new Section(
  {
    items: cardsArray,
    renderer: (item) => {
      createCard(item);
    },
  },
  "elements"
);
cardsContainer.renderItems()
validationforAddCard.enableValidation();
validationforEditCard.enableValidation();
