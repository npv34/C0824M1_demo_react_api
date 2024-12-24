import Container from "react-bootstrap/Container";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import GroupService from "../../../services/group.service";
import {useFormik} from "formik";
import uuid from "react-uuid";
import StudentService from "../../../services/student.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

function StudentAdd(){
    const [groups, setGroups] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        GroupService.getAllGroups().then(res => {
            const data = res.data;
            setGroups(data);
        })
    }, []);

    const formAdd = useFormik({
        initialValues: {
            id: uuid(),
            name: '',
            email: '',
            age: '',
            phone: '',
            groupId: ''
        },
        onSubmit: values => {
            // API call to add new student
            StudentService.createStudent(values).then(res => {
                toast.success("Create student successfully");
                navigation("/admin/students")
            })
        }
    })

    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                Add New Student
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={formAdd.handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control onChange={formAdd.handleChange} name="name" type="text" placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control onChange={formAdd.handleChange} name="email" type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control onChange={formAdd.handleChange} name="age" type="number" placeholder="Enter age" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control onChange={formAdd.handleChange} name="phone" type="text" placeholder="Phone" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Group</Form.Label>
                                        <Form.Select onChange={formAdd.handleChange} name="groupId" aria-label="Default select example">
                                            {groups.length > 0 && groups.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StudentAdd;