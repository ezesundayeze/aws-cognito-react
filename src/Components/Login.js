import React, { useState } from 'react'
import * as AWS from 'aws-sdk/global';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Auth.css"
import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';


export default function Login(params) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    var authenticationData = {
      Username: email,
      Password: password,
    };
    var authenticationDetails = new AuthenticationDetails(
      authenticationData
    );

    var poolData = {
      UserPoolId: 'us-east-1_gYW7OI6O2', // Your user pool id here
      ClientId: '6lrvb2pvj8pa3m9ndbs84hob9h', // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var userData = {
      Username: email,
      Pool: userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        console.log(accessToken)
        localStorage.setItem("token", accessToken)

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = 'us-east-1';

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1_gYW7OI6O2', // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_gYW7OI6O2': result
              .getIdToken()
              .getJwtToken(),
          },
        });

        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        AWS.config.credentials.refresh(error => {
          if (error) {
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!');
          }
        });
      },

      onFailure: function (err) {
        console.log(err.message || JSON.stringify(err));
      },
    });

  }
  return (
    <div className="Auth">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()} >
          Login
        </Button>
      </Form>
    </div>
  )
}