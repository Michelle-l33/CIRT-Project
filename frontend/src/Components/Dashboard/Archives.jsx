import styles from './MainContentEditor.module.css';
import { BsSearchHeart } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

const Archives = () => {

    return (
        <div className = {styles.tab}>
                  <div className = {styles.tabHeader}>
                      <h3>Archives</h3>
        
                      <div className = {styles.left}>
                        <form>
                            <div className = {styles.formInput}>
                                <input type = "search" placeholder = "Search"></input>
                                <button><BsSearchHeart /></button>
                            </div>
                        </form>
        
                        <button><FiFilter /> Filters</button>
                        <button>New Submission</button>  
                        
                      </div>
        
                  </div>
        </div>
    );
};

export default Archives;