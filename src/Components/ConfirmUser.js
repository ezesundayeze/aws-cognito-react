import React, { useState }  from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';


export default function ConfirmUser() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");


    function validateForm() {
        return token.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();

        var poolData = {
            UserPoolId: 'us-east-1_gYW7OI6O2', // Your user pool id here
            ClientId: '6lrvb2pvj8pa3m9ndbs84hob9h', // Your client id here
        };

        setUsername(localStorage.getItem("username"));
        console.log(username)
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool,
        };

        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(token, true, function (err, result) {
            if (err) {
                console.log(err.message || JSON.stringify(err));
                return;
            }
            
            console.log('call result: ' + result);
        });
    }
    return (

        <div className="Auth">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </Form.Group>


                <Button block size="lg" type="submit" disabled={!validateForm()} >
                    Confirm
                </Button>
            </Form>
        </div>
    );
}