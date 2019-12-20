import React from "react";
import "./App.css";

const ECAS_URL =
  process.env.REACT_APP_EULOGIN_REGISTER ||
  "https://webgate.ec.europa.eu/cas/eim/external/register.cgi?loginRequestId";

const WALLET_URL =
  process.env.REACT_APP_WALLET_URL || "https://app.ebsi.xyz/wallet";

const BELGIUM_GOV_URL =
  process.env.REACT_APP_BELGIUM_GOV_URL ||
  "https://app.ebsi.xyz/diploma/belgium-gov";

const FLEMISH_GOV_URL =
  process.env.REACT_APP_FLEMISH_GOV_URL ||
  "https://app.ebsi.xyz/diploma/flemish-gov";

const SPANISH_UNIVERSITY_URL =
  process.env.REACT_APP_SPANISH_UNIVERSITY_URL ||
  "https://app.ebsi.xyz/diploma/spanish-university";

const EU_FUNDING_URL =
  process.env.REACT_APP_EU_FUNDING_URL || "https://app.ebsi.xyz/eu-funding";

const ECA_URL = process.env.REACT_APP_ECA_URL || "https://ebsi.compell.io/";

const App = () => (
  <div className="App">
    <main>
      <h1 className="App-header">EBSI 1 Demonstrator</h1>
      <p>
        Disclaimer: this is a demo website to show the technical capabilities of
        the EBSI project.
      </p>
      <ol>
        <li>
          If you do not have an EU Login account, please visit{" "}
          <a href={ECAS_URL} className="App-link">
            EU Login website
          </a>{" "}
          to create one. You will need to provide a name, surname and email
          address.
        </li>
        <li>
          If you do not have a simulated eID account, please visit the{" "}
          <a href={WALLET_URL} className="App-link">
            Wallet website
          </a>{" "}
          to create one. You will need an EU Login to access the wallet. The
          wallet will create for you a simulated eID.
        </li>
        <li>
          Visit the{" "}
          <a href={BELGIUM_GOV_URL} className="App-link">
            Belgium Government website
          </a>{" "}
          to get your eID VC (eID Verifiable Credential). You need to have an EU
          Login account and a wallet account.
        </li>
        <li>
          Visit the{" "}
          <a href={FLEMISH_GOV_URL} className="App-link">
            Flemish Government website
          </a>{" "}
          to get your Bachelor Diploma VC. You need to have a wallet account and
          an eID VC in it.
        </li>
        <li>
          Visit the{" "}
          <a href={SPANISH_UNIVERSITY_URL} className="App-link">
            Spanish University website
          </a>{" "}
          to register for a master's study and to get your Master Diploma VA.
          You need to have a wallet account, an eID VC and a Bachelor Diploma VC
        </li>
        <li>
          Visit the{" "}
          <a href={EU_FUNDING_URL} className="App-link">
            EU Funding website
          </a>
          .
        </li>
      </ol>
      <p>
        Optional: you can visit{" "}
        <a href={ECA_URL} className="App-link">
          ECA
        </a>
      </p>
    </main>
  </div>
);

export default App;
