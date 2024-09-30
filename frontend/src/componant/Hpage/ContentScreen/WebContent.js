import React from "react";
import { Fade } from "react-awesome-reveal";
import "./style/Content.css";

function WebContent() {

  
  const tapeItems = [
    ["Connect Souq", "Business Partner", "G Pavillion", "CRM", "Marketing", "Buyer&Seller"],
    ["Connect Souq", "Business Partner", "G Pavillion", "CRM", "Marketing", "Buyer&Seller"],
    ["Connect Souq", "Business Partner", "G Pavillion", "CRM", "Marketing", "Buyer&Seller"],
    ["Connect Souq", "Business Partner", "G Pavillion", "CRM", "Marketing", "Buyer&Seller"]
  ];
  const tapeItems1 = [
    ["Business Partner", "Buyer&Seller", "CRM", "G Pavillion", "Connect Souq", "Marketing"],
    ["Business Partner", "Buyer&Seller", "CRM", "G Pavillion", "Connect Souq", "Marketing"],
    ["Business Partner", "Buyer&Seller", "CRM", "G Pavillion", "Connect Souq", "Marketing"],
    ["Business Partner", "Buyer&Seller", "CRM", "G Pavillion", "Connect Souq", "Marketing"]
  ];

  return (
    <div className="webcontent" >
      <div className="home_tapes-component">
        <div className="tap-1">
          <div className="tape-wrapper is-1">
          <div className="tape-item scroll">
      {tapeItems.map((tapeItem, index) => (
        <div className="tape-text m-0" key={index}>
          {tapeItem.map((spanText, spanIndex) => (
            <span className="tape-span" key={spanIndex}>{spanText}</span>
          ))}
        </div>
      ))}
      </div>
          </div>
        </div>
        <div className="tap-2">
        <div className="tape-wrapper is-2">
        <div className="tape-item scroll">
      {tapeItems1.map((tapeItem, index) => (
        <div className="tape-text m-0" key={index}>
          {tapeItem.map((spanText, spanIndex) => (
            <span className="tape-span" key={spanIndex}>{spanText}</span>
          ))}
        </div>
      ))}
      </div>
          </div>
        </div>
      </div>
      <Fade direction="up" damping={1} triggerOnce={true}>
        <div
          className=" px-lg-4 pad-style">
          <div
            className="boxP"
            style={{
              width: "85%",
              height: "auto",
              borderRadius: 25,
            }}>
            <Fade direction="up" damping={1} triggerOnce={true} fraction={1}>
              <p className="welcomeContent">
                Welcome to Connect Souq, the premier Professional networking
                marketplace for B2B e-commerce, now offering a FREE one-year
                subscription! With a reach spanning over 30 countries, Connect
                Souq provides a unique platform for business owners, traders,
                and professionals to monetize their networks globally. Whether
                you're looking to expand your business, forge new partnerships,
                or explore new markets, Connect Souq is your ideal partner.
                <br /><br />
                Join us today and take advantage of this limited-time offer to
                connect, collaborate, and grow with like-minded professionals
                from around the world. Register now to claim your free
                subscription and unlock a world of opportunities with Connect
                Souq{" "}
                
              </p>
            </Fade>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default WebContent;
