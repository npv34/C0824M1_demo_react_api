import {useFormik} from "formik";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {login} from "../../redux/features/authSlice";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formLogin = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            // logic login
            if (values.username == 'admin' & values.password == '1234') {
                const dataUser = {
                    username: values.username,
                }
                dispatch(login(dataUser))
                localStorage.setItem("user", JSON.stringify(dataUser))
                navigate("/admin/students")
            } else {
                toast.error("Username and password error")
            }
        }
    })


    return (
        <>

            <form onSubmit={formLogin.handleSubmit}>
                <label>Username:</label>
                <input type="text" onChange={formLogin.handleChange} value={formLogin.values.username} name="username" required/>
                <label>Password:</label>
                <input type="password" onChange={formLogin.handleChange} value={formLogin.values.password} name="password" required/>
                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

export default Login;