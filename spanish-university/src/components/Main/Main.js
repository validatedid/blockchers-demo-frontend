import React, {Component} from 'react';
import './Main.css';
import {Button, ButtonGroup, Toast} from "react-bootstrap";
import logo from '../../assets/images/urv.png';
import axios from 'axios';
import queryString from 'query-string';


const API_URL = "http://localhost:3002";
const INSTITUTION = "University Rovira i Virgili "

class Main extends Component {
    
    componentDidMount() {
        this.retrieveUserName();
    } 

    constructor(props) {
        super(props);

        this.state = {
            bondId: sessionStorage.getItem('BondId'),
            did: sessionStorage.getItem('Did'),
            userDid: sessionStorage.getItem('UserDid'),
            connectionId: sessionStorage.getItem('ConnectionId'),
            username: sessionStorage.getItem('Username'),
            verifiable: false,
            credential: true,
            enroll: true,
            successToast: false,
            successToastToEnroll: false
        };

    }

    retrieveUserName(){
        //generate request (Part hardcoded now)
        var connection_id = sessionStorage.getItem('ConnectionId');
        this.getUserDataFromTheWallet(connection_id).then(res => { 
            this.setState({
                username : res.username
            })
        });
    }
    getUserDataFromTheWallet(connection_id){
        return new Promise(function (resolve, reject) {
            axios.get(API_URL + '/enterprise/user-data/'+connection_id)
            .then(res => {
                resolve(res.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }


    presentVerifableID(){
        //generate request (Part hardcoded now)
        var connection_id = sessionStorage.getItem('ConnectionId');
        var did = sessionStorage.getItem('UserDid');
        this.presentIDToTheWallet(connection_id,did).then(res => { 
            this.setState({
                id: res["@id"],
                mimeType: res["mime-type"],
                data: res.data.base64,
                verifiable: true,
                credential: false,
                successToast: true
            })
        });
    }
    presentIDToTheWallet(connection_id, did){
        return new Promise(function (resolve, reject) {
            axios.get(API_URL + '/present-verifiable-id-proof/'+connection_id+'/'+did)
            .then(res => {
                resolve(res.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }


    presentCredential(){
        //generate request (Part hardcoded now)
        var connection_id = sessionStorage.getItem('ConnectionId');
        var did = sessionStorage.getItem('UserDid');
        var credentialType = "cred-type-0";
        this.presentCredentialToTheWallet(connection_id,did,credentialType).then(res => { 
            //console.log(res[0]["@id"]);
            this.setState({
                id: res[0]["@id"],
                mimeType: res[0]["mime-type"],
                data: res[0].data.base64,
                verifiable: true,
                credential: true,
                enroll: false,
                successToast: false,
                successToastToEnroll: true
            })
        });
    }
    presentCredentialToTheWallet(connection_id, did, credential_type){
        return new Promise(function (resolve, reject) {
            axios.get(API_URL + '/present-credential-proof/'+connection_id+'/'+did+'/'+credential_type)
            .then(res => {
                resolve(res.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }

    requestCredential(){
        //generate request (Part hardcoded now)
        var request = {
            "@connection_id": sessionStorage.getItem('ConnectionId'),
            "did": "did:ebsi-eth:00000002",
            "document-attach": {
                "docName": "diploma001.pdf",
                "mime-type": "application/json",
                "data": {
                "base64": "<bytes for base64>"
                }
            },
            "request-attach": {
                "@id": this.state.id,
                "mime-type": this.state.mimeType,
                "data": {
                  "base64": this.state.data
                }
            }
        }
        this.requestCredentialToTheWallet(request).then(res => { 
            window.location.href = res.callback_url;
        });
    }
    requestCredentialToTheWallet(request){
        return new Promise(function (resolve, reject) {
            axios.post(API_URL + '/issue-credential/request', {
                data: request
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(function (error) {
                reject(error);
            });
        }); 
    }

    handleClose(){
        this.setState({
            successToast: false,
            successToastToEnroll: false
        });
    }

    render() {
        const {verifiable, credential, enroll, successToast, successToastToEnroll, username} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <p className="blocktext"> <b>Hi</b>  {username}  </p>

                    <Toast show={successToast} 
                        onClose={() => this.handleClose()}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            backgroundColor: 'rgba(255,255,255,1)',
                            border: 'none',
                            zIndex: 10
                        }}>
                        <Toast.Header className="ToastSuccess">
                            <img
                                src={require('../../assets/images/university.png')}
                                height="16"
                                width="16"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Success</strong>
                            <small>University Rovira i Virgili</small>
                        </Toast.Header>
                        <Toast.Body className="blocktext">The id verification was successfully, you can now present your Diploma</Toast.Body>
                    </Toast>

                    <Toast show={successToastToEnroll} 
                        onClose={() => this.handleClose()}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            backgroundColor: 'rgba(255,255,255,1)',
                            border: 'none',
                            zIndex: 10
                        }}>
                        <Toast.Header className="ToastSuccess">
                            <img
                                src={require('../../assets/images/university.png')}
                                height="16"
                                width="16"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Success</strong>
                            <small>University Rovira i Virgili</small>
                        </Toast.Header>
                        <Toast.Body className="blocktext">The credential verification was successfully, you can now enroll to the program</Toast.Body>
                    </Toast>

                    <img src={logo} className="App-logo" alt="logo" />
                    <p className="blocktext">
                        University Rovira i Virgili
                    </p>
                    <ButtonGroup size="lg">
                        <Button className="view-button" variant="primary" onClick={() => this.presentVerifableID()} disabled={verifiable}>
                            Present Verifiable ID
                        </Button>
                        
                        <Button className="view-button" variant="success" onClick={() => this.presentCredential()} disabled={credential}>
                            Present Diploma
                        </Button>
                       
                    </ButtonGroup>
                    <br />
                    <Button size="lg" className="view-button" variant="danger" onClick={() => this.requestCredential()} disabled={enroll}>
                            Enroll into the Master
                    </Button>
                   
                    
                </header>
            </div>
        );
    }

}

export default Main;