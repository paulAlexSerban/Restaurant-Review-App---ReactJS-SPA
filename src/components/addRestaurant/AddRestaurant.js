import React, { useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import './addrestaurant.scss';

export default function AddRestaurantDetails({ 
  toggleAddRestModal,
  hideModalAddProp,
  handleRestaurantProperty
 }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('')

  useEffect(() => {
    setModalShow(toggleAddRestModal)
  })

  function modalHide() {
    hideModalAddProp()
  }

  function submitProperty() {
    handleRestaurantProperty(name, address, phone);
    setName('');
    setPhone('');
    setAddress('');
    hideModalAddProp();
  }
  return (
    <div className="addrestaurant__base">
      <Modal
        size='lg'
        show={modalShow}
        onHide={modalHide}>
        <Modal.Header closeButton>
          <Modal.Title className="addrestaurant__title">
            Add restaurant details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addrestaurant__form">
            <label className="addrestaurant__label" htmlFor="restname">Restaurant Name:</label>
            <input className="addrestaurant__restname" type="text" name="restname" value={name} onChange={(e) => setName(e.target.value)}/>

            <label className="addrestaurant__label" htmlFor="address">Address:</label>
            <textarea className="addrestaurant__address" name="address" placeholder="Add the address here" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

            <label className="addrestaurant__label" htmlFor="phone">Phone Number:</label>
            <input className="addrestaurant__phone" name="phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </form>
        </Modal.Body>
        <Button
        className="addrating__button"
        variant="primary"
        onClick={submitProperty}> Submit restaurant details
      </Button>
      </Modal>
    </div>
  )
}
