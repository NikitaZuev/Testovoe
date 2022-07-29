import React from 'react';
import './App.css';
import Main from './components/main/main'
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/1"/>}/>
      <Route path="/:page" element={<Main/>}/>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
