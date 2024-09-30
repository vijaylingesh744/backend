import React from "react";
import Skeleton from "react-loading-skeleton";
import "../FeedPage/style/style.css";
import "./Style/Shimmer.css";


export const Userpage = () => {
  return (
    <div className="d-flex py-4 px-lg-4 px-2" style={{ alignItems: 'flex-start' }}>
      <Skeleton variant="circular" className="Shimmer-pro1" />
      <div className='pl-4 w-50'>
        <div className="profile-bold w-50">
          <Skeleton />
        </div>
        <div className="profile-bold  w-75">
          <Skeleton />
        </div>
        <small className="networksmall mt-2 mb-2">
          <Skeleton />
        </small>
        <div className="profile-bold mt-2 w-50">
          <Skeleton />
        </div>
        {/* <h5 className="card-title fontsubtitle text-dark1">{userData?.user?.first_name}&nbsp;{userData?.user?.last_name}</h5> */}
        {/* <p className="fontcontent1 mb-1 text-secondary1">
                    {userData?.user?.city}, {userData?.user?.country}</p> */}
        {/* <p className="fontcontent1 text-dark1 mb-1">
                {capitalizeFirstLetter(userData?.user?.designation || "Designation")}</p> */}
        {/* <p className="fontcontent2 mb-2 text-secondary1">
                {userData?.user?.totalconnection} connections</p> */}
      </div>
    </div>
  )
}

export const Shimmer = () => {
  return (
    <div>
      <div className="feed_container" style={{ display: "grid" }}>
        <section id="ads"></section>
        <Sidebar />
        <div id="main-wrapper">
          <main id="main-section">
            <MainWrapper />
            <FeedPost />
          </main>
        </div>
        <RightShimmer />
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div id="left-aside-wrapper p-4">
      <aside id="left-aside">
        <div id="profile-card">
          <div id="profile-info " className="d-flex justify-content-center mt-5">
            <Skeleton variant="circular" className="Shimmer-pro" />
            <strong id="profile-name" className="letter-spacing"></strong>
          </div>
          <div className="p-2 px-4">
            <div className="profile-bold">
              <Skeleton />
            </div>
            <hr />
            <small className="networksmall mb-2">
              <Skeleton />
            </small>
            <div className="profile-bold">
              <Skeleton />
            </div>
            <div className="d-flex column-gap-1">
              <div className="profile-bold">
                <Skeleton />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <small className="manage">
                <Skeleton />
              </small>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export const RightShimmer = () => {
  return (
    <aside id="right-aside" className="" >
      <div className="container-fluid py-4 newsbox">
        <div className="d-flex pb-2 justify-content-between align-items-center">
          <Skeleton />
          <div className="d-inline-flex column-gap-1">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                background: "#ECECEC",
              }}
            >
              <Skeleton variant="circular" />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                background: "#ECECEC",
              }}
            >
              <Skeleton variant="circular" />
            </div>
          </div>
        </div>
        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <div className="container pl-4">
          <span className="newsfeed ">
            <Skeleton />
          </span>
        </div>
      </div>
      <div className="container-fluid py-4 newsbox mt-3">
        <div className="d-flex pb-2 justify-content-between align-items-center">
          <Skeleton />
          <div className="d-inline-flex column-gap-1">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                background: "#ECECEC",
              }}
            >
              <Skeleton variant="circular" />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                background: "#ECECEC",
              }}
            >
              <Skeleton variant="circular" />
            </div>
          </div>
        </div>

        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <p className="newsfeed mb-2">
          <Skeleton />
        </p>
        <div className="container pl-4">
          <span className="newsfeed ">
            <Skeleton />
          </span>
        </div>
      </div>
      <div className="container-fluid">
        <div className="d-flex flex-wrap mt-3 px-4 column-gap-1 moreoptions row-gap-2 justify-content-around"></div>
      </div>
    </aside>
  );
};

