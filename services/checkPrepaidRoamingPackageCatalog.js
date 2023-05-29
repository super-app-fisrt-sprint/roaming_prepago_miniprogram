let app = getApp();

/**
 * ConsultarCatalogoPaquetePrepagoRoaming
 * @param {page} that 
 */
export function sendPostRequest(that) {

  return new Promise((resolve, reject) => {
    my.request({
      url: 'https://apiselfservice.co/M3/Prepago/Roaming/ConsultarCatalogoPaquetePrepagoRoaming/',
      method: 'POST',
      dataType: 'json',
      data: {
        data: {
          AccountId: app.globalData.lineNumber,
          esMasivo: 'true',
          otraLinea: '',
          saldo: '-1',
          tipoPaquete: '2',
          UserProfileID: app.globalData.email 
        }
      },
      headers: {
        'X-SESSION-ID': app.globalData.sessionId,
        'X-MC-LINE': app.globalData.lineNumber,
        'X-MC-LOB': '2',
        'x-dynatrace' : 'MT_3_1_3854649721_285-0_d86713a4-a872-43d8-924d-5b4c0db0293f_72_8615_225',
        'Content-Type': 'application/json; charset=UTF-8',
        'Content-Length': '142',
        'X-MC-MAIL': app.globalData.email,
        'X-MC-SO': 'android',
        'X-Carrier': 'Android',
        'X-Wifi': false,
        'X-MC-HE-V': '3',
        'X-MC-SO-V': '7.0',
        'Cache-Control': 'no-cache',
        'X-MC-SO-API': '24',
        'X-MC-SO-PHONE-F': 'Google',
        'X-MC-SO-PHONE-M': 'Android SDK built for x86',
        'X-MC-APP-V': '14.0.0',
        'X-MC-DEVICE-NAME': 'GoogleAndroid SDK built for x86',
        'X-MC-DEVIDE-ID': 'gzNCmiQi+GK930+P4FAQ2TDS6h+4koxMsvsxzuexqHtJso8aaBWcnjw2aargGB3EWeOpMREkJT8QMCUoQzDKFsOgzIueJR5JccABglbMDTPvOwVGtUEoSa+zAAhsVfyG621Ye5pe9INcLFPcSyaRJk5SoZWE9274tYdDUWFAu50jBtSB240U4T6gcjKgAzmN',
        'X-MC-USER-AGENT': 'eyJpcCI6IjEwLjAuMi4xNSIsInVzZXJBZ2VudCI6Ik1pQ2xhcm9BcHAvMC4wLjEgKEdvb2dsZTsgQW5kcm9pZCBTREsgYnVpbHQgZm9yIHg4NjsgXHUwMDNjYW5kcm9pZC83LjBcdTAwM2UpIn0=',
      },
      success: res => {
        resolve(res);
      },
      fail: res => {
        console.log(res);
        reject(res.data.response);
      }
    });
  });
}