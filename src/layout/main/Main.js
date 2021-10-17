import React, { Component } from 'react';
import './main.scss';
import Article from '../article/Article';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <main className="main__base">
        <Article className="main__article" />
      </main>
    )
  }
}

export default Main
