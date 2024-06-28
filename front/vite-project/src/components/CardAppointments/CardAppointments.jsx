
import styles from "./CardAppointment.module.css"



export const CardAppointment = ({
    id, date, description, time, status, handleAppointmentCancel
}) =>{

date = new Date(date);
const formatDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`

const handleClick = () =>{
    if(
        window.confirm(`Do you want to cancel the ${formatDate} appointment? at ${time}?`)
    ){
        handleAppointmentCancel(id)
    }

}
    return (
       <div className={styles.card}>
        <span>{formatDate}</span>
        <span>{description}</span>
        <span>{time}</span>
        {status === "Active"? (
            <span className={styles.active} >{status}</span>
        ): (
            <span className={styles.cancelled}>Cancelled</span>
        )}
        {status === "Active" ? (<button onClick={handleClick}>Cancel</button>) : null}
       </div>
    )
}