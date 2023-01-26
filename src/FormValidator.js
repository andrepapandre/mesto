export class FormValidator {
  constructor(selectors, form) {
    this._formSubmit = selectors.formSubmit;
    this._formInput = selectors.formInput;
    this._formSection = selectors.formSection;
    this._disabledButton = selectors.disabledButton;
    this._inputErrorClass = selectors.inputErrorClass;
    this._saveButton = selectors.saveButton;
    this._popupSection = selectors.popupSection;
    this._inputError = selectors.inputError;
    this._inputErrorIsActive = selectors.inputErrorIsActive;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._formInput));
    this.submitButton = this._form.querySelector(this._formSubmit);


  }

  _checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;

    const formSection = inputElement.closest(this._popupSection);
    const errorElement = formSection.querySelector(this._inputError);

    if (isValid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(errorElement, inputElement.validationMessage);
    }
  };

  _showInputError = (errorElement, errorMessage) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorIsActive);
  };

  _hideInputError = (errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(this._inputErrorIsActive);
  };

  _toggleButtonState = (buttonElement) => {
    const hasNotValidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.firstElementChild.classList.add(this._saveButton);
      buttonElement.classList.add(this._disabledButton);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.firstElementChild.classList.remove(this._saveButton);
      buttonElement.classList.remove(this._disabledButton);
    }
  };

  _setEventListeners = (formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      event.submitter.classList.add("popup__submit_inactive");
      event.submitter.setAttribute("disabled", true);
    });
    this._toggleButtonState(this.submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this.submitButton);
      });
    });
  };

  resetValidation = () => {
    this._toggleButtonState(this.submitButton);
    this._inputList.forEach((inputElement) => {
      const formSection = inputElement.closest(this._popupSection);
    const errorElement = formSection.querySelector(this._inputError);
      this._hideInputError(errorElement);
    });
  };

  enableValidation = () => {
    this._setEventListeners(this._form);
  };
}

export const selectors = {
  formSelector: ".popup__form",
  formInput: ".popup__input",
  formSubmit: ".popup__submit",
  formSection: ".popup__section",
  disabledButton: "popup__submit_disabled",
  saveButton: "popup__save_black",
  popupSection: ".popup__section",
  inputError: ".popup__input-error",
  inputErrorIsActive: "popup__input-error_active",
};

//   formInput: ".popup__input",
// formSubmit: ".popup__submit",
// formSection: ".popup__section",
// inactiveButtonClass: "popup__submit_inactive",
// inputErrorClass: "popup__input-error_active",
