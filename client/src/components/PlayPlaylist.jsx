import React from 'react';



// const PlayPlaylist = (props) => {
//   console.log(props);
//   return (
//     <div>
//       {/* <img src={props.playlist.images[0]}/>
//       <img style ={{width: '250px', height: '250px', border: '5px solid black' 
//       }}
//       onClick={() => props.handleClick(props.playlist)}
//       src={props.playlist.images[0].url}
//       alt="new"
//       /> */}
//       Play a playlist
      
//     </div>
//   );
// };

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