import {Button, TextField} from '@mui/material'
import {Send, MergeType} from '@mui/icons-material'
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")
const App = () => {
  const [message, setMessage] = useState("")
  const [RID, setRID] = useState("")
  const [messageRecieved, setMessageRecieved] = useState("")
  const sendMessage = () => {
    socket.emit("send_message", {message, RID})
  }

  const joinRoom = () => {
    if(RID !== ""){
      socket.emit("join_room", RID)
    }
  }

  useEffect(()=>{
    socket.on("recieve_message", (data)=>{
      setMessageRecieved(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <TextField value={RID} id="outlined-basic" label="Room ID" variant="outlined" onChange={(event)=>{setRID(event.target.value)}}/>
      <Button onClick={()=>{joinRoom()}} variant="contained" endIcon={<MergeType />}>Join</Button>
      <TextField value={message} id="outlined-basic" label="Message" variant="outlined" onChange={(event)=>{setMessage(event.target.value)}}/>
      <Button onClick={()=>{sendMessage()}} variant="contained" endIcon={<Send />}>Send</Button>
      <h1>Message : {messageRecieved}</h1>
    </div>
  );
}

export default App;
