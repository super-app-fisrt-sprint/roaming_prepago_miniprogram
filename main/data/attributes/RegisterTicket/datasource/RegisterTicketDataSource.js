const registerTicketRoaming = require('../source/RegisterTicketService');
const api = require('../../../config/remote/APIs');

module.exports = class RegisterTicketRoamingDataSourceRemote{
  static instance;
  constructor () {
    if (RegisterTicketRoamingDataSourceRemote.instance) {
      return RegisterTicketRoamingDataSourceRemote.instance
    } else {
      RegisterTicketRoamingDataSourceRemote.instance = this
    }
  }
  async registerTicketRoamingPrepago(deviceSpect,ticket){
    return await registerTicketRoaming.registerTicketRoaming(api.URL_BASE.URL_REGISTER_TICKET,deviceSpect,ticket);
  }
} 