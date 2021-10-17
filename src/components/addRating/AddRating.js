import React, { useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import './addrating.scss';

export default function AddRating({ 
  toggleRatingModal,
  hideModalProp,
  handleRating
 }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [stars, setStars] = React.useState('');
  const [comment, setComment] = React.useState('');

  useEffect(() => {
    setModalShow(toggleRatingModal)
  })

  function hideModal() {
    hideModalProp()
  }

  function submitRating() {
    handleRating(username, stars, comment);
    setUsername('');
    setStars('');
    setComment('');
    hideModal();
  }

  function verifyStars(value) {
    if(value <= 5) {
      setStars(value)
    }
  }

  return (
    <div className="addrating__base">
    <Modal
      size='lg'
      show={modalShow}
      onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="addrating__title">
          Add rating
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="addrating__form">
          <label className="addrating__label" htmlFor="username">Name:</label>
          <input className="addrating__username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

          <label className="addrating__label" htmlFor="stars">Stars:</label>
          <input className="addrating__stars" type="number" name="stars" min="1" max="5" value={stars} onChange={(e) => verifyStars(parseInt(e.target.value, 10))}/>

          <label className="addrating__label" htmlFor="comment">Comment:</label>
          <textarea className="addrating__comment" name="comment" placeholder="Add your comment please" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        </form>
      </Modal.Body>
      <Button
        className="addrating__button"
        variant="primary"
        onClick={submitRating}> Submit rating
      </Button>
    </Modal>
    </div>
  )
}
