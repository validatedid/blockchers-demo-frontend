import React, { useState, useContext, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import {
  H1,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";
import {
  REACT_APP_WALLET_URL,
  REACT_APP_WALLET_API,
  REACT_APP_VERIFIABLE_ID_URL
} from "../../env";

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

function RequestVC() {
  const [requestStatus, setRequestStatus] = useState(
    localStorage.getItem("VC-issued") === "yes"
      ? REQUEST_STATUS.OK
      : REQUEST_STATUS.NOT_SENT
  );
  const { register, handleSubmit, errors } = useForm();
  const { JWT } = useContext(AuthContext);

  if (requestStatus === REQUEST_STATUS.OK) {
    return (
      <Fragment>
        <H1>Request eID VC</H1>
        <P>
          Your request has been issued. Please check your{" "}
          <a
            href={`${REACT_APP_WALLET_URL}/notifications`}
            className={typographyStyles.a}
          >
            wallet's notifications
          </a>
          .
        </P>
      </Fragment>
    );
  }

  const onSubmit = data => {
    // 1. Get JWT of Belgian Gov
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    fetch(`${REACT_APP_WALLET_API}/token`, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify({
        enterpriseName: "demo test",
        nonce: "2ktd2FsbGV0In0"
      })
    })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(
            "Looks like there was a problem. Status Code: " + response.status
          );
        }

        return response.json();
      })
      .then(result => {
        if (!result.jwt) {
          return Promise.reject("Couldn't get JWT");
        }

        const requestBody = {
          issuer: "did:ebsi:0x79475f0ffB15eD8c27D7Fe9A0Ceb1585Cc3fB1B3",
          credentialSubject: {
            ...data,
            birthName: data.birthName || "", // Make sure to pass birthName
            id: JWT.did,
            govId: ""
          }
        };

        const requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        requestHeaders.append("Authorization", `Bearer ${result.jwt}`);

        const requestOptions = {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(requestBody)
        };

        setRequestStatus(REQUEST_STATUS.PENDING);

        fetch(REACT_APP_VERIFIABLE_ID_URL, requestOptions)
          .then(function(response) {
            if (response.status !== 200) {
              return Promise.reject(
                "Looks like there was a problem. Status Code: " +
                  response.status
              );
            }

            return response.json();
          })
          .then(function(response) {
            // TODO: Actually do something with the response, e.g. extract "callback_url" (response.callback_url)
            console.log("Response from Verifiable ID API", response);
            localStorage.setItem("VC-issued", "yes");
            setRequestStatus(REQUEST_STATUS.OK);
          })
          .catch(function(error) {
            console.error("Error from Verifiable ID API", error);
            setRequestStatus(REQUEST_STATUS.FAILED);
          });
      })
      .catch(error => {
        console.error("Error when retrieving the token", error);
        setRequestStatus(REQUEST_STATUS.FAILED);
      });
  };

  const [defaultLastName = "", defaultFirstName = ""] = (
    JWT.userName || ""
  ).split("&");

  return (
    <Fragment>
      <H1>Request eID VC</H1>
      <P>All the fields are required unless otherwise stated.</P>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.personIdentifier">
          <Form.Label>Person identifier</Form.Label>
          <Form.Control
            type="text"
            name="personIdentifier"
            ref={register({ required: true })}
            isInvalid={!!errors.personIdentifier}
          />
          <Form.Text className="text-muted">e.g. BE/BE/02635542Y</Form.Text>
          {errors.personIdentifier && (
            <Form.Control.Feedback type="invalid">
              Person identifier is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.currentFamilyName">
          <Form.Label>Current Family Name</Form.Label>
          <Form.Control
            type="text"
            name="currentFamilyName"
            defaultValue={defaultLastName}
            ref={register({ required: true })}
            isInvalid={!!errors.currentFamilyName}
          />
          <Form.Text className="text-muted">e.g. van Blokketen</Form.Text>
          {errors.currentFamilyName && (
            <Form.Control.Feedback type="invalid">
              Current Family Name is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.currentGivenName">
          <Form.Label>Current Given Name</Form.Label>
          <Form.Control
            type="text"
            name="currentGivenName"
            defaultValue={defaultFirstName}
            ref={register({ required: true })}
            isInvalid={!!errors.currentGivenName}
          />
          <Form.Text className="text-muted">e.g. Eva</Form.Text>
          {errors.currentGivenName && (
            <Form.Control.Feedback type="invalid">
              Current Given Name is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.birthName">
          <Form.Label>Birth Name (optional)</Form.Label>
          <Form.Control
            type="text"
            name="birthName"
            defaultValue={defaultLastName}
            ref={register({ required: false })}
          />
          <Form.Text className="text-muted">e.g. van Blokketen</Form.Text>
        </Form.Group>
        <Form.Group controlId="exampleForm.dateOfBirth">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="text"
            name="dateOfBirth"
            maxLength="10"
            ref={register({
              required: "Date of birth is required",
              pattern: {
                value: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
                message: "Date of birth doesn't match format YYYY-MM-DD"
              }
            })}
            isInvalid={!!errors.dateOfBirth}
          />
          <Form.Text className="text-muted">
            Format: YYYY-MM-DD, e.g. 1998-02-14
          </Form.Text>
          {errors.dateOfBirth && (
            <Form.Control.Feedback type="invalid">
              {errors.dateOfBirth.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.placeOfBirth">
          <Form.Label>Place of birth</Form.Label>
          <Form.Control
            type="text"
            name="placeOfBirth"
            ref={register({ required: true })}
            isInvalid={!!errors.placeOfBirth}
          />
          <Form.Text className="text-muted">e.g. Brussels</Form.Text>
          {errors.placeOfBirth && (
            <Form.Control.Feedback type="invalid">
              Place of birth is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.currentAddress">
          <Form.Label>Current Address</Form.Label>
          <Form.Control
            type="text"
            name="currentAddress"
            ref={register({ required: true })}
            isInvalid={!!errors.currentAddress}
          />
          <Form.Text className="text-muted">e.g. 44, rue de Fame</Form.Text>
          {errors.currentAddress && (
            <Form.Control.Feedback type="invalid">
              Current Address is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.gender">
          <Form.Label>Gender</Form.Label>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="genderMale"
              name="gender"
              label="Male"
              value="Male"
              ref={register({ required: true })}
            />
            <Form.Check
              type="radio"
              id="genderFemale"
              name="gender"
              label="Female"
              value="Female"
              ref={register({ required: true })}
            />
            {errors.gender && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                Gender is required
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={requestStatus === REQUEST_STATUS.PENDING}
        >
          {requestStatus === REQUEST_STATUS.PENDING ? (
            <>Sending request...</>
          ) : (
            <>Collect the eID VC with your SSI App</>
          )}
        </Button>
        {requestStatus === REQUEST_STATUS.FAILED && (
          <Alert variant="danger" className="mt-3">
            Ouch! Something went wrong... Check the console to know more about
            what happened.
          </Alert>
        )}
      </Form>
    </Fragment>
  );
}

export default RequestVC;
