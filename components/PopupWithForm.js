import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popup = popup;
    this._file = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit;
  }

  getInputValues  () {
    this.inputObj = {};
    this._popup.querySelectorAll(".popup__input").forEach((item) => {
      this.inputObj[item.name] = item.value;
    });
    return this.inputObj;
  };

  setEventListeners() {
    this.submit = () =>{
      this._handleFormSubmit(this.getInputValues());
    };
    this._file.addEventListener("submit", this.submit);
    super.setEventListeners();
    console.log(this.submit);

  }

  openPopup() {
    super.openPopup();
  }

  _closePopup() {
    super.closePopup();
  }
}
