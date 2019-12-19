import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import {
  H1,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";

const API_URL = process.env.REACT_APP_WALLET_API || "http://localhost:3002";

class RequestVC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bondId: sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("Did"),
      userDid: sessionStorage.getItem("UserDid"),
      connectionId: sessionStorage.getItem("ConnectionId"),
      requestIssued: false
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
    this.setState({
      requestIssued: true
    });

    // Demo: redirect to wallet
    // window.location.href = `${API_URL}/notifications`;

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
    const { requestIssued } = this.state;

    return (
      <>
        <H1>Request eID VC</H1>
        {requestIssued ? (
          <P>
            Your request has been issued. Please check your{" "}
            <a href={`${API_URL}/notifications`} className={typographyStyles.a}>
              wallet's notifications
            </a>
            .
          </P>
        ) : (
          <Button variant="primary" onClick={() => this.requestVerifiableID()}>
            Collect the eID VC with your SSI App
          </Button>
        )}
      </>
    );
  }
}

export default RequestVC;
