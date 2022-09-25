import { signOut } from 'firebase/auth'
import { Avatar } from '@mui/material'
import React from 'react'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>
        Chat App
      </span>
      <div className="user">
        <Avatar  src={currentUser.photoURL} alt='logo' > </Avatar>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar