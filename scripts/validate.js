const checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;

    const formSection = inputElement.closest('.popup__section');
    const errorElement = formSection.querySelector('.popup__input-error');

    if (isValid) {
        hideInputError(errorElement)
    } else {
        showInputError(errorElement, inputElement.validationMessage)
    }
}

const showInputError = (errorElement, errorMessage) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_inactive");
}

const hideInputError = (errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove("popup__input-error_inactive");
}




const toggleButtonState = (inputList, buttonElement) => {
    const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);

    if (hasNotValidInput) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.firstElementChild.classList.add('popup__save_black');
        buttonElement.classList.add("popup__submit_inactive")
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.firstElementChild.classList.remove('popup__save_black');
        buttonElement.classList.remove("popup__submit_inactive");
    }
};



const setEventListeners = (formElement) => {

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    })

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const submitButton = formElement.querySelector('.popup__submit');

    toggleButtonState(inputList, submitButton);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, submitButton);
            event.target.reset();


        })
    })
}



const enableValidation = () => {

    const formList = document.querySelectorAll('.popup__form');

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    })

}

enableValidation();
