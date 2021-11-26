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
        <div style={{ fontWeight: 'bold'}}>{this.props.ID} ~ </div>
        <font style={{ color: '#0000ff'}}>{this.props.message}</font>
      </div>
    );
  }
}
export default SingleChat;