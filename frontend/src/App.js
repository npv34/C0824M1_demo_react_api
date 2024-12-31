import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useNavigate} from "react-router";
import Master from "./layouts/admin/Master/Master";
import StudentList from "./components/Students/StudentList/StudentList";
import {ToastContainer} from "react-toastify";
import StudentAdd from "./components/Students/StudentAdd/StudentAdd";
import StudentEdit from "./components/Students/StudentEdit/StudentEdit";
import Login from "./pages/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {login} from "./redux/features/authSlice";
import PageNotFound from "./pages/Errors/PageNotFound/PageNotFound";
import Home from "./pages/Home/Home";
import MasterHome from "./layouts/home/MasterHome/MasterHome";
import Cart from "./pages/Cart/Cart";

function App() {
    const auth = useSelector(state => state.auth);

    return (
        <>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/"} element={<MasterHome/>}>
                    <Route path={"home"} element={<Home/>}/>
                    <Route path={"cart"} element={<Cart/>}/>
                </Route>
                <Route path="/admin" element={<Master/>}>
                    <Route path={"students"} element={<StudentList/>}/>
                    <Route path={"students/create"} element={<StudentAdd/>}/>
                    <Route path={"students/:id/edit"} element={<StudentEdit/>}/>
                </Route>
                <Route path={"*"} element={<PageNotFound/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
