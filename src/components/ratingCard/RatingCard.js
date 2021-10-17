import React from 'react';
import { Card } from 'react-bootstrap';
import { Rating } from 'primereact/rating';
import './ratingCard.scss';

export default function RatingCard({ name, stars, comment }) {
  return (
    <Card className="rating-card__base">
      <Card.Header className="rating-card__header">From: { name } 
        <Rating className="rating-card__rating" value={eval(stars)} stars={5} readonly={true} cancel={false}/>
      </Card.Header>
      
      <Card.Text className="rating-card__text">{ comment }</Card.Text>
    </Card>
  )
}
