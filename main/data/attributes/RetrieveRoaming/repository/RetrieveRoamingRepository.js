const RetrieveRoamingDataSource = require("../dataSource/RetrieveRoamingDataSource");
const  retrieveRoamingDataSource = new RetrieveRoamingDataSource();

module.exports = class RetrieveRoamingRepository {
  static instance;
  constructor() {
    if (RetrieveRoamingRepository.instance) {
      return RetrieveRoamingRepository.instance;
    } else {
      RetrieveRoamingRepository.instance = this;
    }
  }
  async getRetrieveRoamingRemote(deviceSpect,accountId) {
    return  await retrieveRoamingDataSource.getRetrieveRoamingRemote(deviceSpect,accountId);
  }
}