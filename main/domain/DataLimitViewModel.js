const DataLimit = require("../data/attributes/DataLimit/entities/DataLimit");
const DataLimitResponse = require("../data/attributes/DataLimit/entities/DataLimitResponse");
const DataLimitServiceRepository = require("../data/attributes/DataLimit/repository/DataLimitServiceRepository");


async function dataLimitService(deviceSpect,accountId,valuePackage,zone,min) {
  const dataLimitServiceRepository = new DataLimitServiceRepository();
  const dataLimit = new DataLimit(accountId,valuePackage,zone,min);
  const dataLimitResponse = new DataLimitResponse(false,0,false);
 try{
  const res = await dataLimitServiceRepository.dataLimitServiceRemote(deviceSpect,dataLimit);
  if (
    res &&
    res.data &&
    res.data.response &&
    res.data.response !== null &&
    res.data.response !== undefined &&
    res.data.error == 0
  ) {
    dataLimitResponse.IsValidBuy=true;
    dataLimitResponse.ValueLimit=res.data.response.valorLimiteCredito;
    dataLimitResponse.ModalNoActive=false;
  } 
  if (
    res &&
    res.data &&
    res.data.response &&
    res.data.response.puedeComprar != "SI"){
      dataLimitResponse.IsValidBuy=false;
      dataLimitResponse.ModalNoActive=true;
  }
  return dataLimitResponse;
 }  
 catch (error) {
  dataLimitResponse.error=error
  return dataLimitResponse;
}
}

module.exports.dataLimitService = dataLimitService;
