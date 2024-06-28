import styles from "./Home.module.css"

export const Home = () => {
    return (
       <div className={styles.principal}>
        <h1 className={styles.title}>You can take an appointment for play in</h1>
        <div className={styles.divsCanchas}>
            <img src="https://www.hoysejuega.com/uploads/Modules/ImagenesComplejos/800_600_heroes-futbol.jpg" alt="f5" className={styles.img} />
            <p className={styles.p}>Soccer 5: 
            The match on this Soccer field is played 5 against 5 (4 players and a goalkeeper) on synthetic grass <br />
Price: $20.000</p>
        </div>
        <div className={styles.divsCanchas}>
            <img src="https://www.hoysejuega.com/uploads/Modules/ImagenesComplejos/800_600_super-futbol-7-3.jpg" alt="f5" className={styles.img} />
            <p className={styles.p}>Soccer 7: 
            The match on this Soccer field is played 7 against 7 (6 players and a goalkeeper) on synthetic grass <br />
            Price: $25.000
</p>
        </div>
        <div className={styles.divsCanchas}>
            <img src="https://velez.com.ar/campus/media/2021/09/01-04_deportes_244-1024x556.jpg" alt="f5" className={styles.img} />
            <p className={styles.p}>Soccer 11: 
            The match on this soccer field is played 11 against 11 (10 players and a goalkeeper) on synthetic grass <br />
            Price: $30.000
</p>
        </div>
       </div>
    )
}