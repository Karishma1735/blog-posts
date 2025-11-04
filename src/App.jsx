import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogsCard from './components/BlogsCard';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BlogsCard />} />
        <Route path='/details/:index' element={<BlogDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
