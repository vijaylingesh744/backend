import React, { useEffect, useState } from 'react';
import FetchData from '../../../fetch-api/Apifetch';
import { BASE_URL } from '../../../utils/ApiRoute';
import { handleImageError, capitalizeFirstLetter } from '../../../utils/Function';


export const UserList = (
  {
    NotifyActive,
    setSwipe,
    ChatUser,
    setNotifyActive,
    setSelectedItem,
    // setAgreeVisable,
    UserImg,
    user,
    setResponsiveView
  }) => {

  const [ClientChat, setClientChat] = useState([]);

  useEffect(() => {
    ListDataChat()
    console.log();
  }, []);

  const ListDataChat = async () => {
    const clientResponse = await FetchData("chatclient/" + user._id, "GET", null, false, false);
    console.log("clientResponse", clientResponse.data.filter(item => item?.othernotify?.status == "1"))
    setClientChat(clientResponse.data.filter(item => item?.othernotify?.status == "1"))
  }

  const EmptyCard = () => {
    return (
      <div
        className="container-fluid w-100 d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="w-100 d-flex align-items-center row-gap-1 flex-column justify-content-center">
          <span className="fontsubtitle font-weight-bold text-dark1">
            No connection yet?
          </span>
          <a>
            <span
              className="fontsubtitle font-weight-1 text-connect1"
              role="button"
            >
              Let's Start connecting
            </span>
          </a>
          <span className="fontcontent2 font-weight-light text-secondary1">
            Find more people
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="fontcontent1 ml-4"
      style={{
        fontSize:"18px",
        fontWeight:"600"
      }}
      >Chat List</p>
      <div className={`container-fluid mt-1 p-2 rounded mb-2 background${-4 === NotifyActive ? '3' : '4'}`}
        style={{width:"280px"}}
        onClick={(e) => {
          setSwipe(0)
          setResponsiveView(true)
          setNotifyActive(-4)
        }}>
        <div className='d-flex column-gap-2 align-items-center pl-1'>
          <img src={"/images/profile/img00.png"} style={{ width: '35px', height: '35px', borderRadius: "50%", minWidth: '35px' }} />
          <div className='d-flex flex-column gap1 w-50'>
            <span className={`name1${-4 !== NotifyActive ? "grey" : ""}`}>
            SAMI AI
            </span>
            <span className='name2' style={{ textAlign: "right", color: -4 !== NotifyActive ? "#0B1BAA" : "white" }}>AI Assistant</span>
          </div>
          <div className='d-flex flex-column gap align-items-center'>
          </div>
        </div>
      </div>
      {Array.isArray(ChatUser) && ChatUser.sort((a,b) => b?.chatCount - a?.chatCount).map((item, index) => (
        <div key={index}
          className={`container-fluid mt-1 p-2 rounded  mb-2 background${index == NotifyActive ? '3' : '4'}`}
          style={{width:"280px"}}
          onClick={(e) => {
            setNotifyActive(index)
            setSelectedItem(item)
            if (item?.status == 1) {
              setSwipe(2)
            }
            setResponsiveView(true)
          }}>
          <div className='d-flex column-gap-2 align-items-center pl-1'>
            <img
              // src={"/images/profile/" + UserImg[item.users?.randomprofile]} 
              src={`${item.users?.profile ? `${BASE_URL + item.users?.profile}` : `/images/profile/img0${item.users?.randomprofile}.png`}`}
              onError={handleImageError}
              style={{ width: '35px', height: '35px', borderRadius: "50%", minWidth: '35px' }} />
            <div className='d-flex flex-column gap1' style={{ width: '80%' }}>

              <span className={`name1${index !== NotifyActive ?"grey" : ""}`} style={{ display: "flex", justifyContent: "space-between",fontSize:"12px" }}>
                {capitalizeFirstLetter(item.users?.first_name) + " " + item.users?.last_name}
                <span style={{ color: index != NotifyActive ? "yellowgreen" : "white" }}>
                  {item.users.user_type == "1" ? "BP" : item.users.user_type == "0" ? "B" : "S"}</span>
              </span>
              <span className={`name${index == NotifyActive ?'1':"2"} text-dark1 fontcontent2`} style={{ width: '100%', display: "flex", justifyContent: "space-between" }}>
                <span style={{ width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {item?.last_msg ? item?.last_msg : "Write a message."}
                </span>
                {item.chatCount ? <span className='badge-counter'>{item.chatCount}</span> : ""}
              </span>
            </div>
          </div>
        </div>
      ))}
      {
        ((Array.isArray(ChatUser) && ChatUser.length == 0) || !Array.isArray(ChatUser)) && <EmptyCard />
      }
    </>
  )
}
