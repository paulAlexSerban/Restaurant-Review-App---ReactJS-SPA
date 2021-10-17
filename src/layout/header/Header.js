import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header__base">
        <h1 className="header__title">Restaurant Review App</h1>
        <p className="header__description">OpenClassrooms - FE Path - Project 7</p>
      </header>
    )
  }
}

export default Header;