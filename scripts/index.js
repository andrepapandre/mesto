const formElement = document.querySelector('.popup__form');
const nameInput = document.getElementById('popup__input-name');
const jobInput = document.getElementById('popup__input-job');
const namer = document.querySelector('.profile__name');
const jober = document.querySelector('.profile__name-info');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-btn');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const imgPopup = document.querySelector('.popup_image');
const closeAddPopup = addPopup.querySelector('.popup__close-button');
const closeEditPopup = editPopup.querySelector('.popup__close-button');
const closeImgPopup = imgPopup.querySelector('.popup__close-img-button')
const imgItem = document.querySelector('.popup__image');
const container = document.querySelector('.elements');
const addSubmitBtn = document.querySelector('.popup__form_add');
const itemTemplate = document.querySelector('.template');
const textImgItem = document.querySelector('.popup__name');

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

const likeItem = (el) => {
    const likeBtn = el.querySelector('.element__like');
    likeBtn.addEventListener('click', likeHandler);
};



// edit popups & functions & btns
editBtn.addEventListener('click', () => {
    openPopup(editPopup);
    nameInput.value = namer.textContent;
    jobInput.value = jober.textContent;
});

closeEditPopup.addEventListener('click', () => {
    closePopupWindow(editPopup);
});

const editFormSubmitHandler = (event) => {
    event.preventDefault();
    closePopupWindow(editPopup);
    namer.textContent = nameInput.value;
    jober.textContent = jobInput.value;
};
formElement.addEventListener('submit', editFormSubmitHandler);




// add popups & functions & btns
addBtn.addEventListener('click', () => {
    openPopup(addPopup);
});

closeAddPopup.addEventListener('click', () => {
    closePopupWindow(addPopup);
});

const formSubmitAdd = (event) => {
    event.preventDefault();
    const item = document.getElementById('popup__input-title').value;
    const link = document.getElementById('popup__input-link').value;
    if (item.length === 0 || link.length === 0) {
        alert('Введите название или ссылку');
    }
    else {
        renderItem(item, link);
    };
    closePopupWindow(addPopup);
    event.target.reset();
};
addSubmitBtn.addEventListener('submit', formSubmitAdd);




// img popups & functions & btns
const removeImgWindow = () => {
    closeImgPopup.addEventListener('click', () => {
        closePopupWindow(imgPopup);
    });
};




// Cards render
const getItemArray = (element) => {
    const el = itemTemplate.content.cloneNode(true).children[0];
    el.querySelector('.element__title').textContent = element.name;
    el.querySelector('.element__image').src = element.link;
    el.querySelector('.element__image').alt = element.name;
    container.prepend(el);
    likeItem(el);
    deleteItem(el);
    const imageBtn = el.querySelector('.element__image');
    imageBtn.addEventListener('click', () => {
        imgItem.src = element.link;
        textImgItem.textContent = element.name;
        openPopup(imgPopup);
        removeImgWindow();
    });
};


const renderItem = (text, link) => {
    const el = itemTemplate.content.cloneNode(true).children[0];
    el.querySelector('.element__title').textContent = text;
    el.querySelector('.element__image').src = link;
    el.querySelector('.element__image').alt = text;
    likeItem(el);
    deleteItem(el);
    container.prepend(el);
    const imageBtn = el.querySelector('.element__image');
    imageBtn.addEventListener('click', () => {
        imgItem.src = link;
        textImgItem.textContent = text;
        openPopup(imgPopup);
        removeImgWindow();
    });
};


// load from array
const initialCards = [
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

initialCards.forEach(getItemArray);

