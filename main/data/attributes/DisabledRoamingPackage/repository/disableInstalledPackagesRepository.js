const DisablePackagesDataSource = require("../dataSource/disablePackagesDataSource");
const  disablePackagesDataSource = new DisablePackagesDataSource();

module.exports = class DisablePackagesRepository {
  static instance;
  constructor() {
    if (DisablePackagesRepository.instance) {
      return DisablePackagesRepository.instance;
    } else {
      DisablePackagesRepository.instance = this;
    }
  }
  async disablePackagesRemote(deviceSpect,disableDataRequest) {
    return  await disablePackagesDataSource.disablePackagesRemote(deviceSpect,disableDataRequest);
  }
}