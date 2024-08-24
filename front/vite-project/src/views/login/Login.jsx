import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

const POSTLOGINUSER_URL = "http://localhost:3008/users/login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const validateUser = ({ username, password }) => {
    const errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors(validateUser({ ...user, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: user.username,
      password: user.password,
    };
    axios
      .post(POSTLOGINUSER_URL, userData)
      .then(({ data }) => {
        dispatch(setUserData(data));
        alert("User login succesfully");
        setUser(initialState);
        navigate("/home");
      })
      .catch((error) => alert(error?.response?.data));
  };

  const formData = [
    { label: "Username ", name: "username", type: "text" },
    { label: "Password ", name: "password", type: "password" },
  ];
  return (
    <div className={styles.principal}>
      <h2 className={styles.titulo}>Sign In</h2>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        {formData.map(({ label, name, type }) => (
          <div key={name} className={styles.divForm}>
            <label>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={user[name]}
              placeholder={`Enter ${label.toLowerCase()}`}
              onChange={handleChange}
            />
            {errors[name] && (
              <span style={{ color: "red" }}>{errors[name]}</span>
            )}
          </div>
        ))}
        <div className={styles.buttons}>
          <button
            type="submit"
            disabled={Object.keys(user).some((elem) => !user[elem])}
          >
            Sign In
          </button>
        </div>
        <p>You do not have an account? </p>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
