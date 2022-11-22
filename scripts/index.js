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
const formElementEdit = document.querySelector('.popup__form-edit');
const formElementAdd = document.querySelector('.popup__form-add');
const templateCard = document.querySelector('.template');
const container = document.querySelector('.elements');
const inputLink = document.getElementById('popup__input-link');
const inputName = document.getElementById('popup__input-title');
const page = document.querySelector('.page');


// general functions
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    page.addEventListener('keyup', escHandler);
    popup.addEventListener('click', handleCloseByOverlay);


};

const closePopupWindow = (popup) => {
    popup.classList.remove('popup_opened');
    page.removeEventListener('keyup', escHandler);
    popup.removeEventListener('click', handleCloseByOverlay);

};

const basketHandler = (event) => {
    const target = event.target;
    const itemRemove = target.closest('.element');
    itemRemove.remove();
};

const bascketListener = (el) => {
    const addBtnDelete = el.querySelector('.element__delete-btn');
    addBtnDelete.addEventListener('click', basketHandler);
};

const likeHandler = (event) => {
    const target = event.target;
    target.classList.toggle('element__like_black');
};

const likeListener = (card) => {
    const likeBtn = card.querySelector('.element__like');
    likeBtn.addEventListener('click', likeHandler);
};

const escHandler = (evt) => {
    if (evt.keyCode === 27) {
        const popup = document.querySelectorAll('.popup');
        popup.forEach((popupEl) => {
            closePopupWindow(popupEl)
        });
    }

};

const handleCloseByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopupWindow(evt.target)
    }
}

// edit popups & functions & btns
popupProfileOpenBtn.addEventListener('click', () => {
    nameInput.value = namer.textContent;
    jobInput.value = jober.textContent;
    openPopup(popupEditProfile);
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

formElementEdit.addEventListener('submit', editFormSubmitHandler);


// add popups & functions & btns
popupCardOpenBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
    page.addEventListener('keyup', escHandler);

});

popupAddCardCloseBtn.addEventListener('click', () => {
    closePopupWindow(popupAddCard);
    page.removeEventListener('keyup', escHandler);

});

popupAddCard.addEventListener('click', (evt) => {
    const click = evt.composedPath();
    if (!click.includes(formElementAdd)) {
        closePopupWindow(popupAddCard);

    }
});


// Img setting
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
    item.name = item.alt;
    const imageBtn = card.querySelector('.element__image');
    imageBtn.addEventListener('click', () => {
        document.querySelector('.popup__image').src = card.querySelector('.element__image').src;
        document.querySelector('.popup__name').textContent = card.querySelector('.element__title').textContent;
        document.querySelector('.popup__image').alt = document.querySelector('.popup__name').textContent;
        openPopup(popupImgShow);
    });
    likeListener(card);
    bascketListener(card);
    return card;
};

const handleSubmitAdd = (event) => {
    event.preventDefault();
    const setCard = { name: inputName.value, link: inputLink.value }
    const card = createCard(setCard);
    renderCard(container, card);
    closePopupWindow(popupAddCard);
    event.submitter.classList.add("popup__submit_inactive"); 
    event.submitter.setAttribute("disabled", true); 
    event.target.reset();
};

formElementAdd.addEventListener('submit', handleSubmitAdd);

cardsArray.forEach((item) => {
    const card = createCard(item);
    renderCard(container, card);
})


