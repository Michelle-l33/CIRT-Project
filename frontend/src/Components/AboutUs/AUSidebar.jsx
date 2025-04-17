import React from "react";

const AUSidebar = ({onSelect}) =>{
    return(
        <div>
           <button onClick={()=>onSelect("about")}><span>About Us</span></button>
           <button onClick={()=>onSelect("associates")}><span>Research Associates</span></button>
        </div>
    )
}
export default AUSidebar;