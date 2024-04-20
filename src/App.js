
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import IndexPage from './IndexPage';
import IndexPages from './IndexPages';
import TranslatePage from './TranslatePage';


function App() {
  return (
    <BrowserRouter>
      <>hi
      <Routes>
        {/* <Route path="/" exact element={<IndexPage/>}></Route> */}
       
        <Route path="/" exact element={<IndexPages/>}></Route>
        <Route path="/translate" element={<TranslatePage/>}></Route>
    
  
      </Routes></>
    </BrowserRouter>
  );
}

export default App;

