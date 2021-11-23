import React from 'react';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className='soloMessageClass'>
        <div className='soloMessage'>{this.props.message}</div>
      </div>
    );
  }
}
export default SingleChat;