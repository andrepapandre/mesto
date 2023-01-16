import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this._form = popup.querySelector(".popup__form");
    this._submit = submit


  }

  getInputValues() {
    this._hidi = this._form.querySelectorAll(".popup__input");
    console.log(this._hidi[0]);

  }

  setEventListeners () {
    this._form.addEventListener("submit", this._submit)
    super.setEventListeners()
    console.log(this._form)
  }
}
