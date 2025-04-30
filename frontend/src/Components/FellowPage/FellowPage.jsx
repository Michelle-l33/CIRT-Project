import styles from "./FellowPage.module.css";
import NavBar from "../NavBar/NavBar"
import { useState } from "react";

const listOfFellows = [ {
    _id: "123",
    img: "https://avatarfiles.alphacoders.com/280/280087.png",
    name: "Bloom",
    year: "2004",
    bio: "Bloom Griffin is an accomplished researcher and thought leader with over two decades of experience in the field of environmental science and sustainable development. Having graduated with a degree in Environmental Engineering from Stanford University, Joshua's career spans various projects, including leading international collaborations to combat climate change and working on innovative technologies to promote clean energy. He has published numerous papers on climate policy, sustainability practices, and renewable energy solutions, many of which have been cited in high-impact journals worldwide. Joshua is passionate about advancing interdisciplinary collaborations, and his research has shaped public policy, influencing decisions on sustainable urban development, carbon emissions reduction, and ecosystem conservation.",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The ZOO"
},
{   
    _id: "456",
    img: "https://avatarfiles.alphacoders.com/246/246567.png",
    name: "Stella",
    year: "2005",
    bio: "Stelliaer lordnfhd dbdah adbasdbas dbashdsa ahdfbdsfsf bdabdd adbasdbasd dbasdba dabdashdbad abdashd",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The ZoO"
},
{   
    _id: "789",
    img: "https://avatarfiles.alphacoders.com/322/322831.jpg",
    name: "Musa",
    year: "2006",
    bio: "Musicdc lordnfhd dbdah adbasdbas dbashdsa ahdfbdsfsf bdabdd adbasdbasd dbasdba dabdashdbad abdashd",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The ZOo"
}, 
{   
    _id: "246",
    img: "https://avatarfiles.alphacoders.com/318/318384.jpg",
    name: "Techna",
    year: "2006",
    bio: "Techna lordnfhd dbdah adbasdbas dbashdsa ahdfbdsfsf bdabdd adbasdbasd dbasdba dabdashdbad abdashd",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The ZOo0"
}, 
{   
    _id: "357",
    img: "https://avatarfiles.alphacoders.com/280/280091.png",
    name: "Flora",
    year: "2002",
    bio: "Flora lordnfhd dbdah adbasdbas dbashdsa ahdfbdsfsf bdabdd adbasdbasd dbasdba dabdashdbad abdashd",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The Z0Oo"
}, 
{   
    _id: "101",
    img: "https://avatarfiles.alphacoders.com/326/326723.jpg",
    name: "Aisha",
    year: "2007",
    bio: "Aisha lordnfhd dbdah adbasdbas dbashdsa ahdfbdsfsf bdabdd adbasdbasd dbasdba dabdashdbad abdashd",
    published: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fellowship: "The Z0oO"
}, 
]   

const FellowPage = () => {
    const [activeFellow, setActiveFellow] = useState(null);
    const selectedFellow = listOfFellows.find(f => f._id === activeFellow);

    return (
        <>
        <header>
            <NavBar/>
        </header>

        <main className = {styles.fellowPage}>
            <h1>Our Fellows</h1>

            <section>
                    <div className={styles.fellowPageBigContainer}>
                        {listOfFellows.map((fellow) => (
                        <div
                            key={fellow._id}
                            className={`${styles.fellowGridItem} ${activeFellow === fellow._id ? styles.isActive : ""}`}>
                            <div className={styles.fellow}>
                            <div className={styles.fellowContainer}>
                                <button className={styles.fellowPortrait}
                                        onClick={() => setActiveFellow(activeFellow === fellow._id ? null : fellow._id)}
                                        disabled={activeFellow !== null}
                                        aria-disabled={activeFellow !== null} >
                                    <img
                                        src={fellow.img}
                                        alt={`${fellow.name} Profile Picture`}
                                    />
                                    <aside className={styles.portraitContent}>
                                        <p className={styles.portraitName}>{fellow.name}</p>
                                        <p className={styles.portraitFellowship}>{fellow.fellowship}</p>
                                    </aside>
                                </button>

                                {/* {activeFellow === fellow._id && ( */}
                                <div className={`${styles.expandedContentContainer} ${activeFellow === fellow._id ? styles.open : ''}`}>
                                    <div className={styles.closeBtnContainer}>
                                        <button className={styles.closeBtn} onClick={() => setActiveFellow(null)}>&#215;</button>
                                    </div>
                                    <img
                                        src={selectedFellow?.img}
                                        alt={`${selectedFellow?.name} Profile Picture`}
                                    />
                                    <div className={styles.expandedContent}>
                                        <div className={styles.employeeColName}>
                                            <p className={styles.portraitName}>{selectedFellow?.name}</p>
                                            <p className={styles.portraitFellowship}>{selectedFellow?.fellowship}</p>
                                        </div>
                                        <p className={styles.portraitYear}>{selectedFellow?.year}</p>

                                        <div className={styles.employeeColBio}>{selectedFellow?.bio}</div>

                                        <div className={styles.employeeColLink}>
                                            <a
                                            href={selectedFellow?.published}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            >
                                            View Works
                                            </a>

                                        </div>
                                    </div>
                                </div>
                                {/* )} */}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </section>
        </main>
        </>
    )
}

export default FellowPage;