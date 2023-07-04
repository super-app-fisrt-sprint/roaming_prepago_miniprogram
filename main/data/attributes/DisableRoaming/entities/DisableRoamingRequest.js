module.exports = class EnableDisableRoamingRequest {
  static instance;
  /**
   * Activar o desactivar roaming
   * @param {1 enable roaming, 0 disable roaming} activar 
   * @param {only for enable with expiration day} ExpirationDate 
   */
  constructor (activar,ExpirationDate) {
    
    this.activar = activar;
    this.ExpirationDate = ExpirationDate;
  }
  updateNumberAccount(newNumberAccount) {
    Object.assign(this, params);
  }
}