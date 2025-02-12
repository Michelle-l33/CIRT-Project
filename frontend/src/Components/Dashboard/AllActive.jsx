import styles from './MainContentEditor.module.css';

import { BsSearchHeart } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";

import Submission from "./Submission";
const listOfSubmissions = [
  {
    author: "Ben",
    title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
    currentStep: 4,
  },
  {
    author: "Bob",
    title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
    currentStep: 3,
  },
  {
    author: "Ban",
    title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
    currentStep: 2,
  },
  {
    author: "Bibi",
    title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
    currentStep: 1,
  }
]

const AllActive = () => {

    return (
         <div className = {styles.tab}>
                  <div className = {styles.tabHeader}>
                      <h3>All Active</h3>
        
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

                  <ul className = {styles.submissionList}>
             
                      {listOfSubmissions.map((submission, idx  )=>
                        <li key = {idx}>
                            <Submission submission = {submission}/>
                        </li>
                      )}
                      
                  </ul>
                      
        </div>
    );
};

export default AllActive;