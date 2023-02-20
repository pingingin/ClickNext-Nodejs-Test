import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function HistoryTransfer() {

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
  const [datas, setData] = useState([])

  useEffect(() => {
    const checkLoggedIn = async () => {
      await fetch('http://localhost:4006/history/transfer', {
        method: "GET",
        headers: { 'x-access-token': token }
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setMessage(data.message)
            setUser(data.user)
            Array(data.data).map((d, i)=>{
              setData([...d])
            })
          });
        } else {
          window.location.href = 'http://localhost:3006/login'
        }
      });
    };
    checkLoggedIn();
  }, []);

  return (hasJWT() ? <div>
    <Container>
        <Row>
            <Col></Col>
            <Col xs={8}>
                <div className='content'>
                    <h3>History Transfer</h3>
                    <div>
                      <Table responsive="sm">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>From</th>
                              <th>Remain</th>
                              <th>Action</th>
                              <th>To</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>      
                          {
                            datas.map((data, i) => {
                              return(<tr key={i}>
                                <td>{data.date}</td>
                                <td>{data.sender}</td>
                                <td>{data.remain}</td>
                                <td>{data.type}</td>
                                <td>{data.receiver}</td>
                                <td>{data.amount}</td>
                              </tr>)
                            })
                          }
                          </tbody>
                      </Table>
                    </div>
                </div>
            </Col>
            <Col></Col>
        </Row>
    </Container>
  </div> : <Navigate to={{ pathname: '/login' }} />);
}

export default HistoryTransfer