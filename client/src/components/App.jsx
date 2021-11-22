// TODO
import React from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom.jsx';
// import New from './New.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
    this.getMesssages = this.getMesssages.bind(this);
    this.postMessages = this.postMessages.bind(this);
  }

  getMesssages(message) {
    axios.get('http://localhost:3000/messages')
      .then((data) => {
        this.setState({
          messages: data.data
        });
      });
  }

  postMessages(message) {
    console.log(message);
    // axios.post('http://localhost:3000/messages', message)
    //   .then(()=> this.getMesssages())
    //   .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getMesssages();
  }

  render() {
    return (
      <div>
        <h1>Entuned-test-webpack</h1>
        <ChatRoom messages={this.state.messages} getMesssages={this.getMesssages} postMessages={this.postMessages}/>
      </div>
    );
  }
}

export default App;