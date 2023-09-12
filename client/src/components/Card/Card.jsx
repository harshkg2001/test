import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

// This is a functional component called "Card" that takes an "item" prop.
const Card = ({ item }) => {
  return (
    // This is a Link component from React Router. It creates a link to a product detail page.
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {/* Conditional rendering: If "item.attributes.isNew" is truthy, display "New Season" */}
          {item?.attributes.isNew && <span>New Season</span>}
          {/* Display the main product image */}
          <img
            src={
              // Construct the URL for the main product image using environment variables and data from "item"
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url
            }
            alt=""
            className="mainImg"
          />
          {/* Display a secondary product image */}
          <img
            src={
              // Construct the URL for the secondary product image using environment variables and data from "item"
              process.env.REACT_APP_UPLOAD_URL + item.attributes?.img2?.data?.attributes?.url
            }
            alt=""
            className="secondImg"
          />
        </div>
        {/* Display the product title */}
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          {/* Display the old price (if available) or calculate a price by adding 20 to the current price */}
          <h3>₹{item.oldPrice || item?.attributes.price + 20}</h3>
          {/* Display the current price */}
          <h3>₹{item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

// Export the "Card" component so it can be used in other parts of the application.
export default Card;