import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Transfer() {
  function hasJWT() {
    let flag = false;
    localStorage.getItem("token") ? flag = true : flag = false
    return flag
  }

  if (localStorage.getItem('token')) {
    var token = localStorage.getItem('token')
  }

  const [message, setMessage] = useState("")
  const [user, setUser] = useState({})
  const [amount, setAmount] = useState(0)
  const [receiver, setReceiver] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('http://localhost:4006/transfer', {
        method: "GET",
        headers: { 'x-access-token': token }
      }).then((response) => {
        if (response.ok) {
          response.json().then(data => {
            setMessage(data.message)
            setUser(data.user)
          });
        } else {
          window.location.href = 'http://localhost:3006/login'
        }
      });
    };
    checkLoggedIn();
  }, []);

  const handleSubmit = async (e) => {
    const error = ['Invalid Amount', 'Insufficient Balance', 'Wrong Account Number']
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4006/transfer", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          "amount": amount,
          "receiver": receiver
        }),
        mode: 'cors',
      }).then((response) => {
        if (response.ok) {
          response.json().then(data => {
            setUser(data.user)
            setMessage(data.message)
            if(error.includes(data.message)){
              handleClose()
            }
            else {
              window.location.href = 'http://localhost:3006/transfer'
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (hasJWT() ? <div>
    <Container>
      <Row>
        <Col></Col>
        <Col xs={8}>
          <div className='content'>
            <h3>Transfer</h3>
            <p>Your Current Balance: {user.balance}</p>
            <div>
              <form onSubmit={handleSubmit}>
                <Form.Control type="number" placeholder="Amount" onChange= {(e) => setAmount(e.target.value)} />
                <Form.Control type="number" placeholder="Account Number Receiver" onChange= {(e) => setReceiver(e.target.value)} />
                <div className='error-message'><p>{message}</p></div>
                <Button variant="primary" onClick={handleShow}>
                  Submit
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Please check the information.</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Transfer Amount: {amount} to {receiver}<br/>
                              Remain: {parseFloat(user.balance) - parseFloat(amount)}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit} >
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </form>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  </div> : <Navigate to={{ pathname: '/login' }} />);
}

export default Transfer