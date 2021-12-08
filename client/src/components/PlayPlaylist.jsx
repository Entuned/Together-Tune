import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';


const PlayPlaylist = (props) => {

  const handleClick = (e) => {
    axios.put('/pause');
  }
  if (!!props.playlist) {
    // console.log(this.props);
    return <div>
      <img
        src={props.playlist.images[0].url}
        alt="new"
        style ={{width: '250px', height: '250px', border: '5px solid black' 
        }}
      />
      <Button variant="contained" color="secondary" onClick={(e) => handleClick(e)}>Pause/Play</Button>
    </div>;
  } else {
    return <div></div>;
  }
}

export default PlayPlaylist;