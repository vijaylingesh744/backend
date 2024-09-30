import React, { useEffect, useRef, useState } from 'react'
import { slugify } from '../../utils/Function';
import Header from '../layout/Header'
import LeftSide from '../FeedPage/PostData/LeftSide';
import FetchData from '../../fetch-api/Apifetch';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../FeedPage/PostData/Post';
import { handleImageError, Imagesource, handleImagePageError } from "../../utils/Function";
import { toast } from 'react-toastify';
import { BASE_URL } from "../../utils/ApiRoute";
import BottomNavbar from '../layout/BottomNavbar';

const Searchresults = () => {
  const peopleref = useRef(null);
  const postref = useRef(null);
  const pageref = useRef(null);
  const { search } = useLocation()
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(search);
  const searchParam = urlParams.get('search');
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user)
  const [People, setPeople] = useState([])
  const [Posts, setPosts] = useState([])
  const [Pages, setPages] = useState([])
  const [connectlist, setConnectlist] = useState([])
  const [viewcard, setviewcard] = useState(0)
  const text = 'working as a developer, with a passion in new technology  with a passion in new technology';

  useEffect(() => {
    if (searchParam) {
      SearchSubmit(searchParam)
    }
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const refName = entry.target.getAttribute('data-ref');
          switch (refName) {
            case 'people':
              setviewcard(0);
              break;
            case 'posts':
              setviewcard(1);
              break;
            case 'pages':
              setviewcard(2);
              break;
            default:
              break;
          }
        }
      });
    }
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // observe relative to the viewport
      threshold: 0.5, // trigger when 50% of the element is visible
    });

    // Observe each section
    if (peopleref.current) observer.observe(peopleref.current);
    if (postref.current) observer.observe(postref.current);
    if (pageref.current) observer.observe(pageref.current);

    return () => {
      if (peopleref.current) observer.unobserve(peopleref.current);
      if (postref.current) observer.unobserve(postref.current);
      if (pageref.current) observer.unobserve(pageref.current);
    };
  }, [peopleref, postref, pageref]);

  const handleScrollToSection = (ref, card) => {
    setviewcard(card)
    if (ref.current) {
      const topPosition = ref.current.getBoundingClientRect().top + window.scrollY - 65; // Adjust by 80px
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleConnectUser = async (id) => {
    const connectData = {
      sender: user?._id,
      receive: id
    }
    setConnectlist((prevList) => [...prevList, id]);

    try {
      const res = await FetchData('userconnect/add', "POST", JSON.stringify(connectData), false, false)
      toast.success('Connection Request sent')
    } catch (err) {
      console.log(err);
    }
    console.log(connectlist);
  }

  const SearchSubmit = async (search) => {
    try {
      const res = await FetchData(`commonsearch?search=${search}&user_id=${user?._id}`, 'GET', null, false, false)
      console.log(res);
      if (res.success) {
        setPeople(res.data.users)
        setPosts(res.data.posts)
        setPages(res.data.pages)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const UserCheck = () => {
    if (searchParam.length == 0) return false;
    window.location.href = "/main?search=" + searchParam
  }
  const onMoveUser = (ID) => {
    window.location.href = "/user/" + ID
  }

  return (
    <div>
      <header id='main-header'>
        <Header />
      </header>
      <div className='feed_container' style={{ display: 'grid' }}>
        <section id="ads"></section>
        <aside id="left-aside">
          <div className="container-fluid card w-100 py-2 position-sticky" style={{ top: '60px' }}>
            <div className='p-2'><span className='fontmdtitle text-dark1 font-weight-1'>On search result </span></div>
            <div className='p-2'>
              <a onClick={() => handleScrollToSection(peopleref, 0)} role="button"><p className={`fontcontent1 ${viewcard == 0 ? 'text-connect1' : 'text-dark1'}`}>People</p></a>
              <a onClick={() => handleScrollToSection(postref, 1)} role="button"><p className={`fontcontent1 ${viewcard == 1 ? 'text-connect1' : 'text-dark1'}`}>Posts</p></a>
              <a onClick={() => handleScrollToSection(pageref, 2)} role="button"><p className={`fontcontent1 ${viewcard == 2 ? 'text-connect1' : 'text-dark1'}`}>Pages</p></a>
            </div>
          </div>
        </aside>
        <div id="main-wrapper" className='mt-5 mt-lg-0'>
          <main id="main-section" className='mt-2 mt-lg-0'>
            <div className="container-fluid w-100 bg-white p-2"
              ref={peopleref} data-ref="people" style={{ borderRadius: '15px' }}>
              <div className='px-3 py-2'>
                <span className='fontmdtitle text-dark1 font-weight-1'>
                  People
                </span>
              </div>
              <div className='container-fluid w-100 py-3'>
                {People && People.slice(0, 3).map((item, index) => (
                  <div className='d-flex py-2 border-top '>
                    <div className='d-flex align-items-center column-gap-3' style={{ width: '80%' }}>
                      <img
                        src={`${item?.profile ? `${Imagesource(item?.profile)}` : `/images/profile/img0${item?.randomprofile}.png`}`}
                        onError={handleImageError}
                        width={'48px'}
                        height={'48px'}
                        className="rounded-circle"
                        onClick={() => { onMoveUser(item?._id) }}
                        style={{ minWidth: '48px' }} />
                      <div className='w-85' onClick={() => { onMoveUser(item?._id) }}>
                        <p className='font-weight-1 text-dark1 fontcontent1 mb-0'>{item?.first_name}&nbsp;{item?.last_name}</p>
                        <p className='fonttext text-dark1 mb-1'>{item?.designation ? item?.designation : '--'}</p>
                        <p className='fonttext text-secondary1 mb-1' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '90%' }}>{item?.about ? item?.about : ''}</p>
                        <p className='fonthint text-secondary1 mb-1'>{item?.city},{item?.country}</p>
                      </div>
                    </div>
                    <div className='m-auto'>
                      {item?.connected == 1 ?
                        <button className='btn btn-outline-connect1 py-1 px-2 rounded-pill'
                          onClick={() => { window.location.href = "/chats" }}>
                          Message
                        </button>
                        : <button className='btn btn-outline-connect1 py-1 px-2 rounded-pill'
                          disabled={connectlist.includes(item?._id) || item?.connected == 1}
                          onClick={() => handleConnectUser(item?._id)}>
                          {connectlist.includes(item?._id) || item?.connected == 1 ? 'Req Sent' : 'Connect'}
                        </button>
                      }
                    </div>
                  </div>
                ))}
              </div>
              {People && People.length > 3 &&
                <div className='d-flex justify-content-center py-2' >
                  <a style={{ cursor: 'pointer' }} onClick={() => UserCheck()}><span className="fontsubtitle font-weight-1 text-secondary1">See All People</span></a>
                </div>
              }
            </div>
            <div className="container-fluid w-100 bg-white mt-3 p-2" ref={postref} data-ref="posts" style={{ borderRadius: '15px' }}>
              <div className='px-3 py-2'><span className='fontmdtitle text-dark1 font-weight-1'>Posts</span></div>
              <div className='container-fluid w-100 px-0 py-1'>
                {Posts && Posts.slice(0, 3).map((item, index) => (
                  <Post item={item} />
                ))}
              </div>
              {Posts && Posts.length > 3 &&
                <div className='d-flex justify-content-center py-2'>
                  <a style={{ cursor: 'pointer' }}><span className="fontsubtitle font-weight-1 text-secondary1"
                    onClick={() => navigate("/post-search?search=" + searchParam)}
                  >See All Posts</span></a>
                </div>
              }
            </div>
            <div className="container-fluid w-100 bg-white mt-3 p-2" ref={pageref} data-ref="pages" style={{ borderRadius: '15px' }}>
              <div className='px-3 py-2'><span className='fontmdtitle text-dark1 font-weight-1'>Pages</span></div>
              <div className='container-fluid w-100 py-3'>
                {Pages && Pages.slice(0, 3).map((item, index) => (
                  <div className='d-flex py-2 border-top'>
                    <div className='d-flex align-items-center column-gap-3' style={{ width: '80%' }}>
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
                      <div className='w-85'>
                        <p className='font-weight-1 text-dark1 fontcontent1 mb-0'>{item?.title}</p>
                        <p className='fonttext text-dark1 mb-1'>{item?.page_follow_data ? item?.page_follow_data.length + " " + 'Followers' : '--'}</p>
                        <p className="fontcontent2 text-secondary1 mb-0">
                          {item?.industry_data?.title}
                        </p>
                      </div>
                    </div>
                    <div className='m-auto'>
                      <button className='btn btn-connect1 py-1 px-2 rounded-pill'
                        onClick={() =>
                          window.location.href = `/pages/${slugify(item?.title)}`}>
                        View Page
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {Pages && Pages.length > 3 &&
                <div className='d-flex justify-content-center py-2' >
                  <a style={{ cursor: 'pointer' }} ><span className="fontsubtitle font-weight-1 text-dark1" onClick={() => navigate('/list_page', { state: searchParam })}>See All Pages</span></a>
                </div>
              }
            </div>
          </main>
        </div>
        <div>
          <LeftSide />
        </div>
      </div>
      <BottomNavbar />
    </div>
  )
}

export default Searchresults
