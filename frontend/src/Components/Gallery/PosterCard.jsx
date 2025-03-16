import React, { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import styles from './Gallery.module.css';

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

        // Clear the canvas before rendering
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Set canvas dimensions
        canvasRef.current.width = viewport.width;
        canvasRef.current.height = viewport.height;

        // Render the PDF page
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

    // Cleanup function to cancel any ongoing rendering
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
          <button className={styles.pdfButton}>View Study</button>
          <button className={styles.detailsButton}>Abstract</button>
        </div>
      </div>
    </article>
  );
};

export default PosterCard;