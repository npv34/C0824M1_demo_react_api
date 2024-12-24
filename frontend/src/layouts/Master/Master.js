import Container from "react-bootstrap/Container";
import HeaderBar from "../HeaderBar/HeaderBar";
import {Col, Row} from "react-bootstrap";
import {Outlet} from "react-router";

function Master() {
    return (
        <>
            <Container>
                <HeaderBar/>
                <Row>
                    <Col>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default Master;