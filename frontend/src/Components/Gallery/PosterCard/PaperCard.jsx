// PaperCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PaperCard.module.css';

const PaperCard = ({ paper }) => {
  return (
    <article className={styles.paperItem}>
      <div className={styles.paperLeft}>
        {/* <input type="checkbox" className={styles.paperCheckbox} /> */}
        <div className={styles.paperMeta}>
          <span className={styles.paperLabel}>JOURNAL ARTICLE</span>
          <h3 className={styles.paperTitle}>{paper.title}</h3>
          <p className={styles.paperAuthor}>
            {paper.firstName} {paper.lastName}
          </p>
          <div className={styles.tags}>
            {paper.tags && paper.tags.length > 0 && paper.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <p className={styles.paperAbstract}>
            {paper.abstract ? `${paper.abstract.substring(0, 200)}...` : "No preview available."}
          </p>
        </div>
      </div>
      <div className={styles.paperActions}>
        <Link to={`/Gallery/submission/${paper._id}`} className={styles.downloadBtn}>View Article</Link>
      </div>
    </article>
  );
};

export default PaperCard;
