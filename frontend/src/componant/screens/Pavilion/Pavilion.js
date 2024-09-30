import React, { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { GPavilion } from "../layout/Shimmer"
import Button from "react-bootstrap/Button";
import Header from "../layout/Header";
import "../subscription/style/style.css";
import LeftSide from "../FeedPage/PostData/LeftSide";
import "../chatPage/style/chatscreen.css";
import FetchData from '../../fetch-api/Apifetch';
import './style/Pavilion.css'
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import BottomNavbar from "../layout/BottomNavbar";

const Pavilion = () => {

  const {t} = useTranslation();
  const [datalist, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);
  const [showFullText, setShowFullText] = useState(Array(datalist.length).fill(false));
  const [loadpage, setLoadpage] = useState(1)
  const scrollableDivRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [gridTemplateColumns, setGridTemplateColumns] = useState("250px 1fr 0px");
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 767) {
        setGridTemplateColumns("1fr 0px 0px");
      } else {
        setGridTemplateColumns("250px 1fr 0px");
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return ()=>{window.removeEventListener("resize", checkScreenSize)};
  }, []);
  // useEffect(() => {
  //   // Load data only when page changes
  //   dataList();
  // }, []);
  useEffect(() => {
    // Load data only when page changes
    dataList(loadpage);
  }, [page]);
  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
  //   setPage(prevPage => prevPage + 1);
  //     alert("scrolling")
  //     console.log(page);
  //   }
  // };
  const handleScroll = () => {
    const scrollableDiv = scrollableDivRef?.current;
    if (scrollableDiv) {
      // Check if scroll has reached the bottom
      if (
        scrollableDiv?.scrollTop + scrollableDiv?.clientHeight >=
        scrollableDiv?.scrollHeight
      ) {
        // Load next page only if not already loading and there is more data

        setPage(prevPage => prevPage + 1);
        setLoadpage(3)
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener to the scrollable div
    const scrollableDiv = scrollableDivRef?.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      // Remove scroll event listener when component unmounts
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    scrollableDivRef?.current?.scroll({
      top: 0,
      behavior: "smooth"
    });
  };

  const dataList = async (id = 1) => {
    setLoading(true);
    console.log(id);
 
  
 // Initialize search string
  let search = '';  
  // Construct search string based on conditions
  if (type && title && location) {
      search = `&type=${type}&title=${title}&location=${location}`;
  } else if (type && location) {
      search = `&type=${type}&location=${location}`;
  } else if (type && title) {
      search = `&type=${type}&title=${title}`;
  } else if (type) {
      search = `&type=${type}`;
  }else if (title) {
    search = `&title=${title}`;
}
    handleClose();
    const res = await FetchData(`scrap/list?page=${page}&limit=20${search}`, 'GET', null, true, false);
    if(id == 3){
      setDataList(prevDataList => [...prevDataList, ...res.users]);
      setLoading(false);
      setLoadpage(1)
    } else {
      setDataList(res.users);
      scrollToTop()
    }
  };
  // const toggleFullText = (index) => {
  //   setShowFullText(!showFullText);
  // };
  const toggleFullText = (index) => {
    // Create a new array to update the showFullText state for the respective index
    const newShowFullText = [...showFullText];
    newShowFullText[index] = !newShowFullText[index];
    setShowFullText(newShowFullText);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);
  return (
    <div>
      <div>
        <header id="sub-main-header">
          <Header handleShow={() => handleShow()} setTitle={setTitle} dataList={dataList} />
        </header>
        <div className="feed_containers" style={{ display: "grid", gridTemplateColumns: gridTemplateColumns }}>
          <section id="ads"></section>
          <div className="d-none d-md-block d-lg-block">
            <LeftSide />
          </div>
          <div id="main-wrapper background4">
            <div ref={scrollableDivRef} className="scroll" id='scroll' style={{ overflowY: "scroll", maxHeight: "90vh" }}>
              {datalist.map((item, index) => (
                <div className="card bg-white mx-0 mx-lg-3 mb-4 py-2 border-rad1">
                  <div className="card-body border-rad1">
                    <div className="row">
                      <div className="col-lg-3 d-flex justify-content-center">
                        <img src={item.image} alt=""
                          style={{ width: "120px", height: "120px", objectFit: "contain" }}
                        />
                      </div>
                      <div className="col-lg-6">
                        <div className="">
                          <div className="title ">{item.title}</div>
                          <div className="title">{item.category}</div>
                          <p className="description mt-2" >
                            {showFullText[index] ? item.description : item.description.substring(0, 200)}
                            {item.description && item.description.length > 200 &&
                              !showFullText[index]}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 d-flex  flex-column align-items-center row-gap-1">
                        <div className="country">{item.country}</div>
                        <div className="date">{item.date}</div>
                        <button className="viewbutton fontcontent1" onClick={() => toggleFullText(index)}>
                          <strong>View Details</strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && <GPavilion />}
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />            

      <Modal show={showModal} onHide={handleClose} className='modelfilter'>
        <Modal.Header >
          <Modal.Title>{t('filters')}</Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="type">

              <input
                className="form-control"
                list="locationOptions"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('enterLocation')}
              />
              <datalist id="locationOptions">
                <option value="other">Global</option>
              </datalist>

            </Form.Group>
            <Form.Group controlId="industry">
              <Form.Control
                as="select"
                placeholder="Buyer or Seller"
                className="control-filter mt-4"
                value={type}
                onChange={(e) => setType(e.target.value)}>
                <option selected>{t('selectCategory')}</option>
                <option value="1">Buyers</option>
                <option value="2">Suppliers</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" className='filter-btn px-5' onClick={() => dataList(2)}>
            Show Results
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default Pavilion
