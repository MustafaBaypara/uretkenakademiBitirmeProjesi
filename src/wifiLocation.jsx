import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { redIcon, wifiIcon } from './markerİcon';
import wifiData from './BBBWifi';
import { ListGroup } from 'react-bootstrap';

const WifiLocation = (props) => {
    const [location, setLocation] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(17); // Başlangıç zoom seviyesi
  
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
  
    if (location.length === 0 || wifiData.length === 0) {
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
          {wifiData.map((position, index) => (
            <Marker key={index} position={[position.koor_x, position.koor_y]} icon={wifiIcon}>
              {zoomLevel > 17 && ( // Sadece zoom seviyesi 15'ten büyükse Tooltip göster
                <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                  <p style={{ color: '#151072', fontWeight: "800"}}>{position.adi}</p>
                </Tooltip>
              )}
            </Marker>
          ))}
        </MapContainer>
        <div style={{marginLeft: "25%", marginRight: "25%", marginTop: "5%"}}>
        <ListGroup >
          {wifiData.map((position, index) => (
            <ListGroup.Item variant="dark" key={index}>{position.adi}</ListGroup.Item>
          ))}
        </ListGroup>
        </div>
        </>
      );
    }
  };
  
  export default WifiLocation;
  