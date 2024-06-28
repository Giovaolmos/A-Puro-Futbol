import { Home } from "./views/home/Home"
import { NavBar } from "./components/NavBar/NavBar"
import { MyAppointments } from "./views/MyAppointments/MyAppointments"
import Register from "./views/register/Register"
import Login from "./views/login/Login"
import { Route, Routes, useLocation } from "react-router-dom"
import Landing from "./views/landing/Landing"
import ErrorPage from "./views/errorPage/ErrorPage"
import AppointmentForm from "./views/appointmentForm/AppointmentForm"


function App() {
  const { pathname } = useLocation();
  const showNavBarPaths = ["/home", "/appointments", "/", "/appointmentForm"];
  

  return (
    <>
      { showNavBarPaths.includes(pathname) && <NavBar /> }
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={ <Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/appointments" element={<MyAppointments /> } />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
