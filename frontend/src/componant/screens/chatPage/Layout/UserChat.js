import React from 'react'
import { BASE_URL } from '../../../utils/ApiRoute';
import { handleImageError } from '../../../utils/Function';
import { ChatSuggest } from '../../layout/Shimmer';
export const ChatView =  ({setSwipe,
    timeElapsed,
    user,
    apiResponseReceived,
    UserImg,
    ClientNotification,
    setSelectedItem,
    setResponsiveView

}) => {
  
    return (
      <div
        id="background4"
        className=" d-block h-100">
        <div className="container-fluid rounded-2 d-flex justify-content-between py-2 pl-4 background shadow-sm"
          style={{ position: "sticky", top: "-1%" }} >
          <div className="d-flex column-gap-2 align-items-center">
          <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={()=>setResponsiveView(false)}/>
            <img src="/images/profile/img06.png" style={{ width: 33, height: 33 }} />
            <div className="d-flex flex-column">
              <span className="chatname fontsubtitle">Sami AI</span>
              <span className="chatactive ">last seen 3 hours ago</span>
            </div>
          </div>
         
        </div>
        <div className="chat-container container-fluid background1 mt-1 py-3 h-100">
          <div className="chat-messages">
            <p className="chattime text-center">Today 12:27 PM</p>
            {timeElapsed >= 1000 && (
              <span className="px-3 pt-3 my-2 bot-message">
                Hi {user?.first_name}
                <p className="mb-0 mx-25 pt-2 pb-1 botmessagetime">03:41 PM</p>
              </span>
            )}
            {timeElapsed >= 1600 && (
              <span className="px-3 pt-3 my-2  bot-message">
                Let's find you some suitable Business Partners to <br/>skyrocket your sales.
                <p className="mb-0 mx-25 pt-2 pb-1 botmessagetime">03:41 PM</p>
              </span>
            )}
            {timeElapsed >= 1800 && !apiResponseReceived && (
              <ChatSuggest />
            )}

            {apiResponseReceived && ClientNotification.slice(0, 10).map(item => (
              <div className="bg-white border-bottom container d-flex justify-content-between my-1 py-0 w-100">
                <div className="align-items-center d-flex">
                  <img
                    // src={`/images/profile/${UserImg[item?.userdata?.randomprofile]}`}
                    src={`${item.userdata?.profile ? `${BASE_URL + item.userdata?.profile}` : `/images/profile/img0${item.userdata?.randomprofile}.png`}`}
                    onError={handleImageError}
                    style={{ width: 45, height: 45, borderRadius: "50%" }}
                  />
                </div>
                <div className="px-3">
                  <div className="small fontcontent1">{item?.userdata?.first_name} {item?.userdata?.last_name}</div>
                  <p className="text-secondary1 fontcontent2" style={{ fontSize: "12px" }}>
                    Your shared interests have aligned with this potential buyer or seller. To
                    engage in a conversation with them, kindly pay $3 and proceed to chat.
                  </p>
                </div>
                <div className='align-items-center d-flex'>
                  <button className="btn fontcontent1 btn-connect" style={{ fontSize: "12px" }} onClick={() => {
                    setSwipe(12)
                    setSelectedItem(item.userdata)
                  }}>Lets Connect</button>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="container-fluid background mt-1 position-fix">
          <div className="d-flex inputback align-items-center justify-content-around px-2 bg-white column-gap-3">
            <input type="file" id="attachfile" name="Attachfile" hidden/>
            <label htmlFor="attachfile">
              <img label="Attachfile" src="/images/icons/attach.png"
                style={{ width: 20, height: 20 }} />
            </label>
            <input type="text" placeholder="Type a message..." defaultValue="Hi Great, thanks" className='bg-white' />
            {/* <img src="/images/icons/laugh.png" style={{ width: 20, height: 20 }} />
            <img
              src="/images/icons/microphone-black-shape 1.png"
              style={{ width: 20, height: 20 }}
            /> */}
            <button
              className="sendbutton d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
            >
              <img
                src="/images/icons/paper-plane 1.png"
                style={{ width: 16, height: 16 }}
              />
            </button>
          </div>
        </div>
      </div>
    )
  
}

