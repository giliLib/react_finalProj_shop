import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './HomePage.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  const images = [
    `http://localhost:5500/api/images/sale1.png`,
    `http://localhost:5500/api/images/sale2.png`,
    `http://localhost:5500/api/images/sale3.png`,
  ];

  const handleStartShopping = () => {
    navigate('/productList');
  };

  return (
    <>
      <div id='imgCaption'>
        <img
          id='homePageImg'
          src={`http://localhost:5500/api/images/vegatables.png`}
          alt="Vegatables"
        />

        <div id='caption'>
          <Typography variant="h4" sx={{ color: '#222', mb: 1 }}>
            שופרסל מזמינה אותך
          </Typography>
          <Typography variant="h4" sx={{ color: '#1976d2', mb: 2 }}>
            לחווית קניות פשוטה ומהירה
          </Typography>
        </div>
        <div id='space'></div>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleStartShopping}
        sx={{
          marginBottom: 2,
          marginLeft: "950px",
          height: "70px",
          borderRadius: "20px"
        }}
      >
        <p id='startShopping'>התחלת קניה</p>
        <ShoppingCartIcon sx={{ mr: 1 }} />
      </Button>

      <Paper
  elevation={3}
  id="slide"
  sx={{
    borderRadius: "15px",
    overflow: "hidden",
    width: "100%",            // מגביל את הרוחב ל־90% מהמסך
    maxWidth: "1000px",      // מגביל רוחב מוחלט
    margin: "0 auto",        // ממרכז את האלמנט
    mt: 2
  }}
>
  <Swiper spaceBetween={30} slidesPerView={1} loop autoplay={{ delay: 3000 }}>
    {images.map((imgSrc, index) => (
      <SwiperSlide key={index}>
        <img
          src={imgSrc}
          alt={`Slide ${index + 1}`}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </SwiperSlide>
    ))}
  </Swiper>
</Paper>

    </>
  );
};

export default HomeScreen;
