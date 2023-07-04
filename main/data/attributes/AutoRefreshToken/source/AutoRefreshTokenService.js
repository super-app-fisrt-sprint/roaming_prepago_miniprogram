module.exports.autoRefresh= autoRefresh;

function autoRefresh(url, deviceSpect) {
  return new Promise((resolve, reject) => {
    my.request({
      url: url,
      method: 'POST',
      dataType: 'json',
      data:
      {
        data: null
      },
      headers: {
        "X-SESSION-ID": deviceSpect["X-SESSION-ID"],
        "X-MC-LINE": deviceSpect["X-MC-LINE"],
        "X-MC-LOB": deviceSpect["X-MC-LOB"],
        "Content-Type": deviceSpect["Content-Type"],
        "X-MC-SO": deviceSpect["X-MC-SO"],
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
        reject(res);
      }
    });
  });
}