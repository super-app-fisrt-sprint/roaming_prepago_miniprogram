import { requestApiretrieve } from "/services/retrieveRoamingService";
import { requestApiCheckInstalled } from "/services/checkInstalledPackagesService";
import { requestApiDisableRoamingPackage } from "/services/disableRoamingPacket";
import { requestApiDisableRoamingService } from "/services/disableRoamingServicePersonas";

Page({
  data: {
    credictValue:317949,
    sessionError:"Se te ha agotado el tiempo de sesión",
    redirectServices:"",
    descriptionInformationModal: "Por esta opción solo activarás el servicio de roaming internacional, recuerda ingresar a la opción de “Comprar paquetes” y adquirir uno para el país al que vas a viajar.",
    modalVisibleInfo: false,
    descriptionError:"",
    modalVisibleError:false,
    modalServiceVisible: false,
    modalVisible: false,
    modalConfirmDisableService: false,
    descriptionModal: "",
    loaded: true,
    modalVisibleDescription: false,
    response: {},
    lineNumber: "",
    nit: "900999998",
    isActive: false,
    expirationDate: "Indefinido",
    switchServiceState: false,
    packagedInstalled: [],
    condServ: "",
    showLoading: false,
    urlChekingInstalled:
      "https://apiselfservice.co/M3/Empresas/Postpago/checkInstalledPackages/",
    urlRetrieveRoaming:
      "https://apiselfservice.co/api/index.php/v1/soap/retrieveRoamingService.json",
    urlDisableRoamingPacket:
      "https://apiselfservice.co/M3/Empresas/Postpago/DisableRoamingPacket/",
    urlDisableRoamingService:
      "https://apiselfservice.co/M3/Postpago/Roaming/desactivarServicio/",
    ////// Martin 
    errorVisible: false,
    errorVisible2: false,
    errorVisible3: false,
    activeService: false,
    webViewUrl:
      "https://www.claro.com.co/personas/servicios/servicios-moviles/roaming/"

  },

  onLoad(){

   
  },
  onReady() {
    my.setNavigationBar({
      title: "Roaming internacional",
      success() {},
      fail() {}
    });
  },

  onShow() {
    let that = this;
    my.getStorage({
      key: 'roamingPrepago',
      success: function(res) {

        console.log("STORAGE:", res);
        if(res.data.activaRoaming) {
          that.setData({
            errorVisible: true
          });
        }        
        console.log(this.data.errorVisible);
        my.removeStorage({
          key: 'roamingPrepago'
        });
        
      },
      fail: function(res){
        that.setData({
          errorVisible: false
        });
      }
    });
    const numberLinerSearch = getApp().globalData.lineNumber;
    console.log(numberLinerSearch)
    this.setData({
      lineNumber: numberLinerSearch
    });
    this.showLoading();
    requestApiretrieve(this.data.urlRetrieveRoaming, this)
      .then(res => {
        console.log("Retrieve Service--->",res)
        this.retrieveServiceValidation(res);
      })
      .catch(error => {
        this.hideLoading();
        this.setData({
          redirectServices:"redirectBackServices",
          descriptionError:"En este momento no podemos atender esta solicitud, intenta nuevamente",
          modalVisibleError:true,
        })
      });
  },
  retrieveServiceValidation(res) {
    var expritationDateStr = res.data.response.estado.fechaExpiracion;
    var isActiveService = res.data.response.estado.esActivo;
    if (expritationDateStr.trim() != "") {
      this.setData({
        expirationDate: expritationDateStr
      });
    }else{
      this.setData({
        expirationDate: 'Indefinido'
      });
    }
    if (isActiveService === "1") {
      this.setData({
        switchServiceState: true,
        isActive: isActiveService,
        modalVisibleInfo: false
      });
    }

    this.hideLoading();
  },
  disableRoamingService(line) {
    requestApiDisableRoamingService(
      this.data.urlDisableRoamingService,
      line,
      this,      
      
    )
      .then(res => {
        if (res.data.error == 0) {
          this.setData({
            switchServiceState: false
          });
          this.openModalConfirmDisableService();
        } else {
          this.hideLoading({
            page: this
          });
          my.alert({
            content: res.data.response,
            buttonText: "Cerrar"
          });
          this.setData({
            switchServiceState: true
          });
        }
        console.log(res);
      })
      .catch(error => {
        this.hideLoading({
          page: this
        });
        this.setData({
          redirectServices:"redirectBackServices",
          descriptionError:"Ha ocurrido un error, por favor inténtelo de nuevo más tarde",
           modalVisibleError:true,
        })
      });
  },

  switchChange(e) {
    if (!e.detail.value) {
      this.setData({
        modalServiceVisible: true
      });
    }else{
      this.setData({
        modalVisibleInfo: true
      });
    }
  },
  // switchChange(e) {
  //   if (!e.detail.value) {
  //     this.setData({
  //       switchServiceState: false,
  //     });
  //   }
  //   else{
  //     this.setData({
  //       switchServiceState: true,
  //     });
  //   }
  // },

  openModalConfirmDisableService() {
    console.log("confirm disable");

    this.setData({
      modalConfirmDisableService: true
    });

    this.hideLoading();
  },
  handleOpenModal(e) {
    console.log(e);
    console.log("Entrando");
    this.setData({
      modalVisible: true,
      selectedPackageCode: e.target.dataset.code
    });
    console.log(this.data.selectedPackageCode);
  },

  onAcceptButtonTap() {
    console.log("Aceptar");
    this.setData({
      modalVisible: false
    });

    my.showLoading({
      content: "Cargando..."
    });

    // Llamar a my.reLaunch para recargar la página
    my.reLaunch({
      url:
        "/pages/soluciones-moviles/roaming-international/roaming-international",
      success: function() {
        my.hideLoading();
      }
    });
  },
    // Disabling roaming service
    onAcceptButtonRoamingTap() {
      const numberLinerSearch = getApp().globalData.lineNumber;
      console.log("Disable");
      this.setData({
        modalServiceVisible: false,
        errorVisible2: false,
        errorVisible3: false
      });
      this.showLoading({
        content: "Cargando..."
      });
      this.disableRoamingService( numberLinerSearch);
    },

  onCancelButtonTap() {
    console.log("Cancelar");
    this.setData({
      modalVisible: false
    });
  },
  
  handleClose() {
    this.setData({
      modalVisible: false,
      modalVisibleDescription: false,
      modalVisibleInfo: false
      // errorVisible:false,
      // errorVisible2: false,
      // errorVisible3: false
    });
    
  },
  // Disbabling roaming service
  handleCloseRoaming() {
    this.setData({
      modalConfirmDisableService: false,
      switchServiceState: false
    });
  },

  redirectBackServices() {
    my.navigateBack({});
  },

  onCancelButtonRoamingTap() {
    console.log("Cancelar");
    this.setData({
      modalServiceVisible: false,
      switchServiceState: true
    });
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

  onAcceptInfoModal(){
    this.redirectActivateRoamingInt();
  },

  redirectActivateRoamingInt(){
    my.navigateTo({
      url: "/pages/roamingInternational/expiration-date-roaming/expiration-date-roaming?isActive=" + this.data.isActive
    });
  },

  ///Martin

  redirect(){
    my.navigateTo({
      url: `/pages/web-view/web-view?url=${this.data.webViewUrl}`
    });
  },
  handleClose2() {
    this.setData({
      errorVisible: false,
      errorVisible2: true
    });
  },
  handleCloseMod2() {
    this.setData({
      errorVisible2: false,
      errorVisible3: true
    });
  },
  handleCloseMod3() {
    this.setData({
      errorVisible: false,
      errorVisible2: false,
      errorVisible3: false
    });

    my.setStorage({
      key: 'roamingPrepago',
      data: {
        activaRoaming: false
      },
      success: function() {
      }
    });
  },

  //Juan St
  redirectToBuyPrepaidPackages(){
    my.navigateTo({
      url: '/pages/buy-international-roaming-package/buy-international-roaming-package'
    });
  }
});
