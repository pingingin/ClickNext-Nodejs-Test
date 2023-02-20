import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NoPage() {
  return (
    <Container>
        <Row>
            <Col></Col>
            <Col xs={6}>
                <div className='content'>
                    <h3>No Page</h3>
                </div>
            </Col>
            <Col></Col>
        </Row>
    </Container>
  )
}

export default NoPage