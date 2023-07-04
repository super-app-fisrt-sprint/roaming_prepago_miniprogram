const OfferPackagesRoaming= require("../data/attributes/OfferPackages/entities/OfferPackagesRequest");
const OfferPackagesRoamingRepository = require("../data/attributes/OfferPackages/repository/OfferPackagesRepository");

async function getOfferPackagesRoaming(deviceSpect,accountId,esMasivo,otraLinea,saldo,tipoPaquete,userProfile) {
 
  const offerPackagesRoamingRepository  = new OfferPackagesRoamingRepository();
  const offerPackagesRoaming = new OfferPackagesRoaming(accountId,esMasivo,otraLinea,saldo,tipoPaquete,userProfile);
  let result = { error: true, message: "En este momento no podemos atender esta solicitud, intenta nuevamente" };

  try {

    const res = await offerPackagesRoamingRepository.offerPackagesRoamingRemote(deviceSpect,offerPackagesRoaming);
    console.log("getOfferPackagesRoaming--->",res)
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

module.exports.getOfferPackagesRoaming= getOfferPackagesRoaming;
