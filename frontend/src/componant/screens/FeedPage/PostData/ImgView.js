import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { BASE_URL } from "../../../utils/ApiRoute";
const ImgView = (count, item, handleShow) => {
  if (count == 1) {
    return (
      <div
        className="d-flex"
        style={{
          maxWidth: '100%',
          width: '100%',
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding:'0rem 1rem'
        }} >

        {item.media_url.map((imgsrc, index) => {
          const extension = imgsrc.split('.').pop().toLowerCase();

          if (['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv'].includes(extension)) {
            return (
              <video
                key={index}
                src={BASE_URL + imgsrc}
                alt=""
                autoPlay
                className="selected-photo"

                style={{
                  objectFit: "cover",
                  height: "500px",
                  maxWidth: "650px",
                  width: "100%",
                  marginBottom: "10px"
                }}
                muted
                // onClick={() => handleShow(item.media_url, index)}
                controls
              />
            );
          } else if (["png", "jpg", "jpeg", "gif", "bmp"].includes(extension)) {
            return (
              <img
                key={index}
                src={BASE_URL + imgsrc}
                alt=""
                style={{
                  maxHeight: "600px",
                  width: "100%",
                  objectFit: "contain",
                  marginBottom: "10px",
                  borderRadius:'10px'
                }}
                onClick={() => handleShow(item.media_url, index)}
              />
            );
          } else {
            return (
              <img
                key={index}
                src={BASE_URL + imgsrc}
                alt=""
                style={{
                  maxHeight: "600px",
                  width: "100%",
                  objectFit: "contain",
                  marginBottom: "10px"
                }}
                onClick={() => handleShow(item.media_url, index)}
              />
            );
          }
        })}


      </div>
    );
  } else if (count == 2) {
    return (
      <div style={{ maxHeight: "500px", flexWrap: "wrap", width: '100%',padding:'0rem 1rem' }}>
        <div style={{borderRadius:'10px'}}>
          <img
            src={BASE_URL + "" + item.media_url[0]}
            alt=""
            className={"full-width"}
            onClick={() => handleShow(item.media_url, 0)}
          />
        </div>
        <div >
          <img
            src={BASE_URL + "" + item.media_url[1]}
            // style={{ height: "240px", width: "50%", objectFit: "cover" }}
            className={"full-width"}
            onClick={() => handleShow(item.media_url, 1)}
          />
          {/* <img
            src={BASE_URL + "" + item.media_url[2]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url,2)}
          /> */}
        </div>
      </div>
    );
  } else if (count == 3) {
    return (
      <div style={{ maxHeight: "500px", flexWrap: "wrap", width: '100%',padding:'0rem 1rem'}}>
        <div style={{borderRadius:'10px'}}>
          <img
            src={BASE_URL + "" + item.media_url[0]}
            alt=""
            className={"full-width"}
            onClick={() => handleShow(item.media_url, 0)}
          />
        </div>
        <div className="d-flex">
          <img
            src={BASE_URL + "" + item.media_url[1]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 1)}
          />
          <img
            src={BASE_URL + "" + item.media_url[2]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 2)}
          />
        </div>
      </div>
    );
  } else if (count == 4) {
    return (
      <div style={{ maxHeight: "500px", flexWrap: "wrap", width: '100%',padding:'0rem 1rem'}}>
        <div className="d-flex"style={{borderRadius:'10px'}}>
          <img
            src={BASE_URL + "" + item.media_url[0]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 0)}
          />
          <img
            src={BASE_URL + "" + item.media_url[1]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 1)}
          />
        </div>
        <div className="d-flex">
          <img
            src={BASE_URL + "" + item.media_url[2]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 2)}
          />
          <img
            src={BASE_URL + "" + item.media_url[3]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 3)}
          />
        </div>
      </div>
    );
  } else if (count == 5) {
    return (
      <div style={{ maxHeight: "500px", flexWrap: "wrap", maxWidth: '100%',padding:'0rem 1rem' }}>
        <div className="d-flex" style={{borderRadius:'10px'}}>
          <img
            src={BASE_URL + "" + item.media_url[0]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 0)}
          />
          <img
            src={BASE_URL + "" + item.media_url[1]}
            style={{ height: "240px", width: "50%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 1)}
          />
        </div>
        <div className="d-flex">
          <img
            src={BASE_URL + "" + item.media_url[2]}
            style={{ height: "240px", width: "33%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 4)}
          />
          <img
            src={BASE_URL + "" + item.media_url[3]}
            style={{ height: "240px", width: "33%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 3)}
          />
          <img
            src={BASE_URL + "" + item.media_url[4]}
            style={{ height: "240px", width: "34%", objectFit: "cover" }}
            onClick={() => handleShow(item.media_url, 4)}
          />
        </div>
      </div>
    );
  }
};

export default ImgView;
