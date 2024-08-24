import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import logo from "../../assets/img/logo.png";

export const NavBar = () => {
  const { pathname } = useLocation();
  const login = useSelector((state) => state.actualUser.userData.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirm = window.confirm("Do you want to log out?");
    if (confirm) {
      dispatch(setUserData({ login: false, user: { id: false } }));
      navigate("/");
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logoynombre}>
          <img className={styles.img} src={logo} alt="logo" />
          <h2>GOAL TIME</h2>
        </div>
        <ul className={styles.ul}>
          <Link to="/home">
            <li>Home</li>
          </Link>
          {login && (
            <Link to="/appointments">
              <li>Appointments</li>
            </Link>
          )}
          {!login && (
            <Link to="/login">
              <li>Sign In</li>
            </Link>
          )}
          {login && (
            <Link to="/appointmentForm">
              <li>New Appointment</li>
            </Link>
          )}

          {login && (
            <Link>
              <li onClick={handleLogout}>Log Out</li>
            </Link>
          )}

          {!login && (
            <Link to="/register">
              <li>Sign Up</li>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
};
