import React from 'react';

const TrackList = ({tracks}) => {
  console.log(tracks);
  return (
    <div>
      <h1>Tracklist</h1>
      {
        tracks.map((track) => {
          // console.log(track.track.artists);
          return (
            <div>
              <div>Title: {track.track.name}</div>
              {
                track.track.artists.map((artist) => {
                  return (
                    <div>Artist: {artist.name}</div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default TrackList;