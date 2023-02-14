import { Card } from "../components/Card.js";
import { FormValidator, selectors } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api, apiConfig } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

import "./index.css";
import { data } from "browserslist";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// global scope
const nameInput = document.getElementById("popup__input-name");
const jobInput = document.getElementById("popup__input-job");
const namer = document.querySelector(".profile__name");
const jober = document.querySelector(".profile__name-info");
const popupWithAvatar = document.querySelector(".profile__image-button");
const popupProfileOpenBtn = document.querySelector(".profile__edit-button");
const popupCardOpenBtn = document.querySelector(".profile__add-btn");
const formElementEdit = document.querySelector(".popup__form-edit");
const formElementAdd = document.querySelector(".popup__form-add");
const formElementAvatar = document.querySelector(".popup__form-avatar");
const templateCard = document.querySelector(".template");
const container = document.querySelector(".elements");
const popupImages = document.querySelector(".popup_image");
const popupConfirm = document.querySelector(".popup_confirm");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
const validationforAddCard = new FormValidator(selectors, formElementAdd);
const validationforEditCard = new FormValidator(selectors, formElementEdit);
const validationforAvatar = new FormValidator(selectors, formElementAvatar);
//
const popupImage = new PopupWithImage(popupImages);
popupImage.setEventListeners();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup
const userInfoSelestors = {
  nameSelector: "profile__name",
  jobSelector: "profile__name-info",
  avatarSelector: "profile__image",
};

const popupAvatar = new PopupWithForm({
  popup: ".popup_avatar",
  handleFormSubmit: (data) => {
    popupAvatar.setLoadText("Сохранение...");
    const avatarData = {
      avatar: data.avatar,
    };
    api
      .editAvatarImage(avatarData)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        popupAvatar.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.setLoadText("Сохранить");
      });
  },
});
popupAvatar.setEventListeners();

popupWithAvatar.addEventListener("click", function () {
  // const userInfoData = userInfo.getUserInfo();
  popupAvatar.openPopup();
  validationforAvatar.resetValidation();
});

const popupEdit = new PopupWithForm({
  popup: ".popup_edit",
  handleFormSubmit: (data) => {
    popupEdit.setLoadText("Сохранение...");
    const userData = {
      name: data.editName,
      about: data.editAbout,
    };
    api
      .editUserInfo(userData)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo(res);
        popupEdit.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.setLoadText("Сохранить");
      });
  },
});
popupEdit.setEventListeners();
const userInfo = new UserInfo(userInfoSelestors);
const api = new Api(apiConfig);
const avatar = document.querySelector(".profile__image");

popupProfileOpenBtn.addEventListener("click", function () {
  api.getUserInfo().then((data) => {
    const userInfoData = userInfo.getUserInfo(data);
    nameInput.value = userInfoData.name;
    jobInput.value = userInfoData.job;
  });
  popupEdit.openPopup();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add popup: handlers and functions
const popupCard = new PopupWithForm({
  popup: ".popup_add",
  handleFormSubmit: (data) => {
    popupCard.setLoadText("Создание...");
    const cardData = {
      name: data.title,
      link: data.link,
    };
    api
      .addCard(cardData)
      .then((res) => {
        const card = createCard(res);
        cardsContainer.addItem(card);
        popupCard.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCard.setLoadText("Создать");
      });
  },
});
popupCard.setEventListeners();

popupCardOpenBtn.addEventListener("click", () => {
  popupCard.openPopup();
  validationforAddCard.resetValidation();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// render and create cards
const confirm = new PopupWithConfirmation({
  popup: popupConfirm,
  handleFormSubmit: () => {},
});
confirm.setEventListeners();

const createCard = (item) => {
  const cardRender = new Card(item, templateCard, ownerId, {
    handleCardClick: (data) => {
      popupImage.openPopup(data.name, data.link);
    },
    handleDeleteClick: (id) => {

      confirm.openPopup();

      api
        .deleteCard(id)
        .then((res, event) => {
          event.preventDefault();
          confirm.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLikeClick: (idCard) => {
      api
        .likeCard(idCard)
        .then((res) => {
          cardRender._likeHandler();
          cardRender.counterLikes(res.likes.length);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleDeleteLikeClick: (idCard) => {
      api
        .deleteLikeCard(idCard)
        .then((res) => {
          cardRender._likeHandler();
          cardRender.counterLikes(res.likes.length);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  });

  const cardElement = cardRender.generateCard();
  return cardElement;
};

const cardsContainer = new Section(
  {
    renderer: (data) => {
      const one = createCard(data);
      container.append(one);
    },
  },
  "elements"
);

validationforAddCard.enableValidation();
validationforEditCard.enableValidation();
validationforAvatar.enableValidation();

let ownerId = null;

Promise.all([api.getUserInfo(), api.renderCards()])
  .then((res) => {
    ownerId = res[0]._id;
    userInfo.setUserInfo(res[0]);
    console.log(res[1], res[0]);
    cardsContainer.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });
