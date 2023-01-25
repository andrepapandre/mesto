export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._selector = "popup_opened";
    this._buttonClose = "popup__close-button";
    this._page = document.querySelector(".page");
    this._popups = document.querySelectorAll(".popup");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add(this._selector);
    this.setEventListeners();
    this._page.addEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.closePopup();
    }
  }

  closePopup() {
    this._popup.classList.remove(this._selector);
    this._page.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popups.forEach((item) => {
      item.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains(this._buttonClose)) {
          this.closePopup();
        }
        if (evt.target.classList.contains(this._selector)) {
          this.closePopup();
        }
      });
    });
  }
}
