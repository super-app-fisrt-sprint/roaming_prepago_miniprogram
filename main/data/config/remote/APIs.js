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
  URL_AUTO_REFRESH: 'https://apiselfservice.co/api/index.php/v2/soap/AuthRefresh.json',
  URL_OFFER_ROAMING_ACTIVE:'https://apiselfservice.co/M3/Prepago/Roaming/ConsultarCatalogoPaquetePrepagoRoaming/',
  URL_ACTIVATE_PACKAGE: 'https://apiselfservice.co/M3/Prepago/Roaming/ejecutarTrama/',
  URL_REGISTER_TICKET:'https://apiselfservice.co/M3/Prepago/Roaming/registrarTickler/'
};

