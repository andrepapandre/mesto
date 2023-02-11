export class Section {
  constructor({ renderer }, templateSelector) {
    this._renderer = renderer;
    this._templateSelector = document.querySelector(`.${templateSelector}`);
  }

  addItem(element) {
    this._templateSelector.prepend(element);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
