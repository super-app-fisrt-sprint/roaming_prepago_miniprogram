module.exports = class OfferPackagesRoaming {
  /**
   * Activar o desactivar roaming
   * @param {1 enable roaming, 0 disable roaming} activar 
   * @param {only for enable with expiration day} ExpirationDate 
   */
  constructor (accountId,esMasivo,otraLinea,saldo,tipoPaquete,userProfile) {
    this.accountId =accountId;
    this.esMasivo =esMasivo ;
    this.otraLinea =otraLinea ;
    this.saldo =saldo ;
    this.tipoPaquete = tipoPaquete;
    this.userProfile =userProfile;
  }
}