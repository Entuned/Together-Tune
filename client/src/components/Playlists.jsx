import React from 'react';
import SinglePlayList from './SinglePlayList.jsx';

// const Playlist = ({ playlists, handleClick }) => {
//   return (
//     <div>
//       <SinglePlayList/>
//       <h1>Playlist</h1>
//       {
//         playlists.map((playlist) => {
//           // console.log(playlist);s
//           { /* console.log('playlist', playlist); */ }
//           return (
//             <div>
//               <SinglePlayList playlist={playlists}/>
//             </div>
//           );
//         })
//       }
//     </div>
//   );
// };

class Playlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>

        <h1>Playlist</h1>
        {
          this.props.playlists.map((playlist) => {
            if (playlist.images) {
              return (
                <div style={{display: 'inline-block', 
                  // flexDirection: 'row',
                  // justifyContent: 'flex-start'
                }}>
                  <SinglePlayList keyName={playlist.id} playlist={playlist}/>
                </div>
              );
            } 
          })
        }
      </div>
    );
  }
}

export default Playlist;