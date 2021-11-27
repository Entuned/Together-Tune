import React from 'react';

const Playlist = ({ playlists, handleClick }) => {
  return (
    <div>
      <h1>Playlist</h1>
      {
        playlists.map((playlist) => {
          // console.log('PLAYLIST', playlist);
          return (
            <div>
              {playlist.images.map((val) => {
                // console.log(Object.entries(val));
                return (
                  <img onClick={() => handleClick(playlist)} src={Object.entries(val)[1][1]}/>
                );
              })}
              <div onClick={() => handleClick(playlist)}>PlayList Name: {playlist.name}</div>
              <div># Tracks: {playlist.tracks.total}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Playlist;