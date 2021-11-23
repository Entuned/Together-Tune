import React from 'react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      isLoggedIn: false
    };
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    axios.get('/login/success')
      .then(({data}) => {
        console.log(data.user, 'DATA');
        this.setState({
          user: data.user
        });
      });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    const {user} = this.state;
    return (
      <div>
        <h1>Entuned-test-webpack</h1>
        <Login />
        <p>{user.displayName}</p>
      </div>
    );
  }
}

export default App;