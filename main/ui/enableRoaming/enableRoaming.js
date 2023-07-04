const DeviceSpectViewModel = require("../../domain/DeviceSpectViewModel");
const EnableRoamingViewModel = require("../../domain/EnableRoamingViewModel");

Page({
  data: {
    showLoading: false,
    titleBarHeight: 0,
    statusBarHeight: 0,
    datePickerValue:"",
    min: new Date(),
    max: new Date('31/12/2025'),
    fechaLimite: "",
    modalInfo: 
    {
      title: "",
      titleFechaIndefinida: "¿Activar roaming internacional para la linea indefinidamente?",
      content: "Reinicia el equipo asociado a la linea para terminar el proceso",
      primaryButtonText: "Activar",
      secondaryButtonText: "Cancelar",
      visible: false
    },
    deviceSpect: "",
    toast: 
    {
      content: "",
      type: "CheckCircleOutline",
      visible: false,
      icon: "CloseCircleOutline",
      duration: 4000,
      color:"background-color:red;"
    }
  },
  onLoad(e) {
    // const min = e.accountId.trim();
    const deviceSpect = DeviceSpectViewModel.getInfoDeviceStorage();
    const { titleBarHeight, statusBarHeight } = my.getSystemInfoSync();
    this.setData({
      titleBarHeight,
      statusBarHeight,
      deviceSpect,
      // min
    });
    
  },
  onConfirmActiveRoaming(){

    let modalInfo = this.data.modalInfo;
    modalInfo.title = modalInfo.titleFechaIndefinida;
    modalInfo.visible = true;

    this.setData({
      fechaLimite: "",
      modalInfo: modalInfo
    })
  },
  //#region DatePicker
  handleFormatLabel(type, value) {
    if (type === 'month') type = "Mes";
    if (type === 'year') type = "Año";
    if (type === 'day') type = "Día";
    return String(type + " " + value);
  },
  handlePickerAccept(dateStr, dateSelected) {

    let modalInfo = this.data.modalInfo;
    modalInfo.title = "¿Activar roaming internacional para la línea " + this.data.accountId +" hasta el "+ dateSelected +"?";
    modalInfo.visible = true;
    dateSelected = dateSelected
    
    this.setData({
      fechaLimite: dateSelected,
      modalInfo: modalInfo
    })
  },
  //#endregion
  onAcceptButtonActivateRoaming(){

    this.showLoadings();
    let toast = this.data.toast;
    const min=this.data.min;
    let date="31/12/2024";
    let dateOutSpace =date.replace(/\//g, '');
    EnableRoamingViewModel.enableRoaming(this.data.deviceSpect,dateOutSpace,min)
    .then(result => {
      this.hideLoading();
      if(!result.error){
        
        my.setStorage({
          key: 'RoamingEnabled',
          data: {
            RoamingEnabled: true,
            Message: result.message
          },
          success: function() {
            my.navigateBack({
              delta: 1
            })
          }
        });
      }else{
       
        toast.content = result.message
        toast.visible = true;
        this.setData({
          toast:toast
        })
      }
    })
    .catch(error => {
      this.hideLoading();
    });
  },
  handleClose(){
    let modalInfo = this.data.modalInfo;
    let toast = this.data.toast

    modalInfo.visible = false;
    toast.visible = false

    this.setData({
      modalInfo: modalInfo,
      toast: toast
    });
  },
  showLoadings() {
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
