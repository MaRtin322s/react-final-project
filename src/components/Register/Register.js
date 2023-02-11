import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/userContext";
import { registerUser } from "../../services/userService";
import "./styles/register.css";

const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePass: ""
    });

    const changeHandler = (ev) => {
        setData(state => ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    }

    const SubmitHandler = (ev, userData) => {
        ev.preventDefault();

        if (Object.values(userData).some(x => x === "")) {
            alert("All fields are required!");
        } else if ((userData.password === userData.rePass) && (userData.password !== '' && userData.rePass !== '')) {
            registerUser(userData)
                .then(user => {
                    userLogin(user);
                    navigate("/");
                })
                .catch(error => alert(error.message));
        }
    }

    return (
        <main>
            <form className="register" onSubmit={(ev) => SubmitHandler(ev, data)}>
                <h3>
                    <i className="fas fa-user-plus" />
                    Register User
                </h3>
                <label className="label" htmlFor="firstName">
                    <i className="fas fa-user"></i>First Name:
                </label>
                <input
                    className="inputField"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={data.firstName}
                    onChange={(ev) => changeHandler(ev)}
                />
                <label className="label" htmlFor="lastName">
                    <i className="fas fa-user"></i>Last Name:
                </label>
                <input
                    className="inputField"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={data.lastName}
                    onChange={(ev) => changeHandler(ev)}
                />
                <label className="label" htmlFor="email">
                    <i className="fas fa-envelope"></i>Email:
                </label>
                <input
                    className="inputField"
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={(ev) => changeHandler(ev)}
                />

                <label className="label" htmlFor="password">
                    <i className="fas fa-lock"></i>Password:
                </label>
                <input
                    className="inputField"
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(ev) => changeHandler(ev)}
                />
                <label className="label" htmlFor="rePass">
                    <i className="fas fa-lock"></i>Confirm password:
                </label>
                <input
                    className="inputField"
                    type="password"
                    id="rePass"
                    name="rePass"
                    value={data.rePass}
                    onChange={(ev) => changeHandler(ev)}
                />
                <p>
                    <i className="fas fa-user-edit"></i>Aleready registered? <Link to="/login">Sign In</Link>
                </p>
                <button className="button">Sign Up</button>
            </form>
        </main>
    );
}

export default Register;