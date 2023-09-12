import React from "react";
import yvc from "./yvc.jpg" 
import harsh from "./harsh.jpeg"
import aniket from "./Aniket.jpg";
import "./services.css";

function Services() {
  let message ="";
  return (
    <section class="section-white">
      <div className="custom-container">
        <div className="custom-row">
          <div  className="custom-col-md-12 custom-text-center">
            <h2 class="section-title">The Team Behind Sneak Kar</h2>

            <p class="section-subtitle">{message}</p>
          </div>

          <div className="custom-col-sm-6 custom-col-md-4">
            <div class="team-item">
              <img
                src={harsh}
                class="team-img"
                alt="pic"
              />
              <h3>Harsh Kumar Gupta</h3>
              <div class="team-info">
                <p>Team Leader</p>
                <p>Developer</p>
              </div>
              <p>
                Hey , I am Harsh Kumar Gupta ! Currently I am a final year student at IIT Guwahati pursuing Electrical 
                and Electronics Engineering.
              </p>
              <p>
              Mob No: 6204671112
              </p>
              <p>
              Email Id: harshvsharsh2001@gmail.com
              </p>

              <ul class="team-icon">
              <li>
                  <a href="#" class="twitter">
                    <img class="fa fa-twitter"></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="pinterest">
                    <img class="fa fa-pinterest"></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="facebook">
                    <img class="fa fa-facebook"></img>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>

          <div className="custom-col-sm-6 custom-col-md-4">
            <div class="team-item">
              <img
                src= {yvc}
                class="team-img"
                alt="pic"
              />

              <h3>Yash Vijay Chute</h3>

              <div class="team-info">
                <p>Developer</p>
             
              </div>

              <p>
              Hey , I am Yash Vijay Chute ! Currently I am a final year student at IIT Guwahati pursuing Chemical Engineering.
              </p>
              <p>
              Mob No: 9156945102
              </p>
              <p>
              Email Id: yashvijay1002@gmail.com
              </p>

              <ul class="team-icon">
              <li>
                  <a href="#" class="twitter">
                    <img class="fa fa-twitter"></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="pinterest">
                    <img class="fa fa-pinterest"></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="facebook">
                    <img class="fa fa-facebook"></img>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="custom-col-sm-6 custom-col-md-4">
            <div class="team-item">
              <img
                src= {aniket}
                class="team-img"
                alt="pic"
              />

              <h3>Aniket Kumar</h3>

              <div class="team-info">
                <p>Developer</p>
              </div>

              <p>
              Hey , I am Aniket Kumar ! Currently I am a final year student at IIT Guwahati pursuing Electrical 
                and Electronics Engineering.
              </p>
              <p> </p>
              <p>Mob no: 7099539869</p>
              <p>Email Id: fabaniket246@gmail.com</p>

              <ul class="team-icon">
              <li>
              <a href="#" class="twitter">
                    <img class="fa fa-twitter"></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="pinterest">
                    <img class="fa fa-pinterest" ></img>
                  </a>
                </li>

                <li>
                  <a href="#" class="facebook">
                    <img class="fa fa-facebook"></img>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;