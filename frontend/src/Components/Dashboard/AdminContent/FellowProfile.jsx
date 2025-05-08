import styles from "./AdminContent.module.css";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const FellowProfile = () => {
    const [searchParams] = useSearchParams(); 
    const [listOfFellows,setListOfFellows] = useState([]);  
    const fellowId = searchParams.get("fellowId");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedFellow, setEditedFellow] = useState(null);
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const fileInputRef = useRef(null);
    useEffect(()=>{
        const fetchFellows = async()=> {
            try{

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
            }
        }
        fetchFellows();
    },[])


    useEffect(() => {
        const foundFellow = listOfFellows.find(f => f._id === fellowId);
        setEditedFellow(foundFellow);
        setIsEditMode(false);
    }, [fellowId]);

    if (!editedFellow) {
        return null;
    }
    const handleSubmit = async () => {
        try {
          const formData = new FormData();
          formData.append("name", editedFellow.name);
          formData.append("year", editedFellow.year);
          formData.append("bio", editedFellow.bio);
          formData.append("description", editedFellow.description);
          formData.append("published", editedFellow.published);
      
          // Add image file if selected
          if (fileInputRef.current?.files[0]) {
            formData.append("img", fileInputRef.current.files[0]);
          }
      
          const response = await fetch(
            `https://cirt-project-server.vercel.app/fellow/${editedFellow._id}`,
            {
              method: "PUT",
              body: formData,
            }
          );
      
          if (!response.ok) {
            throw new Error("Failed to update fellow");
          }
      
          const updatedData = await response.json();
          setEditedFellow(updatedData);
          setIsEditMode(false);
          window.location.reload();
          
        } catch (err) {
          console.error("Error updating fellow:", err);
        }
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEditedFellow(prev => ({ ...prev, img: imageUrl }));
        }
    };
      

    return (
        <>
        
            <section className={styles.fellowProfileContainer}>
                    <div className={styles.profileImg}>
                        <div className = {styles.profilePic}>
                                <img src={editedFellow.img} alt="Picture" />
                                {isEditMode && (<>
                                    <button className={styles.editProfilePic}
                                            onClick={() => fileInputRef.current?.click()}>
                                        <CiEdit /> 
                                    </button>
                                    <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    /></>)}
                                
                        </div>
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
                            maxLength={50}
                        />
                        <input 
                            type="text" 
                            value={editedFellow.year}
                            onChange={(e) => setEditedFellow({...editedFellow, year: e.target.value})}
                            placeholder="Year"
                            maxLength={4}
                        />
                        <textarea
                            value={editedFellow.bio}
                            onChange={(e) => setEditedFellow({...editedFellow, bio: e.target.value})}
                            placeholder="Bio"
                            maxLength={1000}
                        />
                        <input 
                            type="text" 
                            value={editedFellow.description}
                            onChange={(e) => setEditedFellow({...editedFellow, description: e.target.value})}
                            placeholder="Fellowship Description"
                            maxLength={500}
                        />
                        <input 
                            type="text" 
                            value={editedFellow.published}
                            onChange={(e) => setEditedFellow({...editedFellow, published: e.target.value})}
                            placeholder="Published Link"
                            maxLength={150}
                        />

                        <button className={styles.saveButton} onClick={handleSubmit}>
                            Save Changes
                        </button>
                        </>
                    ) : (
                        <>
                            <h2>{editedFellow.name}</h2>
                            <p><span className={styles.title}>Year:</span> {editedFellow.year}</p>
                            <div>
                                <p className={isBioExpanded ? styles.textExpand : styles.bioClip}>
                                <span className={styles.title}>Bio:</span> {editedFellow.bio}
                                </p>

                                {editedFellow.bio && ( 
                                <button
                                    className={styles.bioButton}
                                    onClick={() => setIsBioExpanded(!isBioExpanded)}
                                >
                                    {isBioExpanded ? <MdExpandLess /> : <MdExpandMore />}
                                </button>
                                )}
                            </div>
                            <p><span className={styles.title}>Fellowship:</span> {editedFellow.description}</p>
                            <p><span className={styles.title}>Published Work:</span> 
                                <a href={editedFellow.published} target="_blank" rel="noopener noreferrer">View</a>
                            </p>
                        </>
                    )}
            </section>
        </>
    )
}

export default FellowProfile;