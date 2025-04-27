import styles from "./AdminContent.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useState } from "react";

const FellowTab = () => {

    const listOfFellows = [ {
        _id: "123",
        name: "Bloom",
        email: "winxClub@disney.com"
    }, 
    {   
        _id: "456",
        name: "Stella",
        email: "winxClub2@disney.com"
    },
    {   
        _id: "789",
        name: "Musa",
        email: "winxClub3@disney.com"
    }, 
]

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredList, setFilteredList] = useState(listOfFellows);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    
        const filteredResults = listOfFellows.filter(user =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
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
        </div>
    )
}

export default FellowTab;

const AddFellowBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.addUser}>
            <button className= {styles.addUserBtn} onClick={() => setIsOpen(true)}><AiOutlineUserAdd /></button>

            <div className = {`${styles.fellowFormContainer} ${isOpen ? styles.show : ""}`}>
                <h4>Add Fellow</h4>
                
                {/* the code for UserForm is defined down below */}
                {isOpen && <AddFellowForm onClose={() => setIsOpen(false)} />}
            </div>
        </div>
    )
}

const AddFellowForm = ( {onClose} ) => {
    return (
        <>
            <form className={styles.fellowForm}>
 
                <div className={styles.inputContainer}>
                    <label htmlFor="picture">Picture:</label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept="image/*"
                        required
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="name">Name and Fellowship Year:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Princess Bloom (2004)"
                        maxLength={100}
                        required
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="bio">Quick Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Short biography..."
                        rows="4"
                        maxLength={500}
                        required
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="publishedWork">Published Work Link:</label>
                    <input
                        type="url"
                        id="publishedWork"
                        name="publishedWork"
                        placeholder="https://example.com"
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="fellowshipTopic">Fellowship Topic and Collaborators:</label>
                    <textarea
                        id="fellowshipTopic"
                        name="fellowshipTopic"
                        placeholder="Research topic and who worked with them..."
                        rows="3"
                        maxLength={500}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
}