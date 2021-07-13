export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers['Content-Type'];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
    headers: {
      authorization: this._authorization
    }
  })
    .then(this._checkResponse);
  }

  updateUserInfo(name, info) {
    return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: this._authorization,
      'Content-Type': this._contentType
    },
    body: JSON.stringify({
      name: name,
      about: info
    })
    })
    .then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: link
      })
      })
      .then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
      })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse);
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._checkResponse);
  }
}
