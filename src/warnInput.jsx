import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FileUploadComponent = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(new File([], ''));
    const [location, setLocation] = useState([]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Temizleme işlevi
        return () => {
            clearInterval(intervalID);
        };
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        var timeData = time.getHours() + time.getMinutes() + time.getSeconds();
        const data = {
            "Konu": topic,
            "Description": description + "\n",
            "Time": time.toLocaleTimeString(),
            "l_x": location[0],
            "l_y": location[1],
            "file": file.name ? `https://api.chikitabot.net:58731/photos/${timeData}${file.name}` : ""
        }
        const url = 'https://api.chikitabot.net:58731/uploadjson';
        await fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // JSON veri gönderdiğimizi belirtiyoruz
            },
            body: JSON.stringify(data) // Veriyi JSON formatına dönüştürüp gönderiyoruz
        });

        const formData = new FormData();
        formData.append('file', file, timeData + file.name);

        try {
            const response = await fetch('https://api.chikitabot.net:58731/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Dosya yüklenirken bir hata oluştu.');
            }

        } catch (error) {
            console.error('Hata:', error.message);
        }

        setShowPopup(false);
        window.location.reload();
    };

    return (
        <div>
        <Button variant="danger" style={{marginTop: "20px"}} onClick={() => setShowPopup(true)}>Acil Bildiri!</Button>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTopic">
                <Form.Label>Konu:</Form.Label>
                <Form.Control type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Açıklama:</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
              </Form.Group>
              <Form.Group controlId="formFile">
                <Form.Label>Dosya Yükle:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button variant="primary" type="submit" style={{marginTop: "20px"}}>Gönder</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
};

export default FileUploadComponent;
