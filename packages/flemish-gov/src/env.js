const REQUIRED_VARIABLES = {
  REACT_APP_DEMONSTRATOR_URL:
    process.env.REACT_APP_DEMONSTRATOR_URL || "http://localhost:3001/",
  REACT_APP_WALLET_URL:
    process.env.REACT_APP_WALLET_URL || "http://localhost:3000",
  REACT_APP_URL: process.env.REACT_APP_URL || "",
  REACT_APP_BACKEND_INTERNAL_URL:
    process.env.REACT_APP_BACKEND_INTERNAL_URL ||
    "http://host.docker.internal:3222",
  REACT_APP_BACKEND_EXTERNAL_URL:
    process.env.REACT_APP_BACKEND_EXTERNAL_URL || "http://localhost:3222",
  REACT_APP_DIPLOMA_API_URL:
    process.env.REACT_APP_DIPLOMA_API_URL ||
    "http://localhost:3007/wallet/diploma"
};

module.exports = REQUIRED_VARIABLES;
