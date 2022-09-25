import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const[err,setErr]= useState(false);
  const navigate = useNavigate();
  
   const handleSubmit= async (e)=>{
     e.preventDefault();
 
     const email = e.target[0].value;
     const password = e.target[1].value;
 
   //  await createUserWithEmailAndPassword(auth,email,password)
   //   .then((userCredential)=>{
   //     const user = userCredential.user;
   //     console.log(user)
   //   })
 
 try{
  await signInWithEmailAndPassword(auth, email, password)
 navigate("/")
 }catch(err){
   setErr(true)
 }
   
 
 }

  return (
    <div className="formContainer">
        <div className='formWrapper'>
         <span className='logo'><h1>Chat App</h1></span>
         <span className='Rtitle'><h3>Login</h3></span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email Address'/>
            <input type="password" placeholder='Password'/>
            <Button type="submit">Login</Button>
            {err && <span>Something went wrong!</span>}
        </form>
        <p>You do not have any account ? <Link to="/register">Register</Link></p>
        </div>
        </div>
  )
}

export default Login