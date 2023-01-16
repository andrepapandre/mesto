import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(name, link, popup) {
    super(popup);
    this._name = name;
    this._link = link;
    this._pictureForPopup = document.querySelector(".popup__image");
    this._nameForPopup = document.querySelector(".popup__name");
    this._popupImgShow = document.querySelector(".popup_image");
  }

  openPopup() {
    this._pictureForPopup.src = this._link;
    this._nameForPopup.textContent = this._name;
    this._pictureForPopup.alt = this._nameForPopup.textContent;
    const popup = new Popup(this._popupImgShow);
    popup.openPopup();
    popup.setEventListeners();
  }
}
