
import React from 'react';
import ChatRoom from './ChatRoom.jsx';
import {Grid} from '@material-ui/core';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessTokenKey: '',
    };
  }



  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    //not using this for now
    const refreshToken = urlParams.get('refresh_token');
    this.setState({
      accessTokenKey: accessToken
    });
    console.log(accessToken);
  }
  render() {
    return (
      <div>
        <Login />
        <h1>Music-Player-Component</h1>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '200vh', backgroundColor: 'lightgrey' }}>
          <ChatRoom token={this.state.accessTokenKey}/>
        </Grid>
      </div>
    );
  }
}


export default App;