const enableDisableRoaming = require('../source/DisableRoaming');
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
  async enableDisableRoaming(deviceSpect,data){
    return await enableDisableRoaming.enableDisableRoaming(api.URL_BASE.URL_DISABLE_ROAMING,deviceSpect,data);
  }
} 