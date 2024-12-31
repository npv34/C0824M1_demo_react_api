import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import {Badge, Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router";


function HeaderHome() {

    const cart = useSelector(state => state.cart);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link>
                            <Link to="/home">Home</Link>
                        </Nav.Link>

                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Link to={"/cart"}>
                        <Button variant="primary" className={"d-flex"}>
                            Cart <Badge bg="secondary">{cart.totalQuantity}</Badge>
                            <span className="visually-hidden">0</span>
                        </Button>
                    </Link>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderHome;