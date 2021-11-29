import React from 'react';
import SinglePlayList from './SinglePlayList.jsx';

const Playlists = ({playlists, handleClick}) => {
  return (
    <div>
      <h1 style={{fontStyle: 'italic'}}>Playlist</h1>
      <div style={{display: 'inline-block'}}>
        {
          playlists.map((playlist) => {
            if (playlist.images) {
              return (
                <div
                  key={playlist.id}
                  style={{display: 'inline-block', padding: '10px'}}
                >
                  <SinglePlayList key={playlist.id} playlist={playlist} handleClick={handleClick}/>
                  <span><h5>Playlist Name: {playlist.name}</h5></span>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
};

export default Playlists;