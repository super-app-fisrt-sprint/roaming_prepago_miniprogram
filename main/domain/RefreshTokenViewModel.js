const AutoRefreshRepository = require("../data/attributes/AutoRefreshToken/repository/AutoRefreshRepository");

async function refreshToken(deviceSpect)
{
  const tokenRepository = new AutoRefreshRepository();
  try {
    const resToken = await tokenRepository.autoRefresh(deviceSpect);
  
    if(
      resToken &&
      resToken.data &&
      resToken.data.error == 0 &&
      resToken.data.response) 
    {
      tokenRepository.autoRefreshLocal(resToken.data.response.cuenta.token, deviceSpect);
    }

  } catch (error) {
    
  }
}



module.exports.refreshToken = refreshToken;
    