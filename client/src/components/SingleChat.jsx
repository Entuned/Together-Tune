import React from 'react';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    return (
      <div className='soloMessageClass'>
        <div className='hidden'>
          <div style={{ fontWeight: 'bold'}}>{this.props.ID} ~ </div>
          <font style={{ color: '#0000ff'}}> | {this.props.message}</font>
        </div>
      </div>
    );
  }
}
export default SingleChat;