import React from 'react';
import { useEffect } from 'react';
import Login from './Login.jsx';
// import Logout from './Logout.jsx';
// import Playlists from './Playlists.jsx';
// import sampleData from '/client/sampleData.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessTokenKey: ''
    };
  }


  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    this.setState({
      accessTokenKey: accessToken
    });
    console.log(accessToken);
  }
  render() {
    // const {user} = this.state;
    return (
      <div>
        <h1>Entuned-test-webpack</h1>
        <Login />
        {this.state.accessTokenKey}
        {/* <p>{user.displayName}</p>
          <Playlists data={sampleData}/> */}
      </div>
    );
  }
}

// const App = () => {
//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const accessToken = urlParams.get('access_token');
//     const refreshToken = urlParams.get('refresh_token');

//     console.log('accesstoken', accessToken);
//     // console.log('refreshtoken', refreshToken);
//   }, []);

//   return (
//     <div>
//       <h1>Entuned-test-webpack</h1>
//       <Login />
//       {/* <p>{user.displayName}</p>
//       <Playlists data={sampleData}/> */}
//     </div>
//   );
// };

export default App;