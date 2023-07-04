const enableDisableRoaming = require('../source/enableRoaming');
const api = require('../../../config/remote/APIs');

module.exports = class EnableDisableDataSourceRemote{
  static instance;
  constructor () {
    if (EnableDisableDataSourceRemote.instance) {
      return EnableDisableDataSourceRemote.instance
    } else {
      EnableDisableDataSourceRemote.instance = this
    }
  }
  async enableDisableRoaming(deviceSpect,expirationDate,min){
    return await enableDisableRoaming.enableDisableRoaming(api.URL_BASE.URL_ENABLE_ROAMING,deviceSpect,expirationDate,min);
  }
} 