import React from 'react'
import ScatterPlot from './PredictedWorld'
import BarChart from '../visuals/BarChart'
import '../index.css';
import WorldMap from '../world_population/WorldMap';
import PredictedWorld from './PredictedWorld';
import CompareCountryOne from './CompareCountryOne';
import CompareCountryTwo from './CompareCountryTwo';
import PopulationCompareOne from './PopulationCompareOne';
import PopulationCompareTwo from './PopulationCompareTwo';
function SystemInbox() {
  return (
    <div>
      <div className='title'>
        <h1>Global Population Dynamics</h1>
        <h1></h1>
        <br/>
      </div>
      <div className='map'>
        <div><WorldMap/></div>
      </div>
      <div className='heading'>
        <h3>Predicted economic factors</h3>
        <br/>
      </div>
      <div className='map'>
        <div><PredictedWorld/></div>
      </div>

      <div className='heading'>
        <h2>Comparison of Economic Factors</h2>
        <br/>
      </div>
      <div className='sidebyside'>
        <div><CompareCountryOne/></div>
        <div><CompareCountryTwo/></div>
      </div>
      <div className='heading'>
        <h2>Comparison of Populations</h2>
        <br/>
      </div>
      <div className='sidebyside'>
        <div><PopulationCompareOne/></div>
        <div><PopulationCompareTwo/></div>
      </div>
    </div>
    
    // <div className='sidebyside'>
    //   <div><BarChart/></div>
    //   <div><ScatterPlot/></div>
    // </div>
  )
}

export default SystemInbox