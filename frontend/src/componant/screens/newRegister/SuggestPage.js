import React, { startTransition, useEffect, useState } from 'react'
import "./Style/configure.css";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import FetchData from "../../fetch-api/Apifetch";
import { BASE_URL } from "../../utils/ApiRoute";
import { SkipButton, Splittext, handleImagePageError } from "../../utils/Function";
const SuggestPage = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const [DepandState, setDepandState] = useState()
    const User = JSON.parse(localStorage.getItem("VERIFYDATA"));
    const [PageList, setPageList] = useState([])
    const [followedPages, setFollowedPages] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        setDepandState(state)
        ListData(state)
    }, [])
    const onReqFollowPage = async (Itemid) => {
        if (followedPages.includes(Itemid)) {
            // setFollowedPages((prevState) => prevState.filter((itemID) => itemID !== id));
            // onReqRemovePage(id);
        } else {
            setFollowedPages((prevState) => [...prevState, Itemid]);
            onReqAddPage(Itemid);
        }
    };
    const onReqAddPage = async (Itemid) => {
        try {
            const dataObject = {
                user_id: User?._id,
                userdata: {
                    first_name: User?.first_name,
                    last_name: User?.last_name,
                    gmail: User?.gmail,
                    randomprofile: User?.randomprofile,
                    designation: User?.designation,
                },
            };
            await FetchData("add/follow/" + Itemid, "POST", JSON.stringify(dataObject), false, false);
        } catch (err) {
            console.log(err);
        }
    };
    const ListData = async (data) => {
        try {
            var ObjectData ={}
            if(id == 2){
                 ObjectData ={
                    // industry:data.industry[0].index,
                    area_of_interest:data.skills.map(item => item.title),
                 }
            }else{    
             ObjectData = { ...data,location: data.country }
            }
            const res = await FetchData(
                "filter_pages?user_id=" + User._id,
                "POST",
                JSON.stringify(ObjectData),
                false,
                false
            );
            setPageList(res.data);
        } catch (err) {
            console.log(err)
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
                    Sorry, No pages available based on the {id == 1?"Location":"skills"}  you selected ! You can skip this and move to {id == 1?"Next":"Main"}  page
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className="container-fluid card mb-0" style={{ backgroundColor: "#e9ecef", height: "auto", minHeight: "100vh" }} >
            <div className="row mx-lg-5 marginall">
                <div className="col-lg-6 col-sm-12 pb-lg-5 d-flex">
                    <div className="w-100 m-lg-4 h-auto">
                        <div className="d-flex justify-content-between">
                        {id == 1?(
                            <div className="py-1 px-2">
                                <p style={{ color: 'gray' }} className="fontsubtitle">Location based Pages</p>
                                <ul
                                    className="d-flex flex-row flex-wrap justify-content-start"
                                    style={{ columnGap: 2 }}
                                >
                                    <div
                                        className="align-items-center card d-flex flex-row p-2"
                                        style={{
                                            background: "rgb(89, 44, 146)",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: 25
                                        }}
                                    >
                                        <li className="fontcontent2 px-2" style={{ cursor: "pointer", fontSize: 12 }}>
                                            {DepandState?.country}
                                        </li>
                                    </div>
                                    <div className="d-flex card flex-row align-items-center p-2"
                                        style={{
                                            background: "rgb(89, 44, 146)",
                                            color: "rgb(255, 255, 255)",
                                            borderRadius: 25
                                        }}>
                                        <li className="fontcontent2 px-2" style={{ cursor: "pointer", fontSize: 12 }}>
                                            {DepandState?.city}
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ):(
                            <div className='d-flex flex-wrap w-75'>     
                            {state.skills.map(item => 
                            <div className="d-flex flex-row align-items-center p-1 m-1"
                                style={{
                                    background: "rgb(89, 44, 146)",
                                    color: "rgb(255, 255, 255)",
                                    borderRadius: 25
                                }}>
                                <li className="fontcontent2 px-2" style={{ cursor: "pointer", fontSize: 12 }}>
                                    {item.title}
                                </li>
                            </div>
                            )}
                            </div>
                        )}
                        <div className='d-flex align-items-center'>
                            <button className="btn btn-outline-connect rounded-01 fonthint py-2"
                            onClick={()=>{
                                id==1?navigate("/business-info", { state: DepandState?.type }):SkipButton();
                            }}
                            >
                           Next
                            </button>
                        </div>
                        </div>
                      <div className="container-fluid pb-2 mt-2">
                                    {PageList.length && PageList.length > 0 ?
                                        <div>
                                            {PageList?.map((item) => (
                                                <div
                                                    className="card border shadow-sm mb-1"
                                                >
                                                    <div className="d-flex p-2 align-items-center justify-content-sm-between  column-gap-1">
                                                        <div className="d-flex column-gap-3 w-75"
                                                        >
                                                            <div className="ml-lg-3 mt-2">
                                                                <img
                                                                    className="rounded"
                                                                    style={{
                                                                        objectFit: "contain",
                                                                        height: "70px",
                                                                        width: "70px",
                                                                    }}
                                                                    src={
                                                                        BASE_URL + item?.profile_icon
                                                                    }
                                                                    onError={handleImagePageError}
                                                                />
                                                            </div>
                                                            <div className="w-lg-60">
                                                                <span className="fontsubtitle text-dark1">
                                                                    {item?.title}
                                                                </span>
                                                                <p className="fontcontent1 text-secondary1 mb-0">
                                                                    {item?.industry_data?.title}
                                                                </p>
                                                                <p className="fontcontent2 text-secondary1 mb-0">
                                                                    {item?.description ? Splittext(item?.description, 15) : 'Details about the Page will be shown here.'}
                                                                </p>
                                                                <p className="fontcontent1 text-secondary1 mb-0">
                                                                    {item?.page_follow_data?.length}&nbsp;Followers
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="w-lg-20 d-flex justify-content-center">
                                                            <button
                                                                className={"btn rounded-01 py-1" + (followedPages.includes(item._id) ? " btn-connect" : "  btn-outline-connect")}
                                                                onClick={() => onReqFollowPage(item?._id)}
                                                            >
                                                                {followedPages.includes(item._id) ? "Request Sent" : "Join"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        : PageList.length == 0 && (
                                            <EmptyCard />
                                        )}
                                </div>
                    </div>
                </div>
                <div
                    className="align-content-center col-6 colorimage d-lg-block d-md-block d-none h-100 p-0"
                    style={{ borderRadius: "0px 10px 10px 0px" }}
                >
                    <div className="d-lg-flex d-md-flex flex-column d-none h-100 justify-content-center align-items-center">
                        <img
                            src="/images/icons/logo.png"
                            style={{ borderRadius: "0%", width: 300, height: 190 }}
                        />
                    </div>
                </div>
            </div>
            <div />
        </div>
    )
}
export default SuggestPage