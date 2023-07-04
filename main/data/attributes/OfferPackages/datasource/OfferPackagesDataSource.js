const offerPackagesRoaming = require('../source/OfferPackages');
const api = require('../../../config/remote/APIs');

module.exports = class OfferPackagesRoamingDataSourceRemote{
  static instance;
  constructor () {
    if (OfferPackagesRoamingDataSourceRemote.instance) {
      return OfferPackagesRoamingDataSourceRemote.instance
    } else {
      OfferPackagesRoamingDataSourceRemote.instance = this
    }
  }
  async offerPackagesRoaming(deviceSpect,offerPackages){
    return await offerPackagesRoaming.offerPackagesRoaming(api.URL_BASE.URL_OFFER_ROAMING_ACTIVE,deviceSpect,offerPackages);
  }
} 