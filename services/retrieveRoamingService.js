let requestParameter  = getApp();

export function requestApiretrieve(url, that){
  return new Promise((resolve, reject) => {
    my.request({
      url: url,
      method: 'POST',
      headers: {
        'X-MC-MAIL': requestParameter.globalData.email,
        'X-MC-SO': 'android',
        'X-MC-DEVIDE-ID': 'NpEycdUlBFk4Kpb+R1GG9lqZcAAIpDBJThmCly03TVY+dCxLU0crZufrF4WcdHIyFpdOceXaOf96Eel/6096nTLvYJieWECkrUnYORPqMW09WBz0bIGuh444pf0QKAbQ7uBfpZji98SfAAy/3e6FPEmk+ykqG9tFUDqJJuAW7nrcySZ28G/N2/fTsufNIY+d',
        'X-MC-USER-AGENT': 'eyJpcCI6IjEwLjAuMi4xNSIsInVzZXJBZ2VudCI6Ik1pQ2xhcm9BcHAvMC4wLjEgKEdvb2dsZTsgQW5kcm9pZCBTREsgYnVpbHQgZm9yIHg4NjsgXHUwMDNjYW5kcm9pZC83LjBcdTAwM2UpIn0=',
        'X-SESSION-ID': requestParameter.globalData.sessionId,
        'X-MC-LINE': requestParameter.globalData.lineNumber,
        'X-MC-LOB': '3',
      },
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
}