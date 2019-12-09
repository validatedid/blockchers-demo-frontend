import React, { Component } from "react";
import "./Main.css";
import { Button, ButtonGroup, Toast } from "react-bootstrap";
import logo from "../../assets/images/Flemish.png";
import axios from "axios";

const API_URL = "http://localhost:3002";

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
      connectionId: sessionStorage.getItem("ConnectionId"),
      verifiable: false,
      credential: true,
      successToast: false
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

  presentVerifableID() {
    //generate request (Part hardcoded now)
    var connection_id = sessionStorage.getItem("ConnectionId");
    var did = sessionStorage.getItem("UserDid");
    this.presentIDToTheWallet(connection_id, did).then(res => {
      this.setState({
        id: res["@id"],
        mimeType: res["mime-type"],
        data: res.data.base64,
        verifiable: true,
        credential: false,
        successToast: true
      });
    });
  }
  presentIDToTheWallet(connection_id, did) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          API_URL +
            "/present-verifiable-id-proof/" +
            connection_id +
            "/did" +
            did
        )
        .then(res => {
          resolve(res.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
  requestCredential() {
    //generate request (Part hardcoded now)
    var request = {
      "@connection_id": sessionStorage.getItem("ConnectionId"),
      did: "did:ebsi-eth:00000002",
      "document-attach": {
        docName: "diploma001.pdf",
        "mime-type": "application/json",
        data: {
          base64: "<bytes for base64>"
        }
      },
      "request-attach": {
        "@id": this.state.id,
        "mime-type": this.state.mimeType,
        data: {
          base64: this.state.data
        }
      }
    };
    this.requestCredentialToTheWallet(request).then(res => {
      window.location.href = res.callback_url;
    });
  }
  requestCredentialToTheWallet(request) {
    return new Promise(function(resolve, reject) {
      axios
        .post(API_URL + "/issue-credential/request", {
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

  handleClose() {
    this.setState({
      successToast: false
    });
  }

  render() {
    const { verifiable, credential, successToast, username } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p className="blocktext">
            {" "}
            <b>Hi</b> {username}{" "}
          </p>

          <Toast
            show={successToast}
            onClose={() => this.handleClose()}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              backgroundColor: "rgba(255,255,255,1)",
              border: "none",
              zIndex: 10
            }}
          >
            <Toast.Header className="ToastSuccess">
              <img
                src={require("../../assets/images/university.png")}
                height="16"
                width="16"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Success</strong>
              <small>Flemish Government</small>
            </Toast.Header>
            <Toast.Body className="blocktext">
              The id verification was successfully, you can now ask for you
              credential
            </Toast.Body>
          </Toast>
          <img src={logo} className="App-logo" alt="logo" />
          <p className="blocktext">Flemish Government</p>
          <ButtonGroup size="lg">
            <Button
              className="view-button"
              variant="primary"
              onClick={() => this.presentVerifableID()}
              disabled={verifiable}
            >
              Present Verifiable ID
            </Button>

            <Button
              className="view-button"
              variant="success"
              onClick={() => this.requestCredential()}
              disabled={credential}
            >
              Request Credential
            </Button>
          </ButtonGroup>
        </header>
      </div>
    );
  }
}

export default Main;
