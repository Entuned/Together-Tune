import axios from 'axios';
import Playlists from './Playlists.jsx';
import PlayPlaylist from './PlayPlaylist.jsx';
import React, {useState, useEffect} from 'react';


const Account = (props) => {
  const [playlists, setPlaylists] = useState([]);
  const [profile, setProfile] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
 
  const userProfile = () => {
    axios({
      method: 'GET',
      url: '/me',
    }).then(({data}) => {
      setProfile(data);
    }).catch((err) => console.error('err'));
  };

  const getPlaylists = () =>{
    axios({
      method: 'GET',
      url: '/playlist',
    }).then(({data}) => {
      setPlaylists(data);
      return data;
    });
  };


  const playPlaylist = (playlist) =>{
    setCurrentlyPlaying(playlist);
    axios({
      method: 'GET',
      url: `/playlist/${playlist.id}`,
    }).then(({data}) => {
      if (data.items[0].track.album.album_type === 'single') {
        const reqBody = {
          'context_uri': data.items[0].track.album.uri
        };
        axios({
          method: 'PUT',
          url: '/play',
          data: reqBody
        });
      } else {
        const reqBody = {
          'context_uri': data.items[0].track.album.uri,
          'offset': {
            'position': data.items[0].track.track_number - 1
          }
        };
        axios({
          method: 'PUT',
          url: '/play',
          data: reqBody
        });
      }
    });
  };

  useEffect(() => { getPlaylists(), userProfile(); }, []);

  return (
    <div>
      <h4 style={{fontStyle: 'italic'}}>Active UserID: {profile.display_name}</h4>
      {currentlyPlaying.id ? <PlayPlaylist currentlyPlaying={currentlyPlaying}/> : null}
      <Playlists handleClick={playPlaylist} playlists={playlists} />
    </div>
  );
};

export default Account;
