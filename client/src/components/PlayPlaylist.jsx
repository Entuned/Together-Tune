import React from 'react';



class PlayPlaylist extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    // console.log(this.props.playlist);
    // const playListReady = !!this.props.
    if (!!this.props.playlist) {
      console.log(this.props);
      return <div>
        <img
          src={this.props.playlist.images[0].url}
          alt="new"
          style ={{width: '250px', height: '250px', border: '5px solid black' 
          }}
        />
      </div>;
    } else {
      return <div></div>;
    }
  }
}


export default PlayPlaylist;