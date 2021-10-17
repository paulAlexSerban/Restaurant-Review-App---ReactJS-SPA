import React from 'react';
import { Button, Collapse, ListGroup } from 'react-bootstrap';
import './aside.scss';

function Aside({ 
  toggleSavedRestaurants, 
  visibleSavedRestaurants, 
  visibleUserMarker, 
  savedRestaurants, 
  visibleAddedRestaurants, 
  toggleAddedRestaurants,
  openInfoWindow,
  toggleFilterButton,
  addedRestaurants,
  nearbyRestaurants,
  toggleNearbyRestaurnts,
  showNearbyRestaurants }) {
  const [showUserLocation, setShowUserLocation] = React.useState(false);
  const [showRestaurantList, setSavedRestaurantsList] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function visibleUserPin() {
    setShowUserLocation(!showUserLocation)
    visibleUserMarker()
  }

  function renderSavedRestaurantList() {
    return savedRestaurants.map((restaurant, index) => <ListGroup.Item 
      key={index}
      className="aside__restaurant-item"
      onClick={onItemClick}>
      {restaurant.name}
    </ListGroup.Item>)
  }

  function renderAddedRestaurantList() {
    return addedRestaurants.map((restaurant, index) => <ListGroup.Item 
    key={index}
    onClick={onAddedRestClick}
    className="aside__restaurant-item">
    {restaurant.name}
    </ListGroup.Item>)
  }

  function renderNearbyRestaurantList() {
    return nearbyRestaurants.map((restaurant, index) => <ListGroup.Item
    key={index}
    className="aside__restaurant-item"
    onClick={nearbyItemClick}
    >{restaurant.name}</ListGroup.Item>)
  }

  const onAddedRestClick = (e) => { 
    for(let i = 0; i < addedRestaurants.length; i++) {
      if(addedRestaurants[i].name === e.target.innerHTML) {
        openInfoWindow(addedRestaurants[i])
      }
    }
  }

  const onItemClick = (e) => { 
    for(let i = 0; i < savedRestaurants.length; i++) {
      if(savedRestaurants[i].name === e.target.innerHTML) {
        openInfoWindow(savedRestaurants[i])
      }
    }
  }

  const nearbyItemClick = (e) => {
    for(let i = 0; i < nearbyRestaurants.length; i++) {
      if(nearbyRestaurants[i].name === e.target.innerHTML) {
        openInfoWindow(nearbyRestaurants[i])
      }
    }
  }

  function toggleSavedRestaurantsList() {
    toggleSavedRestaurants()
    setSavedRestaurantsList(!showRestaurantList);
  }

  function toggleButton() {
    setOpen(!open);
  }

  return (
    <aside className="aside__base">
    <Button 
    className="aside__toggle-button"
    variant="primary" 
    aria-controls="aside__content"
    aria-expanded={open}
    onClick={toggleButton}>Menu</Button>

    <Collapse in={open}>
      <div className="aside__content" id="aside__content">
        <ListGroup>
          <ListGroup.Item 
            className="aside__item" 
            onClick={visibleUserPin}>{showUserLocation ? 'Hide ' : 'Show '} user marker</ListGroup.Item>
          <ListGroup.Item 
            className="aside__item" 
            onClick={toggleSavedRestaurantsList} 
            aria-controls="aside__restaurant-list"
            aria-expanded={showRestaurantList}>
            {visibleSavedRestaurants ? 'Hide ' : 'Show '}favorite restaurants</ListGroup.Item>
          <Collapse in={showRestaurantList}>
            <ListGroup 
              className="aside__restaurant-list">
              {showRestaurantList ? renderSavedRestaurantList() : null}
            </ListGroup>
          </Collapse>
          <ListGroup.Item 
            className="aside__item" 
            onClick={toggleAddedRestaurants}>{visibleAddedRestaurants ? 'Hide ' : 'Show '} added restaurants
          </ListGroup.Item>
          <Collapse in={visibleAddedRestaurants}>
            <ListGroup
              className="aside__restaurant-list">
              {addedRestaurants ? renderAddedRestaurantList() : null}
            </ListGroup>
          </Collapse>
          <ListGroup.Item
          className="aside__item"
          onClick={toggleNearbyRestaurnts}>
          {showNearbyRestaurants ? 'Hide ': 'Show '}nearby restaurants
          </ListGroup.Item>
          <Collapse in={showNearbyRestaurants}>
            <ListGroup className="aside__restaurant-list">
              {nearbyRestaurants ? renderNearbyRestaurantList() : null}
            </ListGroup>
          </Collapse>
        </ListGroup>
      </div>
    </Collapse>
    </aside>
  )
}

export default Aside;
