import styles from "./FellowPage.module.css";
import NavBar from "../NavBar/NavBar"
import { useState, useEffect, useCallback } from "react";



const FellowPage = () => {
    const [activeFellow, setActiveFellow] = useState(null);
    const [listOfFellows, setListOfFellows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchFellows = async()=> {
            try{
                setLoading(true);
                const response = await fetch('https://cirt-project-server.vercel.app/fellow/',{
                    method: "GET",
                })
                if(!response.ok){
                    throw new Error ("Failed to fetch users");
                }
                const data = await response.json();
                setListOfFellows(data);
                console.log(data);
            } catch (error){
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFellows();
    },[])

    const handleClickOutside = useCallback((event) => {
        const isClickInsidePopup = event.target.closest(`.${styles.expandedContentContainer}`);
        const isClickOutsidePopup = event.target.closest(`.${styles.fellowPage}`);

      
        if (!isClickInsidePopup && isClickOutsidePopup) {
          setActiveFellow(null);
        }
      }, []);

      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [handleClickOutside]);

    return (
        <>
        <header>
            <NavBar/>
        </header>

        <main className = {styles.fellowPage}>
            <h1>Meet Our Brilliant Fellows</h1>

            {loading ? (
                <div className={styles.loadingContainer}>
                    <p>Loading fellows...</p> {/* You can replace this with a spinner */}
                </div>
            ) : (
                <section>
                    <div className={styles.fellowPageBigContainer}>
                        {listOfFellows.map((fellow) => (
                            <div key={fellow._id} className={styles.fellowGridItem}>
                                <div className={styles.fellow}>
                                    <div className={styles.fellowContainer}>
                                        <button
                                            className={styles.fellowPortrait}
                                            onClick={() =>
                                                setActiveFellow(
                                                    activeFellow?._id === fellow._id ? null : fellow
                                                )
                                            }
                                            disabled={activeFellow !== null}
                                            aria-disabled={activeFellow !== null}
                                        >
                                            <img
                                                src={fellow.img}
                                                alt={`${fellow.name} Profile Picture`}
                                            />
                                            <aside className={styles.portraitContent}>
                                                <p className={styles.portraitName}>{fellow.name}</p>
                                                <p className={styles.portraitFellowship}>{fellow.description}</p>
                                            </aside>
                                        </button>

                                        <ExpandedContent
                                            fellow={activeFellow}
                                            isOpen={!!activeFellow}
                                            onClose={() => setActiveFellow(null)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
        </>
    )
}

export default FellowPage;

const ExpandedContent = ({ fellow, isOpen, onClose }) => {

    return (
        <div className={`${styles.expandedContentContainer} ${isOpen ? styles.open : ""}`} onClick={onClose}>
                {fellow && (
                    <>
                        <div className={styles.closeBtnContainer} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
                        </div>
                
                        <img src={fellow.img} alt={fellow.name} onClick={(e) => e.stopPropagation()}/>
                
                        <div className={styles.expandedContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.employeeColName}>
                                <p className={styles.portraitName}>{fellow.name}</p>
                                <p className={styles.portraitYear}>{fellow.year}</p>
                                <p className={styles.portraitFellowship}>{fellow.description}</p>
                            </div>

                            
                
                            <div className={styles.employeeColBio}><p>{fellow.bio}</p></div>
                    
                            {fellow.published && (
                                <div className={styles.employeeColLink}>
                                    <a href={fellow.published} target="_blank" rel="noopener noreferrer">
                                    View Work
                                    </a>
                                </div>
                                )}

                        </div>
                    </>
                )}
        </div>
      );
}