import Container from "react-bootstrap/Container";
import HeaderBar from "../HeaderBar/HeaderBar";
import {Col, Row} from "react-bootstrap";
import {Outlet, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "../../../redux/features/authSlice";

function Master() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const userLogin = localStorage.getItem("user");
        if (userLogin) {
            dispatch(login(userLogin))
            navigate("/admin/students")
        }else {
            navigate("/login")
        }
    }, [])

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