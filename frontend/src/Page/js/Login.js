import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4006/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
        mode: 'cors',   
        }).then((response) => {
            if(response.ok) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token)
                    setMessage(data.token)
                });
                window.location.href = 'http://localhost:3006/'
            }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <Row>
            <Col></Col>
            <Col xs={6}>
                <div className='content'>
                    <h3>Login</h3> 
                    <div>
                        <form onSubmit={handleSubmit}>
                          <Form.Control type="text" placeholder="Email" value={email || ""} onChange= {(e) => setEmail(e.target.value)} />
                          <Form.Control type="password" placeholder="Password" value={password || ""} onChange= {(e) => setPassword(e.target.value)} />
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </form>
                    </div>
                </div>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    </div>
  );
}

export default Login;
