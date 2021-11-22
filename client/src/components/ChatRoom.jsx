import React from 'react';
import SingleChat from './SingleChat.jsx';
// import axios from 'axios';


class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //state properties here
      text: '',
    };
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.messages = this.props.messages;
  }
 

  handleClick(e) {
    e.preventDefault();

    const {text} = this.state;
    if (!text) { return; }
    this.props.postMessages(this.state);
  }

  render() {
    return (
      <div>
        <div>{!!this.props.messages.length ? this.props.messages[this.props.messages.length - 1].userName : ''}: {!!this.props.messages.length ? this.props.messages[this.props.messages.length - 1].message : ''}</div>
        <div className="singleChat">
          {/* {messages.map((mesage) =>
            <SingleChat key={number.toString()}
              value={number} />
          )} */}
        </div>
        <div className="formClass">New Message</div>
        <form onSubmit={e => e.preventDefault()}>
          <input
            value={this.state.text}
            onChange={(e) =>
              this.setState({text: e.target.value })
            }
          />
          <button onClick={(e) => this.handleClick(e)}>Submit Message</button>
        </form>
      </div>
    );
  }
}
export default ChatRoom;