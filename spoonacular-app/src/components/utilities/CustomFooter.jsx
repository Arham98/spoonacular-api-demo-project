import React from 'react';
import Container from 'react-bootstrap/Container';

function CustomFooter() {
  return (
    <footer className="page-footer mt-auto footer-color">
      <Container fluid style={{ minHeight: '10vh' }}>
        <br />
        <p className="footer-text" style={{ fontSize: '20px' }}>Disclaimer: All images on this website may be subject to copyright restrictions</p>
      </Container>
    </footer>
  );
}

export default CustomFooter;
