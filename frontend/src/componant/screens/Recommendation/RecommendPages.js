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
    const [Limit] = useState(6);
    const [loader, setLoader] = useState(true);
    const [recommendPages, setRecommendPages] = useState([]);
    const [followedPages, setFollowedPages] = useState([]);

    useEffect(() => {
        if (user?._id) {
            // onReqRecommendConnection();
            onReqRecommendPages();
        }
    }, [user]);



    const onReqRecommendPages = async () => {
        try {
            const res = await FetchData(
                `list/page${user?._id ? `?user_id=${user?._id}` : ""}`,
                "GET",
                null,
                false,
                false
            );
            if (res.success) {
                const filteredData = res.data?.filter(item => item.title && !item.title.toLowerCase().includes("test")) || [];
                setRecommendPages(filteredData);
                setLoader(false);
            }
        } catch (err) {
            console.log(err);
        }
    };



    const onReqFollowPage = async (id) => {
        if (followedPages.includes(id)) {
            // setFollowedPages((prevState) => prevState.filter((itemID) => itemID !== id));
            // onReqRemovePage(id);
        } else {
            setFollowedPages((prevState) => [...prevState, id]);
            onReqAddPage(id);
        }
    };

 
  

    const onReqAddPage = async (id) => {
        try {
            const dataObject = {
                user_id: user?._id,
                userdata: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    gmail: user?.gmail,
                    randomprofile: user?.randomprofile,
                    designation: user?.designation,
                },
            };
            await FetchData("add/follow/" + id, "POST", JSON.stringify(dataObject), false, false);
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

                <div
                    id="main-wrapper "
                    className="mt-5 mt-lg-0 pr-lg-3"
                >
                    <main id="main-section" className="mt-2 ml-sm-0 mt-lg-0 px-lg-3">
                        <div className="container-fluid bg-white shadow-sm w-100 px-0 mt-3" style={{borderRadius:'14px'}}>
                            <div className="d-flex align-items-center p-3 justify-content-between">
                                <span className="fontsubtitle font-weight-1 text-connect1">
                                    Suggestion Pages
                                </span>
                                <button
                                    className={"btn rounded-01 py-1  btn-outline-connect"}
                                    onClick={() => {
                                        startTransition(() => {
                                            navigate(`/feed-page`)
                                        });
                                    }}  
                                >
                                  {followedPages.length>0?"Next":"Skip"}  
                                </button>
                            </div>
                            <div className="container-fluid pb-2 mt-2">
                                {recommendPages.length && recommendPages.length > 0 ?
                                    <div className="row justify-content-center">
                                        {recommendPages?.slice(0, Limit).map((item) => (
                                   <div className="col-12 col-lg-3 col-md-6 d-flex justify-content-center mb-4 px-2">
                                   <div className="text-center p-2 shadow-sm w-100"
                                     style={{
                                       borderRadius: '10px', position: 'relative',
                                       width: "210px", height: "230px",maxHeight:'230px',maxWidth:'210px',
                                     border: "1px solid lightgray"
                                     }}>
                                                    <div className="card-body p-1 card shadow-none align-items-center justify-content-around h-100">
                                                        <img
                                                            src={BASE_URL + item?.profile_icon}
                                                            onError={handleImageError}
                                                            className="rounded-circle mb-0 bg-light"
                                                            alt="Profile"
                                                            style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                                                        />
                                                        <div className="w-85 text-center">
                                                        <p className="mb-0 w-85"
                                                            style={{
                                                                color: "#323232", textOverflow: "ellipsis", overflow: "hidden",
                                                                fontWeight: "500",
                                                                whiteSpace: "nowrap", fontSize: "16px"
                                                            }}>
                                                            {item?.title}
                                                        </p>
                                                        
                                                        <p  className="mb-1"
                                                            style={{
                                                                textOverflow: "ellipsis",
                                                                fontSize: "13px",
                                                                overflow: "hidden", whiteSpace: "nowrap"
                                                            }}>
                                                            {item?.industry_data?.title?item?.industry_data?.title:"---"}
                                                        </p>

                                                        <p  className="mb-2"
                                                            style={{
                                                                textOverflow: "ellipsis",
                                                                fontSize: "13px",
                                                                overflow: "hidden", whiteSpace: "nowrap"
                                                            }}>
                                                            {item?.page_follow_data?.length}&nbsp;Followers
                                                        </p>
                                                        </div>

                                                        <button
                                                         style={{fontSize:"16px",fontWeight:"400"}}
                                                            className={"btn text-center rounded-2 py-1 px-4" + (followedPages.includes(item._id) ? " btn-connect" : "  btn-outline-connect")}
                                                            onClick={() => onReqFollowPage(item?._id)}
                                                        >{followedPages.includes(item._id) ? "Request sent " : "Join"}
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
                                    : !loader && (
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