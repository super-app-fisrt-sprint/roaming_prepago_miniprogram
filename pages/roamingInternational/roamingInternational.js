import { requestApiretrieve } from "/services/retrieveRoamingService";
import { requestApiCheckInstalled } from "/services/checkInstalledPackagesService";
import { requestApiDisableRoamingPackage } from "/services/disableRoamingPacket";
import { requestApiDisableRoamingService } from "/services/disableRoamingServicePersonas";

Page({
  data: {
    credictValue:317949,
    sessionError:"Se te ha agotado el tiempo de sesión",
    redirectServices:"",
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
      
  },

  onReady() {
    my.setNavigationBar({
      title: "Roaming internacional",
      success() {},
      fail() {}
    });
  },

  onShow() {
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
        isActive: isActiveService
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
      this.redirectActivateRoamingInt();
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
        modalServiceVisible: false
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
      modalVisibleDescription: false
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

  redirectActivateRoamingInt(){
    my.navigateTo({
      url: "/pages/soluciones-moviles/roaming-international/expiration-date-roaming/expiration-date-roaming?isActive=" + this.data.isActive
    });
  }
});
