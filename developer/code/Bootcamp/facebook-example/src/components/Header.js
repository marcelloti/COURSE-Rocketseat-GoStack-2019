import React, { Component } from 'react';

function Header() {
  return (
    <>
      <div id='header'>
        <div id='logo'>
          facebook<sub id='copyright'>&copy;</sub>
        </div>
        <div id='profile'>
          Meu perfil
        </div>
      </div>
    </>
  );
}

export default Header;