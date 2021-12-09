import React, { useEffect, useState } from 'react';
import SingleChat from './SingleChat.jsx';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axios from 'axios';
import { render } from 'react-dom';

const ChatRoomHooks = (props) => {
  // state variables
  const [text, setText] = useState('');
  const [friendText, setFriendText] = useState('');
  const [messages, setMessages] = useState([]);
  const [diplayName, setDisplayName] = useState('');
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

  const waitForToken = () => {
    // console.log(this.props);
    if (!props.token) {
      setTimeout(() => {
        waitForToken();
      }, 1000);
    } else {
      userProfile(props.token);
    }
  };

  const handleClickFriend = (e) => {
    e.preventDefault();
    const friendTextCheck = friendText;
    if (!friendTextCheck) { return; }
    addFriend(friendText);
    setFriendText('');
  };
  
  const addFriend = (newFriend) => {
    setFriend(newFriend);
  };


  const handleClick = (e) => {
    e.preventDefault();
    console.log(text);
    if (!text) { return; }
    console.log('eeeee', text);
    postMessages();
    setText('');
  };

  const getMessages = () => {
    axios.get('/messages')
      .then((data) => {
        setMessages(data.data);
      });
  };

  const postMessages = () => {
    const newMessage = {
      userName: profile.display_name,
      message: text,
      sentTo: !!friend ? friend : 'anon'
    };
    axios.post('/messages', newMessage)
      .then(() => getMessages())
      .catch(err => console.log(err));
  };


  // on load functions
  // useEffect(() => {    
  //   waitForToken();
  // }, []);
  // useEffect(() => {    
  //   getMessages();
  // }, []);
  // useEffect(() => {    
  //   userProfile();
  // }, []);
  // useEffect(() => {    
  //   setInterval(() => {
  //     getMessages();
  //   }, 1000);
  // }, []);
  // useEffect(() => {    
  //   userProfile();
  // }, []);

  useEffect(() => {    
    waitForToken();
    getMessages();
    userProfile();
    setInterval(() => {
      getMessages();
    }, 1000);
    userProfile();
  }, []);


  return (
    <div>
      <h1>Chat Room</h1>
      <div className='addFriend'>
        <div className="formClass">
          <form onSubmit={e => e.preventDefault()}>
            <TextField variant="outlined" label="Friend" fullWidth = "fullWidth" color="success"
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
            <TextField variant="outlined" label="Message" fullWidth = "fullWidth" color="success"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              style={{backgroundColor: 'white'}}
            />
            <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => handleClick(e)}>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
    
};

export default ChatRoomHooks;