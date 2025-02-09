import styles from './Gallery.module.css';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Gallery = ( {listOfPictureInfos} ) => { 

    //this is for controlling the button to pick the index for the pictures
    //copy and modify code from https://react.dev/learn/state-a-components-memory
    const [currIndex, setIndex] = useState(0);
    function handleNextClick() {
        setIndex((prev_i) => (prev_i + 1) % listOfPictureInfos.length);

        if (visibleIndex != null) {
            handleMouseClick(nextIndex)
        }
    }
    function handlePrevClick() {
        setIndex((prev_i) => prev_i === 0 ? listOfPictureInfos.length - 1 : prev_i - 1);

        if (visibleIndex != null) {
            handleMouseClick(prevIndex)
        }
    }
    const currPic = listOfPictureInfos[currIndex];

    let prevIndex = currIndex === 0 ? listOfPictureInfos.length - 1 : currIndex - 1
    const prevPic = listOfPictureInfos[prevIndex];
    let nextIndex = (currIndex + 1) % listOfPictureInfos.length;
    const nextPic = listOfPictureInfos[nextIndex];

    //this is for handling the visibility of the description
    const [visibleIndex, setVisibleIndex] = useState(null);
    const handleMouseClick = (currIndex) => {
        setVisibleIndex((prev) => (prev === currIndex ? null : currIndex));
        };
    const handleMouseClose = () => {
        setVisibleIndex(null);
    };

    return( // html goes in the return()

        <div className = {styles.bigPictureContainer}>
            <button onClick={handlePrevClick} className = {styles.button}>
                Prev
            </button>
            
            {/* <span>  
                ({index + 1} of {listOfPictureInfos.length})
            </span> */}

            <div className = {styles.imgContainer}>
                
                <img 
                    src = {prevPic.url} 
                    alt = {prevPic.title}
                    onClick = {() => {handlePrevClick(); handleMouseClick(prevIndex);}}
                    />
                <img
                    src = {currPic.url} 
                    alt = {currPic.title}
                    onClick = {() => handleMouseClick(currIndex)}
                    className = {visibleIndex === currIndex ? styles.currImgWithDes : ''}
                    />
                <img 
                    src = {nextPic.url} 
                    alt = {nextPic.title}
                    onClick = {() => {handleNextClick(); handleMouseClick(nextIndex);}}
                    />
                    
            </div>


            <div className={`${styles.description} ${visibleIndex === currIndex ? styles.show : ''}`}>

                <button className = {styles.closeButton} onClick = {handleMouseClose}>X</button>
        
                <h2> Title: {currPic.title} </h2>

                <h3> Author: {currPic.author}</h3>

                <p>
                    {currPic.description}
                </p>
                
            </div>

            <button onClick={handleNextClick} className = {styles.button}>
                Next
            </button>

            
        </div>
    
    );    

};

Gallery.propTypes = {
    listOfPictureInfos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            author: PropTypes.string,
            description: PropTypes.string,
            url: PropTypes.string
        })
    )
};


export default Gallery; //make sure to export the function