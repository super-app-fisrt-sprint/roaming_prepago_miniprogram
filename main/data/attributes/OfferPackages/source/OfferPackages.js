module.exports.enableDisableRoaming = enableDisableRoaming;

/**
 * 
 * @param {Url del servicio} url 
 * @param {Caracteristicas del dispositivo} deviceSpect 
 * @param {Body (activar: 1 para activar 0 para desactivar, ExpirationDate: fecha para activar con limite,)} data 
 */
function enableDisableRoaming(url,deviceSpect,expirationDate,min) {
  return new Promise((resolve, reject) => {
    my.request({
      url: url,
      method: "POST",
      dataType: "json",
      data:{
        data: {
          min:min,
          fecha: expirationDate
        }
      },
      headers: {
        "X-MC-SO":deviceSpect["X-MC-SO"],
        "X-SESSION-ID": deviceSpect["X-SESSION-ID"],
        "X-MC-LINE": deviceSpect["X-MC-LINE"], 
        "X-MC-LOB": deviceSpect["X-MC-LOB"],
        "Content-Type": deviceSpect["Content-Type"],
        "X-MC-MAIL": deviceSpect["X-MC-MAIL"],
        "X-Carrier": deviceSpect["X-Carrier"],
        "X-Wifi": deviceSpect["X-Wifi"],
        "X-MC-HE-V": deviceSpect["X-MC-HE-V"],
        "X-MC-SO-V": deviceSpect["X-MC-SO-V"],
        "Cache-Control": deviceSpect["Cache-Control"],
        "X-MC-SO-API": deviceSpect["X-MC-SO-API"],
        "X-MC-SO-PHONE-F": deviceSpect["X-MC-SO-PHONE-F"],
        "X-MC-SO-PHONE-M": deviceSpect["X-MC-SO-PHONE-M"],
        "X-MC-APP-V": deviceSpect["X-MC-APP-V"],
        "X-MC-DEVICE-NAME": deviceSpect["X-MC-DEVICE-NAME"],
        "X-MC-DEVIDE-ID": deviceSpect["X-MC-DEVIDE-ID"],
        "X-MC-USER-AGENT": deviceSpect["X-MC-USER-AGENT"]
      },
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res.data.response);
      }
    });
  });
}