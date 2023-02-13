export const token = "a1ad2c38-8ac9-485a-bdd5-0420684a0ec3";
const cohortId = "cohort-59";
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-59";

export const apiConfig = { baseUrl: baseUrl, headers: token };

export class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(this.url + "/users/me", {
      method: "GET",
      headers: {
        authorization: this.headers,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  editUserInfo({ name, about }) {
    return fetch(this.url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  editAvatarImage({ avatar }) {
    return fetch(this.url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  renderCards() {
    return fetch(this.url + "/cards", {
      method: "GET",
      headers: {
        authorization: this.headers,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  addCard = ({ name, link }) => {
    return fetch(this.url + "/cards", {
      method: "POST",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  };

  deleteCard(id) {
    fetch(this.url + "/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: this.headers,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  likeCard(idCard) {
    return fetch(this.url + "/cards/" + idCard + "/likes", {
      method: "PUT",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  deleteLikeCard(idCard) {
    return fetch(this.url + "/cards/" + idCard + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }
}
