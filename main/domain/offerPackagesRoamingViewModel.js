const OfferPackagesRoaming= require("../data/attributes/OfferPackages/entities/OfferPackagesRequest");
const Packages= require("../data/attributes/OfferPackages/entities/packages");
const OfferPackagesRoamingRepository = require("../data/attributes/OfferPackages/repository/OfferPackagesRepository");

async function getOfferPackagesRoaming(deviceSpect,accountId,esMasivo,otraLinea,saldo,tipoPaquete) {
 
  const offerPackagesRoamingRepository  = new OfferPackagesRoamingRepository();
  const packages =new Packages();
  const offerPackagesRoaming = new OfferPackagesRoaming(accountId,esMasivo,otraLinea,saldo,tipoPaquete,deviceSpect["X-MC-MAIL"]);
  let result = { error: true, message: "En este momento no podemos atender esta solicitud, intenta nuevamente" };

  try {

    const res = await offerPackagesRoamingRepository.offerPackagesRoamingRemote(deviceSpect,offerPackagesRoaming);
    if (
      res &&
      res.data &&
      res.data.response &&
      res.data.response !== null &&
      res.data.response !== undefined &&
      res.data.response.paquetes &&
      res.data.error == 0
    ) {
      const responseOffer=res.data.response;
      packages.byOfferDay=responseOffer.paquetes.filter(obj=>obj.tipoProductoRoamingID==="1")
      packages.byOfferPeriod=responseOffer.paquetes.filter(obj=>obj.tipoProductoRoamingID==="2")
      packages.categories=responseOffer.categorias
      packages.packages=responseOffer.paquetes
      packages.succees=true
      console.log("dfdf--->",res)
      return packages
    } else {
      return packages.succees=false;
    }
  } catch (error) {
    return false
  }
}

module.exports.getOfferPackagesRoaming= getOfferPackagesRoaming;
