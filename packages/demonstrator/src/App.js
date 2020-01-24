import React from "react";
import "./App.css";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_BELGIUM_GOV_URL,
  REACT_APP_FLEMISH_GOV_URL,
  REACT_APP_SPANISH_UNIVERSITY_URL,
  REACT_APP_EU_FUNDING_URL
} from "./env";

function App() {
  const isAuthenticated = !!localStorage.getItem("Jwt");
  const hasEIDVC = localStorage.getItem("VC-issued") === "yes";
  const hasBachelorVA = localStorage.getItem("bachelor-va-issued") === "yes";
  const hasMaster = localStorage.getItem("master-va-issued") === "yes";

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function restart() {
    localStorage.clear();
    forceUpdate();
  }

  return (
    <div className="App">
      <main>
        <p className="disclaimer">
          Disclaimer: this is a demo website to show the technical capabilities
          of the EBSI project. We use dummy data! All the public entities are
          simulated, there is no real interaction with any of them.
        </p>
        <h1 className="h1">European Blockchain Services Infrastructure</h1>
        <h2 className="h2">User journey demonstrator</h2>
        <p {...(isAuthenticated && { className: "done" })}>
          To follow the User Journey, please go sequentially through each step
          hereunder.
        </p>
        <ol>
          <li {...(isAuthenticated && { className: "done" })}>
            European Self-Sovereign Identity
            <h3>Open your EBSI Wallet account</h3>
            Open the{" "}
            <a
              className="App-link"
              {...(isAuthenticated
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: REACT_APP_WALLET_URL
                  })}
            >
              EBSI Wallet
            </a>{" "}
            and authenticate via EU Login, then setup your EBSI account to
            follow the user journey. In your wallet, you will create your own
            Decentralized ID and a set of public-private keys.
          </li>
          <li
            {...(!isAuthenticated && { className: "disabled" })}
            {...(hasEIDVC && { className: "done" })}
          >
            Federal Government of Belgium
            <h3>Get your eID Verifiable Credential</h3>
            Open a request on the{" "}
            <a
              className="App-link"
              {...(!isAuthenticated || hasEIDVC
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: REACT_APP_BELGIUM_GOV_URL
                  })}
            >
              Federal Government of Belgium website
            </a>{" "}
            to get your verifiable ID. The Belgium Gov. verifies the request and
            issues the ID Verifiable Credential, which will be stored in your
            wallet. With your digital ID, you get access to other services in
            EBSI platform.
          </li>
          <li
            {...(!(isAuthenticated && hasEIDVC) && { className: "disabled" })}
            {...(hasBachelorVA && { className: "done" })}
          >
            Flemish Government
            <h3>Get your Bachelor Diploma</h3>
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC) || hasBachelorVA
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: REACT_APP_FLEMISH_GOV_URL
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
            Spanish University
            <h3>Get your Master Diploma</h3>
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC && hasBachelorVA) || hasMaster
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: REACT_APP_SPANISH_UNIVERSITY_URL
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
            EU Funding Institution
            <h3>Notarize your documents</h3>
            Visit the{" "}
            <a
              className="App-link"
              {...(!(isAuthenticated && hasEIDVC && hasBachelorVA && hasMaster)
                ? {
                    tabIndex: "-1",
                    href: "#"
                  }
                : {
                    href: REACT_APP_EU_FUNDING_URL
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
            <a href={`${REACT_APP_WALLET_URL}/credentials`} className="button">
              Your Wallet Credentials
            </a>
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
