import React, { useState } from "react";
import { useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://i.pinimg.com/originals/c5/15/8e/c5158ec3b55ac781c8ddd77a2d98a3ac.jpg",
    "https://reviewed-com-res.cloudinary.com/image/fetch/s--Q6k1-ghW--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1686778972972/nike-sneakers-hero.jpg",
    "https://www.thoughtco.com/thmb/UATf-Quw4S0fkFZiyVcR0fdrssM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/32716134786_ef6e02d6fb_k-5c3d514346e0fb0001af0f44.jpg",
    "https://i.pinimg.com/originals/93/c3/37/93c337c2d91456e23d1895f5479a4691.jpg",
    "https://i.pinimg.com/736x/a2/73/25/a273259b9feb7618e5193bc1dd715295--turkey-skechers.jpg",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1);
  };

  // auto scroll added.
  // ------------------------------------------------------------------------------------------------------------------------------------ //
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 2500;

  function auto()
  {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) 
      auto();

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  // ------------------------------------------------------------------------------------------------------------------------------------ //

  return (
    <div className="slider">
      <div className="container" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
        <img src={data[3]} alt="" />
        <img src={data[4]} alt="" />
        
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ArrowBackIosIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;