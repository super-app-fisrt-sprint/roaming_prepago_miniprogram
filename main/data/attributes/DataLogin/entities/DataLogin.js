module.exports = class DataLogin {
  static instance;
  constructor (NumberAccount, email, DocumentType,DocumentNumber,name,lastName,UserProfileID,lineNumber) {
    this.NumberAccount = NumberAccount;
    this.email = email;
    this.DocumentType=DocumentType;
    this.DocumentNumber=DocumentNumber;
    this.name=name;
    this.lastName=lastName;
    this.UserProfileID=UserProfileID;
    this.lineNumber=lineNumber;
    if (DataLogin.instance) {
      return DataLogin.instance
    } else {
      DataLogin.instance = this
    }
  }
  updateParams(params) {
    Object.assign(this, params);
  }
}