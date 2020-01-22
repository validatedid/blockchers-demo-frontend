const REQUIRED_VARIABLES = {
  REACT_APP_WALLET_URL:
    process.env.REACT_APP_WALLET_URL || "http://localhost:3000",
  REACT_APP_WALLET_API:
    process.env.REACT_APP_WALLET_API || "http://localhost:3002/wallet",
  REACT_APP_VERIFIABLE_ID_URL:
    process.env.REACT_APP_VERIFIABLE_ID_URL ||
    "http://localhost:3011/wallet/verifiableid",
  REACT_APP_DEMONSTRATOR_URL:
    process.env.REACT_APP_DEMONSTRATOR_URL || "http://localhost:3001/",
  REACT_APP_URL: process.env.REACT_APP_URL || ""
};

module.exports = REQUIRED_VARIABLES;
