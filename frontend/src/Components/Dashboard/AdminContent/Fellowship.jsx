import styles from "./AdminContent.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";

const Fellowship = () => {

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

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredList, setFilteredList] = useState(listOfFellows);

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

                    {filteredList.length > 0 ? (
                        filteredList.map((oneFellow) => (
                            // the code for Fellow is down below
                            <li key={oneFellow._id}>
                                <Fellow fellow = {oneFellow}/>
                            </li>
                        ))) : (
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
                        maxLength={300}
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
                        maxLength={300}
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