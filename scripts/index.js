import { Card, cardsArray } from './Card.js';
import { FormValidator, selectors} from './FormValidator.js'


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

const handleDeleteCard = (event) => {
  const target = event.target;
  const itemRemove = target.closest(".element");
  itemRemove.remove();
};

const setBascketListener = (el) => {
  const addBtnDelete = el.querySelector(".element__delete-btn");
  addBtnDelete.addEventListener("click", handleDeleteCard);
};

const handleCloseByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupWindow(popupImgShow);
  }
};

const handleEsc = (evt) => {
  if (evt.keyCode === 27) {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((popupEl) => {
      closePopupWindow(popupEl);
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// img popup: handlers
popupImgShowCloseBtn.addEventListener("click", () => {
  closePopupWindow(popupImgShow);
});
popupImgShow.addEventListener("click", handleCloseByOverlay);

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
  openPopup(popupEditProfile);
});

popupEditProfileCloseBtn.addEventListener("click", () => {
  closePopupWindow(popupEditProfile);
});

popupEditProfile.addEventListener("click", handleCloseByOverlay);
formElementEdit.addEventListener("submit", editFormSubmitHandler);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
popupCardOpenBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
});

popupAddCardCloseBtn.addEventListener("click", () => {
  closePopupWindow(popupAddCard);
});

popupAddCard.addEventListener("click", (evt) => {
  const click = evt.composedPath();
  if (!click.includes(formElementAdd)) {
    closePopupWindow(popupAddCard);
  }
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Card.js submit and generation cards from array
const handleSubmitAdd = (event) => {
  event.preventDefault();
  const setCard = { link: inputLink.value, name: inputName.value };
  const carding = new Card(setCard, templateCard, popupImgShow, pictureForPopup, nameForPopup, openPopup, closePopupWindow);
  closePopupWindow(popupAddCard);
  carding.generateCard(container);
  event.submitter.classList.add("popup__submit_inactive");
  event.submitter.setAttribute("disabled", true);
  event.target.reset();
};
formElementAdd.addEventListener("submit", handleSubmitAdd);

cardsArray.forEach((item) => {
  const cardRender = new Card(item, templateCard, popupImgShow, pictureForPopup, nameForPopup, openPopup, closePopupWindow);
  cardRender.generateCard(container);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FormValidator.js validation enable

const enableValidation = new FormValidator(selectors);
enableValidation.enableValidation();