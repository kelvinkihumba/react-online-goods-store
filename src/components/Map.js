import React from "react";
import GoogleMapReact from 'google-map-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Pin = (props) => {
    return (
        <div className="pin">
          <FontAwesomeIcon icon={faLocationDot} className="pin-icon" size="xs" />
          <div className="pin-text">
            <p>{props.address}</p>
            <p>{props.cityState}</p>
          </div>
        </div>
    );
}
const Map = () => {
    const location = {
      address: '8590 Barrington Dr',
      cityState: 'Ypsilanti, MI',
      center: {
        lat: 42.27491743511247,
        lng: -83.59241015822384
      },
      zoom: 13
    };

    return (
        <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBcEWIOxCfLIflghn8CX-8Y_-F5S1vtY00" }}
              defaultCenter={location.center}
              defaultZoom={location.zoom}
            >
                <Pin
                    lat={location.center.lat}
                    lng={location.center.lng}
                    address={location.address}
                    cityState={location.cityState} />
            </GoogleMapReact>
        </div>
    );
}

export default Map;