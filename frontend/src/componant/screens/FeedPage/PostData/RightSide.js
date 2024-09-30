import { t } from "i18next";
import React, { startTransition, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FetchData from "../../../fetch-api/Apifetch";
import { BASE_URL } from "../../../utils/ApiRoute";
import {
  CheckGuest,
  slugify,
  handleImagePageError,
  Imagesource,
  handleImageError,
} from "../../../utils/Function";
import { RightShimmer } from "../../layout/Shimmer";

const RightSide = () => {
  const location = useLocation()
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );
  const [ChatUser, setChatUser] = useState([]);
  const navigate = useNavigate();
  const [SignDropdown, setSignDropdown] = useState(false);
  const [PageList, setPageList] = useState([])
  const [ClientNotification, setClientNotification] = useState([]);
  const [Page, setPage] = useState([]);
  useEffect(() => {
    // UserFollowed();
    handleGuestClick();
    ListPages()
    ClientNotify()
    ListChat();
  }, []);
  const handleGuestClick = () => {
    if (CheckGuest()) {
      setSignDropdown(!SignDropdown);
    }
  };


  const ListChat = async () => {
    const res = await FetchData(`chatlist/${user._id}`, 'GET', null, true, false)
    if (res.status) {
      setChatUser(res.data)
    }
  }

  const ClientNotify = async () => {
    try {
      const res = await FetchData(`client_notify/${user?._id}/3`, 'GET', null, true, false)
      if (res.success) {
        console.log("Res::::", res);
        const filterData = res.data.filter(item => item.user_id !== user?._id)
        setClientNotification(filterData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const ListPages = async () => {
    try {
      const res = await FetchData(`list/page/${user?._id ? `?user_id=${user?._id}` : ''}`, "GET", null, false, false);
      if (res.success) {
        setPageList(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  }
  const UserFollowed = async () => {
    try {
      const res = await FetchData(
        "user/follow/" + user?._id,
        "GET",
        null,
        false,
        false
      );
      console.log(res);
      if (res.status) {
        if ([null, 0].includes(user?.gictc_status)) {
          const filteredData = res.data.filter(
            (item) => item.title && !item.title.includes("GICTC")
          );
          setPage(filteredData);
          console.log(filteredData);
        } else {
          setPage(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if all objects in the array match the condition

  const AddConnection = async (id) => {
    try {
      const dataObject = {
        user_id: user?._id,
        userdata: {
          first_name: user?.first_name,
          last_name: user?.last_name,
          gmail: user?.gmail,
        },
      };
      const res = await FetchData(
        "add/follow/" + id,
        "POST",
        JSON.stringify(dataObject),
        false,
        false
      );
      if (res.success) {
        // ListPages()
        UserFollowed();
        toast.success("Page Join request sent");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeconnection = async (id) => {
    try {
      const res = await FetchData(
        "remove/follow/" + id,
        "GET",
        null,
        false,
        false
      );
      if (res.status) {
        toast.success("Join request cancelled successfully.");
        // ListPages()
        UserFollowed();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div id="left-aside-wrapper p-4" className="d-none d-lg-block d-md-block" >
        <aside id="left-aside" className="">
          {ClientNotification?.length == 0 &&
            <RightShimmer />
          }
          {ClientNotification?.length > 0 &&
            <div  >
              <div className='container-fluid px-0 pt-3 py-2 newsbox' >
                <h3 className='fontsubtitle mb-1 px-3 text-dark1 pb-2'>People you may know</h3>
                {ClientNotification && ClientNotification.filter((item) => item.userdata?.first_name && !item.userdata?.first_name.toLowerCase().includes("test")).slice(0, 3).map((item, index) => (
                  <div
                    style={{
                      borderBottom: index !== ClientNotification.slice(0, 3)?.length - 1 ? ".1px solid #c6c6c661" : "none"
                    }}
                  >
                    <div className='d-flex flex-row p-2 my-1 justify-content-between'>
                      <img
                        src={Imagesource(item?.userdata?.profile)}
                        onError={handleImageError}
                        className='blog-img-circle'
                        alt='image'
                        style={{ objectFit: 'cover' }} />
                      <div className='my-auto' style={{ flex: "auto", overflow: "hidden" }}>
                        <p
                          className='mb-n1 fontcontent2 text-dark1'
                          style={{ fontWeight: '500', whiteSpace: 'nowrap', width: '90%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item?.userdata?.first_name}&nbsp;{item?.userdata?.last_name}
                        </p>
                        <span
                          className='newsfeed1 text-secondary1 mb-0 mb-0 fonthint'
                          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: "capitalize" }}
                        >
                          {item?.userdata?.designation || "Tester"}
                        </span>
                      </div>
                      <div className='' style={{ marginLeft: '2px' }}>
                        <button
                          onClick={() => navigate(`/user/` + item.userdata._id)}
                          className='btn btn-outline-connect-2 text-center rounded-2 py-1 px-2'
                          style={{ fontWeight: '700', }}>
                          <i class="fa fa-plus fonthint mr-1" aria-hidden="true" style={{ paddingBottom: "2px" }}></i>Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </aside>
        {ChatUser && Array.isArray(ChatUser) && ChatUser.filter((item) => item.users?.first_name && !item.users?.first_name.toLowerCase().includes("test") && item.status == 1)?.length > 0 &&
          <div className="container-fluid px-0 newsbox mt-2 position-sticky d-none d-lg-block d-md-block" style={{ top: '60px' }} >
            <div >
              <div className="d-flex align-items-center rounded-top-3" style={{ minHeight: '60px', background: '#4535C1' }}>
                <h3 className="fontsubtitle mb-1 px-3 text-white">Last Messages</h3>
              </div>
              {ChatUser.filter((item) => item.users?.first_name && !item.users?.first_name.toLowerCase().includes("test") && item.status == 1).slice(0, 5).map((item) => (
                <div style={{ borderBottom: ".1px solid #c6c6c661" }} role="button"
                  onClick={() => window.location.href = "/chats"}
                >
                  <div className="d-flex flex-row p-2 my-1">
                    <img
                      src={`${item.users?.profile ? `${BASE_URL + item.users?.profile}` : `/images/profile/img0${item.users?.randomprofile}.png`}`}
                      onError={handleImageError}
                      className="blog-img-circle" />
                    <div className="my-auto w-75">
                      <p
                        className="mb-n1 fontcontent2 text-dark1"
                        style={{
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          width: "90%",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {item.users?.first_name + " " + item.users?.last_name}
                      </p>
                      <p className="fonthint text-secondary1 mb-1">{item?.last_msg ? item?.last_msg : 'Write a message'}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </>
  );
};
export default RightSide;
