import React from 'react';
import axios from 'axios';


const Playlist = () => {
  return (
    <div>
      <h4>Playlist</h4>
      {
        data[0].items.map((val, key) => {
          return (
            <ul>
              <li>{val.name}</li>
            </ul>
          );
        })
      }
    </div>
  );
};

export default Playlist;