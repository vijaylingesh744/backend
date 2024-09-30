import React, { useState } from 'react'
import { BASE_URL } from "../../../utils/ApiRoute";
import { handleImageError, Imagesource, RedirectRoute } from "../../../utils/Function";
const user = JSON.parse(localStorage.getItem("LOGINDATA"))?.user

export const BPNotify = (item, HandleUpdate) => (
  <div className="card shadow-sm mb-1" key={item._id}>
    <div className="d-flex py-2">
      <div className="rounded-circle text-center" style={{ width: '10%' }}>
        <img
          src={item.user?.profile ? `${BASE_URL + item.user.profile}` : `/images/profile/img0${item.user.randomprofile}.png`}
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
          onError={handleImageError}
          alt="Profile"
        />
      </div>
      <div style={{ width: '70%' }}>
        <p className="mb-1 d-flex justify-content-start align-items-center column-gap-2">
          {item.status !== 1 ? `Hi ${user.first_name} ${user.last_name}, ${item.user.first_name} ${item.user.last_name} has sent you an invite, would you like to accept & explore the business opportunity?` : 'You have accepted the request for the respective user!'}
        </p>
        <div className="mb-1 font-weight-bold" style={{ color: item.status == 0 ? "orange" : item.status == 1 ? "#8ac43f" : "#e04d46" }}>
          {item.status == 0 ? <><i className="fa-solid fa-hourglass-end"></i> Pending List</> : item.status == 1 ? <><i className="fa-solid fa-circle-check"></i> Approved by Business Partner</> : <><i className="fa fa-ban" aria-hidden="true"></i> Rejected</>}
        </div>
      </div>
      <div className={`d-flex flex-column row-gap-2 ${item.status != 0 ? 'justify-content-center align-items-center' : ''}`}>
        <button
          onClick={() => HandleUpdate(item, 1)}
          disabled={item.status == 1 || item.status == 2}
          className="btn btn-connect small mx-1 d-flex justify-content-center align-items-center"
          style={{ fontSize: "11px", height: "30px", backgroundColor: "#4535C1", color: "white", maxWidth: '82px' }}
        >
          {item.status == 1 ? 'Approved' : item.status == 2 ? 'Rejected' : 'Approve'}
        </button>
        {item.status == 0 &&
          <button
            onClick={() => HandleUpdate(item, 2)}
            disabled={item.status == 1 || item.status == 2}
            className="btn btn-danger small mx-1"
            style={{ fontSize: "11px", height: "30px", color: "white" }}
          >
            Reject
          </button>
        }
      </div>
    </div>
  </div>
);


export const renderInvoiceCard = (item, handleTransactionId) => (
  <div className="d-flex align-items-center justify-content-between px-3 py-4 border-bottom" key={item.id}>
      <img
        src={item.users[0] && item.users[0]?.profile ? `${BASE_URL + item.users[0]?.profile}` : `/images/profile/img0${item.users[0].randomprofile}.png`}
        width={40}
        height={40}
        style={{ borderRadius: '50%' }}
        onError={handleImageError}
        alt="Profile"
      />
      <div style={{ width: "100%", fontSize: "14px", fontWeight: "400" }}>
        <p className="fontcontent1 text-dark1 font-weight-1 mb-n1 pl-4">
          {item.description}
        </p>
      </div>
      <div>
        <button
          onClick={() => window.location.href = "/connections"}
          className="btn btn-outline-connect rounded-01 fonthint py-1"
        >View</button>
      </div>
  </div>
);


