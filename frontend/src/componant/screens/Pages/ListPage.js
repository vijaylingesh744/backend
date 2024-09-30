import React, { startTransition, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import FetchData from "../../fetch-api/Apifetch";
import { BASE_URL } from "../../utils/ApiRoute";
import { CheckGICTC, handleImagePageError, slugify, Splittext,CheckTick} from '../../utils/Function';
import { ChatSuggest } from "../layout/Shimmer";
import Header from "../layout/SubHeader";
import BottomNavbar from "../layout/BottomNavbar";
import locations from '../../utils/location.json'
import AllSkill from '../../../all_skills';
import "./style/style.css";
import { Modal } from "react-bootstrap";

const ListPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("LOGINDATA"))?.user
    );
    const [filterText, setFilterText] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [ViewTab, setViewTab] = useState(0);
    const [Allpages, setAllpages] = useState([]);
    const [followpages, setFollowpages] = useState([]);
    const [sentpages, setSentpages] = useState([]);
    const [Loader, setLoader] = useState(false);
    const [mypages, setmypages] = useState([]);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const [RequestData, setRequestList] = useState([]);
    const [Formdata, setFormData] = useState({
        location: "",
        industry: "",
        search: "",
        city: '',
        isgictc: false
    });
    
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLoader(true);
        RequestList();
        UserFollowed();
        dataList();
        fetchPagesData();
        if (state) {
            HandleSubmit(false, true)
        } else {
            ListPages();
        }
    }, []);


    useEffect(() => {
        if (Formdata.isgictc) {
            HandleSubmit();
        } else if (!state) {
            ListPages();
        }
    }, [Formdata.isgictc]);

    const handleToggleChange = () => {
        setFormData(prevState => ({
            ...prevState,
            isgictc: !prevState.isgictc,
        }));
    };

    const [cityList, setCityList] = useState([]);

    const Citylist = (title) => {
        const filteredCities = [];
        var data = locations.find(item => item.name == Formdata.location)
        data.states.forEach(state => {
            state.cities.forEach(city => {
                if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
                    filteredCities.push({ name: city.name, state: state.name });
                }
            });
        });
        setCityList(filteredCities)
    }
    const ListPages = async () => {
        setSelectedItems([])
        setFormData({
            location: "",
            industry: "",
            search: "",
            city: '',
            isgictc: false
        })
        try {
            const res = await FetchData(
                `list/page${user?._id ? `?user_id=${user?._id}` : ""}`,
                "GET",
                null,
                false,
                false
            );
            if (res.success) {
                setAllpages(res.data);
                setLoader(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const UserFollowed = async () => {
        try {
            const res = await FetchData(
                `user/follow/${user?._id}`,
                "GET",
                null,
                false,
                false
            );
            const ListPage = res.data;
            setFollowpages(ListPage.filter(item=>item.page_follow_Item.status == 1));
            setSentpages(ListPage.filter(item=>item.page_follow_Item.status != 1))
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPagesData = async () => {
        try {
            const myPagesRes = await FetchData(
                `admin_page/${user?._id}`,
                "GET",
                null,
                false,
                false
            );
            const myPages = myPagesRes.data;
            const adminPagesRes = await FetchData(
                `user_role_page/${user?._id}`,
                "GET",
                null,
                false,
                false
            );
            const adminPages = adminPagesRes.data.map(item => ({ ...item.page, ["user_id"]: user._id })); // Extract the "page" property
            const mergedPages = [...myPages, ...adminPages];
            const uniquePages = mergedPages.filter(
                (page, index, self) =>
                    index === self.findIndex(p => p._id === page._id)
            );
            setmypages(uniquePages);

            console.log("uniquePages", uniquePages); // Optional: Log the merged array
        } catch (err) {
            console.log(err);
        }
    };

    const removeConnection = async (id) => {
        try {

            Swal.fire({
                title: 'Unfollow?',
                html: `<span style="font-size: 16px; font-weight: bold;">Page join request cancelled successfully?</span>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4535C1',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel join request!',
                cancelButtonText: 'Cancel',
                customClass: {
                    confirmButton: 'swal2-confirm-custom',
                    cancelButton: 'swal2-cancel-custom',
                    title: 'swal2-title',
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await FetchData(
                        "remove/follow/" + id,
                        "GET",
                        null,
                        false,
                        false
                    );
                    if (res.status) {
                        toast.success("join request cancelled successfully");
                        ListPages();
                        UserFollowed();
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    const HandleSubmit = async (isload, statepass = false) => {
        if (isload) {
            setLoader(false);
        } else {
            setLoader(true);
        }
        try {
            var Objectdata = {
                ...Formdata,
                area_of_interest: selectedItems
            };
            if (statepass && state) {
                Objectdata = {
                    ...Objectdata,
                    search: state
                };
            }
            const res = await FetchData(
                "filter_pages?user_id=" + user._id,
                "POST",
                JSON.stringify(Objectdata),
                false,
                false
            );
            // if (ViewTab == 0) {
            setAllpages(res.data);
            // }
            setLoader(false);
        } catch (err) {
            console.log(err)
        }
    };

    const PageConnect = async (data, index) => {
        if (index == 0) {
            if (data.title.toLowerCase().includes("gict")) {
                let GICTC = prompt('Please type in your GICTC Code:');
                const ItsConnect = await CheckGICTC(GICTC);
                if (!ItsConnect) {
                    GICTC.length > 0 && alert("Oops! The GICTC input is incorrect. Please check and try again.");
                    return
                }
            }
            AddConnection(data?._id);
        } else {
            removeConnection(data?.page_follow_data_id);
        }
    }

    const dataList = async () => {
        const res = await FetchData("industry", "GET", null, false, false);
        setOptions(res.data.data);
    };
    const RequestList = async () => {
    try{
        const res = await FetchData("/user_request/" + user._id, "GET", null, false, false);
        if(res.data){
            setRequestList(res.data);
        }
    } catch (err) {
        console.log(err)
    }
    };

    const handleCheckboxChange = (title) => {
        if (selectedItems.includes(title)) {
            setSelectedItems(selectedItems.filter(item => item !== title));
        } else {
            setSelectedItems([...selectedItems, title]);
        }
    }

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const AddConnection = async (id) => {
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
            const res = await FetchData(
                "add/follow/" + id,
                "POST",
                JSON.stringify(dataObject),
                false,
                false
            );
            if (res.success) {
                HandleSubmit(true);
                UserFollowed();
                toast.success("Page Join request sent");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const MyPageList = () => (
        <>
            {mypages &&
                mypages?.filter(item => {
                    if (!search) {
                        return true;
                    }
                    return item?.title.toLowerCase().includes(search.toLowerCase()) ||
                        item?.industry_data?.title.toLowerCase().includes(search.toLowerCase());
                }).map((item) => (
                    <div className="card border shadow-sm mb-1" role="button">
                        <div className="d-flex p-2 align-items-center justify-content-sm-between column-gap-1">
                            <div className="d-flex column-gap-3 w-75">
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
                                        {item?.title}{" "}
                                        {" "}
                                        {CheckTick(item?.user_id)}
                                        
                                    </span>
                                    <p className="fontcontent1 text-secondary1 mb-0">
                                        {item?.industry_data?.title}
                                    </p>
                                    <p className="fontcontent2 text-secondary1 mb-0">
                                        {item?.description ? Splittext(item?.description, 15) : 'Details about the Page will be shown here.'}
                                    </p>
                                </div>
                            </div>
                            <div className="w-lg-30 d-flex justify-content-center">
                                <button
                                    className="btn btn-outline-connect  rounded-01 py-1 mr-1"
                                    onClick={() => {
                                        startTransition(() => {
                                            navigate(`/pages/${slugify(item?.title)}`, {
                                                state: { user_id: item.user_id }
                                            });
                                        });
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-outline-connect  rounded-01 py-1"
                                    onClick={() => {
                                        startTransition(() => {
                                            navigate("/add_page", { state: item });
                                        });
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )

    const FollowingPage = () => {
        if (ViewTab !== 1) return null; // Early return if not in the correct tab

        if (!followpages) return null; // Return null if Page or followpages is falsy

        const filteredPages = followpages.filter(item => {
            if (!search) return true;
            return item?.title.toLowerCase().includes(search.toLowerCase()) ||
                item?.industry_data?.title.toLowerCase().includes(search.toLowerCase());
        });

        return filteredPages.map(item => (
            <div className="card border shadow-sm mb-1" key={item.id} role="button">
                <div className="d-flex p-2 align-items-center justify-content-sm-between column-gap-1">
                    <div className="d-flex column-gap-3 w-75" onClick={() => {
                        startTransition(() => {
                            navigate(`/pages/${slugify(item?.title)}`);
                        });
                    }}>
                        <div className="ml-lg-3 mt-2">
                            <img
                                className="rounded"
                                style={{
                                    objectFit: "contain",
                                    height: "70px",
                                    width: "70px",
                                }}
                                src={BASE_URL + item?.profile_icon}
                                onError={handleImagePageError}
                            />
                        </div>
                        <div className="w-lg-60">
                            <span className="fontsubtitle text-dark1">{item?.title}{" "}
                            {CheckTick(item?.user_id)}
                            </span>
                            <p className="fontcontent1 text-secondary1 mb-0">{item?.industry_data?.title}</p>
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
                            className="btn btn-outline-connect rounded-01 py-1"
                            onClick={() => PageConnect(item, 1)}
                        >
                           {item?.page_follow_Item.status ==1?"Following":"Request sent"} 
                        </button>
                    </div>
                </div>
            </div>
        ));
    };
    const SentPageList = () => {
        if (ViewTab !== 3) return null; // Early return if not in the correct tab

        if (!sentpages) return null; // Return null if Page or followpages is falsy

        const filteredPages = sentpages.filter(item => {
            if (!search) return true;
            return item?.title.toLowerCase().includes(search.toLowerCase()) ||
                item?.industry_data?.title.toLowerCase().includes(search.toLowerCase());
        });

        return filteredPages.map(item => (
            <div className="card border shadow-sm mb-1" key={item.id} role="button">
                <div className="d-flex p-2 align-items-center justify-content-sm-between column-gap-1">
                    <div className="d-flex column-gap-3 w-75" onClick={() => {
                        startTransition(() => {
                            navigate(`/pages/${slugify(item?.title)}`);
                        });
                    }}>
                        <div className="ml-lg-3 mt-2">
                            <img
                                className="rounded"
                                style={{
                                    objectFit: "contain",
                                    height: "70px",
                                    width: "70px",
                                }}
                                src={BASE_URL + item?.profile_icon}
                                onError={handleImagePageError}
                            />
                        </div>
                        <div className="w-lg-60">
                            <span className="fontsubtitle text-dark1">
                            {item?.title}{" "}
                            {CheckTick(item?.user_id)}
                            </span>
                            <p className="fontcontent1 text-secondary1 mb-0">{item?.industry_data?.title}</p>
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
                            className="btn btn-outline-connect rounded-01 py-1"
                            onClick={() => PageConnect(item, 1)}
                        >
                           {item?.page_follow_Item.status ==1?"Following":"Request sent"} 
                        </button>
                    </div>
                </div>
            </div>
        ));
    };

    const RecommendedPage = () => (
        Allpages?.filter(item => {
            if (!search) {
                return true;
            }
            return item?.title.toLowerCase().includes(search.toLowerCase()) ||
                item?.industry_data?.title.toLowerCase().includes(search.toLowerCase());
        }).map((item) => (
            <div
                className="card border shadow-sm mb-1" role="button">
                <div className="d-flex p-2 align-items-center justify-content-sm-between column-gap-1">
                    <div className="d-flex column-gap-3 w-75">
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
                        <div className="w-lg-60"
                            onClick={() => {
                                startTransition(() => {
                                    navigate(`/pages/${slugify(item?.title)}`);
                                });
                            }}>
                            <span className="fontsubtitle font-weight-1 text-dark1">
                                {item?.title}
                                {" "}
                            {CheckTick(item?.user_id)}
                            </span>
                            <p className="fontcontent2 text-secondary1 mb-0">
                                {item?.industry_data?.title}
                            </p>
                            <p className="fontcontent2 text-secondary1 mb-0">
                                {item?.description ? Splittext(item?.description, 15) : 'Details about the Page will be shown here.'}
                            </p>
                            <p className="fonttext text-secondary1 mb-0">
                                {item?.page_follow_data?.length}&nbsp;Followers
                            </p>
                        </div>
                    </div>
                    <div className="w-lg-20 d-flex justify-content-center">
                        <button
                            className="btn btn-connect rounded-01 py-1"
                            onClick={() => PageConnect(item, 0)}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div>
            <header id="main-header">
                <Header />
            </header>
            <div className="feed_doublecontainer" style={{ display: "grid" }} >
                <section id="ads">
                </section>
                <div id="main-wrapper" className="px-0 mt-5 mt-lg-0">
                    <main id="main-section" className="pr-lg-3 mt-2 mt-lg-0">
                        <div className="container-fluid bg-white rounded border w-100 mb-2"
                            style={{ height: "auto" }}>
                            <div className="d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                                <div className="container d-flex px-lg-3 px-0">
                                    {[
                                        { id: 0, label: 'Recommended' },
                                        { id: 1, label: `Following (${followpages.length})` },
                                        { id: 3, label: `Sent (${sentpages.length})` },
                                        { id: 2, label: `My Pages (${mypages.length})` },
                                    ].map(tab => (
                                        <div
                                            key={tab.id}
                                            className={`w-50 d-flex justify-content-center ${ViewTab==tab.id ? 'activestop' : ''} py-3`}
                                            role="button"
                                            onClick={() => setViewTab(tab.id)}
                                        >
                                            <span className="fontcontent2 text-center pl-2">{tab.label}</span>
                                        </div>
                                    ))}

                                    <div className="d-lg-none d-md-none d-block justify-content-center px-2 py-3">
                                        <span className="fontsubtitle" onClick={() => setShowModal(true)}>
                                            <i className="fa fa-filter" style={{ color: '#4535C1' }} />
                                        </span>
                                    </div>
                                </div>

                                <div className="d-none d-md-block d-lg-block">
                                    <input
                                        placeholder="Search Here"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        style={{ height: '2rem' }}
                                        className='text-dark bg-light col-12 mr-5 border rounded-01'
                                    />
                                </div>
                            </div>

                            {Loader ? (
                                <div>
                                    <ChatSuggest />
                                    <ChatSuggest />
                                    <ChatSuggest />
                                </div>
                            ) : (
                                <div className="container-fluid py-4 row-gap-3 px-0 px-lg-2">
                                    {ViewTab == 0?Allpages&&<RecommendedPage />
                                    :ViewTab==1?followpages &&<FollowingPage />
                                    :ViewTab==2?<MyPageList />:<SentPageList />}
                                    {(ViewTab == 0 && Allpages?.length == 0) || (ViewTab == 1 && followpages?.length == 0 && (
                                        <div className="container d-flex align-items-center justify-content-center w-100"
                                            style={{ height: "40vh" }}>
                                            <img src="/images/busi_images/noData1.png"
                                                width={150}/>
                                            <p className="text-secondary1 fonttitle  font-weight-bold mb-2">
                                                No page followed
                                            </p>
                                            <p className="text-secondary1 fontsubtitle  font-weight-bold mb-1">
                                                Start following pages to view the list
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                <div className="d-none d-md-block d-lg-block">
                    <div className="position-sticky" style={{ top: '60px' }}>
                        <div className="card w-100 p-2 scrollerhide">
                            <div className="w-100 p-2 scrollerhide" style={{ height: "77vh", overflowY: 'scroll' }}>
                                <div className="text-end d-flex align-items-center">
                                    <span className="text-connect1 text-center fontsubtitle w-100 font-weight-1">
                                        Filter
                                    </span>
                                </div>
                                <div className="d-flex mt-3 justify-content-between">
                                    <span className="fontsubtitle text-dark1">GICTC</span>
                                    <label class="switch">
                                        <input type="checkbox"
                                            checked={Formdata.isgictc}
                                            onChange={handleToggleChange} />
                                        <span class="slider rounds"></span>
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <div>
                                        <div className='w-100 filterinput'>
                                            <label htmlFor="accountNumber" className="text-dark1">Search</label>
                                            <input
                                                type="text"
                                                className="form-control mb-2 rounded-01"
                                                value={Formdata.search}
                                                onChange={(e) => {
                                                    setFormData({ ...Formdata, ["search"]: e.target.value })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-dark1">Country</label>
                                        <div className='w-100 filterinput'>
                                            <select
                                                name="country"
                                                className="form-control mb-2 rounded-01"
                                                value={Formdata.location}
                                                placeholder=" "
                                                onChange={(e) => {
                                                    setFormData({ ...Formdata, ["location"]: e.target.value })
                                                }}
                                            >
                                                <option value="">Country</option>
                                                {locations.map(item => (
                                                    <option value={item.name}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-dark1">City</label>
                                        <div className='w-100 filterinput'>
                                            <input list="citys"
                                                name="city"
                                                className="form-control mb-2 rounded-01"
                                                placeholder='Enter City'
                                                disabled={Formdata.location ? false : true}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    Citylist(value)
                                                    setFormData({ ...Formdata, ["city"]: value });
                                                }}
                                            />
                                            <datalist id="citys">
                                                {cityList.map(item => (
                                                    <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                                ))}
                                            </datalist>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <label className="text-dark1">Sector</label>
                                        <div className='w-100 filterinput'>
                                            <select className={`form-control inputcontrol rounded-01 mb-2 w-100`}
                                                id="exampleInputCountry"
                                                placeholder=" "
                                                onChange={(e) => {
                                                    setFormData({ ...Formdata, ["industry"]: e.target.value })
                                                }}
                                                aria-describedby="countryHelp">
                                                <option value="">Industry</option>
                                                {options && options.map((item) => (
                                                    <option value={item._id}>{item.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='w-100 filterinput'>
                                        <label htmlFor="accountNumber" className="text-dark1">Skills</label>
                                        <input
                                            type="text"
                                            className="form-control mb-2 rounded-01"
                                            value={filterText}
                                            onChange={handleFilterChange}
                                        />
                                        {selectedItems.length != 0 &&
                                            <div className='py-1 px-2'>
                                                <label htmlFor="accountNumber">Selected items:</label>

                                                <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 2 }}>
                                                    {selectedItems.map((item, index) => (
                                                        <div style={{ background: '#592C92', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center my-1">
                                                            <li key={index} className=' px-2'
                                                                style={{ cursor: "pointer", fontSize: "12px" }}
                                                                onClick={() => handleCheckboxChange(item)} >{item}</li>
                                                            <span className='p-1' style={{ color: 'red', cursor: 'pointer' }}
                                                                onClick={() => handleCheckboxChange(item)}>
                                                                <strong>&times;</strong>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>}
                                        <div className='card p-2'>
                                            <h5>Suggested</h5>
                                            <hr style={{ marginBottom: "0%", marginTop: "0%" }} />
                                            <div
                                                className={`options ${true ? "d-flex" : "d-none"}`}
                                                style={{ maxHeight: "180px", overflowY: "scroll", flexWrap: "wrap" }}
                                            >
                                                {AllSkill.filter(
                                                    (option) => !selectedItems.includes(option)
                                                ) // Exclude selected items
                                                    .filter((option) => {
                                                        if (filterText && filterText.length === 2) {
                                                            const sanitizedFilterText = filterText.replace(
                                                                /\s/g,
                                                                ""
                                                            ); // Remove spaces from filterText
                                                            return option
                                                                .toLowerCase()
                                                                .includes(sanitizedFilterText.toLowerCase());
                                                        }
                                                        if (filterText && filterText.length > 2) {
                                                            return option
                                                                .toLowerCase()
                                                                .includes(filterText.toLowerCase());
                                                        }
                                                        return true;
                                                    })
                                                    .slice(0, 100)
                                                    .map((optiontext, index) => (
                                                        <div key={index} className="option mx-1 px-1 py-1 my-1"
                                                            style={{ cursor: "pointer", fontSize: "10px", display: "flex", flexWrap: "wrap" }}
                                                            onClick={() => handleCheckboxChange(optiontext)}
                                                        >
                                                            <div className='d-flex justify-content-around p-2 ' style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                                                                {optiontext}

                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-outline-connect rounded-pill"
                                    onClick={() => ListPages()}
                                >Reset</button>

                                <button className="btn btn-connect rounded-pill"
                                    onClick={() => {
                                        setViewTab(0)
                                        HandleSubmit();
                                    }}
                                >Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Modal
                show={showModal}
                onHide={handleClose}
                className="modelfilter modal-xl modaltop feed-modal"
                size="lgg"
            ><Modal.Body className="px-0 pt-0 pb-0" style={{ backgroundColor: "transparent", alignContent: "center" }}>
                    <div className="card scrollerhide"
                        style={{ height: "80vh", overflowY: 'scroll', margin: "10px", padding: "10px", width: "auto" }}>
                        <div className="text-end d-flex justify-content-between">
                            <span className="text-connect1 text-center fontsubtitlefont-weight-1">
                                Filter
                            </span>
                            <button
                                className="btn btn-outline-connect rounded-pill px-0"
                                onClick={() => { setShowModal(false) }}
                                style={{
                                    width: "70px",
                                    padding: "4px 10px"
                                }}
                            >Close
                            </button>
                        </div>
                        <div className="d-flex mt-3 justify-content-between">
                            <span className="fontsubtitle text-dark1">GICTC</span>
                            <label class="switch">
                                <input type="checkbox"
                                    checked={Formdata.isgictc}
                                    onChange={handleToggleChange} />
                                <span class="slider rounds"></span>
                            </label>
                        </div>
                        <div className="mt-3">
                            <div>
                                <div className='w-100 filterinput'>
                                    <label htmlFor="accountNumber" className="text-dark1">Search</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2 rounded-01"
                                        value={Formdata.search}
                                        onChange={(e) => {
                                            setFormData({ ...Formdata, ["search"]: e.target.value })
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-dark1">Country</label>
                                <div className='w-100 filterinput'>
                                    <select
                                        name="country"
                                        className="form-control mb-2 rounded-01"
                                        value={Formdata.location}
                                        placeholder=" "
                                        onChange={(e) => {
                                            setFormData({ ...Formdata, ["location"]: e.target.value })
                                        }}
                                    >
                                        <option value="">Country</option>
                                        {locations.map(item => (
                                            <option value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="text-dark1">City</label>
                                <div className='w-100 filterinput'>
                                    <input list="citys"
                                        name="city"
                                        className="form-control mb-2 rounded-01"
                                        placeholder='Enter City'
                                        disabled={Formdata.location ? false : true}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            Citylist(value)
                                            setFormData({ ...Formdata, ["city"]: value });
                                        }}
                                    />
                                    <datalist id="citys">
                                        {cityList.map(item => (
                                            <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                        ))}
                                    </datalist>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <label className="text-dark1">Sector</label>
                                <div className='w-100 filterinput'>
                                    <select className={`form-control inputcontrol rounded-01 mb-2 w-100`}
                                        id="exampleInputCountry"
                                        placeholder=" "
                                        onChange={(e) => {
                                            setFormData({ ...Formdata, ["industry"]: e.target.value })
                                        }}
                                        aria-describedby="countryHelp">
                                        <option value="">Industry</option>
                                        {options && options.map((item) => (
                                            <option value={item._id}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='w-100 filterinput'>
                                <label htmlFor="accountNumber" className="text-dark1">Skills</label>
                                <input
                                    type="text"
                                    className="form-control mb-2 rounded-01"
                                    value={filterText}
                                    onChange={handleFilterChange}
                                />
                                {selectedItems.length != 0 &&
                                    <div className='py-1 px-2'>
                                        <label htmlFor="accountNumber">Selected items:</label>

                                        <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 2 }}>
                                            {selectedItems.map((item, index) => (
                                                <div style={{ background: '#592C92', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center my-1">
                                                    <li key={index} className=' px-2'
                                                        style={{ cursor: "pointer", fontSize: "12px" }}
                                                        onClick={() => handleCheckboxChange(item)} >{item}</li>
                                                    <span className='p-1' style={{ color: 'red', cursor: 'pointer' }}
                                                        onClick={() => handleCheckboxChange(item)}>
                                                        <strong>&times;</strong>
                                                    </span>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>}
                                <div className='card p-2'>
                                    <h5>Suggested</h5>
                                    <hr style={{ marginBottom: "0%", marginTop: "0%" }} />
                                    <div
                                        className={`options ${true ? "d-flex" : "d-none"}`}
                                        style={{ maxHeight: "180px", overflowY: "scroll", flexWrap: "wrap" }}
                                    >
                                        {AllSkill.filter(
                                            (option) => !selectedItems.includes(option)
                                        ) // Exclude selected items
                                            .filter((option) => {
                                                if (filterText && filterText.length === 2) {
                                                    const sanitizedFilterText = filterText.replace(
                                                        /\s/g,
                                                        ""
                                                    ); // Remove spaces from filterText
                                                    return option
                                                        .toLowerCase()
                                                        .includes(sanitizedFilterText.toLowerCase());
                                                }
                                                if (filterText && filterText.length > 2) {
                                                    return option
                                                        .toLowerCase()
                                                        .includes(filterText.toLowerCase());
                                                }
                                                return true;
                                            })
                                            .slice(0, 100)
                                            .map((optiontext, index) => (
                                                <div key={index} className="option mx-1 px-1 py-1 my-1"
                                                    style={{ cursor: "pointer", fontSize: "10px", display: "flex", flexWrap: "wrap" }}
                                                    onClick={() => handleCheckboxChange(optiontext)}
                                                >
                                                    <div className='d-flex justify-content-around p-2 ' style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                                                        {optiontext}

                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-outline-connect rounded-pill"
                                    onClick={() => {
                                        ListPages();
                                        handleClose();
                                    }}
                                >
                                    Reset
                                </button>

                                <button className="btn btn-connect rounded-pill"
                                    onClick={() => {
                                        setViewTab(0);
                                        handleClose();
                                        HandleSubmit()
                                    }}
                                >Filter</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <BottomNavbar />
        </div >
    );
};

export default ListPage;
