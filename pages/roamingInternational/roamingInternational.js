import { requestApiretrieve } from "/services/retrieveRoamingService";
import { requestApiCheckInstalled } from "/services/checkInstalledPackagesService";
import { requestApiDisableRoamingPackage } from "/services/disableRoamingPacket";
import { requestApiDisableRoamingService } from "/services/disableRoamingService";

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
      "https://apiselfservice.co/api/index.php/v1/soap/activateRoamingService.json"
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
        // this.packageInstalledService();
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
  packageInstalledService() {
    const errorGlobalSession = getApp().globalData.sessionError;
    requestApiCheckInstalled(this.data.urlChekingInstalled, this)
      .then(res => {
        console.log("succes---->", res);
        if (res.data.error == 1) {
          this.setData({
            redirectServices:"redirectHomeServices",
            descriptionError:"En este momento no podemos atender esta solicitud, intenta nuevamente",
             modalVisibleError:true,
          })
        } else {
          this.packageInstalledValidation(res);
        }
      })
      .catch(error => {
        console.log("error--->", error);
        this.hideLoading();
        if (
          error.status === 401 &&
          error.data &&
          error.data.response === "Error de acceso, tiempo de sesion agotado"
        ) {
          this.setData({
            redirectServices:"redirectLoginServices",
            descriptionError:this.data.sessionError,
             modalVisibleError:true,
          })
        }
        else if (error.error == 13) {
          this.setData({
            descriptionError:"No es posible obtener información, por favor inténtelo de nuevo más tarde",
            redirectServices:"redirectHomeServices",
             modalVisibleError:true,
          })
        } else {
          
          this.setData({
            descriptionError:this.data.sessionError,
            redirectServices:"redirectLoginServices",
            modalVisibleError:true,
          })
        }
      });
  },
  packageInstalledValidation(res) {
    const packageInstallList = res.data.response.map(item => {
      const { name, description, codServ } = item;
      return { name, description, codServ };
    });
    this.setData({
      packagedInstalled: packageInstallList,
      loaded: true,
      codServ: "test"
    });
    console.log("request roaming success");
    this.hideLoading();
  },
  packageDisableRoaming(disableData) {
    requestApiDisableRoamingPackage(
      this.data.urlDisableRoamingPacket,
      disableData,
      this
    )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        my.hideLoading({
          page: this
        });
        this.setData({
          redirectServices:"redirectLoginServices",
          descriptionError:this.data.sessionError,
           modalVisibleError:true,
        })
      });
  },

  switchChange(e) {
    if (!e.detail.value) {
      this.setData({
        switchServiceState: false,
      });
    }
    else{

      this.redirectActivateRoamingInt();

      this.setData({
        switchServiceState: true,
      });
    }
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
      url: "/pages/roamingInternational/expiration-date-roaming/expiration-date-roaming?isActive=" + this.data.isActive
    });
  }
});
