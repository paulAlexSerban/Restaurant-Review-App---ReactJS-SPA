import React, { Component } from "react";
import Carousel from 'react-elastic-carousel';
import Photo from "../photo/Photo";
import "./photoStrip.scss";

const breakPoints = [
  { width: 550, itemsToShow: 3 }
];

export class PhotoStrip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displayPhoto = () => {
    return this.props.photos.map((photo, index) => {
      return <Photo 
        key={index}
        photo={photo}
      />;
    });
  };

  render() {
    return (
      <div className="photo-strip__base">
        <Carousel breakPoints={breakPoints}>
        { this.displayPhoto() }
        </Carousel>
      </div>
    )
  }
}

export default PhotoStrip;
