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
    };
    this.handleClick = this.handleClick.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
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
    console.log(message);
    const newMessage = {
      userName: 'testUser',
      message: message.text,
      accessTokenKey: ''
    };
    console.log(newMessage);
    axios.post('http://localhost:3000/messages', newMessage)
      .then(() => this.getMessages())
      .catch(err => console.log(err));
  }


  componentDidMount() {
    this.getMessages();
    setInterval(() => {
      this.getMessages();
    }, 1000);
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
            return <SingleChat key={message._id} message={message.message} ID={this.props.ID}/>;
          })}
        </div>
      </div>
    );
  }
}
export default ChatRoom;