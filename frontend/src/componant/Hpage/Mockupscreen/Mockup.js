import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import "./styles/mockup.css";

const Mockup = () => {
  return (
    <div className="backgroundimg mt-5 d-flex align-items-center justify-content-center">
      <div className="card w-90 w-sm-100 h-75 rounded-1 py-5" style={{background:'#7BC678'}}>
      <div className="row align-items-center h-100 w-100  py-4 py-lg-0">
        <div className="col-lg-7 pl-5 col-sm-12 d-flex justify-content-center py-4 py-lg-0">
          <Fade direction="left" damping={1}>
            <div className="d-flex flex-column gap-3 px-lg-5 px-2">
              {/* <span>
                <h3
                  style={{ fontSize: "26px", fontWeight: 800, color: "white" }}
                >
                  Why wait?
                </h3>
              </span> */}
              <span>
                <h3 style={{ fontSize: "30px", fontWeight: 900, color: "white" }}>
                  Become a CS member now by downloading our app from
                </h3>
              </span>
              <div>
              </div>
              
              <div className="d-flex " style={{ columnGap: 20 }}>
                <div
                  className="rounded-2 d-flex p-2"
                  style={{
                    background: "black",
                    columnGap: 15,
                    width: '160px',
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/assets/icons/apple-xxl.png"
                    width={35}
                    height={35}

                  />
                  <div className="d-flex flex-column ">
                    <span
                      style={{
                        color: "white",
                        letterSpacing: 0.5,
                        fontSize: 13,
                        fontWeight: 400,
                      }}
                    >
                      Get it on
                    </span>
                    <span
                      style={{
                        color: "white",
                        letterSpacing: 0.7,
                        fontSize: "1.025rem",
                        fontWeight: 600,
                      }}
                    >
                      AppStore
                    </span>
                  </div>
                </div>
                <div
                  className="rounded-2 d-flex p-2"
                  style={{
                    background: "black",
                    columnGap: 15,
                    width: '180px',
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/assets/icons/playstore.webp"
                    width={35}
                    height={35}
                  />
                  <div className="d-flex flex-column ">
                    <span
                      style={{
                        color: "white",
                        letterSpacing: 0.5,
                        fontSize: 13,
                        fontWeight: 400,
                      }}
                    >
                      Download it on
                    </span>
                    <span
                      style={{
                        color: "white",
                        letterSpacing: 0.7,
                        fontSize: "1.025rem",
                        fontWeight: 600,
                      }}
                    >
                      Google Play
                    </span>
                  </div>
                </div>
              </div>
              <span>
                <h3
                  style={{ fontSize: "22px", fontWeight: 800, color: "white" }}
                >
                  or
                </h3>
              </span>
              <div
                className="d-flex align-items-center flex-wrap row-gap-3"
                style={{ columnGap: 20 }}
              >
                {/* <div
                  onClick={() =>
                    (window.location.href =
                      "/login")
                  }
                  className="rounded-2 d-flex px-2 py-2"
                  style={{
                    background: "white",
                    columnGap: 18,
                    width: "fit-content",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "black",
                      letterSpacing: 0.5,
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    Join now
                  </span>
                </div> */}
                <button class="button-54" style={{border: "none", color: 'white', fontSize: '20px', fontWeight: 600, fontFamily: 'poppins', width: '120px', height: '40px'}}></button>
                <span
                  style={{ fontSize: "22px", fontWeight: 700, color: "white" }}
                >
                  to become a member
                </span>
              </div>
            </div>
          </Fade>
        </div>
        <div className="col-lg-5 col-sm-12 d-flex justify-content-center">
          <Fade direction="right" damping={1}>
            <div className="floating-image">
              <img src="assets/images/Group 8787 (1).png" />
            </div>
            <div className="floating-image1 d-none d-lg-block">
              <img src="assets/images/mockupmob.png" />
            </div>
          </Fade>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Mockup;
