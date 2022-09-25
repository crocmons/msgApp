import React, { useContext } from 'react'
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import { Avatar } from '@mui/material';
const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data)
  return (
    <div className='chat'>
      <div className="chatInfo">
     {data.user?.photoURL && <Avatar  src={data.user?.photoURL} alt='logo' > </Avatar> }
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
       {/* <AddAPhotoIcon />
       <PersonAddAltIcon />
       <MoreHorizIcon /> */}
        </div>
      </div>
        <Messages />
        <Input />
    </div>
  )
}

export default Chat