const RegisterTicketRoamingDataSourceRemote = require("../datasource/RegisterTicketDataSource");
const registerTicketRoamingDataSourceRemote = new RegisterTicketRoamingDataSourceRemote();

module.exports = class RegisterTicketRoamingRepository {
  static instance;
  constructor() {
    if (RegisterTicketRoamingRepository.instance) {
      return RegisterTicketRoamingRepository.instance;
    } else {
      RegisterTicketRoamingRepository.instance = this;
    }
  }
  async registerTicketRoamingRemote(deviceSpect,ticket) {
    return  await registerTicketRoamingDataSourceRemote.registerTicketRoamingPrepago(deviceSpect,ticket);
  }
}