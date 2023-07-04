const deviceSpect = require("../../DeviceSpect/entities/DeviceSpect");
const AutoRefreshDataSourceRemote = require("../dataSource/AutoRefreshDataSourceRemote");
const autoRefreshDataSourceRemote = new AutoRefreshDataSourceRemote();

module.exports = class AutoRefreshRepository {
  static instance;
  constructor() {
    if (AutoRefreshRepository.instance) {
      return AutoRefreshRepository.instance;
    } else {
      AutoRefreshRepository.instance = this;
    }
  };

  async autoRefresh(deviceSpect) {
    return  await autoRefreshDataSourceRemote.autoRefresh(deviceSpect);
  };

  autoRefreshLocal(data, deviceSpect) {
    return autoRefreshDataSourceRemote.autoRefreshInStorage(data, deviceSpect);
  }
};