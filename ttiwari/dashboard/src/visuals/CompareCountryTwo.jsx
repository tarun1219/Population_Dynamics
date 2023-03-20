import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from './DropDown';
import { csv,line, scaleLinear, max, format, extent, curveNatural, count } from 'd3';
import FetchCountry from '../fetchData/FetchCountry';
import FetchComparisonData from '../fetchData/FetchComparisonData';
import FetchunemploymentData from '../fetchData/FetchunemploymentData';
import FetchgrowthData from '../fetchData/FetchgrowthData';

const width = 960;
const height = 500;
const w = 960;
const h = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const CompareCountryTwo = () => {
  const initialxV = 'Greece';
  const[xV,setX]=useState(initialxV);
  let data;
  ({data}= FetchCountry());
  let country =data;
  ({data}=FetchgrowthData(xV));
  let growth=data;
  ({data}=FetchunemploymentData(xV));
  let country_name=[]
  for (let i = 0; i < country.length; i++) {
  country_name.push(country[i].code);
  }
  
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.year;
  const xAxisLabel = 'Years';

  const yValue = d => d.growth;
  const yAxisLabel = 'Percentage';

  const x2Value = d => d.year;
  const y2Value = d => d.unemployment;
  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(growth, xValue))
    .range([0, innerWidth])
    .nice();
  
  const yScale = scaleLinear()
    .domain(extent(growth, yValue))
    .range([innerHeight,0]);
  
    const x2Scale = scaleLinear()
    .domain(extent(data, x2Value))
    .range([0, innerWidth])
    .nice();
  
  const y2Scale = scaleLinear()
    .domain(extent(data, y2Value))
    .range([innerHeight,0]);
  return (
    <>
    <div class='dropdown_compare'>
    <Dropdown
        options={country}
        id="country-select"
        selectedValue={xV}
        onSelectedValueChange={setX}/>
    </div>
    
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {
          xScale.ticks().map(tickValue => (
              <g 
                key={tickValue} 
                transform={`translate(${xScale(tickValue)},0)`}>   
                
                <line 
                  y2={h-100} 
                  stroke="lightgrey" 
                />
                
                <text
                  style={{ textAnchor: 'middle' }}
                  dy="16px"
                  y={h-90}>
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
                  stroke="white" />
                
                <text
                  key={tickValue}
                  style={{ textAnchor: 'end' }}
                  x={-3}
                  dy="0px"
                  y={yScale(tickValue)}>
                  {tickValue}
                </text>
              </g>
            )
          )
        }
        <line 
          x2={w} 
          stroke="white"/>

        <text className="text-label" x={w/2.4} y={h-55}>
          {xAxisLabel }
        </text>
        <text className="text-label" x={-300} y={h-750} transform='rotate(-90)'>
        {yAxisLabel }
        </text>
        
        {
          <path
          fill="none"
          stroke="green"
          d={line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.growth))
            .curve(curveNatural)(growth)}/>}
         { growth.map(d => (
            <circle class="circle2"
                cx={xScale(d.year)}
                cy={yScale(d.growth)} 
                r={3}
            />
          ))
        }
        {
          <path
          fill="none"
          stroke="black"
          d={line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.unemployment))
            .curve(curveNatural)(data)}/>}
         { data.map(d => (
            <circle class="circle1"
                cx={xScale(d.year)}
                cy={yScale(d.unemployment)} 
                r={3}
            />
          ))
        }
      </g>
    </svg>
    </>
  );
};
export default CompareCountryTwo