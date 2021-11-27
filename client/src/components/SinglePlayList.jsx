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
  // console.log(props);
  console.log(props.playlist);
  // if (!!props.playlist) {
  //   console.log(props.playlist);
  // }
  return (
    <div>
      {/* <img src={props.playlist.images[0]}/> */}
      <img style ={{width: '250px', height: '250px', border: '5px black'}}
        src={props.playlist.images[0].url}
        alt="new"
      />
    </div>
  );
};


export default SinglePlayList;