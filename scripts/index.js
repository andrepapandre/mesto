import { Card, cardsArray } from "./Card.js";
import { FormValidator, selectors } from "./FormValidator.js";


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
const popupImgShow = document.querySelector(".popup_image");
const popupAddCardCloseBtn = popupAddCard.querySelector(".popup__close-button");
const popupEditProfileCloseBtn = popupEditProfile.querySelector(
  ".popup__close-button"
);
const popupImgShowCloseBtn = popupImgShow.querySelector(
  ".popup__close-img-button"
);
const formElementEdit = document.querySelector(".popup__form-edit");
const formElementAdd = document.querySelector(".popup__form-add");
const templateCard = document.querySelector(".template");
const container = document.querySelector(".elements");
const inputLink = document.getElementById("popup__input-link");
const inputName = document.getElementById("popup__input-title");
const pictureForPopup = document.querySelector(".popup__image");
const nameForPopup = document.querySelector(".popup__name");
const page = document.querySelector(".page");
const popups = document.querySelectorAll(".popup");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// general functions
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  page.addEventListener("keyup", handleEsc);
};

const closePopupWindow = (popup) => {
  popup.classList.remove("popup_opened");
  page.removeEventListener("keyup", handleEsc);
};

const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popupEl) => {
      closePopupWindow(popupEl);
    });
  }
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopupWindow(popup);
    }
    if (evt.target.classList.contains("popup_opened")) {
      closePopupWindow(popup);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// img popup: handlers

function handleCardClick(name, link) {
  this._pictureForPopup.src = link;
  this._nameForPopup.textContent = name;
  this._pictureForPopup.alt = this._nameForPopup.textContent;
  openPopup(popupImgShow);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup: handlers and functions
const editFormSubmitHandler = (event) => {
  event.preventDefault();
  closePopupWindow(popupEditProfile);
  namer.textContent = nameInput.value;
  jober.textContent = jobInput.value;
};

popupProfileOpenBtn.addEventListener("click", () => {
  nameInput.value = namer.textContent;
  jobInput.value = jober.textContent;
  validationforEditCard.resetValidation();
  openPopup(popupEditProfile);
});

formElementEdit.addEventListener("submit", editFormSubmitHandler);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
popupCardOpenBtn.addEventListener("click", () => {
  validationforAddCard.resetValidation();
  openPopup(popupAddCard);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Card.js submit and generation cards from array

function createCard(item) {
  const cardRender = new Card(
  item,
  templateCard,
  handleCardClick,
  pictureForPopup,
  nameForPopup,
  openPopup,
  closePopupWindow
);
const cardElement = cardRender.generateCard();
return cardElement
}

function renderCard(item) {
  const cardRender = new Card(
    item,
    templateCard,
    handleCardClick,
    pictureForPopup,
    nameForPopup,
    openPopup,
    closePopupWindow
  );
  const carding = cardRender.generateCard();
  container.prepend(carding);
}

const handleSubmitAdd = (event) => {
  event.preventDefault();
  const setCard = { link: inputLink.value, name: inputName.value };
  container.prepend(createCard(setCard));
  closePopupWindow(popupAddCard);
};
formElementAdd.addEventListener("submit", handleSubmitAdd);

cardsArray.forEach((item) => {
  renderCard(item);
  
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FormValidator.js validation enable
const validationforAddCard = new FormValidator(selectors, formElementAdd);
validationforAddCard.enableValidation();

const validationforEditCard = new FormValidator(selectors, formElementAdd);
validationforEditCard.enableValidation();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////THAT'S ALL, WHAT I DO, BRO/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////