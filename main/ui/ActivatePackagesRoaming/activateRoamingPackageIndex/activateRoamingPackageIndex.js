const DeviceSpectViewModel = require("../../../domain/DeviceSpectViewModel");
Page({
  data: {
    showLoading: false,
    titleBarHeight: 0,
    statusBarHeight: 0,
    menuAccess: [{
      iconAccess: "/main/ui/assets/icons/roaming/icono-package-ppal.svg",
      titleAccess: "Oferta de paquete por dia",
    },
    {
      iconAccess: "/main/ui/assets/icons/roaming/icono-package-ppal.svg",
      titleAccess: "Oferta de paquete por periodo de tiempo",
    }
  ],
  },
  onLoad(e) {
    const accountId = e.accountId.trim();
    const deviceSpect = DeviceSpectViewModel.getInfoDeviceStorage();
    const { titleBarHeight, statusBarHeight } = my.getSystemInfoSync();
    this.setData({
      titleBarHeight,
      statusBarHeight,
      deviceSpect,
      accountId
    });
    
  },
  onIconClick(e) {
    const min =this.data.accountId;
    const {
      index
    } = e.currentTarget.dataset;
     //oferta paquetes del dia
     if (index === 0) {
      
      my.navigateTo({
        url:`/main/ui/ActivatePackagesRoaming/PeriodOfferPrepago/PeriodOfferPrepago?accountId=${min}&type=1`
      })
    }
    //oferta por periodo de tiempo
    if (index === 1) {
      my.navigateTo({
        url:`/main/ui/ActivatePackagesRoaming/PeriodOfferPrepago/PeriodOfferPrepago?accountId=${min}&type=2`
      })
    }
    
  }
});
