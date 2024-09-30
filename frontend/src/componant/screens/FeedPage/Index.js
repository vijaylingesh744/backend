import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import FetchData from '../../fetch-api/Apifetch';
import Post from './PostData/Post';
import LeftSide from './PostData/LeftSide';
import RightSide from './PostData/RightSide';
import AddPost from './PostData/AddPost';
import "./style/style.css";
import Shimmer, { Sidebar, MainWrapper,BallLoader, FeedPost, RightShimmer } from '../layout/Shimmer';
import { useRef } from 'react';
import { updateData } from '../../utils/Function';

import BottomNavbar from '../layout/BottomNavbar';

const Index = () => {
    const navigate = useNavigate();
    const [datalist, setDataList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const [Index, setIndex] = useState(1);
    const scrollableDivRef = useRef(null);
    const mainWrapperRef = useRef(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
    const [exists, setExists] = useState(1)
    const [Timestamp, setTimestamp] = useState()
    const [PostReload, setPostReload] = useState(false)
    useEffect(() => {
        if (page == 1) {
            dataList(2);
        } else {
            dataList(4);
        }
    }, [page]);
    useEffect(() => {
        if (Index > 1) {
            setPage(1)
            dataList(2);
        }
    }, [Index])

    useEffect(() => {
        // Fetch data immediately on component mount

        // Set up an interval to fetch data every 2 minutes (120000 milliseconds)
        if (datalist.length > 0) {
            const interval = setInterval(() => {
                RecallPosts();
                updateData()
            }, 90000);
            return () => clearInterval(interval);
        }
    }, [Timestamp]);

    const RecallPosts = async () => {
        try {
            const res = await FetchData(`recall/post/?time=${Timestamp}`, "GET", null, false, false)
            console.log(res);
            if (res.status) {
                setPostReload(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const dataList = async (id = 1) => {
        if (page > totalPage) {
            console.log('return');
            return
        }
        if (id == 4) {
            setLoading(true);
        }
        const res = await FetchData(`post?page=${page}&limit=12&user_id=${user?._id !== undefined ? user?._id : ''}`, 'GET', null, true, false);
        if (id == 2) {
            setTimestamp(res.data[0]?.createdAt)
            setDataList(res.data);
            setTotalPage(res.pagination.totalPages);
            setExists(res.exists)
            setPostReload(false)
            // window.scroll(1,1)
        } else {
            setDataList(prevDataList => [...prevDataList, ...res.data]);
        }
        if (id == 4) {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            if (page <= totalPage) {
                setPage(prevPage => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [pageload, setpageload] = useState(false)
    const ReloadData = async () => {
        setpageload(true);
        await setPage(1)
        await dataList(2)
        window.scroll(1, 1)
        setpageload(false);
    }

    return (
        <div>
            <header id="main-header">
                <Header />
            </header>
            <div className="feed_container" ref={scrollableDivRef} style={{ display: "grid" }}>
                <section id="ads"></section>
                <LeftSide />
                <div id="main-wrapper" className='mt-5 mt-lg-0'>
                    <main id="main-section" className='mt-2 mt-lg-0' ref={mainWrapperRef}>
                        <AddPost existing={exists} />
                        {!pageload && datalist && datalist.map(item => (
                            <Post item={item} setIndex={setIndex} ReloadData={ReloadData} />
                        ))}
                        {(loading && page == 1)?<FeedPost />:loading && <BallLoader />}
                    </main>
                </div>
                <RightSide />   
            </div>
            <div className='container-fluid d-flex justify-content-center' style={{ position: 'fixed', bottom: PostReload ? '40px' : '-40px',zIndex:'11', transition: 'bottom 0.5s ease-in-out' }}>
                <button className='btn btn-connect rounded-pill' onClick={() => ReloadData()}>Load new post</button>
            </div>
            <BottomNavbar />
        </div>
    )
}

export default Index
