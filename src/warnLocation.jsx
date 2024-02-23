import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap, Popup } from 'react-leaflet';
import { ListGroup } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { redIcon, warnIcon } from './markerİcon';
import useWarnData from './warnapi';
import FileUploadComponent from './warnInput'
import "./warn.css"

const WarnLocation = (props) => {
    const [location, setLocation] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(14); // Başlangıç zoom seviyesi
    const { data: useWarnList } = useWarnData();
  
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
  
    if (location.length === 0) {
      return <p>Konum bilgisi alınıyor...</p>;
    } else {
      return (
        <div className='mapDiv'>
        <MapContainer center={location} zoom={zoomLevel} style={{ height: "400px", width: "400px", margin: "auto", marginTop: "5%" }} attributionControl={false}>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <UpdateZoom />
          <Marker position={location} icon={redIcon}>
            <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
              Buradasın.
            </Tooltip>
          </Marker>
          {useWarnList.map((position, index) => (
            <Marker key={index} position={[position.l_x, position.l_y]} icon={warnIcon}>
              {zoomLevel > 13 && ( // Sadece zoom seviyesi 15'ten büyükse Tooltip göster
                <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                  <p style={{ color: '#000', fontWeight: "800"}}>{position.Konu}</p>
                </Tooltip>
              )}
                  <Popup>
                  <p style={{ color: '#790f0f', fontWeight: "800"}}>{position.Konu}</p>
                  <br />
                  <p style={{ color: '#000', fontWeight: "500"}}>{position.Description}</p>
                  <br />
                  <p style={{ color: '#000', fontWeight: "500"}}>{position.Time}</p>
                  <img src={position.file} alt="resim" width="250px"/>
                </Popup>
            </Marker>
          ))}
        </MapContainer>
        <FileUploadComponent />
        <div style={{marginLeft: "25%", marginRight: "25%", marginTop: "5%"}}>
        <ListGroup >
          {useWarnList.map((position, index) => (
            <ListGroup.Item variant="dark" key={index}>{position.Konu}</ListGroup.Item>
          ))}
        </ListGroup>
        </div>
        </div>
      );
    }
  };
  
  export default WarnLocation;
  