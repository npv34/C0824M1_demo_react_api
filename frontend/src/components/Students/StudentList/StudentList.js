import {Button, Card, Pagination, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import StudentService from "../../../services/student.service";
import {toast} from "react-toastify";
import {Link} from "react-router";
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector} from "react-redux";
import {increment} from "../../../redux/features/counterSlice";


function StudentList() {
    const [students, setStudents] = useState([]);
    const [reload, setReload] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [defaultTotalStudentOnePage, setDefaultTotalStudentOnePage] = useState(3)
    const [paginate, setPaginate] = useState([])
    const [totalListStudent, setTotalListStudent] = useState([])
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    useEffect(() => {
        // componentDidMount() vs componentDidUpdate() theo state reload, students(1 lan)
        StudentService.getAllStudent()
            .then(response => {
            const totalStudent = response.data;
            StudentService.getAllStudentPaginate(currentPage, defaultTotalStudentOnePage)
                .then(res => {
                const data = res.data;
                const totalPages = Math.ceil(totalStudent.length / defaultTotalStudentOnePage);
                const arr = [];
                for (let i = 1; i <= totalPages; i++) {
                    arr.push(
                        <Pagination.Item key={i} active={currentPage == i} onClick={() => changeCurrentPage(i)}>
                            {i}
                        </Pagination.Item>
                    );
                }
                setPaginate([...arr])
                setTotalPages(totalPages);
                setStudents(data);
            })
        })

    }, [reload, currentPage]);

    const  changeCurrentPage = (newPage) => {
        setCurrentPage(newPage);
    }



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

    const handleSearchStudent = (event) => {
        const keyword = event.target.value;
        if (!keyword) {
            setReload(!reload);
        } else {
            StudentService.searchStudentByName(keyword).then(res => {
                setStudents(res.data)
            })
        }

    }


    const handleIncrementCounter = () => {
        dispatch(increment())
    }

    return (
        <>
            <Card>
                <Card.Header>
                    Student List
                    <Link to={"/admin/students/create"}>
                        <Button variant="primary">Create New Student</Button>
                    </Link>
                    <Form.Control type="text" onInput={(e) => handleSearchStudent(e)} name={"search"} placeholder="Enter Name" />
                    <Button variant="primary" onClick={handleIncrementCounter}>Increment counter</Button>
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
                        {students.length > 0 && students.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.group.name}</td>
                                <td>
                                    <Button onClick={() => handleDeleteStudent(item.id)} variant="danger">Delete</Button>
                                    <Link to={`/admin/students/${item.id}/edit`}>
                                        <Button variant="primary">Edit</Button>  {/* Redirect to student edit */}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {paginate}
                    </Pagination>

                </Card.Body>
            </Card>
        </>
    )
}

export default StudentList;