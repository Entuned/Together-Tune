import React from 'react';
import axios from 'axios';
import Playlists from './Playlists.jsx';
import PlayPlaylist from './PlayPlaylist.jsx';

function AccountHooks(props) {
  const [playlists, setPlaylists] = React.useState([]);
  const [tracks, setTracks] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = React.useState({});
 
  const userProfile = () => {
    axios({
      method: 'GET',
      url: '/me',
    }).then(({data}) => {
    setProfile({data})
    }).catch((err) => console.error('err'));
  }

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
  }

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
  }

  playPlaylist(playlist) {
    // console.log(playlist);
    this.setState({
      playPlaylist: playlist
    });
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
  }

  componentDidMount() {
    this.userProfile();
    this.getPlaylists();
  }

  render () {
    const {profile, playlists, current, playPlaylist} = this.state;
    return (
      <div>
        <h4 style={{fontStyle: 'italic'}}>User: {profile.display_name}</h4>
        <PlayPlaylist playlist={playPlaylist}/>
        <Playlists handleClick={this.playPlaylist} playlists={playlists} />
      </div>
    );
  }
}

export default Account;
