import React, { Component } from "react";
import "./RequestVC.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { H1 } from "../../components/Typography/Typography";

const API_URL = "http://localhost:3002";

class RequestVC extends Component {
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
        <H1>Request eID VC</H1>
        <Button variant="info" onClick={() => this.requestVerifiableID()}>
          Collect the eID VC with your SSI App
        </Button>
      </>
    );
  }
}

export default RequestVC;
