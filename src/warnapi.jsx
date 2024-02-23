import { useState, useEffect } from 'react';

function useWarnData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://80.253.246.249:58731/apiGET')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Warn verileri alınırken bir hata oluştu:', error));
  }, []);

  return { data };
}

export default useWarnData;
