import React, { useState, useContext, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../components/Auth/Auth";
import {
  H1,
  P,
  styles as typographyStyles
} from "../../components/Typography/Typography";

const REQUEST_STATUS = {
  NOT_SENT: "",
  PENDING: "pending",
  OK: "ok",
  FAILED: "failed"
};

const WALLET_URL = process.env.REACT_APP_WALLET_URL || "http://localhost:3002";
const VERIFIABLE_ID_URL =
  process.env.REACT_APP_VERIFIABLE_ID_URL || "http://localhost:3011";

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
            href={`${WALLET_URL}/notifications`}
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
    const requestBody = {
      issuer: "did:ebsi:0x45fd1d42E0f33B93ECCA7E4fcE984948867cD256",
      credentialSubject: {
        ...data,
        id: JWT.did,
        govId: ""
      }
    };

    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QiLCJqa3UiOiJodHRwOi8vNTIuMjguMTkwLjIwNjo4MDg1L2Vic2l0cnVzdGVkYXBwL3B1YmxpYy1rZXlzLyIsImtpZCI6ImVic2ktd2FsbGV0In0.eyJzdWIiOiJEZW1vIEVudGl0eSIsImlhdCI6MTU3ODk5NDI0OCwiZXhwIjoxNTc5MDgwNjQ4LCJhdWQiOiJlYnNpLXdhbGxldCIsImRpZCI6ImRpZDplYnNpOjB4NDVmZDFkNDJFMGYzM0I5M0VDQ0E3RTRmY0U5ODQ5NDg4NjdjRDI1NiIsImVudGVycHJpc2VOYW1lIjoiRGVtbyBFbnRpdHkiLCJub25jZSI6IjJrdGQyRnNiR1YwSW4wQUEuIn0.3wLat3-XCdLzN4dNM6Oydg_jnm3jPwO4u_dBardYdCL70S2f8aXU0BXOUrg6s33nDeAfjTOxJIap5TOdYACQQg"
    );

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    };

    setRequestStatus(REQUEST_STATUS.PENDING);

    fetch(`${VERIFIABLE_ID_URL}/verifiableid`, requestOptions)
      .then(function(response) {
        if (response.status !== 200) {
          return Promise.reject(
            "Looks like there was a problem. Status Code: " + response.status
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
  };

  return (
    <Fragment>
      <H1>Request eID VC</H1>
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
            defaultValue={JWT.userName || ""}
            ref={register({ required: true })}
            isInvalid={!!errors.currentFamilyName}
          />
          <Form.Text className="text-muted">e.g. Eva</Form.Text>
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
            ref={register({ required: true })}
            isInvalid={!!errors.currentGivenName}
          />
          <Form.Text className="text-muted">e.g. Adams</Form.Text>
          {errors.currentGivenName && (
            <Form.Control.Feedback type="invalid">
              Current Given Name is required
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.birthName">
          <Form.Label>Birth Name</Form.Label>
          <Form.Control
            type="text"
            name="birthName"
            ref={register({ required: true })}
            isInvalid={!!errors.birthName}
          />
          <Form.Text className="text-muted">e.g. Eva</Form.Text>
          {errors.birthName && (
            <Form.Control.Feedback type="invalid">
              Birth Name is required
            </Form.Control.Feedback>
          )}
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
            <Form.Check
              type="radio"
              id="genderOther"
              name="gender"
              label="Other"
              value="Other"
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
