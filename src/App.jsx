import React from 'react';
import { Router, Route } from 'wouter';
import Navbar from './components/Navbar';
import JumpToTopButton from './components/JumpToTopButton';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <JumpToTopButton />
        <Route path="/" component={Home} />
        <Route path="/:countryCode" component={CountryDetails} />
      </Router>
    </>
  );
}

export default App;
