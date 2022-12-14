import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  let currentPath = window.location.pathname;
  const searchRequired = currentPath === '/' || currentPath === '/events' || currentPath === '/performers';
  const randomIndex = currentPath.indexOf('/', 1);
  if (randomIndex !== -1) {
    currentPath = currentPath.substring(0, randomIndex);
  }
  if (currentPath === '/') {
    currentPath = '/events';
  }
  const searchParameters = new URLSearchParams(window.location.search);
  let searchQuery = '';
  let pageNumber = '1';
  if (searchParameters) {
    searchQuery = searchParameters.has('query') ? searchParameters.get('query') : '';
    pageNumber = searchParameters.has('page') ? searchParameters.get('page') : '1';
  }
  return (
    <Navbar className="justify-content-start fixed-top navbar-color" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand className="text-navbar-title"><b>Spoonacular App</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav activeKey={currentPath}>
            <Nav.Link className="text-navbar" href="/events">
              Events
            </Nav.Link>
            <Nav.Link className="text-navbar" href="/performers">
              Performers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {searchRequired
            && (
              <Form className="d-flex">
                {(pageNumber === '')
                  && (
                  <Form.Control type="hidden" name="page" defaultValue={pageNumber} />
                  )}
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="me-2"
                  name="query"
                  defaultValue={searchQuery}
                />
                <Button className="button" type="submit">Search</Button>
              </Form>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
