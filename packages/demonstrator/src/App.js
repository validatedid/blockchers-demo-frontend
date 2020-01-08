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

const NOTARY_URL =
  process.env.REACT_APP_NOTARY_URL || "http://localhost:8080/notary";
const ECA_URL = process.env.REACT_APP_ECA_URL || "https://ebsi.compell.io/";

function App() {
  const isAuthenticated = !!localStorage.getItem("Jwt");
  const hasEIDVC = sessionStorage.getItem("VC-issued") === "yes";
  const hasBachelorVA = sessionStorage.getItem("bachelor-va-issued") === "yes";
  const hasMaster =
    sessionStorage.getItem("master-application-issued") === "yes";

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function restart() {
    localStorage.clear();
    sessionStorage.clear();
    forceUpdate();
  }

  return (
    <div className="App">
      <main>
        <h1 className="App-header">EBSI 1 Demonstrator</h1>
        <p>
          Disclaimer: this is a demo website to show the technical capabilities
          of the EBSI project.
        </p>
        <ol>
          <li {...(isAuthenticated && { className: "done" })}>
            If you do not have an EU Login account, please visit{" "}
            <a
              className="App-link"
              {...(isAuthenticated
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: ECAS_URL
                  })}
            >
              EU Login website
            </a>{" "}
            to create one. You will need to provide a name, surname and email
            address.
          </li>
          <li {...(isAuthenticated && { className: "done" })}>
            If you do not have a simulated eID account, please visit the{" "}
            <a
              className="App-link"
              {...(isAuthenticated
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: WALLET_URL
                  })}
            >
              Wallet website
            </a>{" "}
            to create one. You will need an EU Login to access the wallet. The
            wallet will create for you a simulated eID.
          </li>
          <li
            {...(!isAuthenticated && { className: "disabled" })}
            {...(hasEIDVC && { className: "done" })}
          >
            Visit the{" "}
            <a
              className="App-link"
              {...(!isAuthenticated || hasEIDVC
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: BELGIUM_GOV_URL
                  })}
            >
              Belgium Government website
            </a>{" "}
            to get your eID VC (eID Verifiable Credential). You need to have an
            EU Login account and a wallet account.
          </li>
          <li
            {...(!(isAuthenticated && hasEIDVC) && { className: "disabled" })}
            {...(hasBachelorVA && { className: "done" })}
          >
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC) || hasBachelorVA
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: FLEMISH_GOV_URL
                  })}
            >
              Flemish Government website
            </a>{" "}
            to get your Bachelor Diploma VC. You need to have a wallet account
            and an eID VC in it.
          </li>
          <li
            {...(!(isAuthenticated && hasEIDVC && hasBachelorVA) && {
              className: "disabled"
            })}
            {...(hasMaster && {
              className: "done"
            })}
          >
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC && hasBachelorVA) || hasMaster
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: SPANISH_UNIVERSITY_URL
                  })}
            >
              Spanish University website
            </a>{" "}
            to register for a master's study and to get your Master Diploma VA.
            You need to have a wallet account, an eID VC and a Bachelor Diploma
            VC
          </li>
          <li
            {...(!(
              isAuthenticated &&
              hasEIDVC &&
              hasBachelorVA &&
              hasMaster
            ) && {
              className: "disabled"
            })}
          >
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC && hasBachelorVA && hasMaster)
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: EU_FUNDING_URL
                  })}
            >
              EU Funding website
            </a>
            .
          </li>
        </ol>
        {isAuthenticated && (
          <p>
            <button type="button" onClick={restart} className="button">
              Restart user journey
            </button>
          </p>
        )}
        <p>
          Optional: you can visit{" "}
          <a href={ECA_URL} className="App-link">
            ECA
          </a>{" "}
          or{" "}
          <a href={NOTARY_URL} className="App-link">
            notary
          </a>
        </p>
      </main>
    </div>
  );
}

export default App;
