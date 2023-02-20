import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

    function hasJWT() {
        let flag = false;
        localStorage.getItem("token") ? flag=true : flag=false
        return flag
    }

    const [message, setMessage] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        const checkLoggedIn = async () => {
            if (localStorage.getItem('token')) {
                var token = localStorage.getItem('token')
            }
            const res = await fetch('http://localhost:4006/home',{
                method: "POST",
                headers: { 'x-access-token': token }
            }).then((response) => {
                if(response.ok) {
                    response.json().then(data => {
                        setMessage(data.message)
                        setUser(data.user)
                    });
                }else {
                    window.location.href = 'http://localhost:3006/login'
                }
            });
        };
    checkLoggedIn();
    },[]);
    return ( hasJWT() ? <div>
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <div className='content'>
                        <h3>Welcome, {user.first_name } { user.last_name}</h3>
                        <p>Your Account Number: {user.account_number}</p>
                        <p>Your Balance: {user.balance}</p>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    </div> : <Navigate to={{ pathname: '/login' }} />);
}

export default Home;
