import React from 'react';

class SinglePlayList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!!this.props.playlist.images.length) {
      return <div>
        <img style ={{width: '250px', height: '250px', border: '5px solid black' 
        }}
        onClick={() => this.props.handleClick(this.props.playlist)}
        src={this.props.playlist.images[0].url}
        alt="new"
        />
      </div>;
    } else {
      return <div/>;
    }
  } 

}


export default SinglePlayList;