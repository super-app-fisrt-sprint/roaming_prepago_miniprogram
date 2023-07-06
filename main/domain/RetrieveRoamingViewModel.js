const RetrieveRoaming = require("../data/attributes/RetrieveRoaming/entities/RetrieveRoaming");
const RetrieveRoamingRepository = require("../data/attributes/RetrieveRoaming/repository/RetrieveRoamingRepository");

async function getRetrieveRoaming(deviceSpect,accountId) {
  
  const retrieveRoamingRepository  = new RetrieveRoamingRepository ();
  const retrieveRoaming = new RetrieveRoaming()
  try {
    const res = await retrieveRoamingRepository.getRetrieveRoamingRemote(deviceSpect,accountId);
    if (
      res &&
      res.data &&
      res.data.response &&
      res.data.response !== null &&
      res.data.response !== undefined &&
      res.data.error == 0
    ) {
      if(res.data.response.estado){
        const resRetrieveRoamingState = res.data.response.estado;
        retrieveRoaming.isActive=resRetrieveRoamingState.esActivo;
        retrieveRoaming.expirationDate=resRetrieveRoamingState.fechaExpiracion;
      }
      if(res.data.response.consumo){
        retrieveRoaming.consume = res.data.response.consumo;
      }
      return retrieveRoaming
    } else {
      return false;
    }
  } catch (error) {
   
    return false;
  }
}

module.exports.getRetrieveRoaming = getRetrieveRoaming;
