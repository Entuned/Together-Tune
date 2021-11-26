import React from 'react';
import axios from 'axios';
import Playlists from './Playlists.jsx';
import SinglePlaylist from './SinglePlaylist.jsx';
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      playlists: [],
      current: {}
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
      console.log(data);
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
      console.log(data);
      this.setState({
        playlists: data
      });
    });
  }

  componentDidMount() {
    this.userProfile();
    this.getPlaylists();
  }

  onePlaylist(playlist) {
    // console.log('click', playlist);
    this.setState({
      current: playlist
    });
  }

  render () {
    const {profile, playlists, current} = this.state;
    return (
      <div>
        <h1>UserInfo</h1>
        <h4>User: {profile.display_name}</h4>
        <h4>Email: {profile.email}</h4>
        <h4>ID: {profile.id}</h4>
        <Playlists handleClick={this.onePlaylist} playlists={playlists} />
        <SinglePlaylist playlist={current} token={this.props.accessTokenKey}/>
      </div>
    );
  }
}

export default Account;
