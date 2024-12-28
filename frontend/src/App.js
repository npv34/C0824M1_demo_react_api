import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useNavigate} from "react-router";
import Master from "./layouts/Master/Master";
import StudentList from "./components/Students/StudentList/StudentList";
import {ToastContainer} from "react-toastify";
import StudentAdd from "./components/Students/StudentAdd/StudentAdd";
import StudentEdit from "./components/Students/StudentEdit/StudentEdit";
import Login from "./pages/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "./redux/features/authSlice";

function App() {
    const auth = useSelector(state => state.auth);
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
      <Routes>
          <Route path={"/login"} element={<Login/>} />
          { auth.isLoggedIn && (
              <Route path="/admin" element={<Master />} >
                  <Route path={"students"} element={<StudentList/>} />
                  <Route path={"students/create"} element={<StudentAdd/>} />
                  <Route path={"students/:id/edit"} element={<StudentEdit/>} />
              </Route>
          )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
