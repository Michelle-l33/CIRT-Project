import styles from './SearchBar.module.css';

import SearchBar from '../../ArticleView/SearchBar/SearchBar';

const SearchBarHome =() => {
    //javascript funcs go here
    return( // html goes in the return()

        <div className = {styles.bigContainer}>
            <h2 className = {styles.searchHeading}>This is where you search!</h2>

            <div className = {styles.searchContainer}>
                <SearchBar />
            </div>

            <img className = {styles.searchPic} src='https://art.pixilart.com/4ba12e999f3819b.png' />
        </div>
    );
};
export default SearchBarHome;