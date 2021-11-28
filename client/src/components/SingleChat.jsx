import React from 'react';


const SingleChat = (props) => {
  // console.log(props);
  const currentUserBool = props.ID === props.currentUser && props.sentTo === props.friend;
  const friendUserBool = props.ID === props.friend && props.sentTo === props.ID;
  // !!props ? console.log(props) : console.log('');
  const currentUserMessages = () => {
    if (currentUserBool) {
      return <div className='soloMessageClass' className="currentUserMessages">
        <div className='hidden'>
          <div style={{ color: 'navy', fontWeight: 'bold', fontFamily: 'Avenir Next', fontSize: '16px', paddingLeft: '350px'}}>{props.ID} </div>
          <font style={{ color: 'blue', fontSize: '24px', fontFamily: 'Lucida Console', paddingLeft: '350px'}}> | {props.message}</font>
        </div>
      </div>;
    } else if (friendUserBool) {
      return <div className='soloMessageClass' className="friendMessages">
        <div className='hidden'>
          <div style={{ color: '#006400', fontWeight: 'bold', fontFamily: 'Avenir Next', fontSize: '16px' }}>{props.ID} </div>
          <font style={{ color: '#32CD32', fontSize: '24px', fontFamily: 'Lucida Console' }}> | {props.message}</font>
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
};

export default SingleChat;