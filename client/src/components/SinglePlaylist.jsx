import React from 'react';
import axios from 'axios';

const SinglePlaylist = ({playlist, token}) => {
  // console.log(playlist.id);
  const singlePlay = () => {
    axios({
      method: 'GET',
      url: `/playlist${playlist.id}`,
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then((data) => {
      console.log(data);
    });
  };
  console.log(playlist, 'sign');

  return (
    <div>
      <div>Single Playlist</div>
      <div></div>
    </div>
  );
};

export default SinglePlaylist;