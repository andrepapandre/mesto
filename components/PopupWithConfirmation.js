import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._popup = popup;
    this._handleFormSubmit = handleFormSubmit;
    this._selector = "popup_opened";
  }



  setCallback(func) {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      this._handleFormSubmit();
      func();
      e.preventDefault();

    });

  }
}
