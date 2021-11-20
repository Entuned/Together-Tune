import React from 'react';
import { loginUrl } from '/Users/chhotisherpa/Together-Tune-1/config/auth.js';
import Login from './Login.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Entuned-test-webpack</h1>
        <Login loginUrl={loginUrl}/>
      </div>
    );
  }
}

export default App;