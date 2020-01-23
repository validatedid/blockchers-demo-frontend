const REQUIRED_VARIABLES = {
  REACT_APP_EULOGIN_REGISTER:
    process.env.REACT_APP_EULOGIN_REGISTER ||
    "https://ecas.ec.europa.eu/cas/eim/external/register.cgi",
  REACT_APP_WALLET_URL:
    process.env.REACT_APP_WALLET_URL || "https://app.ebsi.xyz/wallet",
  REACT_APP_BELGIUM_GOV_URL:
    process.env.REACT_APP_BELGIUM_GOV_URL ||
    "https://app.ebsi.xyz/demo/belgium-gov",
  REACT_APP_FLEMISH_GOV_URL:
    process.env.REACT_APP_FLEMISH_GOV_URL ||
    "https://app.ebsi.xyz/demo/flemish-gov",
  REACT_APP_SPANISH_UNIVERSITY_URL:
    process.env.REACT_APP_SPANISH_UNIVERSITY_URL ||
    "https://app.ebsi.xyz/demo/spanish-university",
  REACT_APP_EU_FUNDING_URL:
    process.env.REACT_APP_EU_FUNDING_URL ||
    "https://app.ebsi.xyz/demo/eu-funding",
  REACT_APP_NOTARY_URL:
    process.env.REACT_APP_NOTARY_URL || "https://app.ebsi.xyz/notary",
  REACT_APP_ECA_URL: process.env.REACT_APP_ECA_URL || "https://ebsi.compell.io/"
};

module.exports = REQUIRED_VARIABLES;
