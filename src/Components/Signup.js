import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Auth.css"
import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    var poolData = {
      UserPoolId: 'us-east-1_gYW7OI6O2', // Your user pool id here
      ClientId: '6lrvb2pvj8pa3m9ndbs84hob9h', // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
      Name: 'email',
      Value: email,
    };

    var attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(dataEmail.Value, password, attributeList, null, function (
      err,
      result
    ) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      localStorage.setItem("username", cognitoUser.getUsername());
      history.push("/confirm")
      console.log('user name is ' + cognitoUser.getUsername());
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
          Signup
        </Button>
      </Form>
    </div>
  );
}





