import styles from './SearchBar.module.css';

import SearchBar from '../../ArticleView/SearchBar/SearchBar';
import river from '../../../Asset/river.jpg';

const SearchBarHome =() => {
    //javascript funcs go here
    return( // html goes in the return()

        <div className = {styles.bigContainer}>
            <h2 className = {styles.searchHeading}>Criminology Institute For Research And Training</h2>

            <div className = {styles.searchContainer}>
                <SearchBar />
            </div>

            <img className = {styles.searchPic} src={river} />
        </div>
    );
};
export default SearchBarHome;