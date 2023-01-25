import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;

    this._pictureForPopup = this._popup.querySelector(".popup__image");
    this._nameForPopup =  this._popup.querySelector(".popup__name");
    this._popupImgShow =  this._popup.querySelector(".popup_image");
  }

  openPopup(name, link) {
    super.openPopup();
    this._pictureForPopup.src = link;
    this._nameForPopup.textContent = name;
    this._pictureForPopup.alt = this._nameForPopup.textContent;

  }
}
