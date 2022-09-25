import { Avatar, Button } from '@mui/material'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db, auth, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { ChatContext } from '../context/ChatContext';

const Register = () => {
  const[err,setErr]= useState(false);
  const [loaderHidden,setLoaderHiddeen] = useState(true);
  const navigate = useNavigate();
  // const { data } = useContext(ChatContext);
 
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoaderHiddeen(false);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

  //  await createUserWithEmailAndPassword(auth,email,password)
  //   .then((userCredential)=>{
  //     const user = userCredential.user;
  //     console.log(user)
  //   })

try{
  const res = await createUserWithEmailAndPassword(auth, email, password);
 
const storageRef = ref(storage, displayName);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
 
  (error) => {
    console.log(error)
    setErr(true)
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
       await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
       })
       await setDoc(doc(db,"users",res.user.uid),{
        uid: res.user.uid,
         displayName,
         email,
         photoURL: downloadURL
       })

       await setDoc(doc(db,"userChats",res.user.uid),{});
       navigate("/")
       setLoaderHiddeen(true);
    });
  }
);


}catch(err){
  setLoaderHiddeen(true);
  setErr(true)
  console.log(err)
};

}
  return (
    <div className="formContainer">
        <div className='formWrapper'>
         <span className='logo'><h1>Chat App</h1></span>
         <span className='Rtitle'><h3>Register</h3></span>
        <form onSubmit={handleSubmit} > 
   <div className='lds-ellipsis' style={{display:loaderHidden ? "none" : 'inline-block'}}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>  
            <input type="text" placeholder='Username'/>
            <input type="email" placeholder='Email Address'/>
            <input type="password" placeholder='Password'/>
            <input style={{display:"none"}} type="file" id='file'/>
           <label htmlFor='file' >
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-ZJ7SfTa5JtxppdgCDEhXIKRI96tqNeP1Q&usqp=CAU" alt='img' > </Avatar>
              <span >Add Image</span>
            </label> 
            <Button type='submit' onClick={()=>(<p style={{color:"green"}}>Successfully Registered</p>)}>Signup</Button>
            
            {err && <span style={{color:"red",fontSize:"15px", textAlign:"center"}}>Something went wrong! Try again</span>}
        </form>
        <p>You do not have any account ? <Link to="/login">Login</Link></p>
        </div>
        </div>
  )
}

export default Register