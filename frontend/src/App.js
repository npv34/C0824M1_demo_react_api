import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router";
import Master from "./layouts/Master/Master";
import StudentList from "./components/Students/StudentList/StudentList";
import {ToastContainer} from "react-toastify";
import StudentAdd from "./components/Students/StudentAdd/StudentAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Master />} >
          <Route path={"students"} element={<StudentList/>} />
          <Route path={"students/create"} element={<StudentAdd/>} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;