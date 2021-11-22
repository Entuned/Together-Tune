import React from 'react';

const Login = ({loginUrl}) => {
  // console.log('login', loginUrl);
  const spotify = () => {
    window.open('http://localhost:3000/auth/spotify/callback', '_self');
  };

  return (
    <div>
      <p onClick={spotify}>Login with spotify</p>
    </div>
  );
};

export default Login;