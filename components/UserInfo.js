export class UserInfo {
  constructor(obj) {
    this._obj = obj;
    this._namerr = obj.namer;
    this._jober = obj.jober;
    this.name = obj.name;
    this.jober = obj.job;
  }

  getUserInfo() {
    return this._obj;
  }

  setUserInfo() {
    this._namerr = this.name;
    this._jober = this.job;

    console.log(this._namerr);
    console.log(this._jober);
  }
}
