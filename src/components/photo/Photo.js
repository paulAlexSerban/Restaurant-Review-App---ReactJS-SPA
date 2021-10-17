import React, { Component } from 'react';
import { Button, Modal } from "react-bootstrap";
import './photo.scss';

export default function Photo({photo}) {
  const [showModal, setShowModal] = React.useState(false)

  function showTheModal() {
    setShowModal(true)
    console.log(showModal)
  }

  return (
    <div>
      <img className="photo__base" src={photo} alt="location" referrerPolicy="no-referrer" onClick={showTheModal} />
      <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="photo__base" src={photo} alt="location" referrerPolicy="no-referrer"/>
        </Modal.Body>
      </Modal>
    </div>
  )
}
