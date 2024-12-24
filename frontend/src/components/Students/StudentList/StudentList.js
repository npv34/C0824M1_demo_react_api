import {Button, Card, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import StudentService from "../../../services/student.service";
import {toast} from "react-toastify";
import {Link} from "react-router";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        StudentService.getAllStudent().then(res => {
            const data = res.data;
            setStudents(data);
        })
    }, [reload]);

    const handleDeleteStudent = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            StudentService.deleteStudentById(id).then(res => {
                toast.success("Delete successfully!")
                setReload(!reload);
            }).catch(err => {
                toast.error("Delete failed!")
            })
        }

    }

    return (
        <>
            <Card>
                <Card.Header>
                    Student List
                    <Link to={"/admin/students/create"}>
                        <Button variant="primary">Create New Student</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Group</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.group.name}</td>
                                <td>
                                    <Button onClick={() => handleDeleteStudent(item.id)} variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        </>
    )
}

export default StudentList;