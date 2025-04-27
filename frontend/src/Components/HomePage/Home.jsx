import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavBar from '../NavBar/NavBar';
import DropDownBar from '../DropDownBar/DropDownBar';
import SearchBar from './SearchBar/SearchBar';
import FAQ from './FAQ/FAQ';
import Footer from './Footer/Footer';
import Featured from './Featured/Featured';

import poster1 from '../../Asset/poster1.jpg'
import poster2 from '../../Asset/poster2.jpg'
import poster3 from '../../Asset/poster3.jpg'

import Gallery from './Gallery/Gallery';

const listOfPictureInfos = [
  {
    title: "Sexual Assault Awareness Month",
    author: "CIRT",
    description: "April is Sexual Assault Awareness Month a time to honor survivors, raise awareness, and stand together in support of a safer, more respectful community. The CRM department, we’re committed to fostering conversations that promote consent, respect, and support for all. #nomeansno",
    url: poster1
  },
  {
    title: "National Criminal Justice Month",
    author: "CIRT",
    description: "March is National Criminal Justice Month, a time to reflect on the progress we’ve made and the work still ahead in building a fair and equitable system for all. Let’s honor the advocates, reformers, and community members pushing for positive change, while continuing to raise awareness about the importance of justice, equality, and accountability for every individual. #nationalcriminaljusticemonth",
    url: poster2
  },
  {
    title: "Arabella Mansfield",
    author: "CIRT",
    description: "Breaking barriers and making history! Arabella Mansfield was the first woman admitted to the bar in the U.S., paving the way for women in law and criminal justice. Her legacy continues to inspire trailblazers today. #WomenInLaw #CriminalJustice #ArabellaMansfield #Trailblazer",
    url: poster3
  },
  // {
  //   title: "Ningguang",
  //   author: "It's me, Ningguang!",
  //   description: "Ningguang: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  //   url: ningguang
  // }
];

const dropDownList = [
  {
    label: "Overall",
    listOfDropDown: [
      { label: "Option 1", url: "/option1" },
      { label: "Option 2", url: "/option2" }
    ]
  },
  {
    label: "Gallery",
    listOfDropDown: [
      { label: "View Gallery", url: "/Gallery" } // Corrected URL
    ]
  },
  {
    label: "Document",
    listOfDropDown: [
      { label: "View Papers", url: "/Papers" },
    ]
  }
];

const homePage = () => {
  return (
    <div>
      <header>
        <NavBar />
        
      </header>

      <main>
        <SearchBar /> 
        <Featured />
        {/* <FAQ /> */}
        <Gallery listOfPictureInfos ={listOfPictureInfos}/>
        <Footer />
      </main>
    </div>
  );
};

export default homePage;