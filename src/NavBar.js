import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="">PokeDex</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}