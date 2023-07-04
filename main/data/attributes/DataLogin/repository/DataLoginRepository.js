const UserDataLoginSourceLocal = require("../dataSource/DataLoginDataSourceLocal");
const  userDataLoginSourceLocal = new UserDataLoginSourceLocal();

module.exports = class UserLoginRepository {
  static instance;
  constructor() {
    if (UserLoginRepository.instance) {
      return UserLoginRepository.instance;
    } else {
      UserLoginRepository.instance = this;
    }
  }
  CreateDataUserLoginInStorageLocal(dataUser) {
    return  userDataLoginSourceLocal.CreateDataUserLoginInStorage(dataUser);
  }
   GetDataUserLoginInStorageLocal() {
    return  userDataLoginSourceLocal.GetDataUserLoginInStorage();
  }
  
};
