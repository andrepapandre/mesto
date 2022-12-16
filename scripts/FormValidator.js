export class FormValidator {
  constructor(selectors) {
    this._formSelector = selectors.formSelector;
    this._formInput = selectors.formInput;
    this._formSubmit = selectors.formSubmit;
    this._formSection = selectors.formSection;
  }

  _checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;

    const formSection = inputElement.closest(".popup__section");
    const errorElement = formSection.querySelector(".popup__input-error");

    if (isValid) {
      this._hideInputError(errorElement);
    } else {
      this._showInputError(errorElement, inputElement.validationMessage);
    }
  };

  _showInputError = (errorElement, errorMessage) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_inactive");
  };

  _hideInputError = (errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_inactive");
  };

  _toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.firstElementChild.classList.add("popup__save_black");
      buttonElement.classList.add("popup__submit_inactive");
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.firstElementChild.classList.remove("popup__save_black");
      buttonElement.classList.remove("popup__submit_inactive");
    }
  };

  _setEventListeners = (formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(this._formInput));
    const submitButton = formElement.querySelector(this._formSubmit);

    this._toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  };

  enableValidation = () => {
    const formList = document.querySelectorAll(this._formSelector);
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  };
}

export const selectors = {
  formSelector: ".popup__form",
  formInput: ".popup__input",
  formSubmit: ".popup__submit",
  formSection: ".popup__section",
};
