let popup = document.querySelector('.popup');
let openEditButton = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close-button')
let formElement = document.querySelector('.popup__form');
let nameInput = document.getElementById('popup__input-name');
let jobInput = document.getElementById('popup__input-job');
let namer = document.querySelector('.profile__name');
let jober = document.querySelector('.profile__name-info');


openEditButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    nameInput.value = namer.textContent;
    jobInput.value = jober.textContent;

})

function closePopupWindow() {
    popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', () => {
    closePopupWindow();
})


function formSubmitHandler(evt) {
    evt.preventDefault();
    closePopupWindow();
    namer.textContent = nameInput.value;
    jober.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 
