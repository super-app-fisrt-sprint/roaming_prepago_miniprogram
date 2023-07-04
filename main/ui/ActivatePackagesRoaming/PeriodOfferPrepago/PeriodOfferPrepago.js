const DeviceSpectViewModel = require("../../../domain/DeviceSpectViewModel");
Page({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
  },
  onLoad(e) {
    const productType=e.type;
    const accountId = e.accountId.trim();
    const deviceSpect = DeviceSpectViewModel.getInfoDeviceStorage();
    const { titleBarHeight, statusBarHeight } = my.getSystemInfoSync();
    let type="";
    if(productType==1){
      type="Oferta de paquete por dia"
    }
    else{
      type="Oferta de paquete por periodo de tiempo"
    }
    this.setData({
      titleBarHeight,
      statusBarHeight,
      deviceSpect,
      accountId,
      productType,
      type
    });
  },
});
