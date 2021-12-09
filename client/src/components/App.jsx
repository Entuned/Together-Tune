import React, { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom.jsx';
import {Grid} from '@material-ui/core';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Account from './Account.jsx';
import { Button } from '@material-ui/core';

const App = () => {
  const [ accessTokenKey, setAccessTokenKey ] = useState('');

  useEffect(() => {
    try {
      const cookieToken = document.cookie.split(';').find((elem) => elem.trim().startsWith('access_token')).split('=')[1];
      setAccessTokenKey(cookieToken);
    } catch (err) {}

  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: '200vh', backgroundColor: '#f1f3f8' }}>
        <h1
          style ={{margin: 'auto'}}
        >
          <img 
            src={'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/10/Tsubaki-And-Kousei.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5'}
            alt="new"
            style={{width: '600', height: '250px', border: '2px solid white', margin: 'auto'}}
          />
        </h1>
        <div
          style={{fontSize: '50px', fontWeight: 'bold', fontStyle: 'italic'}}
        >Listen to music and chat!</div>
        {accessTokenKey ? (
          <div>
            <Button variant="contained" color="secondary"><Logout/></Button>
            <Account/>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              style={{ minHeight: '200vh', backgroundColor: '#f1f3f8' }}>
              <ChatRoom/>
            </Grid>
          </div>
        ) : (
          <Button variant="contained" color="secondary"> <Login/> </Button>
        )}
      </Grid>
    </div>
  );
};

export default App;