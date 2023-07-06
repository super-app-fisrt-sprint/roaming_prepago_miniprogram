const DeviceSpectViewModel = require("../../../domain/DeviceSpectViewModel");
const getOfferPackagesRoaming = require("../../../domain/offerPackagesRoamingViewModel")
const createProvisioningViewModel = require("../../../domain/CreateProvisioningViewModel")
const registerTicketRoamingViewModal=require("../../../domain/CreateProvisioningViewModel")
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

    getOfferPackagesRoaming.getOfferPackagesRoaming(deviceSpect,accountId,"true","","-1","2").then(packages=>{
      
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
    let packagesNew = packages.map(({ precio, ...resto }) => ({
      precio,
      precioSTR: this.convertCurrency(precio),
      ...resto
    }));

    let OfferSlice=packagesNew.slice(0,3)
    console.log("offerDay---->", packagesNew)
    this.setData({
      viewBtnViewMore:true,
      orderIsTap,
      Offer:packagesNew,
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
      popUpActivate:true,
      packageSelected: e.currentTarget.dataset.value
    })
  },
  activatePackagewarning(){
    this.setData({
      popUpActivate:false,
      modalVisibleConfirtBuy:true
    })
  },
  ejecutarTrama(){
    this.showLoading()
    createProvisioningViewModel.createProvisioning(this.data.deviceSpect, this.data.accountId, this.data.packageSelected.codigoPaqueteSaldo).then(result=>{
      this.hideLoading();
      if(!result.error)
      {
        registerTicketRoamingViewModal.createProvisioning(this.data.deviceSpect,this.data.accountId,this.data.packageSelected.descripcion).then(result=>{
          console.log("Ticket:",result)
        })
        .catch(error=>{
          console.log("Error:",error)
        })
        this.setData({
          modalVisibleCompletedBuy:true
        })
      }else
      {
        console.log(result);
        this.setData(
          {
            indoModalTitle: result.message,
            showModalOfferEmpty: true
          })
      }
    })
    .catch(error=>{
      this.hideLoading();
    })
  },
  handleClose() {
    this.setData({
      modalVisibleConfirtBuy: false,
      termsConditionsCheck: false,
      showModalOfferEmpty: false
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
   convertCurrency(value) {
     const formatterPeso = new Intl.NumberFormat("es-CO", {
       style: "currency",
       currency: "COP",
       minimumFractionDigits: 0
     });
     let result = formatterPeso.format(value);
     return result;
   },
   descriptionModalOffer(e){
     let info=e.currentTarget.dataset.value;
    this.setData({
      inforModaloffer:info,
      modalOfferInfoDescription:true
    })
   },
   handleCloseInfo(){
    this.setData({
      modalOfferInfoDescription:false
    })
   }
});
