import React, { Component } from "react";
import "./Main.css";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/belgium.png";
import axios from "axios";

const API_URL = process.env.REACT_APP_WALLET_API || "http://localhost:3002";

class Main extends Component {
  componentDidMount() {
    this.retrieveUserName();
  }

  constructor(props) {
    super(props);

    this.state = {
      bondId: sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("Did"),
      userDid: sessionStorage.getItem("UserDid"),
      connectionId: sessionStorage.getItem("ConnectionId")
    };
  }

  retrieveUserName() {
    //generate request (Part hardcoded now)
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

  requestVerifableID() {
    //generate request (Part hardcoded now)
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
      <div className="App">
        <header className="App-header">
          <p>
            {" "}
            <b>Hi</b> {this.state.username}{" "}
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Belgium Government</p>
          <Button
            className="view-button"
            variant="info"
            onClick={() => this.requestVerifableID()}
          >
            Request Verifiable ID
          </Button>
        </header>
      </div>
    );
  }
}

export default Main;
