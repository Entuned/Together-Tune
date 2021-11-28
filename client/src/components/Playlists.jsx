import React from 'react';
import SinglePlayList from './SinglePlayList.jsx';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


class Playlist extends React.Component {
  constructor(props) {
    super(props);
    // this.albumCards = this.albumCards.bind(this);
    this.state = {
      allPlayList: this.props.playlist,
      currentLastCard: 0};
  }

  // possible feature of limiting album cards
  albumCards() {
    // const i = 0; 
    // console.log(i);
    // console.log(this.state.currentLastCard);
  }


  componentDidMount() {
    // splice 4 cards from playst array then add 4 to current last card
    this.albumCards();
  }

  render() {
    return (
      <div>

        <h1 style={{fontStyle: 'italic'}}>Playlist</h1>

        <div style={{display: 'inline-block'}}>
          {
            this.props.playlists.map((playlist) => {
              if (playlist.images) {
                return (
                  <div 
                    key={playlist.id}
                    style={{display: 'inline-block'}}
                  >
                    <SinglePlayList key={playlist.id} playlist={playlist} handleClick={this.props.handleClick}/>
                  </div>
                );
              } 
            })
          }
        </div>

        <div className='nextPlayList' style={{paddingTop: '10px'}}>
          <div className="formClass">
            <form onSubmit={e => e.preventDefault()}>
              <Button variant="contained" color="secondary" onClick={(e) => this.albumCards(e)}>Next 4 Playlist</Button>
            </form>
          </div>
        </div>


      </div>
    );
  }
}

export default Playlist;