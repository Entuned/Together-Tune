import React from 'react';
import axios from 'axios';
import Playlists from './Playlists.jsx';
import PlayPlaylist from './PlayPlaylist.jsx';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      playlists: [],
      tracks: [],
      currentPlaying: {}
    };
    this.userProfile = this.userProfile.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.onePlaylist = this.onePlaylist.bind(this);
    this.playPlaylist = this.playPlaylist.bind(this);
  }
  userProfile() {
    axios({
      method: 'GET',
      url: '/me',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      // console.log(data);
      this.setState({
        profile: data
      });
    }).catch((err) => console.error('err'));
  }

  getPlaylists () {
    axios({
      method: 'GET',
      url: '/playlist',
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      // console.log(data);
      this.setState({
        playlists: data
      });
    });
  }

  // not going to be used
  onePlaylist(playlist) {
    // console.log('click', playlist.id);
    axios({
      method: 'GET',
      url: `/playlist/${playlist.id}`,
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      // console.log(data);
      this.setState({
        tracks: data.items,
      });
    });
  }

  playPlaylist(playlist) {
    console.log(playlist);
    this.setState({
      playPlaylist: playlist
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

        <PlayPlaylist playlist={playPlaylist}/>

        {/* <h1>UserInfo</h1> */}
        <h4 style={{fontStyle: 'italic'}}>User: {profile.display_name}</h4>
        {/* <h4>Email: {profile.email}</h4>
        <h4>ID: {profile.id}</h4> */}
        <Playlists handleClick={this.playPlaylist} playlists={playlists} />
      </div>
    );
  }
}

export default Account;
