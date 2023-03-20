import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaticVisual from "./visuals/StaticVisual";
import InteractiveVisual from "./visuals/InteractiveVisual";
import SideBar from "./visuals/SideBar";
function App() {
  return (
    <BrowserRouter>
    <SideBar>
    <Routes>
        <Route exact path="/" element={<StaticVisual />} />
        <Route exact path="/interactive" element={<InteractiveVisual />} />
      </Routes>
    </SideBar>
    </BrowserRouter>
    
  );
}

export default App;
