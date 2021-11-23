import React from 'react';
import SingleChat from './SingleChat.jsx';
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };


    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    e.preventDefault();
    const {text} = this.state;
    if (!text) { return; }
    this.props.postMessages(this.state);
    this.setState({
      text: '',
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.props.getMessages();
    }, 1000);
  }


  render() {
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
  }
}
export default ChatRoom;