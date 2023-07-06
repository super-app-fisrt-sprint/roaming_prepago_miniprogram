const ActivatePackageRoamingDataSourceRemote = require("../datasource/ActivatePackageRoamingDataSourceRemote");
const activatePackageRoamingDataSourceRemote = new ActivatePackageRoamingDataSourceRemote();

module.exports = class ActivatePackageRoamingRepository {
  static instance;
  constructor() {
    if (ActivatePackageRoamingRepository.instance) {
      return ActivatePackageRoamingRepository.instance;
    } else {
      ActivatePackageRoamingRepository.instance = this;
    }
  }
  async activatePackageRoaming(deviceSpect,lineNumber,packageCode) {
    return  await activatePackageRoamingDataSourceRemote.activatePackageRoaming(deviceSpect,lineNumber,packageCode);
  }
}