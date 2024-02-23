import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker,Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from 'react-bootstrap';


const MapComponent = (props) => {
  const [busData, setBusData] = useState({});
  const [ortData, setOrtData] = useState([]);
  const HeaderMap = () => {
  return props.code}
  function removeMap(props) {
    const element = document.getElementById(props.id);
    if (element.className === 'mapClass') { 
      localStorage.setItem('savedData', localStorage.getItem('savedData').replace("%%" + props.code, ''));
    element.remove();
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bursakartapi.abys-web.com/api/static/realtimedata',
        {
          headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "tr-TR,tr;q=0.8",
            "content-type": "application/json",
          },
          body: JSON.stringify({ keyword: props.code }),
          method: "POST",
        });
        if (!response.ok) {
          throw new Error('Veri alınamadı');
        }
        const jsondata = await response.json();

        setBusData(jsondata["result"]);

      } catch (error) {
        console.error('Hata:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);
    fetchData();

    return () => clearInterval(interval);}, []);

  useEffect(() => {
    if (busData.length > 0) {
      const enlemOrtalamasi = busData.reduce((acc, cur) => acc + cur.enlem, 0) / busData.length;
      const boylamOrtalamasi = busData.reduce((acc, cur) => acc + cur.boylam, 0) / busData.length;

      setOrtData([enlemOrtalamasi, boylamOrtalamasi]);
    }
  }, [busData]);

  if (busData.length === 0 || ortData.length === 0) {
    return null;
  }

  return (
    <div className='mapClass' id={props.id}>
    <h2>{HeaderMap()}</h2>
    <MapContainer center={[ortData[0], ortData[1]]} zoom={13} style={{ height: "400px", width: "400px"}} attributionControl={false}>
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {busData.map((position, index) => (
        <>
        <Marker key={index} position={[position.enlem, position.boylam]}></Marker>
        <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
          <p style={{ color: '#000', fontWeight: "500"}}>{position.plaka}</p>
        </Tooltip>
        </>
      ))}
    </MapContainer>
    <Button variant="danger" type="submit" style={{marginTop: "20px", marginBottom: "10px"}} onClick={() => removeMap(props)}>Kaldır</Button>
    </div>
  );
};

export default MapComponent;
