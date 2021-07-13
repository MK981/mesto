export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  /*renderer() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }*/

  addItem(element) {
    this._container.prepend(element);
  }

  addItemServ(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }
}
