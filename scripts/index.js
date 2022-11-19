const cardsArray = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const nameInput = document.getElementById('popup__input-name');
const jobInput = document.getElementById('popup__input-job');
const namer = document.querySelector('.profile__name');
const jober = document.querySelector('.profile__name-info');
const popupProfileOpenBtn = document.querySelector('.profile__edit-button');
const popupCardOpenBtn = document.querySelector('.profile__add-btn');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupImgShow = document.querySelector('.popup_image');
const popupAddCardCloseBtn = popupAddCard.querySelector('.popup__close-button');
const popupEditProfileCloseBtn = popupEditProfile.querySelector('.popup__close-button');
const popupImgShowCloseBtn = popupImgShow.querySelector('.popup__close-img-button')
const popupCardImgLoop = document.querySelector('.popup__image');
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const templateCard = document.querySelector('.template');
const popupCardTextLoop = document.querySelector('.popup__name');
const container = document.querySelector('.elements');
const inputLink = document.getElementById('popup__input-link');
const inputName = document.getElementById('popup__input-title');
const page = document.querySelector('page');


// general functions
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};


const closePopupWindow = (popup) => {
    popup.classList.remove('popup_opened');

};

const deleteHandler = (event) => {
    const target = event.target;
    const removeItem = target.closest('.element');
    removeItem.remove();
};

const deleteItem = (el) => {
    const deleteAddBtn = el.querySelector('.element__delete-btn');
    deleteAddBtn.addEventListener('click', deleteHandler);
};

const likeHandler = (event) => {
    const target = event.target;
    target.classList.toggle('element__like_black');
};

const likeItem = (card) => {
    const likeBtn = card.querySelector('.element__like');
    likeBtn.addEventListener('click', likeHandler);
};

const escHandler = (evt) => {
    if(evt.keyCode === 27){
        closePopupWindow(popupAddCard);
        closePopupWindow(popupEditProfile)
    }
};

// edit popups & functions & btns
popupEditProfile.addEventListener('click', (evt) => {
    const click = evt.composedPath();
    if (!click.includes(formElementEdit)) {
        closePopupWindow(popupEditProfile);

    }
});


popupProfileOpenBtn.addEventListener('click', (evt) => {

    openPopup(popupEditProfile);

    console.log(evt.target)
    nameInput.value = namer.textContent;
    jobInput.value = jober.textContent;
});

popupEditProfileCloseBtn.addEventListener('click', () => {
    closePopupWindow(popupEditProfile);


});

const editFormSubmitHandler = (event) => {
    event.preventDefault();
    closePopupWindow(popupEditProfile);
    namer.textContent = nameInput.value;
    jober.textContent = jobInput.value;
};

popupProfileOpenBtn.addEventListener('keyup', escHandler)

formElementEdit.addEventListener('submit', editFormSubmitHandler);


// add popups & functions & btns
popupCardOpenBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
});

popupAddCardCloseBtn.addEventListener('click', () => {
    closePopupWindow(popupAddCard);
});

popupAddCard.addEventListener('click', (evt) => {
    const click = evt.composedPath();
    if (!click.includes(formElementAdd)) {
        closePopupWindow(popupAddCard);

    }
});

popupCardOpenBtn.addEventListener('keyup', escHandler)


// img Listener
popupImgShowCloseBtn.addEventListener('click', () => {
    closePopupWindow(popupImgShow);
});


// Cards render
const renderCard = (container, cards) => {
    container.prepend(cards);
};

const createCard = (item) => {
    const card = templateCard.content.cloneNode(true).children[0];
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').src = item.link;
    const imageBtn = card.querySelector('.element__image');
    imageBtn.addEventListener('click', () => {
        popupCardImgLoop.src = card.querySelector('.element__image').src;
        popupCardTextLoop.textContent = card.querySelector('.element__title').textContent;
        popupCardImgLoop.alt = popupCardTextLoop.textContent;
        openPopup(popupImgShow);
    });
    likeItem(card);
    deleteItem(card);
    return card;
};

const formSubmitAdd = (event) => {
    event.preventDefault();
    const data = { name: inputName.value, link: inputLink.value }
    const cards = createCard(data);
    renderCard(container, cards);
    closePopupWindow(popupAddCard);
    event.target.reset();
};

formElementAdd.addEventListener('submit', formSubmitAdd);

cardsArray.forEach((item) => {
    const cards = createCard(item);
    renderCard(container, cards);
})








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
        buttonElement.firstElementChild.style.color = "black";

        buttonElement.classList.add("popup__submit_inactive")
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.firstElementChild.style.color = "white";
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
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, submitButton)
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
