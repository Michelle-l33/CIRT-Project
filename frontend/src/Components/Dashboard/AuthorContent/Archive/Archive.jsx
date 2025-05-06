import styles from "./Archive.module.css";


const published = [{
    title: "sdsad",
    firstName: "asd",
    lastName: "sd",
},
{
    title: "kkk",
    firstName: "addddsd",
    lastName: "sdddddd",
},
]

const denied = [{
    title: "sdssasad",
    firstName: "adsdsd",
    lastName: "sddsdsd",
},
{
    title: "rrrr",
    firstName: "arrrrsd",
    lastName: "srrrd",
},
]

const Archive = () => {
    return (
        <div className={styles.authorArchiveContainer}>
            <section className = {styles.publishedContainer}>
                <div className = {styles.header}>
                    <h3>Published</h3>
                </div>
                {published.length === 0 ? (
                        <p className={styles.emptyMessage}>No published articles.</p>
                        ) : (
                        
                            <ul className={styles.subList}>
                                    {published.map((item, index) => (
                                        <li key={index} className={styles.item}>
                                            <h4>{item.title}</h4>
                                            <p>{item.firstName} {item.lastName}</p>
                                        </li>
                                    ))}
                            </ul>
                        
                )}
            </section>
            <section className = {styles.deniedContainer}>
                <div className = {styles.header}>
                    <h3>Denied</h3>
                </div>
                {denied.length === 0 ? (
                        <p className={styles.emptyMessage}>No denied articles.</p>
                        ) : (
                            <ul className={styles.subList}>
                                    {denied.map((item, index) => (
                                        <li key={index} className={styles.item}>
                                            <h4>{item.title}</h4>
                                            <p>{item.firstName} {item.lastName}</p>
                                        </li>
                                    ))}
                            </ul>
                )}
            </section>
        </div>
    )
}

export default Archive