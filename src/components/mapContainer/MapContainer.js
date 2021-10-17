/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { faCompass, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, useLoadScript, Marker, InfoWindow  } from "@react-google-maps/api";
import { Button, Spinner, Card, Modal } from "react-bootstrap";
import mapStyles from "./MapStyles";
import Aside from "../../layout/aside/Aside";
import RatingCard from "../ratingCard/RatingCard";
import PhotoStrip from '../photostrip/PhotoStrip';
import StreetView from '../streetView/StreetView';
import AddRating from '../addRating/AddRating';
import AddRestaurantDetails from "../addRestaurant/AddRestaurant";
import restaurantList from "../../assets/db/restaurantsList";
import "./map-container.scss";
import '../infoWindow/infowindow.scss';
import "@reach/combobox/styles.css";

const libraries = ["places"]; // to avoid React rendering issues we get the library name from an object
const mapContainerStyle = {
  // same as above, and object is used to avoid rendering issues
  width: "100%",
  height: "100%",
};

const center = {
  lat: 51,
  lng: 10,
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMapCmp() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "add google api key",
    libraries,
  });
  const mapRef = React.useRef(); // variable to retain the reference to the map itself, to be used when searching to programmatically pan and zoom where the map is
  const onMapLoaded = React.useCallback((map) => {
    mapRef.current = map;
    centerToUserLocation();
  }, []);

  const [userPosition, setUserPosition] = React.useState([]);
  function centerToUserLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      panTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setUserPosition((userPosition) => [
        ...userPosition,
        {
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          name: "Your location",
        },
      ]);
    });
    setVisibleUser(true);
  }

  const [visibleUser, setVisibleUser] = React.useState(true);
  function visibleUserPin() {
    setVisibleUser(!visibleUser);
  }

  function showUserLocation() {
    return userPosition.map((marker, index) => <Marker 
      key={index}
      position={{
        lat: marker.position.lat,
        lng: marker.position.lng
      }}
      icon={{
        url: "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/128/Map-Marker-Bubble-Chartreuse-icon.png",
        scaledSize: new window.google.maps.Size(60, 70),
        origin: new window.google.maps.Point(0, 0)
      }}
      onClick={() => { setSelected(marker) }}
    />)
  }
  
  const [pannedTo, setPannedTo] = React.useState(false);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
    setPannedTo(true);
  }, []);

  const [savedRestaurants, setSavedRestaurants] = React.useState(restaurantList)
  const [savedUnfilteredRestaurants, setSavedUnfilteredRestaurants] = React.useState(savedRestaurants)
  const [savedFilteredRestaurants, setSavedFilteredRestaurants] = React.useState([])
  const [selected, setSelected] = React.useState(null);
  function renderSavedRestaurants(array) {
    return array.map((marker, index) => {
      if(marker.status === 'saved') {
        return <Marker
          key={index}
          id={index}
          position={{
            lat: marker.position.lat,
            lng: marker.position.lng,
          }}
          icon={{
            url: "http://www.clker.com/cliparts/Q/d/o/a/h/O/marker-hi.png",
            scaledSize: new window.google.maps.Size(30, 80),
            origin: new window.google.maps.Point(0, 0),
          }}
          name={marker.name}
          address={marker.address}
          phone={marker.phone}
          onClick={() => { setSelected(marker) }}
        />
      }
    });
  }

  const [showSavedRestaurants, setShowSavedRestaurants] = React.useState(false);
  function toggleSavedRestaurants() {
    setShowSavedRestaurants(!showSavedRestaurants);
  }

  function openInfoWindow(item) {
    setSelected(item)
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [minLimit, setMinLimit] = React.useState(1);
  const [maxLimit, setMaxLimit] = React.useState(5);
  const [hasFilter, setHasFilter] = React.useState(false);
  function filterToggle() {
    setMinLimit(1);
    setMaxLimit(5);
    setModalShow(!modalShow)
  }


  function applyFilter() {
    filterRestaurants('saved restaurants', minLimit, maxLimit, savedUnfilteredRestaurants, savedFilteredRestaurants);
    filterRestaurants('added restaurants', minLimit, maxLimit, addedUnfilteredRestaurants, addedFilteredRestaurants);
    filterRestaurants('nearby restaurants', minLimit, maxLimit, nearbyUnfilteredRestaurants, nearbyFilteredRestaurants);
    setModalShow(false);
    setHasFilter(true)
  }
  
  function filterRestaurants(arrayName ,min, max, unfilteredArray, filteredArray) {
    // console.log(arrayName, unfilteredArray)
    unfilteredArray.map((restaurant, index) => {
      if(restaurant.ratings) {
        restaurant.ratings.map((rating, index) => {
          if(rating.stars >= min && rating.stars <= max) {
            let r = restaurant;
            if(filteredArray.length > 0) {
              let index = filteredArray.map(rest => rest.name).indexOf(r.name);
              if(index < 0) {
                filteredArray.push(restaurant)
              }  
            } else {filteredArray.push(restaurant)}
          }
        })
      }
    })
    // console.log(arrayName, filteredArray)
  }

  const [toggleRatingModal, setToggleRatingModal] = React.useState(false);
  function handleRating(username, stars, comment) {
    setToggleRatingModal(true)
    let newRating = {
      userName: username,
      stars: stars,
      comment: comment
    }
    selected.ratings.push(newRating);
  }

  const [visibleAddedRestaurants, setVisibleAddedRestaurants] = React.useState(false);
  const [addedUnfilteredRestaurants, setAddedUnfilteredRestaurants] = React.useState([])
  const [addedFilteredRestaurants, setAddedFilteredRestaurants] = React.useState([])
  const onMapClick = React.useCallback((event) => {
    setAddedUnfilteredRestaurants(current => [
      ...current, 
      {
        name: 'New Restaurant',
        status: 'added',
        address: '',
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        ratings: []
    }]);
    setVisibleAddedRestaurants(true)
  }, []);

  function toggleAddedRestaurants() {
    setVisibleAddedRestaurants(!visibleAddedRestaurants)
  }

  function renderAddedRestaurants(array) {
    return array.map((marker, index) => {
      if(marker.status === 'added') {
        return <Marker 
        key={index}
        position={{
          lat: marker.position.lat, 
          lng: marker.position.lng
          }}
        icon={{
          url: 'http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-PNG-Image.png',
          scaledSize: new window.google.maps.Size(60, 70),
          origin: new window.google.maps.Point(0, 0)
        }}
        onClick={() => { setSelected(marker) }}
        />
      }
    }) 
  }

  const [toggleAddRestModal, setToggleAddRestModal] = React.useState(false);
  function handleRestaurantProperty(name, address, phone) {
    selected.name = name;
    selected.address = address;
    selected.phone = phone;
  }

  const [nearbyUnfilteredRestaurants, setNearbyUnfilteredRestaurants] = React.useState([])
  const [nearbyFilteredRestaurants, setNearbyFilteredRestaurants] = React.useState([])
  const [showNearbyRestaurants, setShowNearbyRestaurants] = React.useState(false)

  function toggleNearbyRestaurnts() {
    setShowNearbyRestaurants(!showNearbyRestaurants)
  }

  function getNearbyRestaurants() {
    setNearbyUnfilteredRestaurants([])
    setNearbyFilteredRestaurants([])
    const centerPosiiton = {
      lat: mapRef.current.getCenter().lat(),
      lng: mapRef.current.getCenter().lng()
    }
    setShowNearbyRestaurants(true)
    // console.log('center position', centerPosiiton);
    let request = {
      location: centerPosiiton,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'restaurant'
    };
    let service = new google.maps.places.PlacesService(mapRef.current);
    service.nearbySearch(request, nearbyCallback);
  }

  function nearbyCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results)
      results.forEach(place => {
        let request = {
          placeId: place.place_id,
          fields: ['photos', 'reviews']
        }
        let service = new google.maps.places.PlacesService(mapRef.current);
        service.getDetails(request, (placeResult, status) => {
          // console.log('placeResult',placeResult);
          if(status === 'OK') {
            setNearbyUnfilteredRestaurants(current => [
              ...current,
              {
                name: place.name,
                address: place.vicinity,
                position: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                },
                ratings: (placeResult.reviews ? placeResult.reviews.map((review, index) => { 
                  return {
                    userName: review.author_name,
                    stars: review.rating,
                    comment: review.text
                  }
                }) : null),
                photos: (placeResult.photos ? placeResult.photos.map((photo, index) => {
                  return photo.getUrl()
                }) : null)
                
              }
            ])
          }
        });
      })
      renderAreaRestaurants()
      if(nearbyUnfilteredRestaurants === undefined) {
        setTimeout(getNearbyRestaurants(), 2000)
      }
    }
  }

  function renderAreaRestaurants(array) {
    if(array !== undefined) {
      return array.map((marker, index) => <Marker 
        key={index}
        position={{
            lat: marker.position.lat,
            lng: marker.position.lng,
          }}
        icon={{
          url: 'https://www.shareicon.net/data/2017/05/22/886148_map_512x512.png',
          scaledSize: new window.google.maps.Size(40, 70),
          origin: new window.google.maps.Point(0, 0)
        }}
        name={marker.name}
        address={marker.address}
        onClick={() => {setSelected(marker) }}
      />)
    }
  }

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div className="map-container__base">
          <GoogleMap
            className="map-container__map"
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={center}
            options={mapOptions}
            onLoad={onMapLoaded}
            onClick={onMapClick}>
            {visibleUser 
            ? showUserLocation() 
            : null}
            <Button
              className="map-container__userLocation map-container__button"
              variant="info"
              disabled={pannedTo ? false : true}
            >
              {pannedTo 
              ? ( <FontAwesomeIcon icon={faCompass} onClick={centerToUserLocation}/>) 
              : ( <div>
                  <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              )}
            </Button>
            {showSavedRestaurants 
            ? hasFilter 
            ? renderSavedRestaurants(savedFilteredRestaurants) 
            : renderSavedRestaurants(savedRestaurants) 
            : null} 
            <Aside 
              toggleSavedRestaurants={toggleSavedRestaurants}
              visibleSavedRestaurants={showSavedRestaurants}
              visibleUserMarker={visibleUserPin}
              savedRestaurants={hasFilter ? savedFilteredRestaurants : savedRestaurants}
              addedRestaurants={hasFilter ? addedFilteredRestaurants : addedUnfilteredRestaurants}
              nearbyRestaurants={hasFilter ? nearbyFilteredRestaurants : nearbyUnfilteredRestaurants}
              openInfoWindow={openInfoWindow}
              toggleAddedRestaurants={toggleAddedRestaurants}
              visibleAddedRestaurants={visibleAddedRestaurants}
              toggleNearbyRestaurnts={toggleNearbyRestaurnts}
              showNearbyRestaurants={showNearbyRestaurants}
            />

            {selected 
            ? ( <InfoWindow 
                className="info-window__base"
                position={{
                  lat: selected.lat || selected.position.lat, 
                  lng: selected.lng || selected.position.lng
                }}
                onCloseClick={() => {setSelected(null)}} >
                {selected.name !== 'Your location' 
                ? <Card className="info-window__content">
                <Card.Header as="h2">{selected.name}</Card.Header>
                <Card.Body className="info-window__body">
                  {selected.address || selected.phone 
                  ? <address className="info-window__address">
                    {selected.address 
                    ? <div>
                      <Card.Subtitle className="text-muted info-window__subtitle">Address</Card.Subtitle>
                      <Card.Text className="info-window__text">{selected.address}</Card.Text>
                    </div> 
                    : null}
                    {selected.phone 
                    ? <div>
                    <Card.Subtitle className="text-muted info-window__subtitle">Phone</Card.Subtitle>
                    <Card.Text className="info-window__text">{selected.phone}</Card.Text>
                    </div> 
                    : null}
                  </address>
                  : null}
                  {selected.ratings 
                  ? selected.ratings.map((rating, index) => { 
                  return (
                    <RatingCard
                    key={index}
                    name={rating.userName}
                    stars={rating.stars}
                    comment={rating.comment} />
                  )
                }) 
                : null}
                {selected.name !== 'New Restaurant' 
                ? <button className="info-window__add-rating" onClick={() => setToggleRatingModal(true)}>Add rating</button> 
                : <button className="info-window__add-rating" onClick={() => setToggleAddRestModal(true)}>Add restaurant details</button>}
                </Card.Body>
              </Card> 
              : <div>{selected.name}</div> }
            </InfoWindow>) 
            : null}
            {selected && selected.photos 
            ? <PhotoStrip photos={selected.photos}/> 
            : null}
            {selected 
            ? <StreetView google={window.google} marker={selected} />
            : null}

            <Button 
              className="map-container__filterRestaurants map-container__button"
              variant="primary"
              onClick={filterToggle}
              >
              <FontAwesomeIcon icon={faFilter} />
            </Button>
            <Modal
              size="lg"
              show={modalShow}
              onHide={() => setModalShow(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="filter__modal">Filter restaurants by rating
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="map-container modal__container">
                  <div className="modal__inputs-container">
                    <label className="modal__label">Minimum rating: </label>
                    <input 
                    className="modal__input" 
                    type="number" 
                    onChange={(e) => setMinLimit(e.target.value)} 
                    min="1" 
                    max="5"/>
                    <label className="modal__label">Maximum rating: </label>
                    <input 
                    className="modal__input" 
                    type="number" 
                    onChange={(e) => setMaxLimit(e.target.value)} 
                    min={minLimit} 
                    max="5"/>
                  </div>
                    <Button className="modal__button" onClick={applyFilter} variant="primary">Filter</Button>
                </div>
              </Modal.Body>
            </Modal>
            <AddRating 
              toggleRatingModal={toggleRatingModal}
              hideModalProp={() => setToggleRatingModal(false)}
              handleRating={handleRating}
            />
            {visibleAddedRestaurants 
            ? hasFilter 
            ? renderAddedRestaurants(addedFilteredRestaurants) 
            : renderAddedRestaurants(addedUnfilteredRestaurants) 
            : null}
            <AddRestaurantDetails
              toggleAddRestModal={toggleAddRestModal}
              hideModalAddProp={() => setToggleAddRestModal(false)}
              handleRestaurantProperty={handleRestaurantProperty}
            />
            <Button
              className="map-container__get-nearby-rest"
              variant="info"
              onClick={getNearbyRestaurants}
            >Search this area</Button>
            {showNearbyRestaurants 
            ? nearbyUnfilteredRestaurants !== undefined 
            ? hasFilter 
            ? renderAreaRestaurants(nearbyFilteredRestaurants) 
            : renderAreaRestaurants(nearbyUnfilteredRestaurants)
            : null
            : null}
          </GoogleMap>
      
    </div>
  )
}
