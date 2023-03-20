import React, { useState, useEffect } from 'react';



const FetchComparisonData = (xV) => {
  let country_name=xV;
  const url= 'http://127.0.0.1:5000/aruba?data='+country_name;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  return {data};
};

export default FetchComparisonData;