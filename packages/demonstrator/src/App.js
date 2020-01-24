import React from "react";
import "./App.css";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_BELGIUM_GOV_URL,
  REACT_APP_FLEMISH_GOV_URL,
  REACT_APP_SPANISH_UNIVERSITY_URL,
  REACT_APP_EU_FUNDING_URL
} from "./env";
import { Panel, PanelTitle, PanelBody } from "./components/Panel/Panel";
import step1SVG from "./assets/step1.svg";
import step2SVG from "./assets/step2.svg";
import step3SVG from "./assets/step3.svg";
import step4SVG from "./assets/step4.svg";
import step5SVG from "./assets/step5.svg";

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
      <main style={{ maxWidth: "960px" }}>
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
            <Panel>
              <PanelTitle>European Self-Sovereign Identity</PanelTitle>
              <PanelBody
                icon={step1SVG}
                title="Open your EBSI Wallet account"
                link={REACT_APP_WALLET_URL}
                linkLabel="Wallet"
              >
                Open the EBSI Wallet and authenticate via EU Login, then setup
                your EBSI account to follow the user journey. In your wallet,
                you will create your own Decentralized ID and a set of
                public-private keys.
              </PanelBody>
            </Panel>
          </li>
          <li
            {...(!isAuthenticated && { className: "disabled" })}
            {...(hasEIDVC && { className: "done" })}
          >
            <Panel>
              <PanelTitle>Federal Government of Belgium</PanelTitle>
              <PanelBody
                icon={step2SVG}
                title="Get your eID Verifiable Credential"
                link={REACT_APP_BELGIUM_GOV_URL}
                linkLabel="Belgian Gov"
              >
                Open a request on the Federal Government of Belgium website to
                get your verifiable ID. The Belgium Gov. verifies the request
                and issues the ID Verifiable Credential, which will be stored in
                your wallet. With your digital ID, you get access to other
                services in EBSI platform.
              </PanelBody>
            </Panel>
          </li>
          <li
            {...(!(isAuthenticated && hasEIDVC) && { className: "disabled" })}
            {...(hasBachelorVA && { className: "done" })}
          >
            <Panel>
              <PanelTitle>Flemish Government</PanelTitle>
              <PanelBody
                icon={step3SVG}
                title="Get your Bachelor Diploma"
                link={REACT_APP_FLEMISH_GOV_URL}
                linkLabel="Flemish Gov"
              >
                Visit the Flemish Government website to get your Bachelor
                Diploma VC. You need to have a wallet account and an eID VC in
                it.
              </PanelBody>
            </Panel>
          </li>
          <li
            {...(!(isAuthenticated && hasEIDVC && hasBachelorVA) && {
              className: "disabled"
            })}
            {...(hasMaster && {
              className: "done"
            })}
          >
            <Panel>
              <PanelTitle>Spanish University</PanelTitle>
              <PanelBody
                icon={step4SVG}
                title="Get your Master Diploma"
                link={REACT_APP_SPANISH_UNIVERSITY_URL}
                linkLabel="Spanish Uni"
              >
                Visit the Spanish University website to register for a master's
                study and to get your Master Diploma VA. You need to have a
                wallet account, an eID VC and a Bachelor Diploma VC
              </PanelBody>
            </Panel>
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
            <Panel>
              <PanelTitle>EU Funding Institution</PanelTitle>
              <PanelBody
                icon={step5SVG}
                title="Notarise your documents"
                link={REACT_APP_EU_FUNDING_URL}
                linkLabel="EU Funding"
              >
                Visit the EU Funding website.
              </PanelBody>
            </Panel>
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
