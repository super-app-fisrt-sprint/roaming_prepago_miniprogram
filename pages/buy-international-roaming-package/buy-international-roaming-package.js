import {
  sendPostRequest
} from '/services/checkPrepaidRoamingPackageCatalog'

import {
  sendActivatePackageRequest
} from '/services/activatePrepaidRoamingPackage'

const iconDefault = "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/keyboard_arrow_down/default/48px.svg"

Page({
  data: {
    lineNumber: getApp().globalData.lineNumber,
    iconArrowUp: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/expand_less/default/48px.svg',
    iconArrowDown: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/keyboard_arrow_down/default/48px.svg',
    showMenuContent: false,
    showDailyPackages: false,
    showPeriodPackages: false,
    iconMenuContent: iconDefault,
    iconDailyPackages: iconDefault,
    iconPeriodPackages: iconDefault,
    showLoading: false,
    categories: Array(),
    dailyPackages: Array(),
    periodPackages: Array(),
    allPackages: Array(),
    popupVisibleFeaturedPackages: false,
    currentPackageToActivate: {},
    isButtonModalActive: false,
    currentPackageViewDescription: '',
    modalAcceptVisible: false,
    modalAcceptCancelVisible: false,
    packageCode: ''
  },
  onLoad(query) {
    this.getPackagesPrepaidRoamingInt();
  },

  onReady() {
    my.setNavigationBar({
      title: "Mi Claro",
      success() {},
      fail() {}
    });
  },

  onShowMenuContent() {
    this.setData({
      showMenuContent: !this.data.showMenuContent,
      iconMenuContent: !this.data.showMenuContent ? this.data.iconArrowUp : this.data.iconArrowDown
    });
  },

  onShowDailyPackages() {
    this.setData({
      showDailyPackages: !this.data.showDailyPackages,
      iconDailyPackages: !this.data.showDailyPackages ? this.data.iconArrowUp : this.data.iconArrowDown
    });
  },

  onShowPeriodPackages() {
    this.setData({
      showPeriodPackages: !this.data.showPeriodPackages,
      iconPeriodPackages: !this.data.showPeriodPackages ? this.data.iconArrowUp : this.data.iconArrowDown
    });
  },

  //servicios
  getPackagesPrepaidRoamingInt() {
    setTimeout(() => {
      this.showLoading();
    }, 100);
    sendPostRequest(this)
      .then(res => {
        this.hideLoading();
        if (res.status == 200 && res.data.error == 0) {
          this.setData({
            //modalVisibleMessage: true,
            categories: res.data.response.categorias,
          });
          this.classifyPackagesByCategory(this.data.categories, res.data.response.paquetes);
        } else {
          this.setData({
            descriptionError: res.data.response,
            modalVisibleError: true,
          });
        };
      })
      .catch(error => {
        this.hideLoading();
        this.setData({
          descriptionError: "En este momento no podemos atender esta solicitud, intenta nuevamente",
          modalVisibleError: true,
        })
      });
  },

  sendActivatePrepaidPackageRoaming() {
    setTimeout(() => {
      this.showLoading();
    }, 100);
    sendActivatePackageRequest(this, this.data.packageCode)
      .then(res => {
        this.hideLoading();
        if (res.status == 200 && res.data.error == 0) {
          this.setData({
            modalAcceptVisible: true,
            currentPackageViewDescription: 'Tu paquete de Roaming Internacional para la cuenta ' + this.data.lineNumber + ' se agregó exitosamente.',
          });
        } else {
          this.setData({
            modalAcceptVisible: true,
            currentPackageViewDescription: res.data.response,
          });
        };
      })
      .catch(error => {
        this.hideLoading();
        this.setData({
          modalAcceptVisible: true,
          currentPackageViewDescription: 'En este momento no podemos atender esta solicitud, intenta nuevamente',
        });
      });
  },


  goToRoamingTermsAndConditions() {
    my.navigateTo({
      url: "/pages/terms-conditions/terms-conditions"
    })
  },

  classifyPackagesByCategory(categories, packages) {
    let dailyPacks = packages.filter(x => x.tipoProductoRoamingID == 1);
    let periodPacks = packages.filter(x => x.tipoProductoRoamingID == 2);
    this.setData({
      dailyPackages: dailyPacks,
      periodPackages: periodPacks,
      allPackages: packages
    });
  },

  findPackageInfo(id) {
    let searchedPackage = this.data.allPackages.find(x => x.catalogoPaqueteRoamingID == id)
    return searchedPackage;
  },

  openPackageDescription(e) {
    let packageFind = this.findPackageInfo(e.target.dataset.selectedPackageIndex);
    this.setData({
      currentPackageViewDescription: packageFind.descripcion,
      modalAcceptVisible: true
    })
  },

  onShowModalActivatePackage(e) {
    let packageFind = this.findPackageInfo(e.target.dataset.packageId);
    this.setData({
      currentPackageToActivate: packageFind,
      popupVisibleFeaturedPackages: true
    });
  },

  onActivateFeaturedPackage(e) {
    if (this.data.isButtonModalActive) {
      this.setData({
        modalAcceptCancelVisible: true,
        packageCode: this.data.currentPackageToActivate.codigoPaqueteSaldo
      })
    }
  },

  onAcceptButtonTap() {
    console.log(this.data.packageCode);
    this.sendActivatePrepaidPackageRoaming();
  },

  showLoading() {
    this.setData({
      showLoading: true
    });
  },
  //Metodo necesario para ocultar el loading
  hideLoading() {
    this.setData({
      showLoading: false
    });
  },

  handleClose(e) {
    this.setData({
      popupVisibleFeaturedPackages: false,
      currentPackageToActivate: {},
      isButtonModalActive: false,
      //modalAcceptVisible: false,
      modalAcceptCancelVisible: false
    })
  },

  handleCloseModalAccept() {
    this.setData({
      modalAcceptVisible: false,
    })
  },

  onChange(e) {
    this.setData({
      isButtonModalActive: e.detail.value
    })
  },

});