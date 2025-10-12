import React from 'react';

const AuthSideBar = ({ bgImage }) => {
   return (
      <div
         className='w-full h-full bg-center bg-cover bg-no-repeat'
         style={{ backgroundImage: `url(${bgImage})` }}
      >
      </div>
   );
};

export default AuthSideBar;