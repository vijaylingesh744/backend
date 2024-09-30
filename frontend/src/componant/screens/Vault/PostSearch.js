import React, { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from '../layout/Header';
import { BASE_URL } from '../../utils/ApiRoute';
import { handleImageError, Imagesource, Splittext, handleImagePageError, slugify } from "../../utils/Function";
import FetchData from "../../fetch-api/Apifetch";
import "../Connections/Style/style.css";
import LeftSide from "../FeedPage/PostData/LeftSide";
import Post from "../FeedPage/PostData/Post";
import { useLocation } from 'react-router-dom';

const PostSearch = () => {
    const navigate = useNavigate();
    const [Posts, setPosts] = useState([]);
    const { search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const searchParam = urlParams.get('search');

    useEffect(() => {
        if (searchParam) {
            SearchSubmit(searchParam)
        }
    }, []);

    const SearchSubmit = async (search) => {
        try {
            const res = await FetchData('commonsearch?search=' + search, 'GET', null, false, false)
            console.log(res);
            if (res.success) {
                setPosts(res.data.posts)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <header id="main-header">
                <Header />
            </header>
            <div className="feed_container d-grid">
                <section id="ads"></section>

                <div className="d-none d-md-block d-lg-block px-0 mt-3">
                </div>
                <div id="main-wrapper " className="mt-5 mt-lg-0 pr-lg-3">
                    <main id="main-section" className="mt-2 mt-lg-0 ">
                        <div className="container-fluid bg-white rounded shadow-sm w-100 px-0 mt-3">
                            <div className="d-flex align-items-center p-3 justify-content-between">
                                <span className="fontsubtitle font-weight-1 text-connect1">
                                    Posts
                                </span>
                            </div>
                            <div className="container-fluid pb-2 mt-2">
                                {Posts && Posts.map((item, index) => (
                                    <Post item={item} />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
                <div className="d-none d-md-block d-lg-block px-0 mt-3">
                    <LeftSide />
                </div>
            </div>
        </div>
    )
}

export default PostSearch