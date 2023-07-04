const OfferPackagesRoamingDataSource = require("../datasource/OfferPackagesDataSource");
const offerPackagesRoamingDataSource = new OfferPackagesRoamingDataSource();

module.exports = class OfferPackagesRoamingRepository {
  static instance;
  constructor() {
    if (OfferPackagesRoamingRepository.instance) {
      return OfferPackagesRoamingRepository.instance;
    } else {
      OfferPackagesRoamingRepository.instance = this;
    }
  }
  async offerPackagesRoamingRemote(deviceSpect,offerPackagesRoaming) {
    return  await offerPackagesRoamingDataSource.offerPackagesRoaming(deviceSpect,offerPackagesRoaming);
  }
}