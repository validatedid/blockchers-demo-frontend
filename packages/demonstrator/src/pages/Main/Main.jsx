import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../components/Auth/Auth";
import styles from "./Main.module.css";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_BELGIUM_GOV_URL,
  REACT_APP_FLEMISH_GOV_URL,
  REACT_APP_SPANISH_UNIVERSITY_URL,
  REACT_APP_EU_FUNDING_URL
} from "../../env";
import { Panel, PanelTitle, PanelBody } from "../../components/Panel/Panel";
import step1SVG from "../../assets/step1.svg";
import step2SVG from "../../assets/step2.svg";
import step3SVG from "../../assets/step3.svg";
import step4SVG from "../../assets/step4.svg";
import step5SVG from "../../assets/step5.svg";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function checkEIDVC() {
  return localStorage.getItem("VC-issued") === "yes";
}

function checkBachelorVA() {
  return localStorage.getItem("bachelor-va-issued") === "yes";
}

function checkMasterVA() {
  return localStorage.getItem("master-va-issued") === "yes";
}

function Main() {
  const { isAuthenticated, checkAuth } = useContext(AuthContext);
  const [hasEIDVC, setHasEIDVC] = useState(checkEIDVC());
  const [hasBachelorVA, setHasBachelorVA] = useState(checkBachelorVA());
  const [hasMaster, setHasMaster] = useState(checkMasterVA());

  function updateState() {
    checkAuth();
    setHasEIDVC(checkEIDVC());
    setHasBachelorVA(checkBachelorVA);
    setHasMaster(checkMasterVA());
  }

  function restart() {
    localStorage.clear();
    updateState();
  }

  // Check status every 3 seconds
  useInterval(updateState, 3000);

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <p className={`${styles.p} ${styles.disclaimer}`}>
          Disclaimer: this is a demo website to show the technical capabilities
          of the EBSI project. We use dummy data! All the public entities are
          simulated, there is no real interaction with any of them.
        </p>
        <h1 className={styles.h1}>
          Test EBSI User Journey Demo by taking the following steps by order
        </h1>
        <ol className={styles.ol}>
          <li
            className={styles.li}
            {...(isAuthenticated && {
              className: `${styles.li} ${styles.done}`
            })}
          >
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
            className={styles.li}
            {...(!isAuthenticated && {
              className: `${styles.li} ${styles.disabled}`
            })}
            {...(hasEIDVC && { className: `${styles.li} ${styles.done}` })}
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
            className={styles.li}
            {...(!(isAuthenticated && hasEIDVC) && {
              className: `${styles.li} ${styles.disabled}`
            })}
            {...(hasBachelorVA && { className: `${styles.li} ${styles.done}` })}
          >
            <Panel>
              <PanelTitle>Flemish Government</PanelTitle>
              <PanelBody
                icon={step3SVG}
                title="Get your Bachelor Diploma"
                link={REACT_APP_FLEMISH_GOV_URL}
                linkLabel="Flemish Gov"
              >
                Open the Flemish Government website and make a request to get
                your Bachelor Diploma. The Flemish Government verifies your
                request and your verifiable eID and issues the Bachelor Diploma
                Verifiable Attestation, which will be stored in your wallet.
              </PanelBody>
            </Panel>
          </li>
          <li
            className={styles.li}
            {...(!(isAuthenticated && hasEIDVC && hasBachelorVA) && {
              className: `${styles.li} ${styles.disabled}`
            })}
            {...(hasMaster && {
              className: `${styles.li} ${styles.done}`
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
                You can apply for a master study to a Spanish University. The
                university checks your verifiable eID and Bachelor Diploma VC
                and accepts you as a registered student. After graduation, you
                can request your master diploma. The Spanish University issues
                the Master Diploma Verifiable Attestation, which will be stored
                in your wallet.
              </PanelBody>
            </Panel>
          </li>
          <li
            className={styles.li}
            {...(!(
              isAuthenticated &&
              hasEIDVC &&
              hasBachelorVA &&
              hasMaster
            ) && {
              className: `${styles.li} ${styles.disabled}`
            })}
          >
            <Panel>
              <PanelTitle>EU Funding Institution</PanelTitle>
              <PanelBody
                icon={step5SVG}
                title="Notarize your documents"
                link={REACT_APP_EU_FUNDING_URL}
                linkLabel="EU Funding"
              >
                You can participate in a call for proposals to get EU funding
                for your start-up. You can notarize documents, justifying the
                spending of the grant received, which the EU auditors can
                verify.
              </PanelBody>
            </Panel>
          </li>
        </ol>
        {isAuthenticated && (
          <p>
            <button type="button" onClick={restart} className={styles.button}>
              Restart user journey
            </button>
            <a
              href={`${REACT_APP_WALLET_URL}/credentials`}
              className={styles.button}
            >
              Your Wallet Credentials
            </a>
          </p>
        )}
      </main>
    </div>
  );
}

export default Main;
