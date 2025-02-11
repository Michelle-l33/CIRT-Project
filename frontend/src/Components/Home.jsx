import NavBar from './NavBar/NavBar';
import DropDownBar from './DropDownBar/DropDownBar'
import Gallery from './Gallery/Gallery'
import SearchBar from './SearchBar/SearchBar'
import FAQ from './FAQ/FAQ'
import Footer from './Footer/Footer'


import beidou from '../Asset/montreal.avif';
import clorinde from '../Asset/clean.avif';
import navia from '../Asset/posters.avif';
import ningguang from '../Asset/talent.avif';

        
const listOfPictureInfos = [
    
    {
        title: "Beidou",
        author: "It's me, Beidou!",
        description: "Beidou: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url: beidou
    },

    {
        title: "Clorinde",
        author: "It's me, Clorinde!",
        description: "Clorinde: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url: clorinde
    },

    {
        title: "Navia",
        author: "It's me, Navia!",
        description: "Navia: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url: navia
    },

    {
        title: "Ningguang",
        author: "It's me, Ningguang!",
        description: "Ningguang: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url: ningguang
    }
]



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

        { label: "Option 1", url: "/option1" },
        { label: "Option 2", url: "/option2" }
        
        ]
    },

    {
        label: "Document",
        listOfDropDown: [

            { label: "Option 1", url: "/option1" },
            { label: "Option 2", url: "/option2" }
            
            ]
    }, 
]



const homePage =() => {
    //javascript funcs go here
    return( // html goes in the return()   
        <div>
            <header>
                <NavBar isLoggedIn = {false}/>
                <DropDownBar dropDownList = {dropDownList}/>
            </header>

            <main>
                <FAQ />
                <SearchBar />
                <Gallery listOfPictureInfos = {listOfPictureInfos}/> 
                <Footer />
            </main>
        </div>
        
    );
};
export default homePage; //make sure to export the constant