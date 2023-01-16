export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._selector = "popup_opened";
    this._buttonClose = "popup__close-button";
    this._page = document.querySelector(".page");
    this._popups = document.querySelectorAll(".popup");
  }


  openPopup() {
    this._popup.classList.add(this._selector);
    this._page.addEventListener("keyup", (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popups.forEach((popupEl) => {
        this.closePopupWindow(popupEl);
      });
    }
  }

  closePopupWindow() {
    this._popup.classList.remove(this._selector);
    this._page.removeEventListener("keyup", (evt) => {
      if (evt.key === "Escape") {
        this._popups.forEach((popupEl) => {
          this._popup.classList.remove(popupEl);
        });
      }
    });
  }

  setEventListeners() {
    this._popups.forEach((item) => {
      item.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains(this._buttonClose)) {
          this.closePopupWindow(this._selector);
        }
        if (evt.target.classList.contains(this._selector)) {
          this.closePopupWindow(this._selector);
        }
      });
    });
  }
}
