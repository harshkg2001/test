import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://assets.gqindia.com/photos/5cdc15df5400430f0a3c495a/16:9/w_2560%2Cc_limit/top-image8.jpg"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://www.autry-usa.com/upload/comunicazioni_home/230808_SNEAKERS_WOMAN@2x.jpg"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <img
            src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link">
              New Season
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000/m/884a/3619/4e56/2ed2/75e9/409c/0054/9be2/0a51/3583/3583.png"
                alt=""
              />
              <button>
                <Link to="/products/2" className="link">
                  Men
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <img
                src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to="/products/1" className="link">
                  Accessories
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://static01.nyt.com/images/2014/06/12/fashion/12SNEAKERS_SPAN-copy/12SNEAKERS_SPAN-copy-superJumbo-v2.jpg"
            alt=""
          />
          <button>
            <Link to="/products/2" className="link">
              Store
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
