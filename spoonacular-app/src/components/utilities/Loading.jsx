import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <Container fluid>
      <Container className="center-container">
        <div>
          <Spinner className="spinner-border-1" animation="grow" style={{ color: '#01B636' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Spinner className="spinner-border-2" animation="grow" style={{ color: '#01B636' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Spinner className="spinner-border-3" animation="grow" style={{ color: '#01B636' }} />
        </div>
      </Container>
    </Container>
  );
}

export default Loading;
