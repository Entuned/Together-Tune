import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';


class PlayPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    axios.put('/pause');
  }
  render() {
    // console.log(this.props.playlist);
    // const playListReady = !!this.props.
    if (!!this.props.playlist) {
      // console.log(this.props);
      return <div>
        <img
          src={this.props.playlist.images[0].url}
          alt="new"
          style ={{width: '250px', height: '250px', border: '5px solid black' 
          }}
        />
        <Button variant="contained" color="secondary" onClick={(e) => this.handleClick(e)}>Puase/Play</Button>
        {/* <button></button> */}
      </div>;
    } else {
      return <div></div>;
    }
  }
}


export default PlayPlaylist;