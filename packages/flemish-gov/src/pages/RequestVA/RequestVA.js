import React, { Component } from "react";
import axios from "axios";
import { Button } from "../../components/Button/Button";
import { H1, H2, P } from "../../components/Typography/Typography";

const API_URL = process.env.REACT_APP_WALLET_API || "http://localhost:3002";

class RequestVA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bondId: sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("Did"),
      userDid: sessionStorage.getItem("UserDid"),
      connectionId: sessionStorage.getItem("ConnectionId")
    };
  }

  componentDidMount() {
    this.retrieveUserName();
  }

  retrieveUserName() {
    // Generate request (Part hard-coded now)
    var connection_id = sessionStorage.getItem("ConnectionId");
    this.getUserDataFromTheWallet(connection_id).then(res => {
      this.setState({
        username: res.username
      });
    });
  }

  getUserDataFromTheWallet(connection_id) {
    return new Promise(function(resolve, reject) {
      axios
        .get(API_URL + "/enterprise/user-data/" + connection_id)
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  requestVerifiableID() {
    // Demo: redirect to wallet
    const redirectUri = window.location.href;
    window.location.href = `${API_URL}/operations?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    /*
    // Generate request (Part hard-coded now)
    var request = {
      "@connection_id": sessionStorage.getItem("ConnectionId"),
      did: sessionStorage.getItem("UserDid"),
      eidasDatasetInput: {
        currentFamilyName: "Franz",
        currentGivenName: "Hinterberger",
        dateOfBirth: "1999-03-22T00:00:00Z",
        placeOfBirth: "Salzburg, Austria"
      }
    };

    this.requestToTheWallet(request).then(res => {
      window.location.href = res.callback_url;
    });
    */
  }

  requestToTheWallet(request) {
    return new Promise(function(resolve, reject) {
      axios
        .post(API_URL + "/issue-verifiable-id/request", {
          data: request
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  render() {
    return (
      <>
        <H1>Bachelor Diploma</H1>
        <P>Congratulations, your Bachelor Diploma is now available!</P>
        <H2>Issue Bachelor Diploma Verifiable Attestation</H2>
        <P>
          When you click on the button below, the Flemish Government generates a
          request for your eID VC. You will be redirected to your wallet where
          you will be asked to share your eID VC with the Flemish Government.
        </P>
        <Button variant="primary" onClick={() => this.requestVerifiableID()}>
          Issue Bachelor Diploma Verifiable Attestation
        </Button>
        <P>
          If you agree to share your eID VC and if it passes the validation
          process, the Flemish Government will create your Bachelor Diploma VA.
          It uses the eIDAS Bridge to eSeal it. When it's ready, you will
          receive a notification in your wallet.
        </P>
      </>
    );
  }
}

export default RequestVA;
