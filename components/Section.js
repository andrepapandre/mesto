export class Section {
  constructor({ items, renderer }, templateSelector) {
    this._items = items;
    this._renderer = renderer;
    this._templateSelector = document.querySelector(`.${templateSelector}`);
  }

  addItem(element) {
    this._templateSelector.append(element);
  }

  renderItems() {
    this._items.forEach(item => {
        this._renderer(item)
    })
  }



}
