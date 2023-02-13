import { Card } from "../src/Card.js";
import { FormValidator, selectors } from "../src/FormValidator.js";
import { Section } from "../src/Section.js";
import { Popup } from "../src/Popup.js";
import { PopupWithImage } from "../src/PopupWithImage.js";
import { PopupWithForm } from "../src/PopupWithForm.js";
import { UserInfo } from "../src/UserInfo.js";
import { Api, apiConfig } from "../src/Api.js";
import { PopupWithConfirmation } from "../src/PopupWithConfirmation.js";

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
const validationforAddCard = new FormValidator(selectors, formElementAdd);
const validationforEditCard = new FormValidator(selectors, formElementEdit);
const validationforAvatar = new FormValidator(selectors, formElementAvatar);
//
const popupImage = new PopupWithImage(popupImages);
popupImage.setEventListeners();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit popup
const obj = {
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
const userInfo = new UserInfo(obj);
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
    popupCard.setLoadText("Сохранение...");
    const cardData = {
      name: data.title,
      link: data.link,
    };
    api
      .addCard(cardData)
      .then((res) => {
        const card = createCard(res);
        cardsContainer.addItem(card);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCard.setLoadText("Сохранить");
      });
    popupCard.closePopup();
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
  popup: ".popup_confirm",
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
        .then((res) => {
          console.log(res);

          confirm.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLikeClick: (idCard) => {
      api.likeCard(idCard).then((res) => {
        cardRender._likeHandler();
        cardRender.counterLikes(res.likes.length);
      });
    },
    handleDeleteLikeClick: (idCard) => {
      api.deleteLikeCard(idCard).then((res) => {
        cardRender._likeHandler();
        cardRender.counterLikes(res.likes.length);
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

let kok;
let ownerId = null;
Promise.all([api.getUserInfo(), api.renderCards()]).then((res) => {
  ownerId = res[0]._id;
  kok = userInfo.getUserInfo(res[0]);
  namer.textContent = kok.name;
  jober.textContent = kok.job;
  avatar.src = kok.avatar;
  console.log(res[1], res[0]);
  cardsContainer.renderItems(res[1]);
});
