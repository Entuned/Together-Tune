import React from 'react';


{ /* <div>
  {playlist.images.map((val) => {
    // console.log(Object.entries(val));
    console.log(val);
    return (
      <img onClick={() => handleClick(playlist)} src={Object.entries(val)[1][1]}/>
    );
  })}
  <div onClick={() => handleClick(playlist)}>PlayList Name: {playlist.name}</div>
  <div># Tracks: {playlist.tracks.total}</div>
</div>; */ }


// {
//   playlists.map((playlist) => {
//     // console.log(playlist);s
//     { /* console.log('playlist', playlist); */ }
//     return (
//       <div>
//         <SinglePlayList/>
//         {playlist.images.map((val) => {
//           // console.log(Object.entries(val));
//           return (
//             <img onClick={() => handleClick(playlist)} src={Object.entries(val)[1][1]}/>
//           );
//         })}
//         <div onClick={() => handleClick(playlist)}>PlayList Name: {playlist.name}</div>
//         <div># Tracks: {playlist.tracks.total}</div>
//       </div>
//     );
//   })
// }

const SinglePlayList = (props) => {
  console.log(props);
  // console.log(props.playlist.images);
  return (
    <div>PlayList GOES HERE</div>
  );
};


export default SinglePlayList;