
const ProvisioningServiceRepository = require("../data/attributes/ActivatePackage/repository/ActivatePackageRoamingRepository");


async function createProvisioning(deviceSpect,lineNumber,packageCode) {

  const provisioningServiceRepository= new  ProvisioningServiceRepository();
  try{
    const res = await  provisioningServiceRepository.activatePackageRoaming(deviceSpect,lineNumber,packageCode);
    if (
      res &&
      res.data &&
      res.data.response &&
      res.data.response !== null &&
      res.data.response !== undefined &&
      res.data.error == 0
    ) {
      return true;
    }else {
      return false;
    }
  }catch(error){
    return false
  }
}

module.exports.createProvisioning = createProvisioning;