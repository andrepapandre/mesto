export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(`.${nameSelector}`);
    this._userJob = document.querySelector(`.${jobSelector}`);
    this._avatar = document.querySelector(`.${avatarSelector}`);
  }

  getUserInfo(item) {
    const name = item.name;
    const job = item.about;
    const avatar = item.avatar;
    return {
      name: name,
      job: job,
      avatar: avatar,
    };
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userJob.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}
