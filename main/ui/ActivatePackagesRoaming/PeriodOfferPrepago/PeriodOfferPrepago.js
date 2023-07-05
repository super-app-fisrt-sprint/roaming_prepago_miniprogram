const DeviceSpectViewModel = require("../../../domain/DeviceSpectViewModel");
const getOfferPackagesRoaming = require("../../../domain/offerPackagesRoamingViewModel")
Page({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
    toViewSugeridos:0,
    popUpActivate: false,
    modalVisibleConfirtBuy:false,
    viewMorepackages:false
  },
  onLoad(e) {
    this.showLoading()
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

    getOfferPackagesRoaming.getOfferPackagesRoaming(deviceSpect,accountId,"true","","-1","2","thatanspk@gmail.com").then(packages=>{
      
      if(packages.succees){
        if(this.data.productType==1){
          this.swiperButtonMove(packages.byOfferDay)
        }
        if(this.data.productType==2){
          this.swiperButtonMove(packages.byOfferPeriod)
        }
      }
      else{
        console.log(error)
      }
      this.hideLoading();
    })
    .catch(error=>{

    })

    
  },
  swiperButtonMove(packages){
    let len = packages.length;
    const orderIsTap= new Array(len).fill(false);
    orderIsTap[0] = true;
    let OfferSlice=packages.slice(0,3)
    this.setData({
      viewBtnViewMore:true,
      orderIsTap,
      Offer:packages,
      OfferSlice:OfferSlice
    })
  },
  swiperSugeridos(e) {
    const order = this.data.Offer;
    const {
      current
    } = e.detail;
    const orderIsTap = order.map((_, i) => i === current);
    this.setData({
      orderIsTap,
    });
  },
  buttonTapSwiper(e) {
    const id = e.currentTarget.dataset.item;
     let order = this.data.Offer;
     let idString = id.toString();
     const orderIsTap = order.map((_, i) => i === id);
     this.setData({
       orderIsTap,
       isButtonPressed: !this.data.isButtonPressed,
       toViewSugeridos: idString
     });
  },
  redirectToActivatePackages(){

  },
  OnSelectPackage(e) {
    console.log(e.currentTarget.dataset.value);
    this.setData({
      popUpActivate:true
    })
  },
  activatePackagewarning(){
    this.setData({
      popUpActivate:false,
      modalVisibleConfirtBuy:true
    })
  },
  ejecutarTrama(){
    this.setData({
      modalVisibleCompletedBuy:true
    })
  },
  handleClose() {
    this.setData({
      modalVisibleConfirtBuy: false,
      termsConditionsCheck: false
    });
  },   
  handlePopupClose() {
    this.setData({
      popUpActivate: false,
      modalVisibleCompletedBuy:false,
    });
    
  },
  handleSucceedClose() {
    this.setData({
      modalVisibleCompletedBuy:false
    });
  },
   OnRadioChangeTermsConditions(e) {
    this.setData({
      termsConditionsCheck: true
    });
  }, OnRedirectTermsConditions() {
    my.navigateTo({
      url: "/main/ui/ActivatePackagesRoaming/termsAndConditionsRoaming/termsAndConditionsRoaming"
    });
  },
  redirectToViewMore(){
    this.setData({
      viewMorepackages:true
    })
    let packages=this.data.Offer
    console.log("pac",packages)
  },
  showLoading() {
    this.setData({
      showLoading: true
    });
  },
  hideLoading() {
    this.setData({
      showLoading: false
    });
  },
});
