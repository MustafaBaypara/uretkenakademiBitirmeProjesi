import { useState, useEffect } from 'react';

function useEczaneData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.chikitabot.net:58731/eczaneApi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Eczane verileri alınırken bir hata oluştu:', error));
  }, []);

  return { data };
}

export default useEczaneData;
