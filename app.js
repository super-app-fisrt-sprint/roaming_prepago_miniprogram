App({
  onLaunch(options) {
    console.info("App onLaunch");
  },
  onShow(options) {},
    globalData: {
    DocumentType:1,//1 es cc ,si es 2 es nit 
    tipoCanalID:"10",
    email:"gabrielsan98@hotmail.com",
    urlActivate:'https://portalvoz.claro.com.co/',
    nombre:"Sistema Calle telmex Col",
    apellido:"",
    UserProfileID:"evoluciondecanales@gmail.com",
    DocumentNumber: "56220783",
    NumberAccount: "56220783",
    lineNumber: "3219882751",
    sessionId:
      "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",
  }
});