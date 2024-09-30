import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import { useParams } from 'react-router-dom';
const Project = () => {
  const { id } = useParams();
  const [ProjectList, setProjectList] = useState([]);
  useEffect(() => {
    listProjects(id);
  }, []);

  const listProjects = async (id) => {
    try{
      const res = await FetchData(`list/project/${id}`, 'GET', null, true, false);
      if(res.status){
        setProjectList(res.data);
      }
    }catch(error) {
      console.error("Error fetching user list:", error.message);
    }
  }
  const [ViewState, setViewState] = useState(-1)
  return (
    <div>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
            <div className="card-body px-4 py-3">
              <div className="row align-items-center">
                <div className="col-9">
                  <h4 className="fw-semibold mb-8">Project Connection</h4>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a
                          className="text-muted text-decoration-none"
                          href="../main/index.html"
                        >
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Project Connection
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="col-3">
                  <div className="text-center mb-n5">
                    <img
                      src="/assets/images/breadcrumb/ChatBc.png"
                      alt=""
                      className="img-fluid mb-n4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="datatables">
            <div className="row">
              <div className="col-12">

                <div className="card">
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="mb-0">Project Connection</h5>
                    </div>

                    <div className="table-responsive">
                      <div
                        id="custom_tool_ele_wrapper"
                        className="dataTables_wrapper"
                      >

                        <table
                          id="custom_tool_ele"
                          className="table border table-striped table-bordered display text-nowrap dataTable"
                          style={{ width: "100%" }}
                          aria-describedby="custom_tool_ele_info"
                        >
                          <thead>
                            <tr>
                              <th
                                className="sorting sorting_asc"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: "10%" }}
                              >
                                SNO
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Position: activate to sort column ascending"
                                style={{ width: 261 }}
                              >
                                User Name
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Office: activate to sort column ascending"
                                style={{ width: 128 }}
                              >
                                User type
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Age: activate to sort column ascending"
                                style={{ width: 53 }}
                              >
                                Status
                              </th>

                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Salary: activate to sort column ascending"
                                style={{ width: 114 }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ProjectList && ProjectList.map((item, index) => (
                              <tr className="odd">
                                <td className="sorting_1">{index + 1}</td>
                                <td>
                                  {item.userdata.first_name}{" "}
                                  {item.userdata.last_name}
                                </td>
                                <td>
                                  {item.userdata.user_type == "0" ? "Buyer" : "Seller"}
                                </td>
                                <td>
                                  {item.status == "1" ? "Approved" : "Rejected"}
                                </td>
                                <td>
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setViewState(!(ViewState == index) ? index : -1)}
                                    width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                  </svg>
                                  <div className={`card ${ViewState == index ? '' : 'd-none'} p-1 text-center`}>
                                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                      {["Update Status", "Edit", "Terminate"].map((item, idx, arr) => (
                                        <li
                                          key={item}
                                          style={{
                                            borderBottom: idx !== arr.length - 1 ? "1px solid rgb(245, 248, 251)" : 'none',
                                            //   borderRadius: 1,
                                            cursor: "pointer",
                                            padding: '5px 0px'
                                          }}
                                        >
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="btn btn-primary mx-1" onClick={() => { window.location.href = "/project-invoice" }} >
                                    Invoice
                                  </div>
                                  <div className="btn btn-secondary mx-1" onClick={() => { window.location.href = "/chat/"+item.userdata._id }} >
                                    Chat
                                  </div>
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
        </div>
      </div>
    </div>
  )
}

export default Project