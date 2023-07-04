const DeviceSpectRepository = require("../data/attributes/DeviceSpect/repository/DeviceSpectRepository");
const InfoDevice= require("../data/attributes/DeviceSpect/entities/DeviceSpect");;

function createInfoDeviceStorage(jsonString) {
  const infoDevice = new InfoDevice(JSON.parse(jsonString));
  const userServiceRepository = new DeviceSpectRepository();
  const res = userServiceRepository.CreateDeviceSpectSourceLocal(infoDevice) ;
}

function getInfoDeviceStorage(){
  const userServiceRepository = new DeviceSpectRepository();
  const response= userServiceRepository.GetDeviceSpectSourceLocal();
  return response
}

module.exports.createInfoDeviceStorage = createInfoDeviceStorage;
module.exports.getInfoDeviceStorage = getInfoDeviceStorage;
