export default class UserInfo {
  constructor({nameSelector, infoSelector, avaSelector, idSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avaSelector);
    this._id = document.querySelector(idSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      id: this._id.textContent
    }
  }

  setUserInfo(name, info) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }

  setUserId(id) {
    this._id.textContent = id;
  }
}
