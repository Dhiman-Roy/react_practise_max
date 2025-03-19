import React, { useState } from "react";
import Map from "../../shared/components/UIElements/Map";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import "./PlaceItem.css";
export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const mapCenter = [props.coordinates.lng, props.coordinates.lat];

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={mapCenter} zoom={1} />
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
}
