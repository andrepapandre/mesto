export const cardsArray = [
  {
    name: ":)",
    link: "https://sun9-73.userapi.com/impg/_YoBTxB92NMr1IdSshxkRlLnn2wvRSlF9w12Vw/NOhZGBD4yXY.jpg?size=1904x2160&quality=95&sign=89abaa5af7e093d9934de4273a9871c5&type=album",
  },
  {
    name: "Михаил",
    link: "https://sun9-71.userapi.com/impg/HyLqNDTSnYbnPlxl5vJnbml-4CkDwcELRgIeXg/k6GZFq9le8w.jpg?size=1440x1920&quality=96&sign=fbd8b02761e2b4d14a2238f0ee6d6976&type=album",
  },
  {
    name: "Барсегян",
    link: "https://sun9-17.userapi.com/impg/09WUpzaX_zLhj_8l1wTXKBe-SZ_m8hc2eHzTCg/501hU48FAAA.jpg?size=1440x2160&quality=96&sign=f68ebcf000aa4ded60705e1ee56e075b&type=album",
  },
  {
    name: "Ревью ❤️",
    link: "https://sun9-80.userapi.com/impg/J-YoK7n8aW6uDxsEW2YMXXkRVi6WC-BF5_ibhg/yQd2JJuzlB8.jpg?size=1439x2160&quality=96&sign=38666c3dc2862d4fd467b07d06375ce1&type=album",
  },
  {
    name: "За",
    link: "https://sun9-39.userapi.com/impg/1ib61IMjI3TnVNUKJXI7fhbnZlI1CvGrpjDgLA/ROykMLgPE3g.jpg?size=1620x2160&quality=96&sign=9535bd64b2ed2c0873dc9a595f9f2308&type=album",
  },
  {
    name: "Cпасибо",
    link: "https://sun9-81.userapi.com/impf/eNlPx6YoJwByg7Kz4ilHxCb8fG8-OSo6RV_tAQ/2rTNqv2egRc.jpg?size=1620x2160&quality=96&sign=d398f728015806fa9f1ab85e9c238063&type=album",
  },
];

export class Card {
  constructor(
    item,
    templateCard,
    handleCardClick,
    pictureForPopup,
    nameForPopup,
    openPopup,
  ) {
    this._templateCard = templateCard;
    this._link = item.link;
    this._name = item.name;
    this._pictureForPopup = pictureForPopup;
    this._nameForPopup = nameForPopup;
    this._openPopup = openPopup;
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
