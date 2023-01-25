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
    this._userName.textContent = userInfo;
    this._userJob.textContent = userInfo;
    
  }
}
