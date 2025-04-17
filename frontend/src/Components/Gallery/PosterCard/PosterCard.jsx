import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import styles from './PosterCard.module.css';
import ArticleViewPage from '../../ArticleView/ArticleView';
import { Link } from 'react-router-dom';

const PosterCard = ({ poster }) => {
  const canvasRef = useRef(null);
  const displayTags = poster.tags?.length
    ? poster.tags
    : ["Policing", "Mental Health"]; // fallback while backend is unfinished
  console.log("Rendering tags for:", poster.title, poster.tags);
  // Render PDF thumbnail on canvas
  useEffect(() => {
    const renderThumbnail = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(poster.document);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Render first page
        const viewport = page.getViewport({ scale: 0.2 });

        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        canvasRef.current.width = viewport.width;
        canvasRef.current.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
      } catch (error) {
        console.error("Error rendering PDF thumbnail:", error);
      }
    };

    if (canvasRef.current) {
      renderThumbnail();
    }

    return () => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, [poster.document]);

  return (
    <Link to={`/Gallery/submission/${poster._id}`} className={styles.cardLink}>
      <article className={styles.posterCard}>
        <canvas ref={canvasRef} className={styles.posterImage} />
        <div className={styles.posterInfo}>
          <h3>{poster.title}</h3>
          <p className={styles.author}>{poster.author}</p>
          <div className={styles.tags}>
            {displayTags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PosterCard;