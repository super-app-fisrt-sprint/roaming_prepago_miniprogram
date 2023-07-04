const autoRefreshSourceRemote = require('../source/AutoRefreshTokenService');
const autoRefreshSourceLocal = require('../source/AutoRefreshTokenLocal');
const api = require('../../../config/remote/APIs');
const key = require('../../../config/local/Keys');
const deviceSpect = require('../../DeviceSpect/entities/DeviceSpect');

module.exports = class AutoRefreshDataSource{
  static instance;
  constructor () {
    if (AutoRefreshDataSource.instance) {
      return AutoRefreshDataSource.instance
    } else {
      AutoRefreshDataSource.instance = this
    }
  }

  async autoRefresh(deviceSpect){
    return await autoRefreshSourceRemote.autoRefresh(api.URL_BASE.URL_AUTO_REFRESH, deviceSpect);
  }

  autoRefreshInStorage(data, deviceSpect){
    return  autoRefreshSourceLocal.autoRefreshTokenLocal(key.TYPE.N_DEVICE_INFO,data, deviceSpect);
  }
} 