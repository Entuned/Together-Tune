import React, { useEffect, useState } from 'react';
import SingleChat from './SingleChat.jsx';
import { Button, TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axios from 'axios';

const ChatRoom = () => {
  // state variables
  const [textField, setTextField] = useState('');
  const [friendText, setFriendText] = useState('');
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState('');
  const [friend, setFriend] = useState('');

  // functions
  const userProfile = () => {
    axios({
      method: 'GET',
      url: '/me',
    }).then(({data}) => {
      setProfile(data);
    }).catch((err) => console.error('err'));
  };

  const handleClickFriend = (e) => {
    e.preventDefault();
    if (!friendText) { return; }
    setFriend(friendText);
    setFriendText('');
  };

  const handleClickMessage = (e) => {
    e.preventDefault();
    if (!textField) { return; }
    postMessages();
    setTextField('');
  };

  const getMessages = () => {
    axios.get('/messages')
      .then(({data}) => {
        setMessages(data);
      });
  };

  const postMessages = () => {
    const newMessage = {
      userName: profile.display_name,
      message: textField,
      sentTo: !!friend ? friend : 'anon'
    };
    axios.post('/messages', newMessage)
      .then(() => getMessages())
      .catch(err => console.log(err));
  };


  // on load functions
  useEffect(() => {    
    userProfile();
    getMessages();
    setInterval(() => {
      getMessages();
    }, 1000);
  }, []);


  return (
    <div>
      <h1>Chat Room</h1>
      <div className='addFriend'>
        <div className="formClass">
          <form onSubmit={e => e.preventDefault()}>
            <TextField fullWidth variant="outlined" label="Friend"
              value={friendText}
              onChange={(e) =>
                setFriendText(e.target.value)
              }
              style={{backgroundColor: 'white'}}
            />
            <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => handleClickFriend(e)}>Add Friend</Button>
          </form>
        </div>
      </div>
              
      <div className="singleChat">
        {messages.map((message) => {
          if (message.userName === '') {
          } else {
            return <SingleChat key={message._id} message={message.message} ID={message.userName} currentUser={profile.display_name}
              friend={friend} sentTo={message.sentTo}
            />;
          }
        })}
      </div>
      
      <div className='createMessage' style={{paddingTop: '10px'}}>
        <div className="formClass">
          <form onSubmit={e => e.preventDefault()}>
            <TextField fullWidth variant="outlined" label="Message" 
              value={textField}
              onChange={(e) =>
                setTextField(e.target.value)
              }
              style={{backgroundColor: 'white'}}
            />
            <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => handleClickMessage(e)}>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
    
};

export default ChatRoom;