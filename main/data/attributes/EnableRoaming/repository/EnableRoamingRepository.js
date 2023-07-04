const EnableDisableRoamingDataSource = require("../datasource/EnableRoamingDataSource");
const enableDisableRoamingDataSource = new EnableDisableRoamingDataSource();

module.exports = class EnableDisableRoamingRepository {
  static instance;
  constructor() {
    if (EnableDisableRoamingRepository.instance) {
      return EnableDisableRoamingRepository.instance;
    } else {
      EnableDisableRoamingRepository.instance = this;
    }
  }
  async enableDisableRoaming(deviceSpect,expirationDate,min) {
    return  await enableDisableRoamingDataSource.enableDisableRoaming(deviceSpect,expirationDate,min);
  }
}