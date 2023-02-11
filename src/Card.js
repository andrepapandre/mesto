export class Card {
  constructor(
    item,
    templateCard,
    ownerId,
    {
      handleCardClick,
      handleDeleteClick,
      handleLikeClick,
      handleDeleteLikeClick,
    }
  ) {
    this._templateCard = templateCard;
    this.likes = item.likes;
    this._link = item.link;
    this._name = item.name;
    this._idCard = item._id;
    this._userId = item.owner._id;
    this._ownerId = ownerId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
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
    if (this._userId === this._ownerId) {
      this._bucketButton.addEventListener("click", () => {
        this._bucketHandler();
        this._handleDeleteClick(this.idCard);
      });
    }

    this._imageButton.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  counterLikes(like) {
    this.counter = this._element.querySelector(".element__like-counter");
    this.counter.textContent = like;
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
    //
    const isLiked = this.likes.some((like) => like._id === this._ownerId);
    //
    const isOwner = this._userId !== this._ownerId;
    if (isOwner) {
      this._bucketButton.remove();
    }
    //
    if (!isLiked) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeClick(this._idCard);
        this.counter.textContent = this._likess;
      });
    }
    //
    if (isLiked) {
      this._likeHandler();
      this._likeButton.addEventListener("click", () => {
        this._handleDeleteLikeClick(this._idCard);
      });
    }
    //
    this.counterLikes();
    this.counter.textContent = this.likes.length;
    return this._element;
  };
}
