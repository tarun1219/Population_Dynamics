import React, { useEffect, useState} from 'react';
import * as d3 from 'd3';

import '../App.css'
import { Dropdown } from './DropDown';
import FetchInteractiveData from '../fetchData/FetchInteractiveData';
const lists=[
    {value:'economicgrowth',label:'Economic Growth'},
    {value:'growth',label:'Population Growth'},
    {value: 'unemployment', label:'Unemployment Growth'},
    {value: 'year',label:'Year'}
];
const url= "http://127.0.0.1:5000/populationgrowth";
const label={
  "economicgrowth":"Economic Growth",
  "growth":"Population Growth",
  "unemployment":"Unemployment Growth",
  "year":'Year'
}

const w=700;
const h=500;
const margin={top:40,
      right:50,
      bottom:50,
      left:80
    };
const innerHeight = h - margin.top - margin.bottom;
const innerWidth = w - margin.left - margin.right;
const PredictedWorld=() => {
  
  const {data}=FetchInteractiveData();

  const initialxV = 'year';
  const[xV,setX]=useState(initialxV);

  const initialyV = 'growth';
  const[yV,setY]=useState(initialyV);
  
  if(!data){
    return <h3>Visualization not available due to no data availability</h3>;
  }

  const yValue = d => d[yV];
  const xValue = d => d[xV];
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight,0]);

  return (
    <>
      <div class='dropdown'>
      <label for="x-select">X:</label>
      <Dropdown
        options={lists}
        id="x-select"
        selectedValue={xV}
        onSelectedValueChange={setX}/>

      <label for="y-select"> Y:</label>

      <Dropdown
        options={lists}
        id="y-select"
        selectedValue={yV}
        onSelectedValueChange={setY}/> 
      </div>
      

    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {
          xScale.ticks().map(tickValue => (
              <g 
                key={tickValue} 
                transform={`translate(${xScale(tickValue)},0)`}>
                
                <line 
                  y2={h-120} 
                  stroke="lightgrey" 
                />
                
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
          yScale.ticks().map(tickValue => (
              <g>
                <line 
                  x2={w}
                  y1= {yScale(tickValue)}
                  y2= {yScale(tickValue)}
                  stroke="grey" />
                
                <text
                  key={tickValue}
                  style={{ textAnchor: 'end' }}
                  x={-3}
                  dy="8px"
                  y={yScale(tickValue)}>
                  {tickValue}
                </text>
              </g>
            )
          )
        }
        <line 
          x2={w} 
          stroke="lightgrey"/>

        <text className="text-label" x={w/2.4} y={h-55}>
          {label[xV]}
        </text>
        <text className="text-label" x={-300} y={h-550} transform='rotate(-90)'>
        {label[yV]}
        </text>
        
        {
          <path
          fill="none"
          stroke="red"
          d={d3.line()
            .x(d => xScale(d[xV]))
            .y(d => yScale(d[yV]))
            .curve(d3.curveNatural)(data)}/>}
         { data.map(d => (
            <circle class="worldchartcircle"
                cx={xScale(d[xV])}
                cy={yScale(d[yV])} 
                r={4}
            />
          ))
        }
      </g>
    </svg>
    </>
    
  );
};
export default PredictedWorld
