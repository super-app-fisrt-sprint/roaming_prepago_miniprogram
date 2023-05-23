import { requestApiDisableRoamingService } from "/services/disableRoamingService";
Page({
  data: {
    urlDisableRoamingService:"https://apiselfservice.co/M3/Postpago/Roaming/desactivarServicio/",
    switchServiceState: true,
  },
  onLoad() {},


  disableRoamingService(disableDataService) {
    console.log(disableDataService)
    requestApiDisableRoamingService(
      this.data.urlDisableRoamingService,
      disableDataService,
      this
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
    const disableData = {
      min: "3103815747",
      codePackage: this.data.selectedPackageCode
    };
    this.packageDisableRoaming(disableData);

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
    console.log("Disable");
    this.setData({
      modalServiceVisible: false
    });

    const disableData = {
      activar: "0",
      ExpirationDate: ""
    };

    this.showLoading({
      content: "Cargando..."
    });
    this.disableRoamingService(disableData);
  },

  onCancelButtonTap() {
    console.log("Cancelar");
    this.setData({
      modalVisible: false
    });
  },

});