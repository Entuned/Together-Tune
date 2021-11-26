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
      messages: [],
      displayName: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
    this.waitForToken = this.waitForToken.bind(this);
    this.userProfile = this.userProfile.bind(this);
  }


  userProfile() {
    axios({
      method: 'GET',
      url: '/me',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      console.log('userProfile', data);
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
    axios.get('http://localhost:3000/messages')
      .then((data) => {
        this.setState({
          messages: data.data
        });
      });
  }

  postMessages(message) {
    // console.log('mess', message);
    const newMessage = {
      userName: this.state.displayName,
      message: message.text,
      accessTokenKey: ''
    };
    // console.log('nes message', newMessage);
    // console.log(newMessage);
    axios.post('http://localhost:3000/messages', newMessage)
      .then(() => this.getMessages())
      .catch(err => console.log(err));
  }

  userProfile() {
    console.log(this.props);
    axios({
      method: 'GET',
      url: '/me',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      console.log('chatroom', data);
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
        <div className='createMessage'>
          <div className="formClass">
            <form onSubmit={e => e.preventDefault()}>
              <TextField variant="outlined" label="Message"
                value={this.state.text}
                onChange={(e) =>
                  this.setState({text: e.target.value })
                }
              />
              <Button startIcon={<ArrowUpwardIcon/>} variant="contained" color="secondary" onClick={(e) => this.handleClick(e)}>Send Message</Button>
            </form>
          </div>
        </div>

        <div className="singleChat">
          {this.state.messages.map((message) => {
            if (message.userName === '') {
              { /* console.log('invalid id'); */ }
            } else {
              return <SingleChat key={message._id} message={message.message} ID={message.userName}/>;
            }
          })}
        </div>
      </div>
    );
  }
}
export default ChatRoom;