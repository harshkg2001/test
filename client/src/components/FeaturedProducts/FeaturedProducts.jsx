import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
        Experience our alluring clothing collection. From the Ethereal Elegance Gown's enchanting lace and silk, to the Urban Voyager Jacket's sleek urban style, and the confident sophistication of the Dapper Luxe Suit, every piece narrates a unique tale. The Whimsical Whispers Dress weaves delicate embroidery into elegance, while the Rebel Edge Leather Jacket exudes bold rebellion. Find solace in the Serene Comfort Lounge Set, and complete your look with the timeless charm of the Timeless Classic Watch. Redefine yourself through our captivating designs.
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
