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
    console.log('getPlaylists');
    axios({
      method: 'GET',
      url: '/playlist',
    }).then(({data}) => {
      setPlaylists(data);
      console.log('playlist', playlists);
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


  const playPlaylist = (playlist) =>{
    console.log(playlist);
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

  // getPlaylists();
  // userProfile();

  useEffect(() => { getPlaylists(), userProfile(); }, []);



  return (
    <div>
      <h4 style={{fontStyle: 'italic'}}>User: {profile.display_name}</h4>
      {console.log(currentlyPlaying)}
      {/* <PlayPlaylist playlist={currentlyPlaying}/> */}
      {currentlyPlaying.id ? <PlayPlaylist currentlyPlaying={currentlyPlaying}/> : null}
      <Playlists handleClick={playPlaylist} playlists={playlists} />
    </div>
  );
};

export default Account;
