import styles from "./AdminContent.module.css";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FellowProfile = () => {
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
]   


    const [searchParams] = useSearchParams();   
    const fellowId = searchParams.get("fellowId");
    const fellow = listOfFellows.find(f => f._id === fellowId);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedFellow, setEditedFellow] = useState(fellow);

    useEffect(() => {
        setEditedFellow(fellow);
        setIsEditMode(false); 
    }, [fellowId]);

    if (!fellow) {
        return;
    }

    return (
        <section className={styles.fellowProfileContainer}>
                <div className={styles.profileImg}>
                    <img src={fellow.img} alt={fellow.name} />
                    <button 
                            className={styles.editButton}
                            onClick={() => setIsEditMode(!isEditMode)}
                            >
                            {isEditMode ? "Cancel" : <FaEdit/>}
                    </button>
                </div>
                {isEditMode ? (
                    <>
                    <input 
                        type="text" 
                        value={editedFellow.name}
                        onChange={(e) => setEditedFellow({...editedFellow, name: e.target.value})}
                        placeholder="Name"
                    />
                    <input 
                        type="text" 
                        value={editedFellow.year}
                        onChange={(e) => setEditedFellow({...editedFellow, year: e.target.value})}
                        placeholder="Year"
                    />
                    <textarea
                        value={editedFellow.bio}
                        onChange={(e) => setEditedFellow({...editedFellow, bio: e.target.value})}
                        placeholder="Bio"
                    />
                    <input 
                        type="text" 
                        value={editedFellow.fellowship}
                        onChange={(e) => setEditedFellow({...editedFellow, fellowship: e.target.value})}
                        placeholder="Fellowship"
                    />
                    <input 
                        type="text" 
                        value={editedFellow.published}
                        onChange={(e) => setEditedFellow({...editedFellow, published: e.target.value})}
                        placeholder="Published Link"
                    />

                    <button className={styles.saveButton} onClick={() => setIsEditMode(false)}>
                        Save Changes
                    </button>
                    </>
                ) : (
                    <>
                        <h2>{editedFellow.name}</h2>
                        <p><span className={styles.title}>Year:</span> {editedFellow.year}</p>
                        <p><span className={styles.title}>Bio:</span> {editedFellow.bio}</p>
                        <p><span className={styles.title}>Fellowship:</span> {editedFellow.fellowship}</p>
                        <p><span className={styles.title}>Published Work:</span> 
                            <a href={editedFellow.published} target="_blank" rel="noopener noreferrer">View</a>
                        </p>
                    </>
                )}
        </section>
    )
}

export default FellowProfile;