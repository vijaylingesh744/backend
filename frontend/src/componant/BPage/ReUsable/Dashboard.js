import React, { useState ,useEffect } from 'react'
 import FetchData from '../../fetch-api/Apifetch';
import Calender from '../Screens/Calender/CalenderOne';
import { handleImageError, Imagesource, validateForm } from "../../utils/Function.js";

function Dashboard() { 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA')).user);
  const [ProjectList, setProjectList] = useState([]);

  useEffect(()=>{
    localStorage.removeItem('VERIFYDATA')
    listProject();
    if(!user?.transaction_login){
      changeLoginstatus()
    }
  },[])
  const listProject = async () => {
    try {
      const res = await FetchData(
        `notify_list/${user?._id}`,
        "GET",
        null,
        true,
        false
      );
      if (res.success) {
        setProjectList(res.data);
        // alert(res.data.length)
        // listProjects(res.data[0])
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const changeLoginstatus = async()=>{

    var data = {
      transaction_login: 1,
      registerType: 'USER'
    }
    try {
      const res = await FetchData(`update/user/${user._id}`, 'POST', JSON.stringify(data), false, false)
      if (res.success) {
        // setClientNotification(res.data)
        // console.log(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container-fluid" style={{ paddingTop: "75px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6 col-xxl-3 d-flex">
            <div className="card illustration flex-fill">
              <div className="card-body p-0 d-flex flex-fill bg-connect rounded">
                <div className="row g-0 w-100">
                  <div className="col-12">
                    <div className="illustration-text p-3 m-1">
                      <h4 className="illustration-text text-white">Welcome Back, {user.first_name}</h4>
                      <p className="mb-0 text-white">Connect souq Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xxl-3 d-flex">
            <div className="card flex-fill">
              <div className="card-body py-4  bg-connect rounded">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h3 className="mb-2 text-white">$ 24.300</h3>
                    <p className="mb-2 text-white">Total Earnings</p>
                    <div className="mb-0">
                      <span className="badge badge-subtle-success me-2 text-white"> +5.35% </span>
                      <span className="text-muted text-white">Since last week</span>
                    </div>
                  </div>
                  <div className="d-inline-block ms-3">
                    <div className="stat">
                      <img src='/images/icons/dashicon.png' width={24} height={24}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xxl-3 d-flex">
            <div className="card flex-fill">
              <div className="card-body py-4  bg-connect rounded">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h3 className="mb-2 text-white">43</h3>
                    <p className="mb-2 text-white">Pending Orders</p>
                    <div className="mb-0">
                      <span className="badge badge-subtle-danger me-2 text-white"> -4.25% </span>
                      <span className="text-muted text-white">Since last week</span>
                    </div>
                  </div>
                  <div className="d-inline-block ms-3">
                    <div className="stat">
                    <img src='/images/icons/dashicon2.png' width={24} height={24}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-xxl-3 d-flex">
            <div className="card flex-fill">
              <div className="card-body py-4 bg-connect rounded">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h3 className="mb-2 text-white">$ 18.700</h3>
                    <p className="mb-2 text-white">Total Revenue</p>
                    <div className="mb-0">
                      <span className="badge badge-subtle-success me-2 text-white"> +8.65% </span>
                      <span className="text-muted text-white">Since last week</span>
                    </div>
                  </div>
                  <div className="d-inline-block ms-3">
                    <div className="stat">
                    <img src='/images/icons/dashicon1.png' width={24} height={24}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //Calender */}

        <Calender />
        <div className="row">
          <div className="col-lg-4 d-flex align-items-strech">
            <div className="card w-100">
              <div className="card-body">
               <div className='d-flex justify-content-between'>
                <div>
                <h5 className="card-title fw-semibold">Invoice</h5>
                <p className="card-subtitle mb-0">Invoice List</p>
                </div>
                <div>
                <p className="card-subtitle mb-0 font-weight-bold" role="button" onClick={()=>window.location.href="/bp/project-invoice"}>View All</p>
                </div>
                </div>
                <div id="stats" className="my-4" />
                <div className="position-relative">
                  <div className="d-flex align-items-center justify-content-between mb-7">
                    {/* <div className="d-flex">
                      <div className="p-6 bg-primary-subtle rounded me-6 d-flex align-items-center justify-content-center">
                        <i className="ti ti-grid-dots text-primary fs-6" />
                      </div>
                      <div>
                        <h6 className="mb-1 fs-4 fw-semibold">Top Sales</h6>
                        <p className="fs-3 mb-0">Johnathan Doe</p>
                      </div>
                    </div> */}
                    {/* <div className="bg-primary-subtle badge">
                      <p className="fs-3 text-primary fw-semibold mb-0">+68</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-strech">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-sm-flex d-block align-items-center justify-content-between mb-7">
                  <div className="mb-3 mb-sm-0">
                    <h5 className="card-title fw-semibold">My Projects</h5>
                    <p className="card-subtitle mb-0">lorem data</p>
                  </div>
                  <div className="mb-3 mb-sm-0">
                  <button className="btn btn-connect"
                    onClick={()=>window.location.href="project-connection/"}>
                      view All
                  </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle text-nowrap mb-0">
                    <thead>
                      <tr className="text-muted fw-semibold">
                        <th scope="col" className="ps-0">
                          Assigned
                        </th>
                        <th scope="col">Project</th>
                        <th scope="col" style={{textAlign:"center"}}>No of User</th>
                      </tr>
                    </thead>
                    <tbody className="border-top">
                      {ProjectList.map((item) => (
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center">
                              <div className="me-2 pe-1">
                                <img
                                  src={Imagesource(item?.user?.profile)} onError={handleImageError}
                                  className="rounded-circle"
                                  width={40}
                                  height={40}
                                  alt=""
                                />
                              </div>
                              <div>
                                <h6 className="fw-semibold mb-1">{item.user?.first_name}&nbsp;{item.user?.last_name}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 fs-3">{item.project.title}</p>
                          </td>
                          <td>
                            <span className="badge fw-semibold py-1 w-85 bg-primary-subtle text-primary">
                            {item?.connect_project.length} Users
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
