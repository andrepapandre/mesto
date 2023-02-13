import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._popup = document.querySelector(popup);
    this.handleFormSubmit = handleFormSubmit;
    this._selector = "popup_opened";
  }

  setCallback() {
    super._setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._handleSubmitForm();
    });
  }
}
