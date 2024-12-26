import Container from "react-bootstrap/Container";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import GroupService from "../../../services/group.service";
import {useFormik} from "formik";
import uuid from "react-uuid";
import StudentService from "../../../services/student.service";
import {toast} from "react-toastify";
import {Link, useNavigate, useParams} from "react-router";

function StudentEdit(){
    const [groups, setGroups] = useState([]);
    const [currentGroups, setCurrentGroups] = useState(null);
    const navigation = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        GroupService.getAllGroups().then(res => {
            const data = res.data;
            setGroups(data);
        })
        StudentService.getStudentByStudentId(id).then(response => {
            const dataStudent = response.data;
            setCurrentGroups(dataStudent.groupId)
            formEdit.setValues({...dataStudent})
        })
    }, []);

    const formEdit = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            phone: '',
            groupId: ''
        },
        onSubmit: values => {
            // API call to add new student
            StudentService.updateStudent(id, values).then(res => {
                toast.success("Update student successfully");
                navigation("/admin/students")
            })
        }
    })

    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                Update Student
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={formEdit.handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control onChange={formEdit.handleChange} value={formEdit.values.name} name="name" type="text" placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control onChange={formEdit.handleChange} value={formEdit.values.email} name="email" type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control onChange={formEdit.handleChange} value={formEdit.values.age} name="age" type="number" placeholder="Enter age" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control onChange={formEdit.handleChange} value={formEdit.values.phone} name="phone" type="text" placeholder="Phone" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Group</Form.Label>
                                        <Form.Select onChange={formEdit.handleChange} name="groupId" aria-label="Default select example">
                                            {groups.length > 0 && groups.map(item => (
                                                <option selected={currentGroups == item.id} key={item.id} value={item.id} >{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                    <Link to={"/admin/students"}>
                                        <Button variant="secondary">Cancel</Button>  {/* Redirect to student list */}
                                    </Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default StudentEdit;