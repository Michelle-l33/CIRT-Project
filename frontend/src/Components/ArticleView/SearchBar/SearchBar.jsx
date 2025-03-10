import styles from './SearchBar.module.css';
import { BsSearchHeart } from "react-icons/bs";

const SearchBar = () => {
    return (
    <form className={styles.searchContainer}>
        <div className={styles.headerOptions}>
            <div className={styles.tabOptions}>
                <label className={styles.radioLabel}>
                    <input 
                        type="radio" 
                        name="tab" 
                        value="articles" 
                    />
                    Articles
                </label>
                <label className={styles.radioLabel}>
                    <input 
                        type="radio" 
                        name="tab" 
                        value="posters" 
                    />
                    Posters
                </label>
            </div>
            <button className={styles.advanceFilter} id = "advanceFilter" type="button">Advance Filter</button>
        </div>
    
        <div className={styles.searchInput}>
            <input 
                type='search' 
                placeholder='Search for posters, articles, authors :)'
            />
            <button type="submit"><BsSearchHeart /></button>
        </div>
    </form>
    )
}

export default SearchBar;