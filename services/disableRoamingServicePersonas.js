let requestParameter = getApp();

export function requestApiDisableRoamingService(url, disableDataService, that) {
  return new Promise((resolve, reject) => {
    my.request({
      url: url,
      method: "POST",
      dataType: "json",
      data: {
        data: {
          "min": ""
        }
      },
      headers: {
       "X-SESSION-ID": requestParameter.globalData.lineNumber,
       "X-MC-LINE": requestParameter.globalData.lineNumber,
       "X-MC-LOB": "3",
       "Content-Type": "application/json; charset=UTF-8",
       "X-MC-MAIL": "juan.saavedra9306@gmail.com",
       "X-MC-SO": "android",
       "X-Carrier": "AT&T",
       "X-Wifi": "true",
       "X-MC-HE-V": "3",
       "X-MC-SO-V": "7.1.1",
       "Cache-Control": "no-cache",
       "X-MC-SO-API": "25",
       "X-MC-SO-PHONE-F": "OnePlus",
       "X-MC-SO-PHONE-M": "ONEPLUS A3010",
       "X-MC-APP-V: 15.1.3",
       "X-MC-DEVICE-NAME": "OnePlusONEPLUS A3010",
       "X-MC-DEVICE-ID": "5sSZqKK8tml36/7ayfSSRBOw+3fm3LkhNZ6STbskYAZnQzsnk+cMXfoPY8IJVdXkTFCYJZzHRBgIUU+T0SCJ/KEbzUXcqWRWYHVcIU+ItXxzEss+kVlFrzZDN0A3Nr6OfLxzbUvRW3mmtuPiddsKUga2ZwFViSMNjkOewC5PByTQKApAcbsli6kmbKFZnA/d",
       "X-MC-USER-AGENT": "eyJpcCI6IjEwLjAuMi4xNSIsInVzZXJBZ2VudCI6Ik1pQ2xhcm9BcHAvMC4wLjEgKE9uZVBsdXM7IE9ORVBMVVMgQTMwMTA7IFx1MDAzY2FuZHJvaWQvNy4xLjFcdTAwM2UpIn0="
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