export const MainWrapper = () => {
  return (
    <div>
      <div className="mb-3">
        <div id="share-box">
          <div className="p-3">
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />

            <div style={{ paddingTop: 10 }}>
              {" "}
              <Skeleton />
            </div>
            <div style={{ paddingTop: 10 }}>
              <Skeleton />
            </div>
            <div style={{ paddingTop: 10 }}>
              <Skeleton />
            </div>
            <div style={{ paddingTop: 10 }}>
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedPost = () => {
  return (
    <div>
      <article className="pb-3">
        <div id="post-author">
          <a>
            <div className='align-items-center' style={{ columnGap: 10, }}>
              <div><Skeleton variant="circular" width={40} height={40} style={{ borderRadius: '50%' }} /></div>
              <div style={{ width: '40%' }}><Skeleton /><Skeleton width={'60%'} /></div>
            </div>
          </a>



        </div>
        <div>  <Skeleton style={{ height: 350 }} animation="wave" variant="rectangular" /></div>

        <div className="d-flex pt-3 px-3 justify-content-around">

          <div style={{ width: 100 }}><Skeleton /></div>
          <div style={{ width: 100 }}><Skeleton /></div>
          <div style={{ width: 100 }}><Skeleton /></div>
        </div>
        <div className="d-flex pt-3 px-3 align-items-center justify-content-around">
          <div style={{ width: '80%' }}><Skeleton /></div>
          <div><Skeleton variant="circular" width={40} height={40} style={{ borderRadius: '50%' }} /></div>

        </div>

      </article>
    </div>
  );
};

export const GPavilion = () => {
  return (
    <div className="card bg-white mx-3 mb-4 py-2 border-rad1">
      <div className="card-body border-rad1">
        <div className="row">
          <div className="col-lg-3 d-flex justify-content-center">
            <Skeleton style={{ width: "120px", height: "120px", objectFit: "contain" }} />
          </div>
          <div className="col-lg-6">
            <div className="">
              <div className="title"><Skeleton /></div>
              <div className="title"><Skeleton /></div>
              <p className="description mt-2" >
                <Skeleton />
              </p>
            </div>
          </div>
          <div className="col-lg-3 d-flex  flex-column align-items-center row-gap-1">
            <div className="country"><Skeleton /></div>
            <div className="date"><Skeleton /></div>
            <button className="viewbutton">
              <strong>View Details</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatSuggest = () => {
  return (
    <div className="card bg-white mx-2 w-100 my-3 py-2 border-rad1">
      <div className="card-body border-rad1 py-2">
        <div className="row">
          <div className="col-lg-3 d-flex justify-content-center">
            <Skeleton className="rounded-circle" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
          </div>
          <div className="col-lg-6">
            <div className="">
              <div className="title"><Skeleton /></div>
              <p className="description mt-2" >
                <Skeleton />
              </p>
            </div>
          </div>
          <div className="col-lg-3 d-flex  flex-column align-items-center row-gap-1">
            <div className="country"><Skeleton /></div>
            <div className="date"><Skeleton /></div>
          </div>
        </div>
      </div>
      <div className="card-body border-rad1 py-2">
        <div className="row">
          <div className="col-lg-3 d-flex justify-content-center">
            <Skeleton className="rounded-circle" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
          </div>
          <div className="col-lg-6">
            <div className="">
              <div className="title"><Skeleton /></div>
              <p className="description mt-2" >
                <Skeleton />
              </p>
            </div>
          </div>
          <div className="col-lg-3 d-flex  flex-column align-items-center row-gap-1">
            <div className="country"><Skeleton /></div>
            <div className="date"><Skeleton /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Chatpageloader = () => {

  return (
    <div>
      <header id="main-header">

      </header>
      <div className="feed_container" style={{ display: "grid" }}>
        <section id="ads"></section>
        <Sidebar />
        <div id="main-wrapper" className='mt-5 mt-lg-0'>
          <main id="main-section" className='mt-2 mt-lg-0'>
            <FeedPost />
          </main>
        </div>
      </div>
    </div>
  )
}

export const BallLoader = () => {
  return (
    <div>
      <div className="spinner"></div>
    </div>
  )
}

export const Notifycard = () => {
  return (
    <div>
      <header id="main-header">

      </header>
      <div className="feed_container" style={{ display: "grid" }}>
        <section id="ads"></section>
        <aside id="left-aside" ></aside>
        <div id="main-wrapper" className='mt-5 mt-lg-0'>
          <main id="main-section" className='mt-2 mt-lg-0'>
            <ChatSuggest />
            <ChatSuggest />
            <ChatSuggest />
          </main>
        </div>
      </div>
    </div>
  )
}

export const PageProfile = () => {
  return (
    <div>
      <header id="main-header">

      </header>
      <div className="feed_container" style={{ display: "grid" }}>
        <section id="ads"></section>
        <Sidebar />
        <div id="main-wrapper" className='mt-5 mt-lg-0'>
          <main id="main-section" className='mt-2 mt-lg-0'>
            <FeedPost />
          </main>
        </div>
        <RightShimmer />
      </div>
    </div>
  )
}

export const UpdateProfileShimmer = () => {
  return (
    <div>
      <header id="main-header">

      </header>

      <div className="row" style={{ paddingTop: '80px' }}>
        <div className="col-lg-5 offset-1">
          <div className="container-fluid py-4 newsbox mt-3" style={{ minHeight: '60vh' }}>
            <div className="d-flex pb-2 justify-content-between align-items-center">
              <Skeleton />
              <div className="d-inline-flex column-gap-1">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
              </div>
            </div>

            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <div className="container pl-4">
              <span className="newsfeed ">
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="container-fluid py-4 newsbox mt-3" style={{ minHeight: '40vh' }}>
            <div className="d-flex pb-2 justify-content-between align-items-center">
              <Skeleton />
              <div className="d-inline-flex column-gap-1">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
              </div>
            </div>

            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <div className="container pl-4">
              <span className="newsfeed ">
                <Skeleton />
              </span>
            </div>
          </div>
          <div className="container-fluid py-4 newsbox mt-3" style={{ minHeight: '40vh' }}>
            <div className="d-flex pb-2 justify-content-between align-items-center">
              <Skeleton />
              <div className="d-inline-flex column-gap-1">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "#ECECEC",
                  }}
                >
                  <Skeleton variant="circular" />
                </div>
              </div>
            </div>

            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <p className="newsfeed mb-2">
              <Skeleton />
            </p>
            <div className="container pl-4">
              <span className="newsfeed ">
                <Skeleton />
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export const TwoByOneShimmer = () => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <header id="main-header">
      </header>
      <div className="feed_doublecontainer" style={{ display: "grid" }}>
        <section id='ads'></section>
        <div id="main-wrapper" className='mt-lg-0'>
          <main id="main-section" className='px-5 mt-lg-0'>
            <ChatSuggest />
            <ChatSuggest />
            <ChatSuggest />
          </main>
        </div>
        <div className='px-2 py-3 d-none d-lg-block d-md-block'>
          <RightShimmer />
          <RightShimmer />
        </div>
      </div>
    </div>
  )
}