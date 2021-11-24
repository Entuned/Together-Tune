import React from 'react';
import axios from 'axios';


const Playlist = () => {
  // const [token, setToken] = useState('');
  // const [data, setData] = useState({});

  // useEffect(() => {

  // }, [input]);
  return (
    <div>
      <h4>Playlist</h4>
      {
        data[0].items.map((val, key) => {
          return (
            <ul>
              <li>{val.name}</li>
            </ul>
          );
        })
      }
    </div>
  );
};

export default Playlist;