import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
          We are on a journey of learning and growth. We strive to expand our horizons and make a positive impact on our surroundings. Our curiosity and dedication drive us to embrace challenges and seek opportunities for personal and academic development. With each step, we're shaping our futures and contributing to the world around us.
          </span>
        </div>
        <div className="item">
          <h1>Contact Us</h1>
          <span>
            
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Sneak Kar</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
