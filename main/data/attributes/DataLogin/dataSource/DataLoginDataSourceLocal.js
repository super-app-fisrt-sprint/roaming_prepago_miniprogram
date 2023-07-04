const dataUserLoginLocal = require('../source/DataLoginLocal');
const key = require('../../../config/local/Keys');

module.exports = class UserDataLoginSourceLocal {
  static instance;
  constructor () {
    if (UserDataLoginSourceLocal.instance) {
      return UserDataLoginSourceLocal.instance
    } else {
        UserDataLoginSourceLocal.instance = this
    }
  }
  CreateDataUserLoginInStorage(dataUser){
    return  dataUserLoginLocal.CreateDataUserLoginInStorage(key.TYPE.N_USER_INFO_LOGIN,dataUser);
  }
  GetDataUserLoginInStorage(){
    return dataUserLoginLocal.GetDataUserLoginInStorage(key.TYPE.N_USER_INFO_LOGIN);
  }

} 