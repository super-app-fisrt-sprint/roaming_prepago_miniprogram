const retrieveRemote = require('../source/RetrieveRoamingRemoteApi');
const api = require('../../../config/remote/APIs');

module.exports = class RetrieveRoamingDataSourceRemote{
  static instance;
  constructor () {
    if (RetrieveRoamingDataSourceRemote.instance) {
      return RetrieveRoamingDataSourceRemote.instance
    } else {
      RetrieveRoamingDataSourceRemote.instance = this
    }
  }
  async getRetrieveRoamingRemote(deviceSpect,accountId){
    return await retrieveRemote.retrieveRamingApiRemote(api.URL_BASE.URL_RETRIEVE_SERVICE,deviceSpect,accountId);
  }

} 