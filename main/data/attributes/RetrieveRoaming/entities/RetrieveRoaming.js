module.exports = class RetrieveRoaming {
  static instance;
  constructor (isActive,expirationDate,consume) {
    this.isActive = isActive;
    this.expirationDate = expirationDate;
    this.consume=consume;
    
  }
}