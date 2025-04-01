import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import styles from './Gallery.module.css';
import ArticleViewPage from "../ArticleView/ArticleView";
import { Link } from 'react-router-dom';
//chat helped with this page

const PosterCard = ({ poster }) => {
  const canvasRef = useRef(null);

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
    <article className={styles.posterCard}>
      {/* Canvas for PDF thumbnail */}
      <canvas ref={canvasRef} className={styles.posterImage} />
      <div className={styles.posterInfo}>
        <h3>{poster.title}</h3>
        <p className={styles.author}>{poster.author}</p>
        <div className={styles.actions}>
          <Link to={`/Gallery/submission/${poster._id}`} className={styles.pdfButton}>View Study</Link>
          <button className={styles.detailsButton}>Abstract</button>
        </div>
      </div>
    </article>
  );
};

export default PosterCard;