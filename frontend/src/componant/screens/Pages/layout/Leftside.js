import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import FetchData from '../../../fetch-api/Apifetch';
import { BASE_URL } from '../../../utils/ApiRoute';
import { CheckGuest, CheckTick, handleImagePageError, slugify, CheckGICTC } from '../../../utils/Function';
import AdminContent from './AdminContent';
import {toast} from 'react-toastify'
const Leftside = ({ trigger }) => {
    const location = useLocation()
    const { id } = useParams()
    const { state } = location
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
    const [PageFollow, setPageFollow] = useState();
    const [pageisfollowed, setpageisfollowed] = useState()
    const [FollowStatus, setFollowStatus] = useState(0)
    const [Followers, setFollowers] = useState();
    const [PageList, setPageList] = useState([])
    const [PageDetails, setPageDetails] = useState();
    const [ModalOpen, setModalOpen] = useState(false)
    const [ModalAdmin, setModalAdmin] = useState(false)
    const [linkcopy, setLinkCopy] = useState(false)

    useEffect(() => {
        ListPages()
        PageDetailing()
    }, []);

    const checkconnection = async (pageId) => {
        try {
            const res = await FetchData("list/follow/" + pageId + "/" + user?._id, 'GET', null, false, false);
            if (res.status) {
                setPageFollow(res.data)
                console.log(res.follower);
            }
            var follower = res.follower
            const followerlist = follower.filter(item => item.user_data.user_id !== user?._id);
            setFollowers(followerlist)
        } catch (err) {
            console.log(err);
        }
    }

    const PageDetailing = async () => {
        try {
            const res = await FetchData(`page_view/${id}`, "GET", null, false, false)
            if (res.success) {
                setPageDetails(res.data[0])
                setpageisfollowed(res.dataList[0].page_follow_data.some(item => item.user_data.user_id == user?._id));
                setFollowStatus(res.dataList[0].page_follow_data.find(item => item.user_data.user_id == user?._id).status)
                checkconnection(res.data[0]?._id)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
  

    const ListPages = async () => {
        try {
            const res = await FetchData(`list/page/${user?._id ? `?user_id=${user?._id}` : ''}`, "GET", null, false, false);
            if (res.success) {
                // const sortedData = res.data.sort((a, b) => {
                //     const aFollowed = a.page_follow_data.some(obj => obj.user_data?.user_id === user?._id);
                //     const bFollowed = b.page_follow_data.some(obj => obj.user_data?.user_id === user?._id);
                //     return bFollowed - aFollowed;
                // });
                const sortedData = res.data.filter(item => item._id !== id)
                setPageList(sortedData)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const AddConnection = async (id = PageDetails?._id) => {
        if (!pageisfollowed) {
            if (PageDetails.title.toLowerCase().includes("gict")) {
                let GICTC = prompt('Please type in your GICTC Code:');
                const ItsConnect = await CheckGICTC(GICTC);
                if (!ItsConnect) {
                    GICTC?.length > 0 && alert("Oops! The GICTC input is incorrect. Please check and try again.");
                    return
                }

            }
            try {
                const dataObject = {
                    user_id: user?._id,
                    userdata: {
                        first_name: user?.first_name,
                        last_name: user?.last_name,
                        gmail: user?.gmail,
                        randomprofile: user?.randomprofile,
                        designation: user?.designation
                    }
                }
                const res = await FetchData("add/follow/" + id, 'POST', JSON.stringify(dataObject), false, false);
                if (res.status) {
                    setPageFollow(res.data)
                    PageDetailing()
                    ListPages()
                    trigger()
                    toast.success("Page Join request sent");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await FetchData("remove/follow/" + PageFollow._id, "GET", null, false, false)
                if (res.status) {
                    setPageFollow(null)
                    PageDetailing()
                    ListPages()
                    trigger()
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const openpopup = async () => {
        Swal.fire({
            title: pageisfollowed ? 'Unfollow?' : 'Join',
            html: `<span style="font-size: 16px; font-weight: bold;">${pageisfollowed ? `cancel your page join request ${PageDetails?.title}` : `Join ${PageDetails?.title}`}</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4535C1',
            cancelButtonColor: '#d33',
            confirmButtonText: pageisfollowed ? 'Yes, cancel join request!' : 'Yes, Join!',
            cancelButtonText: pageisfollowed ? 'Cancel' : 'Later',
            customClass: {
                confirmButton: 'swal2-confirm-custom',
                cancelButton: 'swal2-cancel-custom',
                title: 'swal2-title',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                AddConnection();
            }
        });
    }

    const ModalToggle = () => {
        if (ModalOpen) {
            setLinkCopy(false)
        }
        setModalOpen(!ModalOpen)
    }

    const AdminToggle = () => {
        setModalAdmin(!ModalAdmin)
    }

    const AddNewPages = async (item) => {
        console.log(item);
        try {
            const dataObject = {
                user_id: user?._id,
                userdata: {
                    first_name: user?.first_name,
                    last_name: user?.last_name,
                    gmail: user?.gmail,
                    randomprofile: user?.randomprofile,
                    designation: user?.designation
                }
            }
            const res = await FetchData("add/follow/" + item?._id, 'POST', JSON.stringify(dataObject), false, false);
            if (res.success) {
                setPageFollow(res.data)
                PageDetailing()
                ListPages()
                trigger()
            }
        } catch (err) {
            console.log(err);
        }
    }

    const Copylink = () => {
        setLinkCopy(true)
        navigator.clipboard.writeText(window.location.href)
    }


    const PropsPage = { PageDetails, ModalAdmin, AdminToggle }
    return (
        <aside id='left-aside' className="mt-5 mt-lg-0 pt-4 pt-lg-0" style={{ display: 'block', gridArea: 'initial' }}>
            <div className='card align-items-center border shadow-sm pb-4'>
                <div className='d-flex justify-content-end p-3 w-100' role='button'
                    >
                    {/* {PageDetails?.user_id === user._id && (
                        <i class="fa fa-address-card-o" 
                        onClick={() => AdminToggle()}
                        aria-hidden="true" style={{ width: "15px", height: "15px" }} />
                    )} */}
                       <img src="\images\icons\invite.png" style={{ width: "15px", height: "15px" }} role="button" 
                       onClick={() => ModalToggle()}
                       />
                </div>
                <img
                    className=" rounded"
                    src={PageDetails?.profile_icon ? BASE_URL + PageDetails?.profile_icon : "/images/profile/businessplace.png"}
                    alt="Profile picture"
                    style={{ width: 120, height: 120, cursor: 'pointer', objectFit: 'contain', boxShadow: '#6c757d5c 0px 1px 1px 1px' }}
                    onError={handleImagePageError}
                />
                <span className="font-weight-bold fontsubtitle m-3 pl-4 text-dark1">{PageDetails?.title} {" "}             
                {CheckTick(PageDetails?.user_id)}
                </span>
                <p className="font-weight-bold m-0">
                    {`${PageDetails?.user_page_data?.first_name || ''} ${PageDetails?.user_page_data?.last_name || ''}`}
                </p>              
                <p className="fontcontent1 mb-1 text-secondary1">{PageDetails?.industry_data?.title}</p>
                <p className="fontcontent2 mb-2 text-secondary1">
                    {PageDetails?.page_follow_data?.length} followers</p>

                <div className="d-flex flex-column justify-content-center">
                    <div className="d-flex mt-1">
                        <button disabled={!pageisfollowed} className='btn btn-connect1 fontcontent2 font-weight-bold m-1 px-2 py-1 rounded-01'
                            onClick={() => {
                                if (PageFollow?.nodeId) {
                                    navigate("/UserChat?" + PageFollow?.nodeId, {
                                        state: {
                                            title: PageDetails?.title,
                                            profile: PageDetails?.profile_icon ? BASE_URL + PageDetails?.profile_icon : "/images/profile/img00.png"
                                        }
                                    })
                                }
                            }}>
                            Message
                        </button>
                        <button disabled={CheckGuest()} className={`btn ${pageisfollowed ? 'btn-outline-connect1 ' : 'btn-connect1'} fontcontent2 font-weight-bold m-1 px-2 py-1 rounded-01`}
                         onClick={() => pageisfollowed ? openpopup() : AddConnection()}>{pageisfollowed ?FollowStatus ==1?'Following':'Request Sent' : 'Join'}</button>
                     
                    </div>
                </div>
            </div>
            {PageList.length > 0 && <div className='position-sticky' style={{top:"60px"}}>
                <div className='container-fluid py-3 newsbox mt-3' >
                    <h3 className='fontsubtitle mb-1' style={{ color: "#4535C1" }}>Pages to follow</h3>
                    {PageList && PageList.filter(item => item._id !== PageDetails?._id).slice(0, 3).map((item, index) => (
                        <div style={{ borderBottom: "1px solid #E8E8E8" }}>
                            <div className='d-flex flex-row py-2 align-items-end justify-content-around'>
                                <img src={BASE_URL + item?.profile_icon} className='blog-img' alt='image' style={{ objectFit: 'contain' }} onError={handleImagePageError} />
                                <div className='mr-2 my-auto w-50' style={{ maxWidth: '45%' }}>
                                    <h3 className='mb-0 fonttext ' style={{
                                        width: '165%'
                                        , whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                    }}>{item?.title}
                                         
                                    </h3>
                                    <p className='mb-0 fonttext text-secondary1' style={{
                                        width: 'max-content', whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                    }}>
                                        {item?.industry_data?.title}
                                    </p>
                                    <p className='newsfeed1 mb-0 fonthint'>
                                        {item?.page_follow_data?.length}&nbsp;Followers
                                    </p>
                                </div>
                                <div className='my-auto' >
                                    <button
                                        onClick={() => {
                                            if (CheckGuest()) {
                                                window.location.href = `/pages/${slugify(item?.title)}`
                                            }
                                            else {
                                                AddNewPages(item)
                                            }
                                        }}
                                        className='btn btn-connect d-flex justify-content-center rounded-2 text-center fonthint py-1 px-2' style={{ fontWeight: '600' }}>
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {PageList.length > 3 && <div className='d-flex justify-content-center pt-3' ><span className='fontcontent1 font-weight-normal text-dark1' onClick={() => navigate(`/list_page`)}>See all pages</span></div>}
                </div>
            </div>}
            <Modal show={ModalOpen} onHide={() => ModalToggle()} className="modelfilter " size="mdd">
                <Modal.Header>
                    <span className=" fontsubtitle text-dark1 mb-0 ml-4">Share Page Link</span>
                    <i class="fa fa-times" aria-hidden="true" style={{ cursor: 'pointer' }} onClick={() => ModalToggle()}></i>
                </Modal.Header>
                <Modal.Body>
                    <div className=' card border-0 shadow-none align-items-center h-100 row-gap-3'>
                        <div className='w-100'>
                            <span className='fontsubtitle text-dark1 ml-4'>{PageDetails?.title}
                           

                            </span>

                            <p className='fontcontent2 text-dark font-weight-light ml-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="ml-4">
                            <span className='fontsubtitle text-dark1'>Share via</span>
                            <div className='d-flex column-gap-4 my-3'>
                                <a role='button'><img src='/images/icons/whatsapp.png' style={{ width: '25px', height: '25px' }} /></a>
                                <a role='button'
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const pageUrl = window.location.href;
                                        navigator.clipboard.writeText(pageUrl);
                                        const bodyText = `I've invited you to join the page! Check it out: \n\n ${encodeURIComponent(pageUrl)}`;
                                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Join+the+page&body=${encodeURIComponent(bodyText)}&bcc=`;
                                        window.open(gmailUrl, '_blank');
                                    }}
                                >
                                    <img src='/images/icons/gmail.png' style={{ width: '25px', height: '25px' }} /></a>
                                <a role='button'><img src='/images/icons/messages.png' style={{ width: '25px', height: '25px' }} /></a>
                            </div>
                            <span className='fontsubtitle text-dark1'>or Copy Link</span>
                            <div className='border rounded d-flex mt-3' >
                                <span style={{ height: 'auto' }} className='fontsubtitle text-dark1 px-3 py-2' onDoubleClick={() => Copylink()}>{window.location.href}</span>
                                <button style={{ minWidth: '101px' }} className='btn btn-connect fontcontent1 ' onClick={() => Copylink()}>{linkcopy ? 'Copied' : 'Copy Link'}</button>
                            </div>

                        </div>
                        <div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <AdminContent PropsPage={PropsPage} />
        </aside>
    )
}

export default Leftside
