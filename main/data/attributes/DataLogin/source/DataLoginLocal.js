module.exports.CreateDataUserLoginInStorage = CreateDataUserLoginInStorage;
module.exports.GetDataUserLoginInStorage = GetDataUserLoginInStorage;

function CreateDataUserLoginInStorage(key, dataLogin) {
  try {
    my.setStorage({
      key: key,
      data: {
        DocumentType: dataLogin.DocumentType,
        email: dataLogin.email,
        nombre: dataLogin.name,
        apellido: dataLogin.lastName,
        UserProfileID: dataLogin.UserProfileID,
        DocumentNumber: dataLogin.DocumentNumber,
        NumberAccount: dataLogin.NumberAccount,
        lineNumber: dataLogin.lineNumber,
        sessionId: dataLogin.sessionId
      }
    });
    return true
  } catch (error) {
    return false;
  }
}

function GetDataUserLoginInStorage(key) {
  try {
    let res = my.getStorageSync({ key: key });
    return res.data;
  } catch (error) {
    return error;
  }
}
