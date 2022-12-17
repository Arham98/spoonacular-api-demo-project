import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  let currentPath = window.location.pathname;
  const randomIndex = currentPath.indexOf('/', 1);
  if (randomIndex !== -1) {
    currentPath = currentPath.substring(0, randomIndex);
  }
  if (currentPath === '/') {
    currentPath = '/recipes';
  }
  return (
    <Navbar className="justify-content-start fixed-top navbar-color" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="text-navbar-title"><b>Spoonacular App</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav activeKey={currentPath}>
            <Nav.Link className="text-navbar" href="/recipes">
              Recipes
            </Nav.Link>
            <Nav.Link className="text-navbar" href="/ingredients">
              Ingredients
            </Nav.Link>
            <Nav.Link className="text-navbar" href="/products">
              Grocery Products
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
