module.exports = class DisablePackagesRquest {
  static instance;
  constructor (min,codePackage) {
    this.min = min;
    this.codePackage=codePackage;
   
  }
}