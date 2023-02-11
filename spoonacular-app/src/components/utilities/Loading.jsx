import React from 'react';
import Container from 'react-bootstrap/Container';

function Loading() {
  return (
    <Container fluid>
      <Container className="center-container">
        <div>
          <div className="loader">
            <div className="inner one" />
            <div className="inner two" />
            <div className="inner three" />
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Loading;
