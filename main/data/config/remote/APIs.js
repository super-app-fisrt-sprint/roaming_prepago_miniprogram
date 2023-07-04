let requestParameter = getApp();
module.exports = class APIs {
  static get URL_BASE() {
    return URL_BASE;
  };
  static get HEADER_PARAMS(){
    return HEADER_PARAMS;
  }
}

const URL_BASE = {
  URL_RETRIEVE_SERVICE:'https://apiselfservice.co/api/index.php/v1/soap/retrieveRoamingService.json',
  URL_ENABLE_ROAMING:'https://apiselfservice.co/M3/Prepago/Roaming/activarServicio/',
  URL_DISABLE_ROAMING:'https://apiselfservice.co/M3/Prepago/Roaming/desactivarServicio/',
  URL_DATA_LIMIT:'https://apiselfservice.co/M3/Postpago/limiteCredito/',
  URL_COUNTRIES:'https://apiselfservice.co/M3/Postpago/BestOfferRoaming/HomologateActivePackage/',
  URL_PACKAGES_ROAMING: 'https://apiselfservice.co/M3/Postpago/BestOfferRoaming/GetProductOfferingRoamingPackage/',
  URL_VERIFY_BLACKLIST : 'https://apiselfservice.co/M3/Empresas/Postpago/BlacklistCode/',
  URL_GET_PROFILE : 'https://apiselfservice.co/M3/Empresas/Compartidos/GetProfile/',
  URL_CREATING_PROVISIONING:'https://apiselfservice.co/api/index.php/v1/soap/comprarPaquetes.json',
  URL_AUTO_REFRESH: 'https://apiselfservice.co/api/index.php/v2/soap/AuthRefresh.json',
  URL_OFFER_ROAMING_ACTIVE:'https://apiselfservice.co/M3/Postpago/BestOfferRoaming/ConsultRoamingOffer/'
};

