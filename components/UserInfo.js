export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(`.${nameSelector}`);
    this._userJob = document.querySelector(`.${jobSelector}`);
    this._avatar = document.querySelector(`.${avatarSelector}`);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src
    };
    return userInfo;
    
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userJob.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}
