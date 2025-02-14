import styles from './SubmissionRecord.module.css';

import { BsSearchHeart } from "react-icons/bs";

const SubmissionFiles = () => {

    return(
        <div className = {styles.filesContainer}>
            
            <div className = {styles.header}>
                <h3>Submission Files</h3>

                 <div className = {styles.left}>
                    <form>
                        <div className = {styles.formInput}>
                            <input type = "search" placeholder = "Search"></input>
                            <button><BsSearchHeart /></button>
                        </div>
                    </form>
                </div>
            </div>
            
            <ul className = {styles.contentList}>
                <li className = {styles.listItem}>
                    <h4>Author's name</h4>
                    <a href = "#"><p>Title: sbbdda sabd ashdb ashdb asdb</p></a>
                    <button>Download</button>
                </li>

                <li className = {styles.listItem}>
                    <h4>Author's name</h4>
                    <a href = "#"><p>Title: sbbdda sabd ashdb ashdb asdb</p></a>
                    <button>Download</button>
                </li>

                <li className = {styles.listItem}>
                    <h4>Author's name</h4>
                    <a href = "#"><p>Title: sbbdda sabd ashdb ashdb asdb</p></a>
                    <button>Download</button>
                </li>

                <li className = {styles.listItem}>
                    <h4>Author's name</h4>
                    <a href = "#"><p>Title: sbbdda sabd ashdb ashdb asdb</p></a>
                    <button>Download</button>
                </li>
            </ul>
        </div>
    )
    ;
};

export default SubmissionFiles;