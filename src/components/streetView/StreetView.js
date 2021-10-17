import React, { Component } from 'react';
import './streetview.scss';

export class StreetView extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.marker.position !== this.props.marker.position) {
      this.loadStreetView();
    }
  }

  componentDidMount() {
    this.loadStreetView();
  }

  loadStreetView() {
    if (this.props && this.props.google) {
      const google = this.props.google;
      const streetViewPanorama = google.maps.StreetViewPanorama;
      const element = document.querySelector('.street-view');
      const panorama = new streetViewPanorama(element, {
        position: this.props.marker.position
      });
    }
  }
  
  render() {
    return (
      <div className="street-view">
      </div>
    )
  }
}

export default StreetView
