import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";

export const NavBar = () =>{

const {pathname} = useLocation();
const login = useSelector(state => state.actualUser.userData.login);
const dispatch = useDispatch();
const navigate = useNavigate();
const handleLogout = () => {
    const confirm = window.confirm("Do you want to log out?");
    if(confirm){
dispatch(setUserData({"login": false, "user": { "id": false, }}));
navigate("/");
    }
}

    return (
        <>
        <nav className={styles.nav}>
            <div className={styles.logoynombre}>
                <img className = {styles.img} src="https://imgsvr.radiocut.site/get/thumb/600/600/shows_logos/v4dhh4RY.png" alt="logo" />
            <h2>A PURO FUTBOL</h2>
            </div>
            <ul className={styles.ul}>
                <Link to="/home">
                <li>HOME</li>
                </Link>
                { login && (<Link to="/appointments">
                <li>APPOINTMENTS</li>
                </Link>)}
                {!login && (<Link to="/login">
                <li>LOG IN</li>
                </Link>)}
                {
                  login && (
                  <Link to="/appointmentForm">
                <li>NEW APPOINTMENT</li>
                </Link>)}

                {
                    login && (
                        <Link>
                        <li onClick={handleLogout}>LOG OUT</li>
                        </Link>
                    )
                }

                {
                    !login && (
                        <Link to="/register"> 
                        <li>
                            REGISTER
                        </li>
                        </Link>
                    )
                }
                
            </ul>
        </nav>
        </>
    )
}