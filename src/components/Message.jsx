import React from 'react'
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useRef } from 'react';
import { useEffect } from 'react';
const Message = ({message}) => {
  console.log(message)
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({
      behaviour:"smooth"
    });
  },[message]);
  
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`} >
        <div className="msgInfo">
       <Avatar src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=""></Avatar>
       <span>{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</span>
        </div>
        <div className="msgContent">
       {message.text && (<p>{message.text}</p> || <img src={message.img} alt="chatImg"/>) }
       
       {message.img && <img src={message.img} alt="chatImg"/>}
        </div>
        </div>
  )
}

export default Message