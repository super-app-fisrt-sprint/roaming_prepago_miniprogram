const DataLoginViewModel = require("../../domain/DataLoginViewModel");
const DeviceSpectViewModel = require("../../domain/DeviceSpectViewModel");
const RetrieveRoamingViewModel = require("../../domain/RetrieveRoamingViewModel");
const DisableRoamingViewModel = require("../../domain/DisableRoamingViewModel");
Page({
  data: {
    titleBarHeight: 0,
    statusBarHeight: 0,
    switchServiceState: false,
    styleServiceRoamingAcive:false,
    expirationDate:"indefinida",
    dataLimitValue:"$317.949 ",
    modalVisibleRedirectActive: false,
    modalInfo: {
      title: "Confirma la desactivación",
      descriptionTitle:
        "¿Deseas desactivar el servicio de roaming internacional para la línea 3105731610?",
      content:
        "Reinicia el equipo asociado a la linea para terminar el proceso",
      primaryButtonText: "Desactivar",
      secondaryButtonText: "Cancelar",
      visible: false
    },
    modalInfoDisablePackage: {
      title: "Desactivar Paquete",
      descriptionTitle:
        "Continúa para cancelar tu paquete de Roaming internacional",
      content:
        "Ten en cuenta que si no tienes un paquete de Roaming, los datos, minutos y SMS que uses se cobrarán con la tarifa del país.",
      primaryButtonText: "Continuar",
      secondaryButtonText: "Cancelar",
      visible: false
    },
    toast: {
      content:
        "El servicio de Roaming internacional ha sido activado con éxito",
      type: "CheckCircleOutline",
      visible: false,
      icon: "LikeOutline",
      duration: 4000,
      color: ""
    },
    modalOnlymsgbuy:false,
    modalMoreInformation:false,
    modalVisibleCompletedActivate:false
  },
  onLoad(e) {
  //   const accountId = e.accountId.trim();
  //   console.log("phoneNumber",accountId)

  const accountId = "3112516584";
  const loginString = `{
    "DocumentType": 1,
    "email": "juan.saavedra9306@gmail.com",
    "nombre": "",
    "apellido": "",
    "UserProfileID": "juan.saavedra9306@gmail.com",
    "DocumentNumber": "",
    "NumberAccount": "",
    "lineNumber": ""
    }`;

  const deviceString = `{"X-SESSION-ID":"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",
    "X-MC-LINE": "3112516584",
    "X-MC-LOB": "2",
    "Content-Type": "application/json; charset=UTF-8",
    "X-MC-MAIL": "thatanspk@gmail.com",
    "X-MC-SO": "android",
    "X-Carrier": "claro",
    "X-Wifi": true,
    "X-MC-HE-V": "3",
    "X-MC-SO-V": "11",
    "Cache-Control": "no-cache",
    "X-MC-SO-API": "30",
    "X-MC-SO-PHONE-F": "samsung",
    "X-MC-SO-PHONE-M": "SM-S908E",
    "X-MC-APP-V": "15.0.0",
    "X-MC-DEVICE-NAME": "samsungSM-S908E",
    "X-MC-DEVIDE-ID":
      "GwoilWmyuJs6IxXKMIiCR18DQ3Qx+axRzGutYT820NPODRz4TuigtXGTcDUp2KMG3LT3NNyNwuT14ugZrb5Jbzyd6b0AFiLGenLqWIdmjxIfndtLyzTd5pUUojacwrV7Q/+bY5qxCLptkpjSPRN5MG6gNbHbUrqoJuIYdSKMMQ0=",
    "X-MC-USER-AGENT":
      "eyJpcCI6IjE5Mi4xNjguMS4xMDMiLCJ1c2VyQWdlbnQiOiJNaUNsYXJvQXBwLzAuMC4xIChYaWFvbWk7IE0yMTAxSzdCTDsgXHUwMDNjYW5kcm9pZC8xMVx1MDAzZSkifQ=="
  }`;
    //charge info login User in storage
    DeviceSpectViewModel.createInfoDeviceStorage(deviceString);
    DataLoginViewModel.createDataLoginInfoStorage(loginString);
    

    const { titleBarHeight, statusBarHeight } = my.getSystemInfoSync();
    this.setData({
      titleBarHeight,
      statusBarHeight,
      accountId
    });
  },
  onShow(){
    const deviceSpect = DeviceSpectViewModel.getInfoDeviceStorage();
    const loginInfo = DataLoginViewModel.getDataLoginInfoStorage();
    const accountId = this.data.accountId;
    this.showLoading();
    this.retrieveRoamingService(deviceSpect, accountId);
    let toastSucces = this.data.toast;
    let res = my.getStorageSync({ key: "RoamingEnabled" });

    if (res && res.data && res.data.RoamingEnabled) {
      toastSucces.visible = true;
      toastSucces.type = "CheckCircleOutline";
      toastSucces.color = "background-color:#0BB07B;";
      toastSucces.content = res.data.Message;

      this.setData({
        toast: toastSucces,
        switchServiceState: true
      });
      let that=this
      setTimeout(function() {
        console.log("entro")
        that.setData({
          modalOnlymsgbuy: true
        });
      }, 2000);
      my.setStorage({
        key: "RoamingEnabled",
        data: {
          RoamingEnabled: false
        }
      });
    }
  },
  ModalShowMoreinformation(){
    this.setData({
      modalOnlymsgbuy:false,
      modalMoreInformation: true
    });
  },
  switchChange(e) {
    let modalDesactivacion = this.data.modalInfo;
    modalDesactivacion.visible = true;

    if (e.detail.value) {
      this.redirectToEnableRoaming();
    } else {
      this.setData({
        modalInfo: modalDesactivacion
      });
    }

    // if (e.detail.value) {
    //   this.setData({
    //   });
    // } else {
    //   this.setData({
    //     styleServiceRoamingAcive:false,
    //     switchServiceState: false
    //   });
    // }
  },
  onAcceptButtonDisableRoaming() {
    const deviceSpect = DeviceSpectViewModel.getInfoDeviceStorage();
    const min =this.data.accountId;
    let toast = this.data.toast;
    this.showLoading();

    DisableRoamingViewModel.disableRoaming(deviceSpect,min)
      .then(result => {
        this.hideLoading();
        toast.content = result.message;
        toast.type = !result.error
          ? "CheckCircleOutline"
          : "CloseCircleOutline";
        toast.color = !result.error
          ? "background-color:#0BB07B;"
          : "background-color:red;";
        toast.visible = true;

        if (result.error) {
          this.setData({
            toast: toast
          });
        } else {
          this.setData({
            toast: toast,
            switchServiceState: false
          });
        }
      })
      .catch(error => {
        this.hideLoading();
        toast.content = error.message;
        toast.type = !result.error
          ? "CheckCircleOutline"
          : "CloseCircleOutline";
        toast.color = !result.error
          ? "background-color:#0BB07B;"
          : "background-color:red;";
        toast.visible = true;

        this.setData({
          toast: toast
        });
      });
  },
  retrieveRoamingService(deviceSpect, accountId) {
    RetrieveRoamingViewModel.getRetrieveRoaming(deviceSpect, accountId)
      .then(result => {
        console.log("retrieve Roaming--->",result)
        if (result !== false) {
          if (result.isActive === "1") {
            this.setData({
              switchServiceState: true,
              styleServiceRoamingAcive:true,
            });
            let expritationDateStr =
              result.expirationDate == "2500-12-31"
                ? ""
                : result.expirationDate;
            if (expritationDateStr.trim() != "") {
              this.setData({
                expirationDate: expritationDateStr
              });
            }
          }
          // else {
          //   my.navigateTo({
          //     url:"/main/ui/enableRoaming/enableRoaming"
          //   })
          // }
          // this.CheckInstallPackage(deviceSpect, accountId);
          this.hideLoading();
        } else {
          this.hideLoading();
          this.errorTrigger(null);
        }
      })
      .catch(error => {
        this.hideLoading();
      });
  },
  errorTrigger(error) {
    this.hideLoading();
    if (
      error.status === 401 &&
      error.data &&
      error.data.response === "Error de acceso, tiempo de sesion agotado"
    ) {
      my.alert({
        content: "Su sesión ha expirado. Por favor, inicie sesión de nuevo.",
        buttonText: "Cerrar",
        success: () => {
          my.reLaunch({
            //------------->👀OJO FALTA QUE redireccione a login👀<--------------
            url: "/main/ui/pages/mobileSolutionsIndex/mobileSolutionsIndex"
          });
        }
      });
    } else {
      my.alert({
        content:
          error.data.response === undefined ||
          error.data.response === null ||
          error === null
            ? "Por Favor,intente mas tarde."
            : error.data.response,
        buttonText: "Cerrar",
        success: () => {
          my.reLaunch({
            //------------->👀OJO FALTA QUE redireccione a login👀<--------------
            url: "/main/ui/pages/mobileSolutionsIndex/mobileSolutionsIndex"
          });
        }
      });
    }
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
  handleClose() {
    let modalInfo = this.data.modalInfo;
    let toast = this.data.toast;
    let modalDisablePackage = this.data.modalInfoDisablePackage;
    modalInfo.visible = false;
    modalDisablePackage.visible = false;
    toast.visible = false;
    this.setData({
      modalInfo: modalInfo,
      toast: toast,
      modalVisibleCompletedActivate:false
    });
  },
  redirectToEnableRoaming(){
    const min =this.data.accountId;
    my.navigateTo({
      url:`/main/ui/enableRoaming/enableRoaming?accountId=${min}`
    })
  },
  redirectToActivatePackages(){
    const min =this.data.accountId;
    my.navigateTo({
      url:`/main/ui/ActivatePackagesRoaming/activateRoamingPackageIndex/activateRoamingPackageIndex?accountId=${min}`
    })
  },
  ExecuteModalSucceedActivateService(){
    this.setData({
      modalMoreInformation:false,
      modalVisibleCompletedActivate:true
    });
  }
});
