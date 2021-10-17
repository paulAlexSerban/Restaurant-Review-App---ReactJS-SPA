import React, { Component } from 'react';
import './footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="footer__base">
        <h2 className="footer__list-title">Used technologies</h2>
        <ul className="footer__list">
          <li className="footer__list-item">HTML - JSX</li>
          <li className="footer__list-item">CSS - Scss - React-Bootstrap</li>
          <li className="footer__list-item">JavaScript - React-JS</li>
          <li className="footer__list-item">NodeJS - Npm</li>
        </ul>
      </footer>
    )
  }
}

export default Footer;