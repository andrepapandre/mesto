import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popup, handleFormSubmit}) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  getInputValues() {
    this.inputObj = {};
    this.inputList.forEach((input) => {
      this.inputObj[input.name] = input.value;
    });
    return this.inputObj;
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setInputValues(data) {
    this.inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setLoadText(text){
    this.textSave = this._form.querySelector('.popup__save')
    this.textSave.textContent = text
    console.log(this.textSave);
  }

  setEventListeners() {
    this.submit = () => {
      this._handleFormSubmit(this.getInputValues());
    };
    this._popup.addEventListener("submit", this.submit);
    super.setEventListeners();
  }
}
