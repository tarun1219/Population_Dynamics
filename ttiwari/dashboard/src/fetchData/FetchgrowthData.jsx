import React, { useState, useEffect } from 'react';



const FetchgrowthData = (xV) => {
  let country_name=xV;
  const url= 'http://127.0.0.1:5000/growth?data='+country_name;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  return {data};
};

export default FetchgrowthData;