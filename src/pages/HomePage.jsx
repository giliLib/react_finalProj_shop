import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
// import vegatablesImage from '/Img/vegatables.png';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './homePage.css';

const HomeScreen = () => {
  const images = [
    `http://localhost:5500/api/images/sale1.png`,
    `http://localhost:5500/api/images/sale2.png`,
    `http://localhost:5500/api/images/sale3.png`,

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  const handleStartShopping = () => {
    navigate('/productList');
  };

  return (
    <>
      <div id='imgCaption'>
        <img id='homePageImg'
          src={`http://localhost:5500/api/images/vegatables.png`}
          alt="Vegatables"
        />

        <div id='caption'>
          <Typography variant="h4" sx={{
            color: '#222', // צבע כהה יותר
            mb: 1,
            
          }}>
            שופרסל מזמינה אותך
          </Typography>
          <Typography variant="h4" sx={{
            color: '#1976d2', // צבע כחול בהיר יותר
            mb: 2,
            
          }}>
            לחווית קניות פשוטה ומהירה
          </Typography>
        </div>
        <div id='space'></div>
      </div>
      <Button variant="contained" color="primary" onClick={handleStartShopping} sx={{ marginBottom: 2, marginLeft: "950px", height: "70px", borderRadius: "20px" }}>
        <p id='startShopping'>התחלת קניה</p>
        <ShoppingCartIcon sx={{ mr: 1 }} />
      </Button>
      <Paper elevation={3} id="slide">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{ width: '100%', display: 'block', height: "200px", borderRadius: "15px" }}
        />
      </Paper>

    </>
  );
};

export default HomeScreen;