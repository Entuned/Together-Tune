import React from 'react';
import { useEffect } from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Account from './Account.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessTokenKey: ''
    };
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
        <h1>Entuned-test-webpack</h1>
        {accessTokenKey ? (
          <div>
            <p>Logged In</p>
            <button><Logout/></button>
            <Account accessTokenKey={accessTokenKey}/>
          </div>
        ) : (
          <button><Login/></button>
        )}
      </div>
    );
  }

}


export default App;