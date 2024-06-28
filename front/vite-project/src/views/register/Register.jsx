import  { useState } from 'react'
import axios from "axios"
import styles from "./Register.module.css"
import { useNavigate } from 'react-router-dom';

const POSTUSER_URL = "http://localhost:3008/users/register"
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     "name", "email", "birthdate","nDni","username", "password", confirmPassword"




function Register() {

  const navigate = useNavigate();
  const initialState ={
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: ""
  }

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const validateUser = ({ name, email, birthdate, nDni, username, password, confirmPassword}) =>{
    const errors = {};
    if(!name) errors.name = "Name is required";
    if(!email) errors.email = "Email is required";
    else if(!emailRegExp.test(email)) errors.email = "Invalid email format";
    if(!birthdate) errors.birthdate = "Birthdate is required";
    if(!nDni) errors.nDni = "nDni is required";
    if(!username) errors.username = "Username is required";
    if(!password) errors.password = "Password is required";
    else if(password === username) errors.password = "The password cannot be the same as the username";
    if(confirmPassword !== password) errors.confirmPassword = "The password and password confirmation must be the same. ";
    return errors;
  };

const handleChange = (event) => {
  const {name, value} = event.target;
  setUser({...user, [name]: value});
  setErrors(validateUser({...user, [name]: value}));
};

const handleSubmit = (event) =>{
  event.preventDefault();
  const userData = {
    name: user.name,
     email: user.email,
      birthdate: user.birthdate,
       nDni: user.nDni,
        username: user.username,
         password: user.password
  };
axios.post(POSTUSER_URL, userData)
.then(({data})=> {
  console.log(data);
  alert("User register succesfully");
  setUser(initialState)
  navigate("/login")
})
.catch(error => alert(error?.response?.data));
};

const handleReset = (event) => {
  event.preventDefault();
  setUser(initialState);

}



const formData = [
  {label: "Name ", name: "name", type: "text"},
  { label: "Username ", name: "username", type: "text" },
  { label: "Password ", name: "password", type: "password" },
  { label: "Confirm Password ", name: "confirmPassword", type: "password" },
  { label: "Email ", name: "email", type: "text" },
  { label: "Birthdate ", name: "birthdate", type: "date" },
  { label: "nDni ", name: "nDni", type: "text" },
]
  return (
    <div className={styles.principal}>
      <h2 className={styles.titulo}>Sign Up</h2>
      <hr />
      <form onSubmit={handleSubmit} className={styles.form}>
        {formData.map(({label, name, type}) => (
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
         {
          errors[name] && (
            <span style={{color:"red"}}>{errors[name]}</span>
          )
         }
         </div>
        )) }
        <div className={styles.buttons}>
        <button onClick={handleReset}>Reset form</button>
        <button 
        type='submit'
        disabled={Object.keys(user).some(elem => !user[elem])}
        >Register</button>
        </div>
        
      </form>
    </div>
  )
}

export default Register