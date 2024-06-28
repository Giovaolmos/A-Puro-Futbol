import axios from "axios";
import  { useEffect, useState } from "react";
import styles from "./AppointmentForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const POSTAPPOINTMENT_URL = "http://localhost:3008/appointments/schedule";

export default function AppointmentForm(props) {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.actualUser?.userData?.user?.id);

    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [userId, navigate]);

    const initialState = {
        date: "",
        hours: "09",
        minutes: "00",
        description: "",
    };

    const [appointment, setAppointment] = useState(initialState);
    const [errors, setErrors] = useState({
        date: "You must enter a date",
    });

    const validateAppointment = ({ date, hours, minutes, description }) => {
        const errors = {};
        if (!date) errors.date = "Enter a date";
        else if (isWeekend(date))
            errors.date = "You cannot book an appointment on the weekend.";
        if (!description) errors.description = "Soccer 5, 7 or 11?";
        else if (description.length < 5) errors.description = "Choose a soccer field";
        else if (description.length > 10) errors.description = "Description too long";
        return errors;
    };

    const isWeekend = (date) => {
        const day = new Date(date).getDay();
        return day === 5 || day === 6;
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        const updatedAppointment = {
            ...appointment,
            [name]: value,
        };
        setAppointment(updatedAppointment);
        setErrors(validateAppointment(updatedAppointment));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newAppointment = {
            date: appointment.date,
            time: `${appointment.hours}:${appointment.minutes}`,
            description: appointment.description,
            userId,
        };

        axios.post(POSTAPPOINTMENT_URL, newAppointment)
            .then(({ data }) => {
                alert(`Your appointment has been created: Date: ${data.date}, Time: ${data.time}`);
                setAppointment(initialState);
                navigate("/appointments");
            })
            .catch((error) => {
                alert(`Error: ${error.response?.data?.error || "Unknown error"}`);
            });
    };

    const validHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const validMinutes = ["00"];

    function getTomorrow() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    function getFourteenDaysAhead() {
        const today = new Date();
        const fourteenDaysAhead = new Date(today);
        fourteenDaysAhead.setDate(fourteenDaysAhead.getDate() + 13);
        return fourteenDaysAhead.toISOString().split("T")[0];
    };

    return (
        <div>
            <h2 className={styles.titulo}>New Appointment</h2>
            <hr />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.divForm}>
                    <label htmlFor="date"> Date: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={getTomorrow()}
                        max={getFourteenDaysAhead()}
                        value={appointment.date}
                        onChange={handleChange}
                    />
                    {errors.date && <span style={{ color: "red", fontSize: "15px", backgroundColor: "black", margin: "5px" }}>{errors.date}</span>}
                </div>

                <div>
                    <label htmlFor="time"> Time: </label>
                    <select
                        id="hours"
                        name="hours"
                        value={appointment.hours}
                        onChange={handleChange}
                    >
                        {validHours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                    <select
                        id="minutes"
                        name="minutes"
                        value={appointment.minutes}
                        onChange={handleChange}
                    >
                        {validMinutes.map((minute) => (
                            <option key={minute} value={minute}>
                                {minute}
                            </option>
                        ))}
                    </select>
                </div>
                <br />

                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={appointment.description}
                        placeholder="Soocer 5, 7 or 11"
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <span style={{ color: "red", fontSize: "15px", backgroundColor: "black", margin: "5px" }}>{errors.description}</span>
                    )}
                </div>

                <button type="submit" className={styles.buttons} disabled={Object.keys(errors).length > 0}>Create Appointment</button>
            </form>
        </div>
    );
}
