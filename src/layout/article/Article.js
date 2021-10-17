import React, { Component } from 'react';
import GoogleMapCmp from '../../components/mapContainer/MapContainer';
import './article.scss';

class Article extends Component {
  render() {
    return (
      <article className="article__base">
        <GoogleMapCmp />
      </article>
    )
  }
}

export default Article;