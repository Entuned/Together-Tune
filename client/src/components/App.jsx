
import React from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
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
      message: message.text
    };
    console.log(newMessage);
    axios.post('http://localhost:3000/messages', newMessage)
      .then(() => this.getMessages())
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getMessages();
  }

  render() {
    return (
      <div>
        <h1>Entuned-test-webpack</h1>
        <ChatRoom messages={this.state.messages} getMessages={this.getMessages} postMessages={this.postMessages}/>
      </div>
    );
  }
}

export default App;