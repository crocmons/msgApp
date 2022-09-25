import React from 'react'
import { Avatar } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats,setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  
  useEffect(()=>{
    const getChats =()=>{
      const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
        console.log(doc.data())
        setChats(doc.data());
      });
      return ()=>{
        unsub();
      };
    };
    currentUser.uid && getChats();
  },[currentUser.uid]);
  // console.log(chats)
  const handleSelect =(u)=>{
    dispatch({type:"CHANGE_USER", payload:u});
  }
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(

        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <Avatar src={chat[1].userInfo.photoURL} alt='chatuser'> </Avatar>
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName} </span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
        ))}
      
      </div>
  )
}

export default Chats