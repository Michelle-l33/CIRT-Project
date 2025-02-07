import styles from './SearchBar.module.css';

const SearchBar =() => {
    //javascript funcs go here
    return( // html goes in the return()

        <div>
            <h1>This is where you search!</h1>

            <div className = {styles.searchContainer}>
                <select>
                    <option>Author</option>
                    <option>Article</option>
                    <option>Poster</option>
                </select> 
                <form id = "searchForm">
                    <label for="keyWord">Searching for:</label>
                    <input type="text" id="keyWord" name="keyWord"/>
                </form>
            </div>

        </div>
    );
};
export default SearchBar; //make sure to export the function