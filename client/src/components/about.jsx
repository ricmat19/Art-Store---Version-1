import React from "react";
import HeaderC from "./header";
import FooterC from "./footer";

const AboutC = () => {

  return (
    <div>
      <HeaderC />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>about</h1>
          </div>
          <div className="profile-info">
            {/* <div> */}
            {/* <div className="profile-image-div">
              <div className="justify-center">
                <img
                  className="big-image"
                  src="images/profile-image.jpg"
                  alt="profile"
                />
              </div>
              <div></div>
              <div></div>
            </div> */}
            <div className="about-info">
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_1}</h3>
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_2}</h3>
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default AboutC;
