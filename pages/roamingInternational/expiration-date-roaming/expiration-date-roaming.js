import {
  postActivactionRequest
} from "/services/activateRoamingService"

Page({
  data: {
    lineNumber: '',
    roamingActivationSelected: 0,
    roamingActivationOptions: [{
        index: 1,
        text: "Activar indefinidamente",
      },
      {
        index: 2,
        text: "Activar con fecha limite"
      }
    ],
    isDatePickerShowed: false,
    fechaLimite: "Indefinida",
    customVisible: false,
    min: new Date(),
    max: new Date('2025/12/31'),
    textAcceptButton: 'Activar',
    modalTitleMessage: '',
    modalVisibleMessage: false,
    modalResponseMessage: '',
    showLoading: false,
    isActiveRoaming: false,
    descriptionError: "",
    modalVisibleError: false,
  },

  onLoad(query) {
    this.setData({
      lineNumber: getApp().globalData.lineNumber
    });
    let isActive = query.isActive;
    if (isActive === '1') {
      this.setData({
        textAcceptButton: "Actualizar",
        isActiveRoaming: true
      })
    } else {
      this.setData({
        textAcceptButton: "Activar",
        isActiveRoaming: false
      })
    }
  },

  onRadioChanged(value) {
    this.setData({
      roamingActivationSelected: value.detail.value
    });
    if (value.detail.value === 2) {
      this.setData({
        isDatePickerShowed: true
      })
    } else {
      this.setData({
        isDatePickerShowed: false,
        fechaLimite: "Indefinida",
      })
    }
  },

  //#region DatePicker
  handleFormatLabel(type, value) {
    if (type === 'month') type = "Mes";
    if (type === 'year') type = "Año";
    if (type === 'day') type = "Dia";
    return String(type + " " + value);
  },
  formatDate(date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  },
  handlePickerChange(date, dateStr, e) {
    this.setData({
      fechaLimite: this.formatDate(date)
    })
  },
  handlePickerAccept(dateStr) {
    this.setData({
      fechaLimite: this.formatDate(dateStr),
      customVisible: true,
    })
  },
  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  },
  //#endregion


  //#region Modal
  handleOpen(e) {
    if (this.data.roamingActivationSelected === 0) {
      this.setData({
        modalVisibleError: true,
        descriptionError: "Debe seleccionar el método de activación"
      });
      return;
    } else if (this.data.roamingActivationSelected === 2) {
      console.log("Validamos si seleccionó fecha: ", this.data.fechaLimite);
      if (this.data.fechaLimite == "Indefinida") {
        console.log("Indefinida");
        this.setData({
          modalVisibleError: true,
          descriptionError: "Debe seleccionar una fecha"
        });
        return;
      }
    }

    const {
      field
    } = e.target.dataset;
    this.setData({
      [field]: true
    });
  },
  handleClose() {
    console.log("handleClose()");
    this.setData({
      basicVisible: false,
      withTitleVisible: false,
      basicTwoVisible: false,
      basicThreeVisible: false,
      focusOneVisible: false,
      focusTwoVisible: false,
      focusThreeVisible: false,
      customVisible: false,
      customBodyVisible: false,
      modalVisibleMessage: false,
      modalVisibleError: false
    });
  },
  handleCloseAccept() {
    console.log("handleCloseAccept()");
    this.handleClose();
    if (this.data.roamingActivationSelected != 0) {
      this.hideLoading();
      this.redirectToBack();
    }
  },
  onAcceptButtonTap() {
    console.log("date", this.data.fechaLimite);
    let date = this.data.fechaLimite === 'Indefinida' ? '' : this.data.fechaLimite;
    console.log("parameter date", date);
    this.sendPostActivationRoaming(date);
  },
  onCancelButtonTap() {
    this.handleClose();
  },
  //#endregion

  showLoadings() {
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

  sendPostActivationRoaming(date) {
    setTimeout(() => {
      this.showLoadings();
    }, 100);
    postActivactionRequest(this, date)
      .then(res => {
        console.log("response", res);
        this.hideLoading();
        if (res.status == 200 && res.data.error == 0) {
          this.setData({
            modalVisibleMessage: true,
          });
        } else {
          this.setData({
            descriptionError: res.data.response,
            modalVisibleError: true,
          });
        }
      })
      .catch(error => {
        this.hideLoading();
        this.setData({
          descriptionError: "En este momento no podemos atender esta solicitud, intenta nuevamente",
          modalVisibleError: true,
        })
      });
  },

  redirectToRoamingWeb() {
    my.navigateTo({
      url: "/pages/soluciones-moviles/roaming-international/redirectToRoamingWeb/redirectToRoamingWeb"
    });
  },

  redirectToBack() {
    my.navigateBack({
      delta: 1
    });
  }
});