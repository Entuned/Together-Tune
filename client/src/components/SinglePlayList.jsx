import React from 'react';


const SinglePlayList = (props) => {

  if (!!props.playlist.images.length) {
    return <div>
      <img style ={{width: '250px', height: '250px', border: '5px solid black' 
      }}
      onClick={() => props.handleClick(props.playlist)}
      src={props.playlist.images[0].url}
      alt="new"
      />
    </div>;
  } else {
    return <div/>;
  }
}

export default SinglePlayList;