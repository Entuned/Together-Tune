
import React from 'react';
import ChatRoom from './ChatRoom.jsx';
import {Grid} from '@material-ui/core';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Account from './Account.jsx';
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessTokenKey: '',
      ID: this.generateUserID()
    };
    this.generateUserID = this.generateUserID.bind(this);
  }

  generateUserID() {
    return Math.random().toString(36).substr(2, 10);
  }

  componentDidMount() {
    try {
      const cookieToken = document.cookie.split(';').find((elem) => elem.trim().startsWith('access_token')).split('=')[1];
      this.setState({
        accessTokenKey: cookieToken
      });
    } catch (err) {}

  }

  render() {
    const {accessTokenKey} = this.state;
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '200vh', backgroundColor: 'lightgrey' }}>
          <h1>Listen to music and chat!</h1>
          {accessTokenKey ? (
            <div>
              <p>Logged In</p>
              <button><Logout/></button>
              <Account accessTokenKey={accessTokenKey}/>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '200vh', backgroundColor: 'lightgrey' }}>
                <ChatRoom ID={this.state.ID}/>
              </Grid>
            </div>
          ) : (
            <Button variant="contained" color="secondary"> <Login/> </Button>
          )}
        </Grid>
      </div>
    );
  }
}



export default App;