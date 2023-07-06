const activatePackageRoaming = require('../source/activatePackageRoaming');
const api = require('../../../config/remote/APIs');

module.exports = class ActivatePackageRoamingDataSourceRemote{
  static instance;
  constructor () {
    if (ActivatePackageRoamingDataSourceRemote.instance) {
      return ActivatePackageRoamingDataSourceRemote.instance
    } else {
      ActivatePackageRoamingDataSourceRemote.instance = this
    }
  }
  async activatePackageRoaming(deviceSpect,lineNumber,packageCode){
    return await activatePackageRoaming.activatePackageRoaming(api.URL_BASE.URL_ACTIVATE_PACKAGE,deviceSpect,lineNumber,packageCode);
  }
} 