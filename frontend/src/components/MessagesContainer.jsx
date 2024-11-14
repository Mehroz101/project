
import React, { useEffect } from 'react';
import "../parkingOwner/styles/RecentActivities.css";
import { useParkingOwner } from '../context/ReservationContext';
import { reviewDateCalculator } from '../parkingOwner/components/Functions';

const MessagesContainer = () => {
  
    const { notifications } = useParkingOwner(); // Get notifications from context

    return (
        <div className="recent_activities" style={{width:"100%"}}>
        <h3>Recent Activities</h3>
        {notifications.length === 0 ? (
            <p>No recent activities.</p>
        ) : (
            <ul className="activities_list">
                {notifications.map((notification, index) => (
                    <li key={index} className={`activity_item`}>
                        <div className="activity_type">Notification</div>
                        <div className="activity_description">{notification.message}</div>
                        <div className="activity_time">
                            {reviewDateCalculator(notification.timestamp)}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default MessagesContainer;


// import React, { useState } from "react";
// import "../styles/MessagesContainer.css";

// const MessagesContainer = () => {
//   const [openChat, setOpenChat] = useState(false);

//   return (
//     <div className="messages_container">
//       <h2>Notification</h2>
//       <div className="messages_box">
//         <div className={`message_box_left ${openChat ? "hide_left" : ""}`}>
//           <div className="user_chat" onClick={() => setOpenChat(true)}>
//             <div className="username">
//               <span>Mall of Multan</span>
//             </div>
//             <div className="user_lastmessage">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
//               quod.
//             </div>
//           </div>
//           <div className="user_chat">
//             <div className="username">
//               <span>Mehroz</span>
//             </div>
//             <div className="user_lastmessage">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
//               quod.
//             </div>
//           </div>
//           {/* Add more chats as needed */}
//         </div>
//         <div className={`message_box_right ${openChat ? "" : "hide_right"}`}>
//           <span className="back_btn" onClick={() => setOpenChat(false)}>
//             <i className="fa-solid fa-arrow-left"></i>
//           </span>
//           <div className="message">
//             <span>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
//               necessitatibus incidunt recusandae eum itaque provident ea
//               voluptate iusto sint vitae?
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagesContainer;
