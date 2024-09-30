import React, { startTransition, useEffect, useRef, useState } from 'react'
import Header from '../../layout/SubHeader';
import '../style/style.css'
import Post from '../PostData/Post';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../utils/ApiRoute';
import FetchData from '../../../fetch-api/Apifetch';
import io from 'socket.io-client';
import Leftside from '../PostData/LeftSide';
import BottomNavbar from '../../layout/BottomNavbar';
import { capitalizeFirstLetter, CheckGuest, handleImageError, Imagesource, slugify } from '../../../utils/Function';
import Swal from 'sweetalert2';
import ProfileView from './layout/ProfileView';
import { toast } from 'react-toastify';
import { Userpage } from '../../layout/Shimmer';

const socket = io(BASE_URL);
const Index = () => {
    const { id } = useParams();
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user)
    const [connected, setConnected] = useState(false)
    const [connectedData, setConnectedData] = useState({})
    const [UserPost, setUserPost] = useState()
    const [userData, setuserData] = useState()
    const [image, setImage] = useState({});
    const [CardShow, setCardShow] = useState(0);
    const [PageList, setPageList] = useState([]);
    const [SignDropdown, setSignDropdown] = useState(false);
    const [Index, setIndex] = useState(1);
    const [formData, setFormData] = useState({
        sender: user?._id,
        receive: id
    })
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        ListConnectedUser()
        getUserData()
        getProfileData()
        ListPages()
    }, []);

    const getUserData = async () => {
        try {
            const res = await FetchData("detail/user/" + id, 'GET', null, true, false);
            setuserData(res.data)
            console.log(res.data);
            setImage({
                url: res.data?.user?.profile
            })
            console.log(res.data?.user?.profile);

        }
        catch (err) {
            console.log(err);
        }
    }

    const getProfileData = async () => {
        try {
            const res = await FetchData(`user_post?user_id=${id}`, 'GET', null, false, false)
            setUserPost(res.data)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const ListConnectedUser = async () => {
        try {
            const res = await FetchData(`userconnect/${user?._id}/${id}`, "GET", null, false, false);
            setConnected(res.status)
            console.log(res.status)
            console.log(res.data)
            setConnectedData(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    const ListPages = async () => {
        try {
            const res = await FetchData(`list/page/${user?._id ? `?user_id=${user?._id}` : ''}`, "GET", null, false, false);
            if (res.success) {
                // if ([null , 0].includes(user?.gictc_status)) {
                // const filteredData = res.data.filter(item => item.title && !item.title.includes("GICTC"));
                // setPageList(filteredData)
                // }
                // else{
                setPageList(res.data)
                // }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleConnectUser = async () => {
        try {
            const res = await FetchData('userconnect/add', "POST", JSON.stringify(formData), false, false)
            ListConnectedUser()
        } catch (err) {
            console.log(err);
        }
    }

    const handleDisconnectUser = async () => {
        try {
            const res = await FetchData(`deleteconnect/${connectedData?._id}`, "GET", null, false, false)
            ListConnectedUser()
        } catch (err) {
            console.log(err);
        }
    }

    const OpenPopup = async () => {
        if (!connected) {
            handleConnectUser();
        } else {
            Swal.fire({
                title: connected ? 'Disconnect?' : 'Connect',
                html: `<span style="font-size: 16px; font-weight: bold;">${connected ? `Remove connection with ${userData?.user?.first_name}` : `Connect with ${userData?.user?.first_name}`}</span>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4535C1',
                cancelButtonColor: '#d33',
                confirmButtonText: connected ? 'Yes, Remove!' : 'Yes, Connect!',
                cancelButtonText: connected ? 'Cancel' : 'Later',
                customClass: {
                    confirmButton: 'swal2-confirm-logout-custom',
                    cancelButton: 'swal2-cancel-logout-custom',
                    title: 'swal2-title',
                },
                // "http://connect-souq.qcodesinfotech.com/images/icons/laugh.png"
                // iconHtml: connect ? '' : `<img src="${img.url}" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
                iconHtml: `<img src="${Imagesource(image.url)}" onerror="this.src='/images/profile/img00.png'" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
            }).then((result) => {
                socket.emit('sendNotification', { ...formData, ["con"]: !connected });
                if (result.isConfirmed) {
                    if (connected) { handleDisconnectUser() }
                    else { handleConnectUser() }
                }
            });
        }
    }

    const AddConnection = async (id) => {
        try {
            const dataObject = {
                user_id: user?._id,
                userdata: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    gmail: user?.gmail
                }
            }
            const res = await FetchData("add/follow/" + id, 'POST', JSON.stringify(dataObject), false, false);
            if (res.success) {
                ListPages()
          
                toast.success("Page Join request sent");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const EmptyCard = () => {
        return (
            <div
                className="container-fluid w-100 d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}>
                <div className="w-100 d-flex align-items-center row-gap-1 flex-column justify-content-center">
                    <span className="fontsubtitle font-weight-bold text-dark1">
                        No Post's yet
                    </span>
                    <a><span className="fontsubtitle font-weight-1 text-connect1"
                        role="button">
                        Let's Start connecting
                    </span>
                    </a>
                    <span className="fontcontent2 font-weight-light text-secondary1">
                        Try after
                    </span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                <header id="main-header">
                    <Header />
                </header>
                <div className="feed_doublecontainer" style={{ display: 'grid' }} >
                    <section id="ads"></section>
                    <div id="main-wrapper " className='mt-5 mt-lg-0 mb-2 pr-lg-3'>
                        <main id="main-section" className='mt-2 mt-lg-0'>
                            <div className='card border rounded mb-1'>
                                {userData ? (
                                    <div className="d-flex py-4 px-lg-4 px-2" style={{ alignItems: 'flex-start' }}>
                                        <img style={{ width: '104px' }} className="rounded"
                                            src={`${userData?.user?.profile !== '/images/profile/add-user.png' ? `${Imagesource(image.url)}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                                            onError={handleImageError} />
                                        <div className='pl-4'>
                                            <h5 className="card-title text-dark1">{userData?.user?.first_name}&nbsp;{userData?.user?.last_name}</h5>
                                            <p className="fontcontent1 mb-1 text-secondary1">
                                                {userData?.user?.city}, {userData?.user?.country}</p>
                                            <p className="fontcontent1 text-dark1 mb-1">
                                                {capitalizeFirstLetter(userData?.user?.designation || "Designation")}</p>
                                            <p className="fontcontent2 mb-2 text-secondary1">
                                                {userData?.user?.totalconnection} connections</p>
                                            <div className="d-flex flex-column justify-content-center">
                                                <div className="d-flex align-items-center">
                                                    {id != user?._id && (
                                                        <button disabled={!connected || connectedData?.status == "0"}
                                                            className="btn btn-connect rounded-01 fontcontent1 font-weight-bold m-1 px-3 py-1"
                                                            onClick={() => navigate("/chats", { state: connectedData })}>
                                                            Chat</button>
                                                    )}
                                                    {id != user?._id ? (
                                                        <>
                                                            {!connected || connectedData?.status == "0" ?
                                                                <button
                                                                    className="btn btn-connect rounded-01 fontcontent1 font-weight-bold m-1 px-3 py-1"
                                                                    onClick={() => OpenPopup()}>
                                                                    {!connected ? "Let's Connect" : connectedData?.status == "0" ? "Request sent" : "connected"}
                                                                </button>
                                                                :
                                                                <div onMouseEnter={() => { setDropDown(!dropDown) }} onMouseLeave={() => { setDropDown(!dropDown) }}>
                                                                    <div className={"more-option-container"}>
                                                                        <span className="fas fa-circle" aria-hidden="true" style={{ fontSize: '3px', padding: '1px' }} />
                                                                        <span className="fas fa-circle" aria-hidden="true" style={{ fontSize: '3px', padding: '1px' }} />
                                                                        <span className="fas fa-circle" aria-hidden="true" style={{ fontSize: '3px', padding: '1px' }} />
                                                                    </div>
                                                                    {dropDown &&
                                                                        <div
                                                                            className="bg-white "
                                                                            style={{
                                                                                width: 'fit-content',
                                                                                height: "auto",
                                                                                boxShadow: '1px 1px 3px 1px grey',
                                                                                position: "absolute",
                                                                                borderRadius: '3px',
                                                                                zIndex: 1
                                                                            }}>
                                                                            <ul
                                                                                role="button"
                                                                            >
                                                                                <li
                                                                                    onClick={() => { OpenPopup() }}

                                                                                    className="fontcontent1 px-3 py-2 text-dark hovering">
                                                                                    Remove Connection
                                                                                </li>
                                                                            </ul>
                                                                        </div>}
                                                                </div>
                                                            }
                                                        </>
                                                    ) : (
                                                        <button className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
                                                            onClick={() => navigate("/profile")}>
                                                            <i class="fa fa-pencil text-white fonthint " aria-hidden="true"></i>
                                                            &nbsp;Edit Profile
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Userpage />
                                )}
                            </div>
                            <ProfileView />
                            <div className='container-fluid bg-white rounded border w-100' style={{ height: 'auto' }}>
                                <div className='container-fluid mt-2 w-100' style={{ borderBottom: '1px solid lightgrey' }}>
                                    <div className='d-flex w-100 align-items-center justify-content-between'>
                                        <span className='fontsubtitle text-dark1 font-weight-bold'>Activity</span>
                                        {/* <button className="btn px-2 py-1 border border-secondary1 fontcontent2 bg-white">following</button> */}
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 col-lg-7 d-flex justify-content-between' style={{ height: 40 }}>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 0 && 'activestop'}`} role='button' onClick={() => setCardShow(0)}><span className='fontcontent2'>Posts</span></div>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 1 && 'activestop'}`} role='button' onClick={() => setCardShow(1)}><span className='fontcontent2'>Comments</span></div>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 2 && 'activestop'}`} role='button' onClick={() => setCardShow(2)}><span className='fontcontent2'>Videos</span></div>
                                            <div className={`d-flex justify-content-center align-items-center ${CardShow == 3 && 'activestop'}`} role='button' onClick={() => setCardShow(3)}><span className='fontcontent2'>Images</span></div>
                                        </div>
                                    </div>
                                </div>
                                {(UserPost && CardShow == 0) && UserPost.map((item, index) => (
                                    <Post item={item} setIndex={setIndex} />
                                ))}
                                {(!UserPost || (UserPost && UserPost?.length == 0)) && <EmptyCard />}
                            </div>
                        </main>
                    </div>
                    <div className="d-none d-md-block d-lg-block">
                        <div style={{ position: "sticky", right: 0, top: 60, background: 'transparent' }}>
                            {PageList.length > 0 && <div>
                                <div className='container-fluid py-3 newsbox' >
                                    <h3 className='fontsubtitle mb-1 text-dark1'>Pages</h3>
                                    {PageList && PageList.slice(0, 5).map((item, index) => (
                                        <div style={{ borderBottom: PageList.length != index + 1 ? "1px solid #E8E8E8" : "none" }}>
                                            <div className='d-flex flex-row py-3 align-items-end justify-content-between'
                                            >
                                                <div className='d-flex column-gap-2 w-75'>
                                                    <img src={BASE_URL + item?.profile_icon} className='blog-img1 mt-1' onError={handleImageError} alt='image' style={{ objectFit: 'contain' }} />
                                                    <div className='mx-2 my-auto' style={{ cursor: 'pointer', maxWidth: '75%' }} onClick={() =>
                                                        window.location.href = `/pages/${slugify(item?.title)}`
                                                    }>
                                                        <h3 className='mb-0 text-dark1 ecllipse fontcontent1'
                                                            style={{
                                                                width: '165%', whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                                            }}
                                                        >
                                                            {item?.title}
                                                        </h3>
                                                        <p className='mb-0 fontcontent2'
                                                            style={{
                                                                width: 'max-content', whiteSpace: 'nowrap',
                                                                textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                                            }}
                                                        >
                                                            {item.industry_data?.title}
                                                        </p>
                                                        <p className='newsfeed1 mb-0 fonthint'>
                                                            {item.page_follow_data?.length}&nbsp;Followers
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='' >
                                                    <button onClick={() => {
                                                        if (CheckGuest()) {
                                                            window.location.href = `/pages/${slugify(item?.title)}`
                                                        } else {
                                                            AddConnection(item._id)
                                                        }
                                                    }}
                                                        className='btn btn-connect d-flex justify-content-center rounded-01 text-center fonthint py-1' style={{ fontWeight: '600', maxWidth: '65px' }}>
                                                        {SignDropdown ? 'View' : (item.page_follow_data?.some(obj => obj.user_data?.user_id === user?._id) ? 'Following' : 'Join')}</button>
                                                </div>
                                            </div>
                                            {/* <hr/> */}
                                        </div>
                                    ))}
                                    <div className='d-flex justify-content-center pt-3' role='button' ><span className='fontcontent1 font-weight-normal text-dark1'
                                        onClick={() => startTransition(() => { navigate(`/list_page`); })}>See all pages</span></div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <BottomNavbar />
            </div>
        </>
    );
}

export default Index
