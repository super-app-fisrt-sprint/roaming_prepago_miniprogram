
const ProvisioningServiceRepository = require("../data/attributes/ActivatePackage/repository/ActivatePackageRoamingRepository");


async function createProvisioning(deviceSpect,lineNumber,packageCode) {

  const provisioningServiceRepository= new  ProvisioningServiceRepository();
  try{
    
    const res = await  provisioningServiceRepository.activatePackageRoaming(deviceSpect,lineNumber,packageCode);
    let result = { error: true, message: "En este momento no podemos atender esta solicitud, intenta nuevamente" };

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
    }else {
      result.error = true;
      result.message = res.data.response;
    }
    return result;
  }catch(error){
    result.error = true;
    return result;
  }
  
}

module.exports.createProvisioning = createProvisioning;