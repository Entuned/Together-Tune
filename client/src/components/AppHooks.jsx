import axios from 'axios';
import ChatRoom from './ChatRoom.jsx';
import React, { useState } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    axios.get('http://localhost:3000/messages')
      .then((data) => {
        setMessages(
          data.data
        );
      });
  };

  const postMessages = (message) => {
    console.log(message);
    const newMessage = {
      userName: 'testUser',
      message: message.text
    };
    console.log(newMessage);
    axios.post('http://localhost:3000/messages', newMessage)
      .then(() => getMessages())
      .catch(err => console.log(err));
  };


  return (
    <div>
      <h1>Entuned-test-webpack</h1>
      <ChatRoom messages={setMessages(messages)} getMessages={getMessages} postMessages={postMessages}/>
    </div>
  );
};


export default App;