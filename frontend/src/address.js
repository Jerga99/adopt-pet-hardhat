


export const contractAddress = process.env.NODE_ENV === "development" ?
  require("./contracts/contract-address-localhost.json") :
  require("./contracts/contract-address-polygon_mumbai.json");
