import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogsCard from './components/BlogsCard';
import BlogDetails from './components/BlogDetails';
import Favourites from './components/Favourites';
// import BlogsCard from './pages/BlogsCard';
// import Favourites from './pages/Favourites';
// import BlogDetails from './pages/BlogDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<BlogsCard />} />
        <Route path='/details/:index' element={<BlogDetails/>}/>
        <Route path='/favourite' element={<Favourites />}/>
      </Routes>
    </Router>
  );
}

export default App;
