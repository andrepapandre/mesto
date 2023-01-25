export class Card {
  constructor(item, templateCard, handleCardClick) {
    this._templateCard = templateCard;
    this._link = item.link;
    this._name = item.name;
    this._handleCardClick = handleCardClick;
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

  _setEventListener() {
    this._likeButton.addEventListener("click", () => {
      this._likeHandler();
    });

    this._bucketButton.addEventListener("click", () => {
      this._bucketHandler();
    });

    this._imageButton.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._linkPic = this._element.querySelector(".element__image");
    this._linkPuc = this._element.querySelector(".element_image");
    this._linkPic.src = this._link;
    this._textCard = this._element.querySelector(".element__title");
    this._textCard.textContent = this._name;
    this._linkPic.alt = this._textCard.textContent;
    this._likeButton = this._element.querySelector(".element__like");
    this._bucketButton = this._element.querySelector(".element__delete-btn");
    this._imageButton = this._element.querySelector(".element__image");
    this._setEventListener();
    return this._element;
  };
}
