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
const page = document.querySelector(".page");
const pictureForPopup = document.querySelector(".popup__image");
const nameForPopup = document.querySelector(".popup__name");

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

const likeHandler = (event) => {
  const target = event.target;
  target.classList.toggle("element__like_black");
};

const likeListener = (card) => {
  const likeBtn = card.querySelector(".element__like");
  likeBtn.addEventListener("click", likeHandler);
};

const handleEsc = (evt) => {
  if (evt.keyCode === 27) {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((popupEl) => {
      closePopupWindow(popupEl);
    });
  }
};

const handleCloseByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopupWindow(evt.target);
  }
};

// edit popups & functions & btns
popupProfileOpenBtn.addEventListener("click", () => {
  nameInput.value = namer.textContent;
  jobInput.value = jober.textContent;
  openPopup(popupEditProfile);
});

popupEditProfileCloseBtn.addEventListener("click", () => {
  closePopupWindow(popupEditProfile);
});

const editFormSubmitHandler = (event) => {
  event.preventDefault();
  closePopupWindow(popupEditProfile);
  namer.textContent = nameInput.value;
  jober.textContent = jobInput.value;
};

popupEditProfile.addEventListener("click", handleCloseByOverlay);
formElementEdit.addEventListener("submit", editFormSubmitHandler);

// add popups & functions & btns
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

popupEditProfile.addEventListener("click", handleCloseByOverlay);

// Img setting
popupImgShowCloseBtn.addEventListener("click", () => {
  closePopupWindow(popupImgShow);
});

popupImgShow.addEventListener("click", handleCloseByOverlay);

// Cards render
const renderCard = (container, cards) => {
  container.prepend(cards);
};

const createCard = (item) => {
  const card = templateCard.content.cloneNode(true).children[0];
  card.querySelector(".element__title").textContent = item.name;
  const imageBtn = card.querySelector(".element__image");
  imageBtn.addEventListener("click", () => {
    pictureForPopup.src = card.querySelector(".element__image").src;
    nameForPopup.textContent =
      card.querySelector(".element__title").textContent;
    pictureForPopup.alt = nameForPopup.textContent;
    openPopup(popupImgShow);
  });

  imageBtn.alt = item.name;
  imageBtn.src = item.link;
  likeListener(card);
  setBascketListener(card);
  return card;
};

const handleSubmitAdd = (event) => {
  event.preventDefault();
  const setCard = { name: inputName.value, link: inputLink.value };
  const card = createCard(setCard);
  renderCard(container, card);
  closePopupWindow(popupAddCard);
  event.submitter.classList.add("popup__submit_inactive");
  event.submitter.setAttribute("disabled", true);
  event.target.reset();
};

formElementAdd.addEventListener("submit", handleSubmitAdd);

cardsArray.forEach((item) => {
  const card = createCard(item);
  renderCard(container, card);
});

enableValidation(selectors);
