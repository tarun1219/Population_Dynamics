import React from 'react';
import * as d3 from 'd3';
import '../App.css'
import FetchStaticData from '../fetchData/FetchStaticData';
const w=800;
const h=500;
const margin={top:30,
      right:30,
      bottom:30,
      left:130
    }; 
const BarChart=() => {

  const {data}=FetchStaticData();
  
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
    <>
    <div>
    <h3>Average rent Per County</h3>
    <svg 
      width={w}
      height={h}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        
        {
          xScale.ticks().map(tickValue => (
              <g 
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
              >
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

        <line 
          y2={h-120}
          stroke="lightgrey"
        />

        <text 
          className="text-label"
          x={w/3.6}
          y={h-55}
        >
            Avg Rent (in $)
        </text>

        <text
          className="text-label"
          x={-220} 
          y={h-600} 
          transform='rotate(-90)'>
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
    </div>
    </>
  );
};
export default BarChart
