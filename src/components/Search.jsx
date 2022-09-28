import React from 'react'
import { Avatar } from '@mui/material'
import { collection, query, where, getDocs, setDoc, updateDoc,doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Search = () => {
  const [userName,setUserName] = useState("");
  const [realUser, setRealUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async ()=>{
     const usersRef = collection(db,"users");
     const q = query(usersRef,where("displayName", "==", userName));
     try{

       const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setRealUser(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
     }catch(err){
      setErr(true)
      setErr(false)
     }
    }
    const handleKey = (e)=>{
      e.code === "Enter" && handleSearch()
    }

    const handleSelected = async ()=>{
      const combinedId = currentUser.uid > realUser.uid ? currentUser.uid + realUser.uid : realUser.uid + currentUser.uid;
     
     try{

       const res = await getDoc(doc(db,"chats",combinedId));
       if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]});
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:realUser.uid,
            displayName:realUser.displayName,
            photoURL:realUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
          
        });
        await updateDoc(doc(db,"userChats",realUser.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
          
        });

       }
     }catch(err){}
    setRealUser(null);
    setUserName("");
    }

  return (
    <div className='search'>
      <div className="searchform">
        <input type="text" placeholder='Find your chat' onKeyDown={handleKey} onChange={(e)=>setUserName(e.target.value)} value={userName} />
      </div>
      {err && <span>Something went wrong!</span>}
     { realUser && <div className="userChat" onClick={handleSelected}>
        <Avatar src={realUser.photoURL} alt='chatuser'> </Avatar>
        <div className="userChatInfo">
          <span>{realUser.displayName}</span>
          <p>New messge</p>
        </div>
      </div>}
      </div>
  )
}

export default Search