import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { redIcon, blueIcon } from './markerİcon';
import useEczaneData from './eczaneapi';
import { ListGroup } from 'react-bootstrap';


const EczaneLocation = (props) => {
  const [location, setLocation] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(14); // Varsayılan zoom seviyesi
  const { data: eczaneList } = useEczaneData();

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

  // Zoom seviyesini güncellemek için bir bileşen
  function ZoomListener() {
    useMapEvents({
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
      },
    });
    return null;
  }

  if (location.length === 0 || !eczaneList || eczaneList.length === 0) {
    return <p>Konum bilgisi alınıyor...</p>;
  } else {
    return (
      <>
      <MapContainer center={location} zoom={zoomLevel} style={{ height: "400px", width: "400px", margin: "auto", marginTop: "5%" }} attributionControl={false}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomListener />
        <Marker position={location} icon={redIcon}>
          <Tooltip direction="bottom" offset={[0, 0]} opacity={1} permanent>
            Buradasın.
          </Tooltip>
        </Marker>
        {eczaneList.map((position, index) => (
          <Marker key={index} position={[position.latitude, position.longitude]} icon={blueIcon}>
            {zoomLevel > 13 ? ( // Zoom seviyesi 15'ten büyükse Tooltip göster
              <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
                <p style={{ color: '#c80000', fontWeight: "800"}}>{position.isim}</p>
              </Tooltip>
            ) : null}
            <Popup>
              {position.isim}
              <br />
              {position.bilgiler}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{marginLeft: "25%", marginRight: "25%", marginTop: "5%"}}>
      <ListGroup >
        {eczaneList.map((position, index) => (
          <ListGroup.Item variant="dark" key={index}>{position.isim}</ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      </>
    );
  }
}

export default EczaneLocation;
