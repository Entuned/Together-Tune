
import React from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom.jsx';
import {Grid} from '@material-ui/core';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      accessTokenKey: '',
      ID: this.generateUserID()
    };
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
    this.generateUserID = this.generateUserID.bind(this);
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

  generateUserID() {
    return Math.random().toString(36).substr(2, 10);
  }

  componentDidMount() {
    this.getMessages();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    this.setState({
      accessTokenKey: accessToken
    });
    console.log(accessToken);
  }
  render() {
    return (
      <div>
        <Login />
        <h1>Music-Player-Component</h1>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '200vh', backgroundColor: 'lightgrey' }}>
          <ChatRoom messages={this.state.messages} getMessages={this.getMessages} postMessages={this.postMessages} ID={this.state.ID}/>
        </Grid>
      </div>
    );
  }
}


export default App;