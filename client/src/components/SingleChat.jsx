import React from 'react';

class SingleChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // console.log(this.props);
    const currentUserBool = this.props.ID === this.props.currentUser;
    const friendUserBool = this.props.ID === this.props.friend;
    const currentUserMessages = () => {
      if (currentUserBool) {
        return <div className='soloMessageClass' className="currentUserMessages">
          <div className='hidden'>
            <div style={{ color: 'navy', fontWeight: 'bold', fontFamily: 'Avenir Next', fontSize: '16px', paddingLeft: '350px'}}>{this.props.ID} </div>
            <font style={{ color: 'blue', fontSize: '24px', fontFamily: 'Lucida Console', paddingLeft: '350px'}}> | {this.props.message}</font>
          </div>
        </div>;
      } else if (friendUserBool) {
        return <div className='soloMessageClass' className="friendMessages">
          <div className='hidden'>
            <div style={{ color: '#006400', fontWeight: 'bold', fontFamily: 'Avenir Next', fontSize: '16px' }}>{this.props.ID} </div>
            <font style={{ color: '#32CD32', fontSize: '24px', fontFamily: 'Lucida Console' }}> | {this.props.message}</font>
          </div>
        </div>;
      } else {
        return '';
      }
    };
    return (
      <div>
        {currentUserMessages()}
      </div>
    );
  }
}
export default SingleChat;