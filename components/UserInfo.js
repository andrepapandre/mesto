export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._userName = document.querySelector(`.${nameSelector}`);
    this._userJob = document.querySelector(`.${jobSelector}`);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }

  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    this._userName.textContent = this.userInfo.editName;
    this._userJob.textContent = this.userInfo.editAbout;
    return this.userInfo
  }
}
