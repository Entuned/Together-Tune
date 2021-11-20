// TODO
import React from 'react';
import New from './New.jsx';

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
        <New/>
      </div>
    );
  }
}

export default App;