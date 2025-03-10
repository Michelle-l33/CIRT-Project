import styles from './SearchBar.module.css';
import { BsSearchHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const SearchBar = () => {

    const [ query, setQuery ] = useState("");
    const [ tab, setTab ] = useState("article");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/ArticleView?searchQuery=${query}&tab=${tab}`);
    };

    return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
        <div className={styles.headerOptions}>
            <div className={styles.tabOptions}>
                <div>
                    <input 
                        type="radio" 
                        id="articleRadio"
                        name="type" 
                        value="articles"
                        checked={tab === "articles"}
                        onChange={(e) => setTab(e.target.value)} 
                    />
                    <label htmlFor="articleRadio" className={`${styles.radioLabel} ${tab === "articles" ? styles.active : ""}`}>Article</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="posterRadio"
                        name="type" 
                        value="posters"
                        checked={tab === "posters"}
                        onChange={(e) => setTab(e.target.value)}  
                    />
                    <label htmlFor="posterRadio" className={`${styles.radioLabel} ${tab === "posters" ? styles.active : ""}`}>Poster</label>
                </div>
            </div>
            {/* <button className={styles.advanceFilter} id = "advanceFilter" type="button">Advance Filter</button> */}
        </div>
    
        <div className={styles.searchInput}>
            <input 
                type='search' 
                placeholder='Search for posters, articles, authors :)'
                onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit"><BsSearchHeart /></button>
        </div>
    </form>
    )
}

export default SearchBar;