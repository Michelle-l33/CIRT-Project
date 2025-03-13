import styles from './SearchBar.module.css';

import SearchBar from '../../ArticleView/SearchBar/SearchBar';

const SearchBarHome =() => {
    //javascript funcs go here
    return( // html goes in the return()

        <div className = {styles.bigContainer}>
            <h2>This is where you search!</h2>

            <div className = {styles.searchContainer}>
                <SearchBar />
            </div>

        </div>
    );
};
export default SearchBarHome; //make sure to export the function