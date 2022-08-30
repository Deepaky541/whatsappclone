import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchIcon from "@mui/icons-material/Search";
import { Chats } from './Chats';
import "./chatbox.css"
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { Link } from 'react-router-dom';

export const ChatBox = () => {
  var obj=JSON.parse( localStorage.getItem("user"));
 
   const [allUsers, setAllUsers] = useState([]);
     const [searchInput, setSearchInput] = useState("");
   
   const get1 = collection(db, "user");


  useEffect(() => {

    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "user"));

      querySnapshot.forEach((docc) => {
       const get = doc(db, `user/${docc.id}`);
        const data = onSnapshot(get, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            if(docData.email!==obj.email)
            {
              setAllUsers([...allUsers,docData]);
            }
          }
        });
      });    
    };

    getAllUsers();

  },[]);


  return (
    <div className="chat-box">
      <div className="head">
        <img src={obj.photoURL} alt="" />
        <div className="head-icons">
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>

      <div className="search-bar">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input placeholder="Search or start new chat" type="text" />
      </div>

      <div className="mul-chats">
        {allUsers.map((el)=>{
           return (
             <Link
               to={`/home/${el.email}`}
               key={el.email}
               style={{ textDecoration: "none" }}
             >
               <Chats name={el.fullname} photoURL={el.photoURL} />
             </Link>
           );
        })
      }
       

      </div>
    </div>
  );
}
