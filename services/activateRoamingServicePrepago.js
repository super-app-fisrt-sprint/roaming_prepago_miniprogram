let requestParameter = getApp();


/**
 * 
 * @param {page} that 
 * @param {string} expirationDate
 */
export function postActivactionRequest(that, dataRequest) {
  

  return new Promise((resolve, reject) => {
    my.request({
      url: 'https://apiselfservice.co/M3/Prepago/Roaming/activarServicio/',
      method: 'POST',
      dataType: 'json',
      data: {
        data: {
          data: dataRequest
        }
      },
      headers: {
        'X-SESSION-ID': requestParameter.globalData.sessionId,
        'X-MC-LINE': requestParameter.globalData.lineNumber,
        'X-MC-LOB': '3',
        'X-MC-MAIL': requestParameter.globalData.email,
        'X-MC-SO': 'android',
        'X-Carrier': 'T-Mobile',
        'X-Wifi': true,
        'X-MC-HE-V': '3',
        'X-MC-SO-V': '9',
        'Cache-Control': 'no-cache',
        'X-MC-SO-API': '28',
        'X-MC-SO-PHONE-F': 'samsung',
        'X-MC-SO-PHONE-M': 'SM-S908E',
        'X-MC-APP-V': '15.0.0',
        'X-MC-DEVICE-NAME': 'samsungSM-S908E',
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