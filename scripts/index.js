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



// edit popups & functions & btns
popupProfileOpenBtn.addEventListener('click', () => {
    openPopup(popupEditProfile);
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
formElementEdit.addEventListener('submit', editFormSubmitHandler);

// add popups & functions & btns
popupCardOpenBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
});

popupAddCardCloseBtn.addEventListener('click', () => {
    closePopupWindow(popupAddCard);
});


// img 
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
    const data = { name: inputName.value, link: inputLink.value}
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


