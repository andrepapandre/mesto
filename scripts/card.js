export const cardsArray = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Ревью ❤️",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "За",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Cпасибо",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export class Card {
  constructor(item, templateCard, popupImgShow, pictureForPopup, nameForPopup, openPopup, closePopupWindow) {
    this._templateCard = templateCard;
    this._link = item.link;
    this._name = item.name;
    this._popupImgShow = popupImgShow;
    this._pictureForPopup = pictureForPopup;
    this._nameForPopup = nameForPopup;
    this._openPopup = openPopup;
    this._closePopupWindow = closePopupWindow;
  }

  _getTemplate() {
    const cardElem = this._templateCard.content.cloneNode(true).children[0];
    return cardElem;
  }

  _likeHandler = () => {
    this._likeButton.classList.toggle("element__like_black");
  };

  _bucketHandler = () => {
    this._element.remove();
  };

  _closePopupWindow() {
    this._closePopupWindow(popupImgShow);
  }

  _popupImgLoop() {
    this._pictureForPopup.src = this._linkPic.src;
    this._nameForPopup.textContent = this._textCard.textContent;
    this._pictureForPopup.alt = this._nameForPopup.textContent;
    this._openPopup(this._popupImgShow);
  }

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._likeHandler();
    });

    this._bucketButton.addEventListener("click", () => {
      this._bucketHandler();
    });

    this._imageButton.addEventListener("click", () => {
      this._popupImgLoop();
    });

    this._popupImgShow.addEventListener("click", () => {
      this._handleCloseByOverlay();
    });
  }

  generateCard = (container) => {
    this._element = this._getTemplate();
    this._linkPic = this._element.querySelector(".element__image");
    this._linkPuc = this._element.querySelector(".element_image");
    this._linkPic.src = this._link;
    this._textCard = this._element.querySelector(".element__title");
    this._textCard.textContent = this._name;
    this._likeButton = this._element.querySelector(".element__like");
    this._bucketButton = this._element.querySelector(".element__delete-btn");
    this._imageButton = this._element.querySelector(".element__image");
    this._setEventListener();
    container.prepend(this._element);
  };
}

