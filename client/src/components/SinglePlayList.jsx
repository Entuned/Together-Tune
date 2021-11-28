import React from 'react';



// const SinglePlayList = (props) => {
//   // console.log(props);
//   return (
//     <div>
//       {/* <img src={props.playlist.images[0]}/> */}
//       <img style ={{width: '250px', height: '250px', border: '5px solid black' 
//       }}
//       onClick={() => props.handleClick(props.playlist)}
//       src={props.playlist.images[0].url}
//       alt="new"
//       />
//     </div>
//   );
// };

class SinglePlayList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!!this.props.playlist.images.length) {
      return <div>
        {/* <img src={props.playlist.images[0]}/> */}
        <img style ={{width: '250px', height: '250px', border: '5px solid black' 
        }}
        onClick={() => this.props.handleClick(props.playlist)}
        src={this.props.playlist.images[0].url}
        alt="new"
        />
      </div>;
    } else {
      return <div/>;
    }
  } 
  // return (<div>
  //   {/* <img src={props.playlist.images[0]}/> */}
  //   <img style ={{width: '250px', height: '250px', border: '5px solid black' }}
  //     onClick={() => this.props.handleClick(props.playlist)}
  //     src={this.props.playlist.images[0].url}
  //     alt="new"
  //   />
  // </div>);
  
}


export default SinglePlayList;