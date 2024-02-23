import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EczaneLocation from './eczaneLocation';
import EsarjLocation from './esarjLocation';
import WifiLocation from './wifiLocation';
import WarnLocation from './warnLocation';
import SporLocation from './sporLocation';
import OtoparkLocation from './otoparkLocation';
import TarihiLocation from './tarihiLocation';
import BusApp from './Bus';
import { Navbar, Container, Nav, Button, Card } from 'react-bootstrap';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  return (
    <div className="App">
        <header>
        <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="/uretkenakademiBitirmeProjesi" style={{ fontSize: '30px', textAlign: "center",  marginLeft: "auto", fontFamily: "Russo One"}}>BursaBul</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
        </Container>
      </Navbar>
        </header>
        <main>
        <Routes>
             <Route path="/eczane" element={<EczaneLocation />} />
            <Route path="/esarj" element={<EsarjLocation />} />
            <Route path="/wifi" element={<WifiLocation />} />
            <Route path="/warn" element={<WarnLocation />} />
            <Route path="/spor" element={<SporLocation />} />
            <Route path="/Bus" element={<BusApp />} />
            <Route path="/otopark" element={<OtoparkLocation />} />
            <Route path="/tarih" element={<TarihiLocation />} />
        <Route path="/uretkenakademiBitirmeProjesi" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

// Ana sayfa bileşeni
function HomePage() {
  return (
    <>
    <div>
      <h2 style={{textAlign: "center", marginTop: "5%", fontFamily: '"Russo One", sans-seri'}}>Adresin kolay yolu</h2>
    </div>
    <div className="menu">
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto"}}>
          <Card.Img variant="top" src="warn.png" alt="Warn" />
          <Card.Body>
            <Card.Title>Acil Durumlar</Card.Title>
            <Link to="/warn">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="eczane.jpg" alt="Eczane" />
          <Card.Body>
            <Card.Title>Nöbetçi Eczaneler</Card.Title>
            <Link to="/eczane">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="bus.png" alt="Wifi" />
          <Card.Body>
            <Card.Title>Otobüs Takip</Card.Title>
            <Link to="/Bus">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="otopark.png" alt="Wifi" />
          <Card.Body>
            <Card.Title>Otoparklar</Card.Title>
            <Link to="/otopark">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="esarj.png" alt="Esarj" />
          <Card.Body>
            <Card.Title>Sarj İstasyonları</Card.Title>
            <Link to="/esarj">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="wifi.png" alt="Wifi" />
          <Card.Body>
            <Card.Title>Wifi Noktaları</Card.Title>
            <Link to="/wifi">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="sport.png" alt="Wifi" />
          <Card.Body>
            <Card.Title>Spor Tesisleri</Card.Title>
            <Link to="/spor">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <div className="menu-item">
        <Card style={{ width: '18rem', margin: "auto" }}>
          <Card.Img variant="top" src="tarih.png" alt="Wifi" />
          <Card.Body>
            <Card.Title>Tarihi Mekanlar</Card.Title>
            <Link to="/tarih">
              <Button style={{marginTop: "20px"}} variant="dark">Detaylar</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
    </>
  );
}

export default Home;
