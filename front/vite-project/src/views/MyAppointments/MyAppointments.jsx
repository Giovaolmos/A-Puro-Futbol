import { useEffect, useState } from "react"
import { CardAppointment } from "../../components/CardAppointments/CardAppointments";
import styles from "./MyAppointments.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAppointments } from "../../redux/userSlice";

const GETUSERBYID_URL = "http://localhost:3008/users/"
const PUTCANCEL_URL = "http://localhost:3008/appointments/cancel/"


export const MyAppointments = () => {

const actualUserId = useSelector(state => state.actualUser.userData.user.id);

const dispatch = useDispatch();

const appointments = useSelector(state => state.actualUser.userAppointments)

const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getDate();
})

useEffect(() => {
    axios.get(GETUSERBYID_URL + actualUserId)
    .then(response => response.data)
    .then(actualUser => {
    dispatch(setUserAppointments(actualUser.appointments));
    })
    .catch(error => console.log(error.message));
}, [actualUserId, dispatch]);


const login = useSelector(state => state.actualUser.userData.login);
const navigate = useNavigate();


useEffect(() => {
!login && navigate("/home")
}, [login]);


const handleAppointmentCancel = (appointmentId) => {
axios.put(PUTCANCEL_URL + appointmentId)
.then(response => response.data)
.then(data => {
 axios.get(GETUSERBYID_URL + actualUserId)
 .then(response => response.data.appointments)
 .then(appointments => dispatch(setUserAppointments(appointments)))
 .catch(error => console.log(error.message))
});
};


    return (
        <div>
        <h1 className={styles.titulo}>Your Appointments</h1>
        {
            sortedAppointments.map(appointment => (
                <CardAppointment
                key={appointment.id}
                id={appointment.id}
                date={appointment.date}
                description={appointment.description}
                time={appointment.time}
                status={appointment.status}
                handleAppointmentCancel={handleAppointmentCancel}
                />
            ))
        }
        </div>
    )
}