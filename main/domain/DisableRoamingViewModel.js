const EnableDisableRoamingRequest = require("../data/attributes/DisableRoaming/entities/DisableRoamingRequest");
const EnableDisableRoamingRepository = require("../data/attributes/DisableRoaming/repository/DisableRoamingRepository");



async function disableRoaming(deviceSpect,min) {
  
  const enableDisableRoamingRepository  = new EnableDisableRoamingRepository();
  let result = { error: true, message: "En este momento no podemos atender esta solicitud, intenta nuevamente" };

  try {

    const res = await enableDisableRoamingRepository.enableDisableRoaming(deviceSpect,min);
    console.log("disableRoaming---->",res)
    if (
      res &&
      res.data &&
      res.data.response &&
      res.data.response !== null &&
      res.data.response !== undefined &&
      res.data.error == 0
    ) {

      result.error = false;
      result.message = res.data.response;

    } else {

      result.message = res.data.response;

    }
  } catch (error) {


  }
  return result;
}

module.exports.disableRoaming = disableRoaming;
