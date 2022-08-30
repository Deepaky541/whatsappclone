import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import "./openrightside.css";
import { useParams } from 'react-router-dom';
import { addDoc, collection, collectionGroup, doc, getDoc, getDocs, onSnapshot, orderBy, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import db from '../firebase';
import { getGlobal } from '@firebase/util';
import ChatMessage from './ChatMessage';

export const OpenRightSide = () => {
  var currUser = JSON.parse(localStorage.getItem("user"));
  const {email}=useParams();
  const [user, setuser] = useState();
  const [message, setMessage] = useState("");
  var [chats, setchats] = useState([])
   const chatBox = useRef(null);

  useEffect(() => {
       const getMessages = async () => {
       const msg = await getDocs(collection(db,`${email}`));
       var arr = [];
           msg.forEach((docc) => {
             console.log(docc)
            const get = doc(db, `${email}/${docc._key.path.segments[6]}`);
            const data = onSnapshot(get, (docSnapshot) => {
              if (docSnapshot.exists()) {
                const docData = docSnapshot.data();
                console.log(docData)
                   arr.push(docData);
              }
             })
            })
           var id=setInterval(() => {
             arr.sort((a, b) => {
               return a.timestamp.seconds - b.timestamp.seconds;
             });
             console.log(arr);
             setchats(arr);
             clearInterval(id);
           }, 1000);   
       }
      getMessages();

  }, [])
  
var count=0;
  const sendMessage = () => {
    if (email) {
      let payload = {
        text: message,
        senderEmail: currUser.email,
        receiverEmail: email,
        timestamp:Timestamp.now(),
      };
      
        
      const add = collection(db, `${currUser.email}`);
      addDoc(add, payload)

       const add1 = collection(db, `${email}`);
       addDoc(add1, payload);
      chats.push(payload);
      setMessage("");
    }
  };



    const get = doc(db, `user/${email}`);
   
    useEffect(() => {
     const data = onSnapshot(get, (docSnapshot) => {
       if (docSnapshot.exists()) {
         var docData = docSnapshot?.data();
       }
       setuser(docData)
     });
    }, [])
    
  
    useEffect(() => {
      setchats(chats);
    }, [chats])


    useEffect(() => {
      chatBox.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }, [chats]);
    
        

  return (
    <div className="main">
      <div className='content'>
        <div className="right-header">
          <div className="open-right">
            <img src={user?.photoURL} alt="" />
            <p>{user?.fullname}</p>
          </div>
          <div className="open-left">
            <SearchIcon />
            <MoreVertIcon />
          </div>
        </div>
        <div className="box" ref={chatBox}>
          {chats.map((el) => (
            <ChatMessage
              key={el.timestamp}
              message={el.text}
              time={el.timestamp}
              sender={el.senderEmail}
            />
          ))}
        </div>
        <div className="open-bottom">
          <TagFacesIcon
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <AttachmentIcon />
          <input
            placeholder="  Type a message"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <SendIcon onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}
