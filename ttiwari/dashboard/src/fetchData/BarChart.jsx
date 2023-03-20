import React, { useState,useEffect } from 'react';
import * as d3 from 'd3';
import '../App.css'
const csvUrl ='https://gist.githubusercontent.com/tarun1219/b25c8e5c3c9ae0ebda170f34a5b5a8cb/raw/7a59b23f223340e4c1580f848d2bc61e62b4f7c2/avgrent.csv'
const w=200;
const h=300;
const margin={top:50,
      right:0,
      bottom:50,
      left:200
    };
const useData=()=>{
  const [data,setData]=useState(null);

    useEffect(() => {
      d3.csv(csvUrl).then(data => {
          setData(data.slice(0, 10));
        }
      );
    }, []);

  return data;
}
const BarChart=() => {
  const data= useData();

  if(!data){
    return <h3>Visualization not available due to no data availability</h3>;
  }

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Place))
    .range([0, h - 100])
    .paddingInner(0.3);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Price)])
    .range([0,w-300]);
  
  return (
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {
          xScale.ticks().map(tickValue => (
              <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
                <text
                  style={{ textAnchor: 'middle' }}
                  dy="16px"
                  y={h-100}>
                  {tickValue}
                </text>
              </g>
            )
          )
        }
        {
          yScale.domain().map(tickValue => (
              <text
                key={tickValue}
                style={{ textAnchor: 'end' }}
                x={-3}
                dy="8px"
                y={yScale(tickValue) + yScale.bandwidth() / 2}>
                {tickValue}
              </text>
            )
          )
        }
        <text className="text-label"
            x={w/3.6} y={h-55}>
          Avg Rent (in $)
        </text>
        <text className="text-label" x={-180} y={h-300}>
          County
        </text>
        {
          data.map(d => (
            <rect 
                key={d.Place}
                x={0}  
                y={yScale(d.Place)} 
                width={xScale(d.Price)} 
                height={yScale.bandwidth()}
            />
          ))
        }
      </g>
    </svg>
  );
};
export default BarChart
