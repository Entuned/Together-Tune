import axios from 'axios';
import Playlists from './Playlists.jsx';
import PlayPlaylist from './PlayPlaylist.jsx';
import React, {useState} from 'react';


function AccountHooks(props) {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [profile, setProfile] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
 
  const userProfile = () => {
    axios({
      method: 'GET',
      url: '/me',
    }).then(({data}) => {
      setProfile({data});
    }).catch((err) => console.error('err'));
  };

  const getPlaylists = () =>{
    axios({
      method: 'GET',
      url: '/playlist',
    }).then(({data}) => {
      setPlaylists([data]);
      return data;
    }).then((data) => {
      // things I want to share
      const user = profile.display_name;
      const playlistInfo = data.map((playlist) => {
        return {
          playlistIDs: playlist.id,
          images: playlist.images[0].url,
          title: playlist.name
        };
      });
      const sharePlaylist = {
        user: user,
        playlistInfo, playlistInfo
      };
      return sharePlaylist;
    }).then((data) => {
      axios({
        method: 'POST',
        url: '/sharePlaylist',
        headers: {
          'user': data.user
        },
        data: data
      });
    });
  };

  // not going to be used
  const onePlaylist = (playlist) => {
    // console.log('click', playlist.id);
    axios({
      method: 'GET',
      url: `/playlist/${playlist.id}`,
    }).then(({data}) => {
      // console.log(data);
      setTracks([data]);
    });
  };

  const playPlaylist = (playlist) =>{
    // console.log(playlist);
    setCurrentlyPlaying({playlist});
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

  getPlaylists();
  userProfile();



  return (
    <div>
      <h4 style={{fontStyle: 'italic'}}>User: {profile.display_name}</h4>
      <PlayPlaylist playlist={currentlyPlaying}/>
      <Playlists handleClick={playPlaylist} playlists={playlists} />
    </div>
  );
}

export default AccountHooks;
