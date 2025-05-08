import styles from "./AdminContent.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useState, useEffect } from "react";

import { dashBoardContext } from "../Dashboard";
import { useContext } from "react";

import { useSearchParams } from "react-router-dom";

const Fellowship = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listOfFellows, setListOfFellows] = useState({});
    const [filteredList, setFilteredList] = useState(listOfFellows);
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
                setFilteredList(data);
                console.log(data);
            } catch (error){
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFellows();
    },[])

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);

        const filteredResults = listOfFellows.filter(fellow =>
            fellow.name.toLowerCase().includes(value.toLowerCase()) ||
            fellow.year.toLowerCase().includes(value.toLowerCase())
        );
    
        setFilteredList(filteredResults);
    };

    return (
        <div className= {styles.adminContent}>
            <div className = {styles.tabHeader}>
                    <h3>List of Fellows</h3>
                    <div className = {styles.left}>

                        <form onSubmit = {(event) => event.preventDefault()}>
                            <div className = {styles.formInput}>
                                <input  type = "search" 
                                        placeholder = "Search"
                                        value = {search}
                                        onChange = {handleSearchChange}></input>
                                <button type = "submit" ><BsSearchHeart /></button>
                            </div>
                        </form>

                    </div>

                    {/* the code for addUserBtn is defined down below */}
                    <AddFellowBtn />

                    {totalPages >= 1 && (
                        <div className={styles.pagination}>
                            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}><GrPrevious/></button>
                            <span>{page}/{totalPages}</span>
                            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}><GrNext /></button>
                        </div>
                    )}
            </div>

            <section>
                
                <ul className={styles.fellowListHeader}>
                    <li>&#9733;</li>
                    <li>Name</li>
                    <li>Year</li>
                </ul>

                <ul className={styles.fellowList}>
                    {loading ? (
                        <div className={styles.loading}>Loading fellows...</div> // Add loading class in CSS
                    ) : filteredList.length > 0 ? (
                        filteredList.map((oneFellow) => (
                            <li key={oneFellow._id}>
                                <Fellow fellow={oneFellow} />
                            </li>
                        ))
                    ) : (
                        <span>No Submission Found</span>
                    )}
                </ul>
            </section>
        </div>
    )
}

export default Fellowship;

const AddFellowBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isClose } = useContext(dashBoardContext);
    return (
        <div className={styles.addUser}>
            <button className= {styles.addUserBtn} onClick={() => setIsOpen(true)}><AiOutlineUserAdd /></button>

            <div className = {`${styles.fellowFormContainer} ${isOpen ? styles.show : ""} ${isClose ? styles.close : ""}`}>
                <h4>Add Fellow</h4>
                
                {/* the code for UserForm is defined down below */}
                {isOpen && <AddFellowForm onClose={() => setIsOpen(false)} />}
            </div>
        </div>
    )
}

const AddFellowForm = ( {onClose} ) => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [bio, setBio] = useState("");
    const [published, setPublished]=useState("");
    const [description, setDescription]=useState("");
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
 
    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!img) {
      alert("Please upload a picture.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("img", img);
    formData.append("name", name);
    formData.append("year", year);
    formData.append("bio", bio);
    formData.append("published", published);
    formData.append("description", description);

    try {
        const response = await fetch("https://cirt-project-server.vercel.app/fellow/upload-fellowship", {
            method: "POST",
            body: formData, // Send form data
            credentials: 'include',
            mode: 'cors',
        });

        const data = await response.json();
        if (response.ok) {
            window.alert("Uploaded successfully!");
            window.location.reload();
        } else {
            window.alert(data.error || "Something went wrong!");
            console.log(data.error);
        }
        onClose(); // Close the form after submission
    } catch (error) {
        console.error("Error uploading fellowship:", error);
        alert("An error occurred while uploading the fellowship.");
    } finally {
        setLoading(false);
    }
};


    return (
        <>
            <form className={styles.fellowForm} onSubmit={handleSubmit}>
 
                <div className={styles.inputContainer}>
                    <label htmlFor="img">Picture:</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Princess Bloom "
                        maxLength={100}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="year">Fellowship Year: </label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        placeholder="e.g. 2020"
                        maxLength={100}
                        required
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                

                <div className={styles.inputContainer}>
                    <label htmlFor="bio">Quick Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Short biography..."
                        rows="4"
                        maxLength={1000}
                        required
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="published">Published Work Link:</label>
                    <input
                        type="url"
                        id="published"
                        name="published"
                        placeholder="https://example.com"
                        onChange={(e) => setPublished(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="description">Fellowship Topic and Collaborators:</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Research topic and who worked with them..."
                        rows="3"
                        maxLength={500}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Submit"}
                </button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
}

const Fellow = ( {fellow} ) => {

    const [ searchParams, setSearchParams ] = useSearchParams();

    return (
        <div className={styles.fellow} onClick={() =>  setSearchParams({ fellowId: fellow._id })}>
            <img className={styles.profile} src = {fellow.img} alt="profilePic" />
            <p>{fellow.name}</p>
            <p>{fellow.year}</p>
        </div>
    );
}