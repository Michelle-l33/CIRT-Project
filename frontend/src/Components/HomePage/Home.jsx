import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavBar from '../NavBar/NavBar';
import DropDownBar from '../DropDownBar/DropDownBar';
import SearchBar from './SearchBar/SearchBar';
import FAQ from './FAQ/FAQ';
import Footer from './Footer/Footer';

import beidou from '../../Asset/montreal.avif';
import clorinde from '../../Asset/clean.avif';
import navia from '../../Asset/posters.avif';
import ningguang from '../../Asset/talent.avif';

import Gallery from './Gallery/Gallery';

const listOfPictureInfos = [
  {
    title: "Beidou",
    author: "It's me, Beidou!",
    description: "Beidou: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    url: beidou
  },
  {
    title: "Clorinde",
    author: "It's me, Clorinde!",
    description: "Clorinde: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    url: clorinde
  },
  {
    title: "Navia",
    author: "It's me, Navia!",
    description: "Navia: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    url: navia
  },
  {
    title: "Ningguang",
    author: "It's me, Ningguang!",
    description: "Ningguang: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    url: ningguang
  }
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
        <NavBar isLoggedIn={false} />
        <DropDownBar dropDownList={dropDownList} />
      </header>

      <main>
        <FAQ />
        <SearchBar />
        <Gallery listOfPictureInfos ={listOfPictureInfos}/>
        <Footer />
      </main>
    </div>
  );
};

export default homePage;