import styles from "./AdminContent.module.css";
import Fellowship from "./Fellowship";
import FellowProfile from "./FellowProfile";

const FellowTab = () => {
    return(
        <section className={styles.fellowBigContainer}>
            <Fellowship />
            <FellowProfile />
        </section>
    )
}

export default FellowTab;