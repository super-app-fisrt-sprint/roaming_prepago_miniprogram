const Ticket =require("main/data/attributes/RegisterTicket/entities/RegisterTicketRequest")
const RegisterTicketRoamingRepository =require("main/data/attributes/RegisterTicket/repository/RegisterTicketRepository")

async function registerTicketRoaming(deviceSpect,min,description){
 const ticketRequest = new Ticket (min,description);
 const registerTicketRoamingRepository = new RegisterTicketRoamingRepository();
 try{
   const res=await registerTicketRoamingRepository.registerTicketRoamingRemote(deviceSpect,ticketRequest)
   if(
    res &&
    res.data &&
    res.data.response &&
    res.data.response !== null &&
    res.data.response !== undefined &&
    res.data.error == 0
   ){
    return res.data.response;
   }
   else{
    return false;
   }
 }catch(error){
  return false;
 }
}

module.exports.registerTicketRoaming = registerTicketRoaming;