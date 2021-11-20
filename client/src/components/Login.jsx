import React from 'react';

const Login = ({ loginUrl }) => {
  // console.log('login', loginUrl);
  return (
    <div>
      <a href={loginUrl}>Login with spotify</a>
    </div>
  );
};

export default Login;