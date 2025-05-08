import styles from "./Archive.module.css";
import { useUser } from "../../../Login/UserContext";
import React, { useState, useEffect } from "react";

const Archive = () => {
    const [published, setPublished] = useState([]);
    const [denied, setDenied] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useUser();

    useEffect(()=>{
        const fetchPublished = async()=> {
            try{
                setLoading(true);
                const response = await fetch(`https://cirt-project-server.vercel.app/submission/published/${user._id}`,{
                    method: "GET",
                })
                if(!response.ok){
                    throw new Error ("Failed to fetch published");
                }
                const data = await response.json();
                setPublished(data);
                console.log(data);
            } catch (error){
                console.error("Error fetching published:", error);
            } finally {
                setLoading(false);
            }
        }
        const fetchDenied = async()=> {
            try{
                setLoading(true);
                const response = await fetch(`https://cirt-project-server.vercel.app/submission/declined/${user._id}`,{
                    method: "GET",
                })
                if(!response.ok){
                    throw new Error ("Failed to fetch declined");
                }
                const data = await response.json();
                setDenied(data);
                console.log(data);
            } catch (error){
                console.error("Error fetching declined:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchPublished();
        fetchDenied(); 
    },[])

    return (
        <div className={styles.authorArchiveContainer}>
            {loading ? (
                <p className={styles.loadingMessage}>Loading archive...</p> // Add this class in CSS
            ) : (
                <>
                    <section className={styles.publishedContainer}>
                        <div className={styles.header}>
                            <h3>Published</h3>
                        </div>
                        {published.length === 0 ? (
                            <p className={styles.emptyMessage}>No published articles.</p>
                        ) : (
                            <ul className={styles.subList}>
                                {published.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        <h4>{item.title}</h4>
                                        <p>{item.firstName} {item.lastName}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section className={styles.deniedContainer}>
                        <div className={styles.header}>
                            <h3>Denied</h3>
                        </div>
                        {denied.length === 0 ? (
                            <p className={styles.emptyMessage}>No denied articles.</p>
                        ) : (
                            <ul className={styles.subList}>
                                {denied.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        <h4>{item.title}</h4>
                                        <p>{item.firstName} {item.lastName}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}
        </div>
    )
}

export default Archive