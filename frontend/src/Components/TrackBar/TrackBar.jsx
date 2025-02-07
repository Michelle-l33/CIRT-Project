// import React from "react";
// import "./TrackBar.css";

// const statuses = ["Submitted", "Under Review", "Reviewed", "Accepted"];
// const TrackBar = ({currentStatus}) => {
//     const currentIndex = statuses.indexOf(currentStatus);

//     return (
//         <div className="tracking-container">
//           {statuses.map((status, index) => (
//             <div key={status} className="tracking-step">
//               {index !== 0 && <div className={`line ${index <= currentIndex ? "line-active" : ""}`}></div>}
//               <div className={'circle${index <= currentIndex ? "completed" : ""}'}></div>
//               <p className={index <= currentIndex ? "text-active" : ""}>{status}</p>
//             </div>
//           ))}
//         </div>
//       );
//     };
    
//     export default TrackBar;