import SingleChat from './SingleChat.jsx';
import React, { useState } from 'react';

const ChatRoom = (props) => {
  const [text, setText] = useState('');
 
  const handleClick = (e) => {
    e.preventDefault();
    const {text} = this.state;
    if (!text) { return; }
    this.props.postMessages(this.state);
    this.setState({
      text: '',
    });
  };

  const componentDidMount = () => {
    setInterval(() => {
      this.props.getMessages();
    }, 1000);
  };

  return (
    <div>
      <div className='createMessage'>
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

      <div className="singleChat">
        {this.props.messages.map((message) => {
          return <SingleChat key={message._id} message={message.message}/>;
        })}
      </div>
    </div>
  );
};

export default ChatRoom;