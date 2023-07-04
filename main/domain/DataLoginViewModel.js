const DataLoginRepository = require("../data/attributes/DataLogin/repository/DataLoginRepository");
const InfoLoginUser = require("../data/attributes/DataLogin/entities/DataLogin");

function createDataLoginInfoStorage(jsonString) {
  const jsonData = JSON.parse(jsonString);
  const infoLoginUser = new InfoLoginUser(
    jsonData.NumberAccount,
    jsonData.email,
    jsonData.DocumentType,
    jsonData.DocumentNumber,
    jsonData.nombre,
    jsonData.apellido,
    jsonData.UserProfileID,
    jsonData.lineNumber
  );
  //cargar datos en el storage
  const dataLoginRepository = new DataLoginRepository();
  let response = dataLoginRepository.CreateDataUserLoginInStorageLocal(infoLoginUser);
  // let response2 =  dataLoginRepository.GetDataUserLoginInStorageLocal();
  return response;
}

function getDataLoginInfoStorage(){
  const dataLoginRepository = new DataLoginRepository();
  let response = dataLoginRepository.GetDataUserLoginInStorageLocal();
  // let response2 =  dataLoginRepository.GetDataUserLoginInStorageLocal();
  return response;
}

module.exports.createDataLoginInfoStorage = createDataLoginInfoStorage;
module.exports.getDataLoginInfoStorage = getDataLoginInfoStorage;
