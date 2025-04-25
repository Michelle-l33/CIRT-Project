import styles from './SearchBar.module.css';

import SearchBar from '../../ArticleView/SearchBar/SearchBar';
import ladyjustice from '../../../Asset/ladyjustice.jpg';

const SearchBarHome =() => {
    //javascript funcs go here
    return( // html goes in the return()

        <div className = {styles.bigContainer}>
            <h2 className = {styles.searchHeading}>Criminology Institute For Research And Training</h2>
            
            <div className = {styles.searchContainer}>
                <SearchBar />
            </div>
            

            
        </div>
    );
};
export default SearchBarHome;