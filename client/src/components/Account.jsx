import React from 'react';
import axios from 'axios';
import Playlists from './Playlists.jsx';
import TrackList from './TrackList.jsx';
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      playlists: [],
      tracks: [],
    };
    this.userProfile = this.userProfile.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.onePlaylist = this.onePlaylist.bind(this);

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

  onePlaylist(playlist) {
    // console.log('click', playlist.id);
    axios({
      method: 'GET',
      url: `/playlist/${playlist.id}`,
      headers: {
        'accessToken': this.props.accessTokenKey
      }
    }).then(({data}) => {
      this.setState({
        tracks: data.items
      });
    });
  }

  componentDidMount() {
    this.userProfile();
    this.getPlaylists();
  }

  render () {
    const {profile, playlists, current, tracks} = this.state;
    return (
      <div>
        <h1>UserInfo</h1>
        <h4>User: {profile.display_name}</h4>
        <h4>Email: {profile.email}</h4>
        <h4>ID: {profile.id}</h4>
        <Playlists handleClick={this.onePlaylist} playlists={playlists} />
        <TrackList tracks={tracks}/>
      </div>
    );
  }
}

export default Account;
