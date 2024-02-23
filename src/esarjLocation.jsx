import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {redIcon, greenIcon} from './markerİcon';
import sarjData from './otosarjData';
import { ListGroup } from 'react-bootstrap';



const EsarjLocation = (props) => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Konum bilgisini alırken bir hata oluştu:', error);
      }
    );
  }, []);
  

  if (location.length === 0) {
    return <p>Konum bilgisi alınıyor...</p>;
  }
  else {
  return (
    <>
    <MapContainer center={location} zoom={14} style={{ height: "400px", width: "400px", margin: "auto", marginTop: "5%" }} attributionControl={false}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={location} icon={redIcon} >     
      <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
        Buradasın.
      </Tooltip>
      </Marker>
      {sarjData.map((position, index) => (
        <Marker key={index} position={[position.latitude, position.longitude]} icon={greenIcon}>
          <Popup>
            {position.storeName}
            <br />
            {position.storeAddress}
            <br />
            {position.phone}
            <br />
            {position.storeAddressDesc}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <div style={{marginLeft: "25%", marginRight: "25%", marginTop: "5%"}}>
        <ListGroup >
          {sarjData.map((position, index) => (
            <ListGroup.Item variant="dark" key={index}>{position.storeName}</ListGroup.Item>
          ))}
        </ListGroup>
        </div>
    </>
  );
  }
}

export default EsarjLocation;
