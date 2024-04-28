import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

export default function Header(){
    return(
        <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="#home">Lakee Foods</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}