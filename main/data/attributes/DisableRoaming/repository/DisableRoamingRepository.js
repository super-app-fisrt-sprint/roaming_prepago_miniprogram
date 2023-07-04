const EnableDisableRoamingDataSource = require("../datasource/DisableRoamingDataSource");
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
  async enableDisableRoaming(deviceSpect,data) {
    return  await enableDisableRoamingDataSource.enableDisableRoaming(deviceSpect,data);
  }
}