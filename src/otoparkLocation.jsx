import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { redIcon, blueIcon } from './markerİcon';
import otoparkData from './otoparkData';
import { ListGroup } from 'react-bootstrap';

const OtoparkLocation = (props) => {
    const [location, setLocation] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(18); 
  
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
  
    const UpdateZoom = () => {
      const map = useMap();
      map.on('zoomend', function() {
        setZoomLevel(map.getZoom());
      });
      return null;
    };
  
    if (location.length === 0 || otoparkData.length === 0) {
      return <p>Konum bilgisi alınıyor...</p>;
    } else {
      return (
        <>
        <MapContainer center={location} zoom={zoomLevel} style={{ height: "400px", width: "400px", margin: "auto", marginTop: "5%" }} attributionControl={false}>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <UpdateZoom />
          <Marker position={location} icon={redIcon}>
            <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
              Buradasın.
            </Tooltip>
          </Marker>
          {otoparkData.map((position, index) => (
            <Marker key={index} position={[position.geojson.coordinates[1], position.geojson.coordinates[0]]} icon={blueIcon}>
              {zoomLevel > 17 && ( 
                <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                  <p style={{ color: '#151072', fontWeight: "800"}}>{position.adi + " " + position.alt_katego }</p>
                </Tooltip>
              )}
            </Marker>
          ))}
        </MapContainer>
        <div style={{marginLeft: "25%", marginRight: "25%", marginTop: "5%"}}>
        <ListGroup >
          {otoparkData.map((position, index) => (
            <ListGroup.Item variant="dark" key={index}>{position.adi + " " + position.alt_katego}</ListGroup.Item>
          ))}
        </ListGroup>
        </div>
        </>
      );
    }
  };
  
  export default OtoparkLocation;
  