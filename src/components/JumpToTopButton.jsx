import React, { useState, useEffect } from 'react';
import './JumpToTopButton.css'; // Create a CSS file for styling the button
import Arrow_Icon from "../assets/up_arrow.svg";

const JumpToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scroll event
  // pageOffsetY depreciated, replaced with scrollY
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling behavior
    });
  };

  return (
    <div className={isVisible ? 'scroll-to-top-btn show' : 'scroll-to-top-btn'} onClick={scrollToTop}>
      <img src={Arrow_Icon} className="w-7 h-7 pointer-events-none select-none" />
    </div>
  );
};

export default JumpToTopButton;