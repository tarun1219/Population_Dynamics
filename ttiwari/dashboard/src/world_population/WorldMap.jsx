import React, { useState, useEffect } from 'react';
import { feature, mesh } from 'topojson';
import { geoNaturalEarth1, geoPath, geoGraticule,json } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const url = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';
const width = 960;
const height = 500;
const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(url).then(topology => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};
const WorldMap = () => {
  const data = useData();

  if (!data) {
    return "Loading...";
  }

  return (
    <svg width={width} height={height}>
    <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    {data.land.features.map(feature => (
      <path className="land" d={path(feature)} />
    ))}
    <path className="interiors" d={path(data.interiors)} />
  </g>
    </svg>
  );
};

export default WorldMap