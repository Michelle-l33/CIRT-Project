import React from 'react';
import styles from '../Featured/Featured.module.css';
import { useState, useEffect } from 'react';
import PosterCard from '../../Gallery/PosterCard/PosterCard';


const Featured = () => {
    const [posters,setPosters] = useState([]);
    useEffect(()=>{
        const fetchFeatured = async()=>{
            try{
                const response = await fetch("https://cirt-project-server.vercel.app/submission/recent-submissions",{
                    method: "GET"
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch featured");
                }
                const data = await response.json();
                setPosters(data);   
            }catch (error) {
                console.error("Error fetching comments:", error);
            }
            
        };
        fetchFeatured();
    },[]);
    return (
        <div className={styles.featuredContainer}>
            <h2>Recent Posters!</h2>
      {posters.map((poster) => (
        <div key={poster._id} className={styles.posterCard}>
          <PosterCard key={poster._id} poster={poster} />
        </div>
      ))}
    </div>
    );
};
export default Featured;