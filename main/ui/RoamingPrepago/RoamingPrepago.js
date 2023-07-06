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

  const accountId = "3219882751";
  const loginString = `{
    "DocumentType": 1,
    "email": "gabrielsan98@hotmail.com",
    "nombre": "",
    "apellido": "",
    "UserProfileID": "gabrielsan98@hotmail.com",
    "DocumentNumber": "",
    "NumberAccount": "",
    "lineNumber": ""
    }`;

  const deviceString = `{"X-SESSION-ID":"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",
    "X-MC-LINE": "3219882751",
    "X-MC-LOB": "2",
    "Content-Type": "application/json; charset=UTF-8",
    "X-MC-MAIL": "gabrielsan98@hotmail.com",
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
      "PPyyf/EJmzSWiHcfQbv6gZvohSK/p1RF2YKbyTcAm8OlZkLQHEu0d/U7GgY/yG3bzpMCJfRfrk/0YYm/5ys6nHXW+QGjBysFGMV+AvlRICS36rwEwc1R4MA6EtmkrePxSt8wEeklfqRMELHYfWARDL3v4NTXbIKWyALhYumlE7k=",
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
