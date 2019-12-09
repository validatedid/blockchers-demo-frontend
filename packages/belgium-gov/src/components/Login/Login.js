import React, { Component } from "react";
import "./Login.css";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/belgium.png";
import axios from "axios";
import queryString from "query-string";

const API_URL = "http://localhost:3002";
const INSTITUTION = "Belgium Government";

class Main extends Component {
  componentDidMount() {
    if (
      sessionStorage.getItem("BondId") === null ||
      sessionStorage.getItem("BondId") === "undefined"
    ) {
      this.manageConnectionWithBackend();
    }

    this.manageUserDID();
  }

  constructor(props) {
    super(props);

    this.state = {
      bondId: sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("Did"),
      userDid: sessionStorage.getItem("UserDid")
    };
  }

  manageUserDID() {
    let didFromUrl = queryString.parse(this.props.location.search).userDid;

    if (didFromUrl !== undefined) {
      sessionStorage.setItem("UserDid", didFromUrl);
    }
  }

  manageConnectionWithBackend() {
    //generate request (Part hardcoded now)
    var request = {
      enterpriseName: "Belgium Government",
      front_endpoint: "http://localhost:3004"
    };

    this.establishBond(request).then(res => {
      sessionStorage.setItem("BondId", res["@bond_id"]);
      sessionStorage.setItem("Did", res["did"]);
      this.setState({
        bondId: res["@bond_id"],
        did: res["did"]
      });
    });
  }

  establishBond(request) {
    return new Promise(function(resolve, reject) {
      axios
        .post(API_URL + "/enterprise/bond", {
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

  connectionWallets() {
    //generate request (Part hardcoded now)
    var request = {
      "@bond_id": sessionStorage.getItem("BondId"),
      did: sessionStorage.getItem("UserDid")
    };

    this.establishConnection(request).then(res => {
      var connection_id = res["@connection_id"];
      sessionStorage.setItem("ConnectionId", connection_id);
      var callback_url = res["callback_url"];
      window.location.href =
        callback_url +
        "?connection_id=" +
        connection_id +
        "&institution=" +
        INSTITUTION;
    });
  }

  establishConnection(request) {
    return new Promise(function(resolve, reject) {
      axios
        .post(API_URL + "/connections/request", {
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
          <img src={logo} className="App-logo" alt="logo" />
          <p>Belgium Government</p>
          <Button
            className="view-button"
            variant="info"
            onClick={() => this.connectionWallets()}
          >
            Login
          </Button>
        </header>
      </div>
    );
  }
}

export default Main;
