import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._popup = document.querySelector(popup);
    this._file = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.fom = this._file.querySelector('.popup__input')
    this.inputList = Array.from(this._file.querySelectorAll('.popup__input'))
  }

  getInputValues() {
    this.inputObj = {};
    this.inputList.forEach((input) => {
      this.inputObj[input.name] = input.value;
    });
    return this.inputObj;
    
  }


  setInputValues(data) {
    this.inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }


  setEventListeners() {
    this.submit = () => {
      this._handleFormSubmit(this.getInputValues());
    };
    this._popup.addEventListener("submit", this.submit);
    super.setEventListeners();
  }
}
