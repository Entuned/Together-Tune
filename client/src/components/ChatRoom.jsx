import React from 'react';
import SingleChat from './SingleChat.jsx';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axios from 'axios';
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friendText: '',
      messages: [],
      displayName: '',
      profile: '',
      friend: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
    this.waitForToken = this.waitForToken.bind(this);
    this.userProfile = this.userProfile.bind(this);
    this.handleClickFriend = this.handleClickFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  
  
  userProfile() {
    axios({
      method: 'GET',
      url: '/me',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      // console.log('userProfile', data);
      this.setState({
        profile: data
      });
    }).catch((err) => console.error('err'));
  }
  
  
  
  waitForToken() {
    // console.log(this.props);
    if (!this.props.token) {
      setTimeout(() => {
        this.waitForToken();
      }, 1000);
    } else {
      // console.log('im ready', this.props.token);
      this.userProfile(this.props.token);
    }
  }
  
  handleClickFriend(e) {
    e.preventDefault();
    const {friendText} = this.state;
    // console.log(friendText);
    if (!friendText) { return; }
    // console.log(friendText);
    this.addFriend(this.state.friendText);
    this.setState({
      friendText: '',
    });

    axios({
      method: 'GET',
      url: '/getFriendsPlaylist',
      headers: {
        'accessToken': this.props.token,
        user: 'issayastewo'
      },
    })
      .then(({data}) => {
        console.log(data);
      });
  }

  addFriend(newFriend) {
    // console.log(newFriend);
    this.setState({
      friend: newFriend
    });
  }
  
  handleClick(e) {
    e.preventDefault();
    const {text} = this.state;
    if (!text) { return; }
    this.postMessages(this.state);
    this.setState({
      text: '',
    });
  }
  
  getMessages() {
    axios.get('http://http://ec2-13-58-37-205.us-east-2.compute.amazonaws.com:3000/messages')
      .then((data) => {
        this.setState({
          messages: data.data
        });
      });
  }
  
  postMessages(message) {
    // console.log('mess', message);
    // console.log('friend', this.state.friend);
    const newMessage = {
      userName: this.state.profile.display_name,
      message: message.text,
      accessTokenKey: '',
      sentTo: !!this.state.friend ? this.state.friend : 'anon'
    };
    // console.log('nes message', newMessage);
    // console.log(newMessage);
    axios.post('http://http://ec2-13-58-37-205.us-east-2.compute.amazonaws.com:3000/messages', newMessage)
      .then(() => this.getMessages())
      .catch(err => console.log(err));
  }
  
  userProfile() {
    // console.log(this.props);
    axios({
      method: 'GET',
      url: '/me',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      // console.log('chatroom', data);
      this.setState({
        profile: data
      });
    }).catch((err) => console.error('err'));
  }
  
   
  componentDidMount() {
    this.waitForToken();
    this.getMessages();
    this.userProfile();
    setInterval(() => {
      this.getMessages();
    }, 1000);
    this.userProfile();
  }
  
  
  render() {
    return (
      <div>
        <h1>Chat Room</h1>
        <div className='addFriend'>
          <div className="formClass">
            <form onSubmit={e => e.preventDefault()}>
              <TextField variant="outlined" label="Friend" fullWidth = "fullWidth" color="success"
                value={this.state.friendText}
                onChange={(e) =>
                  this.setState({friendText: e.target.value })
                }
                style={{backgroundColor: 'white'}}
              />
              <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => this.handleClickFriend(e)}>Add Friend</Button>
            </form>
          </div>
        </div>
        
        <div className="singleChat">
          {this.state.messages.map((message) => {
            if (message.userName === '') {
              { /* console.log('invalid id'); */ }
            } else {
              return <SingleChat key={message._id} message={message.message} ID={message.userName} currentUser={this.state.profile.display_name}
                friend={this.state.friend} sentTo={message.sentTo}
              />;
            }
          })}
        </div>

        <div className='createMessage' style={{paddingTop: '10px'}}>
          <div className="formClass">
            <form onSubmit={e => e.preventDefault()}>
              <TextField variant="outlined" label="Message" fullWidth = "fullWidth" color="success"
                value={this.state.text}
                onChange={(e) =>
                  this.setState({text: e.target.value })
                }
                style={{backgroundColor: 'white'}}
              />
              <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => this.handleClick(e)}>Send Message</Button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
export default ChatRoom;