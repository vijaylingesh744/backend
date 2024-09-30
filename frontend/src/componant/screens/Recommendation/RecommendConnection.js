import React, { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from '../layout/Header';
import { BASE_URL } from '../../utils/ApiRoute';
import { handleImageError, Imagesource, Splittext, handleImagePageError, slugify } from "../../utils/Function";
import FetchData from "../../fetch-api/Apifetch";
import "../Connections/Style/style.css";
import "./style/style.css";
import LeftSide from "../FeedPage/PostData/LeftSide";

const Recommendations = () => {
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
    const [Limit] = useState(10);
    const [loader, setLoader] = useState(true);
    const [recommendConnection, setRecommendConnection] = useState([]);
    const [recommendPages, setRecommendPages] = useState([]);

    const [followedConnection, setFollowedConnection] = useState([]);
    const [followedPages, setFollowedPages] = useState([]);

    useEffect(() => {
        if (user?._id) {
            onReqRecommendConnection();
        }
    }, [user]);

    const onReqRecommendConnection = async () => {
        setLoader(true);
        try {
            const res = await FetchData(`client_notify/${user?._id}/3`, "GET", null, true, false);
            if (res?.success) {
                const filteredData = res.data?.filter(item => item.userdata.first_name && !item.userdata.first_name.toLowerCase().includes("test")) || [];
                setRecommendConnection(filteredData);
            }
        } catch (error) {
            console.error("Error fetching recommended connections:", error);
        } finally {
            setLoader(false);
        }
    };

    const onReqFollowConnection = async (id) => {
        if (followedConnection.includes(id)) {
            // setFollowedConnection((prevState) => prevState.filter((itemID) => itemID !== id));
            // onReqRemoveConnection(id);
        } else {
            setFollowedConnection((prevState) => [...prevState, id]);
            onReqAddConnection(id)
        }
    }

    const onReqAddConnection = async (id) => {
        const connectData = {
            sender: user?._id,
            receive: id
        }
        try {
            await FetchData('userconnect/add', "POST", JSON.stringify(connectData), false, false)
        } catch (err) {
            console.log(err);
        }
    }

    const onReqRemoveConnection = async (id) => {
        try {
            await FetchData(`deleteconnect/${id}`, "GET", null, false, false);
        } catch (err) {
            console.log(err);
        }
    };

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
                    <a
                        onClick={() => {
                            startTransition(() => {
                                navigate("/main");
                            });
                        }}
                    >
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
        <div>
            <header id="main-header">
                <Header />
            </header>
            <div className="recomment_grid_container d-grid">
                <section id="ads"></section>

                <div className="d-none d-md-block d-lg-block px-0 mt-3">
                    <LeftSide />
                </div>

                <div id="main-wrapper " className="mt-5 mt-lg-0 px-lg-3">
                    <main id="main-section" className="mt-2 mt-lg-0 ml-sm-0">
                        <div className="container-fluid bg-white shadow-sm w-100 px-0 mt-3" style={{borderRadius:'14px'}}>
                            <div className="d-flex align-items-center p-3 justify-content-between">
                                <span className="fontsubtitle font-weight-1 text-connect1">
                                    People you may know
                                </span>
                                <button
                                    className={"btn rounded-01 py-1  btn-outline-connect"}
                                    onClick={() => navigate(`/recommend-pages`)}
                                >
                                        {followedConnection.length>0?"Next":"Skip"}  
                                 
                                </button>
                            </div>
                            <div className="container-fluid pb-2 mt-2">
                                {recommendConnection.length && recommendConnection.length > 0 ? (
                                    <div className="row justify-content-center">
                                        {recommendConnection.slice(0, Limit).map((item) => (
                          <div className="col-12 col-lg-3 col-md-6 d-flex justify-content-center mb-4">
                          <div className="text-center p-2 shadow-sm"
                            style={{
                              borderRadius: '10px', position: 'relative',
                              width: "210px", height: "230px", maxWidth:'200px',maxHeight:'230px', 
                            border: "1px solid lightgray"
                            }}>
                                                    <div className="card-body p-1 card shadow-none align-items-center justify-content-around h-100">
                                                        <img
                                                            src={`${item?.userdata?.profile
                                                                ? `${Imagesource(item?.userdata?.profile)}`
                                                                : `/images/profile/img0${item?.userdata?.randomprofile}.png`
                                                                }`}
                                                            onError={handleImageError}
                                                            className="rounded-circle mb-0"
                                                            alt="Profile"
                                                            style={{ width: '70px', height: '70px', objectFit: 'fill' }}
                                                        />
                                                        <div className="w-85 text-center">
                                                        <p className="mb-0"
                                                            style={{
                                                                color: "#323232", textOverflow: "ellipsis", overflow: "hidden",
                                                                fontWeight: "500",
                                                                whiteSpace: "nowrap", fontSize: "16px"
                                                            }}>
                                                            {item?.userdata?.first_name}&nbsp;{item?.userdata?.last_name}
                                                        </p>

                                                        <p className="mb-1"
                                                            style={{
                                                                textOverflow: "ellipsis",
                                                                fontSize: "13px",
                                                                overflow: "hidden", whiteSpace: "nowrap"
                                                            }}>
                                                            {item?.userdata?.designation}
                                                        </p>
                                                        <p className="mb-2 fonthint text-secondary1"
                                                            style={{
                                                                textOverflow: "ellipsis",
                                                                overflow: "hidden", whiteSpace: "nowrap"
                                                            }}>
                                                            {item?.userdata?.city}
                                                        </p>
                                                        </div>
                                                       
                                                        <button
                                                        style={{fontWeight:"400"}}
                                                            onClick={() => onReqFollowConnection(item.userdata._id)}
                                                            className={"btn text-center fontcontent2 rounded-2 py-1 px-3" + (followedConnection.includes(item.userdata._id) ? " btn-connect" : "  btn-outline-connect")}
                                                            >
                                                            {!followedConnection.includes(item.userdata._id) && <i class="fa fa-plus fonthint mr-1" aria-hidden="true" style={{ paddingBottom: "2px" }}></i>}
                                                            {followedConnection.includes(item.userdata._id) ? "Request sent" : "Connect"}
                                                        </button>



                                                        {/* Ellipsis Menu */}
                                                        <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                                                            <i className="bi bi-three-dots"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : !loader && (
                                    <EmptyCard />
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Recommendations