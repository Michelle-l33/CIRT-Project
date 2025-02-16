import styles from './SubmissionRecord.module.css';

const SubmissionDiscussion = () => {

    return(
        <div className = {styles.commentContainer}>
            
            <div className = {styles.header}>
                <h3>Submission Comments</h3>

                 <div className = {styles.left}>
                    <button>Add a comment</button>
                </div>
            </div>

            <ul className = {styles.contentList}>
                <li className = {styles.listItem}>
                    <p>James Stephen "Jimmy" Donaldson[a] (born May 7, 1998), better known by his online alias MrBeast, is an American YouTuber, media personality, and businessman. He is known for his fast-paced and high-production YouTube videos, where he often hosts elaborate challenges and donates large amounts of money.</p>
                    <span>From: Mr.Beast</span>
                </li>
                <li className = {styles.listItem}>
                    <p>Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. Known for her autobiographical songwriting, artistic reinventions, and cultural impact, Swift is a leading figure in popular music and the subject of extensive media coverage, with a vast fanbase known as Swifties.</p>
                    <span>From: Taylor Swift</span>
                </li>
            </ul>
        </div>
    )
    ;
};

export default SubmissionDiscussion;