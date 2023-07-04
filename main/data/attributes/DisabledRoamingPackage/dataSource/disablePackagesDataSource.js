const disablePackagesRemote = require('../source/disablePackagesRemoteApi');
const api = require('../../../config/remote/APIs');

module.exports = class DisablePackagesDataSourceRemote{
  static instance;
  constructor () {
    if (DisablePackagesDataSourceRemote.instance) {
      return DisablePackagesDataSourceRemote.instance
    } else {
      DisablePackagesDataSourceRemote.instance = this
    }
  }
  async disablePackagesRemote(deviceSpect,disableDataRequest){
    return await disablePackagesRemote.disablePackagesApiRemote(api.URL_BASE.URL_DISABLE_PACKAGE,deviceSpect,disableDataRequest);
  }

} 