import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';
import { BASE_URL } from '../../utils/ApiRoute';
import Post from './layout/Post';
import Header from '../layout/SubHeader';
import banner from './images/pagebg.jpg';
import { Modal } from "react-bootstrap";
import PhotoModal from '../FeedPage/PostData/ImageModel';
import { useTranslation } from 'react-i18next';
import AddPost from "./layout/AddPost"
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { handleImageError, Imagesource, Linkcheck,ChecTick } from '../../utils/Function';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../layout/BottomNavbar';
import './style/style.css'
import Leftside from './layout/Leftside';
import Rightside from '../FeedPage/UserDetail/layout/Rightside';
// Import image compression library
// import { capitalizeFirstLetter, FormatDateDifference, handleImageError, Imagesource, Linkcheck } from "../../../utils/Function";




const Pages = () => {
    const { id } = useParams()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
    const location = useLocation()
    const { state } = location
    const [datalist, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();
    const [PageLists, setPageLists] = useState([])
    const [Index, setIndex] = useState(1);
    const [CardShow, setCardShow] = useState(0);
    const [PageDetails, setPageDetails] = useState();
    const [PageID, setPageID] = useState(false);
    const [RequestData, setRequestList] = useState([]);
    const articleRef = useRef(null);
    const [showFullText, setShowFullText] = useState(false);


    useEffect(() => {
        PageDetailing()
        dataList(2);
        RequestList()
    }, [PageID])

    useEffect(() => {
        console.log("change state", state?.user_id)

        if (page > totalPage) {
            setPage(totalPage)
        } else {
            dataList(2)
        }
    }, [Index])

    const PageDetailing = async () => {
        try {
            const res = await FetchData(`page_view/${id}`, "GET", null, false, false)
            if (res.success) {
                setPageDetails(res.data[0])
                setPageID(res.data[0]?._id)
                UserFollowed(res.data[0]?._id)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const dataList = async (ids = 1) => {
        if (ids == 4) {
            setLoading(true);
        }
        if (!PageID) {
            console.log(PageID);
            return
        } else {
            console.log("PageID", PageID);
        }
        const res = await FetchData(`pagepost/${PageID}?page=${page}&limit=12`, 'GET', null, true, false);
        console.log(res.data);
        if (ids == 2) {
            setDataList(res.data);
            setTotalPage(res.pagination.totalPages);
        } else {
            setDataList(prevDataList => [...prevDataList, ...res.data]);
        }
        if (ids == 4) {
            setLoading(false);
        }
    };

    const updateFollow = async (status, id) => {
        try {
            const res = await FetchData(
                `pagefollow/update/${status}/${id}`,
                "GET",
                null,
                true,
                false
            );

            if (res.status) {
                RequestList();
                toast.success("Connection updated successfully")
            }
            PageDetailing()
        } catch (err) {
            PageDetailing()
        }
    }

    const UserRequest = () => (
        RequestData?.map((item) => (
            <div className="container-fluid pb-2 mt-3">
                <div className="d-flex align-items-center justify-content-between px-3 py-2">
                    <div className="d-flex column-gap-3 w-75" role="button"
                    onClick={()=>navigate("/user/"+item?.Userdata?._id)}
                    >
                        <div className="d-flex align-items-center">
                            <img
                                className="rounded-circle"
                                src={`${item?.Userdata?.profile
                                    ? `${Imagesource(
                                        item?.Userdata?.profile
                                    )}`
                                    : `/images/profile/img0${item?.Userdata?.randomprofile}.png`
                                    }`}
                                onError={handleImageError}
                                width={50}
                                height={50}
                                style={{ minWidth: '50px' }}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <span className="fontcontent1 text-dark1 font-weight-1 mb-1">
                                {item?.Userdata?.first_name}{" "}
                                {item?.Userdata?.last_name}
                            </span>
                            <span className="font-weight-light font-weight-normal text-secondary1 fontcontent1">
                                {item?.Userdata?.designation}
                            </span>
                            <p className="font-weight-light font-weight-normal fonttext text-secondary1">
                            {item?.Userdata?.first_name} is following your page{" "}
                            <span className="font-weight-bold">{item?.pageData?.title}
                            </span>.Please update the user status accordingly.</p>
                        </div>
                    </div>
                    {item.status == 0 && (
                        <div className="d-flex">
                            <button
                                className="btn btn-connect rounded-01 fonthint mr-1 py-1"
                                style={{ fontWeight: 600, minWidth: 65 }}
                                onClick={() => updateFollow("1", item._id)}
                            >Accept</button>
                            <button
                                className="btn btn-outline-connect rounded-01 fonthint py-1"
                                style={{ fontWeight: 600, minWidth: 65 }}
                                onClick={() => updateFollow("2", item._id)}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        ))
    )
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            setPage(prevPage => prevPage + 1);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const UserFollowed = async (pageId) => {
        try {
            const res = await FetchData('user/follow/' + user?._id, "GET", null, false, false);
            console.log(res);
            if (res.status) {
                const altered = res.data.filter(item => item?._id !== pageId)
                setPageLists(altered)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const isRTL = (text) => {
        // A simple check for Arabic and Hebrew characters
        const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
        // const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0700-\u074F\u0780-\u07BF\u0900-\u097F\u1BC0-\u1BFF\u10840-\u1085F\u10A00-\u10A5F\u10A60-\u10A7F]/;
        return rtlPattern.test(text);
    };

    const toggleFullText = () => {
        setShowFullText(!showFullText);
        if (showFullText) {
            if (articleRef.current) {
                const topOffset = articleRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: topOffset, behavior: 'auto' });
            }
        }
    };

    const formattedText = (text) => {
        const paraList = text?.replace(/\n/g, '<br>');
        const description = showFullText ? paraList : (paraList?.length > 200 ? paraList.substring(0, 190) + '...' : paraList)
        const rtl = isRTL(text);

        return (
            <div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <Linkcheck content={description} rtl={false} />
                </div>
                {text?.length > 250 && !showFullText && (
                    <span className=" fontcontent2 font-weight-light"
                        style={{ cursor: 'pointer' }}
                        onClick={toggleFullText}
                    >
                        ..{`see more`}
                    </span>
                )}

            </div>
        );
    }

    const RequestList = async () => {
        try {
            const res = await FetchData("/user_request/" + user._id + "/" + PageDetails._id, "GET", null, false, false);
            if (res.data) {
                setRequestList(res.data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <div>
                <header id="main-header">
                <Header />
                </header>
                <div className="feed_container" style={{ display: "grid" }}>
                    <section id="ads"></section>
                    <Leftside trigger={UserFollowed} />
                    <div id="main-wrapper" className='mt-3 mt-lg-0 mb-2'>
                        <main id="main-section" className='mt-2 mt-lg-0'>
                            {PageDetails?.description &&
                                <div className='container-fluid bg-white rounded border w-100 mb-2' style={{ height: 'auto' }}>
                                    <div className='d-flex w-100 align-items-center justify-content-between mt-2'>
                                        <span className='fontsubtitle text-dark1 font-weight-bold pl-2'>About</span>
                                    </div>
                                    <div className='container-fluid w-100 mt-3'>
                                        <p className='fontcontent2 text-justify' ref={articleRef} >
                                            {formattedText(PageDetails?.description)}
                                        </p>
                                    </div>
                                </div>
                            }
                            {(PageDetails && PageDetails?.user_id === user._id || state?.user_id === user._id) &&
                                <div>
                                    <AddPost PageID={PageID} />
                                </div>}
                            <div className='container-fluid bg-white rounded border w-100' style={{ height: 'auto' }}>
                                <div className='container-fluid mt-2 w-100' style={{ borderBottom: '1px solid lightgrey' }}>
                                    <div className='d-flex w-100 align-items-center justify-content-between'>
                                        <span className='fontsubtitle text-dark1 font-weight-bold'>Activities</span>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 col-lg-7 d-flex justify-content-between' style={{ height: 40 }}>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 0 && 'activestop'}`} role='button' onClick={() => setCardShow(0)}><span className='fontcontent2'>Home</span></div>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 1 && 'activestop'}`} role='button' onClick={() => setCardShow(1)}><span className='fontcontent2'>Posts</span></div>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 2 && 'activestop'}`} role='button' onClick={() => setCardShow(2)}>
                                                <span className='fontcontent2'>Followers</span>
                                            </div>
                                            {(PageDetails && PageDetails?.user_id == user._id || state?.user_id == user._id) &&
                                                <div className={`d-flex justify-content-center align-items-center ${CardShow == 4 && 'activestop'}`} role='button' onClick={() => setCardShow(4)}><span className='fontcontent2'>Invitations</span></div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {(datalist && (CardShow == 0 || CardShow == 1)) && datalist.map((item, index) => (
                                    <Post item={item} setIndex={setIndex} />
                                ))}
                                <div className='container-fluid py-2'>
                                    {CardShow == 2 && PageDetails.page_follow_data.map(item => (
                                        <div className='d-flex align-items-center justify-content-between px-3 py-2'>
                                            <div className='d-flex column-gap-3 w-75'
                                            role='button'
                                            onClick={()=>navigate("/user/"+item?.user_data?.user_id)}
                                            >
                                                <img
                                                    src={`${item?.user_data?.userdata?.profile ? `${Imagesource(item?.user_data?.userdata?.profile)}` : `/images/profile/img0${item?.user_data?.userdata?.randomprofile}.png`}`}
                                                    onError={handleImageError}
                                                    width={50}
                                                    height={50}
                                                />
                                                <div className='d-flex flex-column '>
                                                    <span className='fontcontent1 text-dark1'> {item?.user_data?.userdata?.first_name}{" "}{item?.user_data?.userdata?.last_name} </span>
                                                    <span className='fontcontent2 font-weight-light'> {item?.user_data?.userdata?.designation ? item?.user_data?.userdata?.designation : "--"} </span>
                                                </div>
                                            </div>
                                            {(PageDetails && PageDetails?.user_id == user._id || state?.user_id == user._id) &&
                                            <button
                                                className="btn btn-outline-connect rounded-01 fonthint py-1 mx-1"
                                                style={{ fontWeight: 600, minWidth: 65 }}
                                                onClick={() => updateFollow("2", item._id)}
                                            >
                                                Remove
                                            </button>}
                                            <button className='btn btn-connect fonthint rounded-01 fonthint py-1' >
                                                 Following
                                            </button>
                                        </div>
                                    ))}
                                    {CardShow == 4 && <UserRequest />}
                                </div>
                            </div>
                        </main>
                    </div>
                    <Rightside pages={PageLists} />
                </div>
                <BottomNavbar />
            </div>
        </>
    )
}

export default Pages
