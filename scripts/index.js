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
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const templateCard = document.querySelector('.template');
const popupCardTextLoop = document.querySelector('.popup__name');

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

// Cards render
function createCard(element) {
    const container = document.querySelector('.elements');
    const card = templateCard.content.cloneNode(true).children[0];
    card.querySelector('.element__title').textContent = element.name;
    card.querySelector('.element__image').src = element.link;
    card.querySelector('.element__image').alt = element.name;
    const imageBtn = card.querySelector('.element__image');
    imageBtn.addEventListener('click', () => { 
        popupCardImgLoop.src = element.link; 
        popupCardTextLoop.textContent = element.name; 
        openPopup(popupImgShow); 
        popupImgShowCloseBtn.addEventListener('click', () => {
            closePopupWindow(popupImgShow);
        });    
    }); 
    likeItem(card);
    deleteItem(card);
    renderCard(card, container);
};

const formSubmitAdd = (event) => {
    event.preventDefault();
    const container = document.querySelector('.elements');
    const card = templateCard.content.cloneNode(true).children[0];
    card.querySelector('.element__title').textContent = document.getElementById('popup__input-title').value;
    card.querySelector('.element__image').src = document.getElementById('popup__input-link').value;
    const imageBtn = card.querySelector('.element__image');
    imageBtn.addEventListener('click', () => { 
        popupCardImgLoop.src = card.querySelector('.element__image').src; 
        popupCardTextLoop.textContent = card.querySelector('.element__title').textContent; 
        openPopup(popupImgShow); 
        popupImgShowCloseBtn.addEventListener('click', () => {
            closePopupWindow(popupImgShow);
        });
        }); 
    deleteItem(card);
    likeItem(card);
    renderCard(card, container)
    closePopupWindow(popupAddCard);
    event.target.reset();
};

formElementAdd.addEventListener('submit', formSubmitAdd);

function renderCard(card, container) {
    container.prepend(card);
};

initialCards.forEach(createCard);






// Приветствую! Очень долго пытался сделать один вызов попапа (увеличение картинки) для createCard и formSubmitAdd
// Но не смог, не получилось найти через target текстовое содержимое картинки, а картинку получил через target.src
// Буду рад, если дадите пару советов, как это можно сделать) Спасибо))

// const imageItem = (card) => {
//     const imageBtn = card.querySelector('.element__image');
//     imageBtn.addEventListener('click', imageHandler)
// };

    
// const imageHandler = (event) => {
//     const target = event.target;
//     popupCardImgLoop.src = target.src
//     const test = card.querySelector('.element__title').textContent;
//     console.log(test);
//     openPopup(popupImgShow); 
//         popupImgShowCloseBtn.addEventListener('click', () => {
//    closePopupWindow(popupImgShow);
//      }); 
//      };
//



