import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function Projectlist() {

    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [ProjectList, setProjectList] = useState([]);
    const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem("User")));
    const [loading, setLoading] = useState(false);
    const [ViewState, setViewState] = useState(-1)
    useEffect(() => {
        listProjects();
    }, []);
    const listProjects = async () => {
        try {
            const res = await FetchData(`notify_list/${UserData._id}`, 'GET', null, true, false);
            if (res.success) {
                setProjectList(res.data);
            }
        } catch (error) {
            console.error("Error fetching user list:", error.message);
        }
    }



    if (loading) {
        return <img src='assets/images/logos/Spinner-5.gif' style={{ textAlign: "center", marginTop: "27%", marginLeft: "40%" }} />;
    }

    const DateFormate = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        };

        const formattedLocaleDate = date.toLocaleString('en-US', options);
        return formattedLocaleDate;
    }

    return (
        <div className="body-wrapper">
            <div className="container-fluid">
               
            </div>
            {ProjectList.map((item, index) => (
                <div className='container mt-1 d-flex justify-content-center'>


                    <div className='card flex-row justify-content-around text-center p-3 mb-1' style={{ width: '95%',alignItems:'center'}}>
                        <div style={{width:'5%'}}>{index + 1}</div>
                        <div style={{width:'10%'}}>{item.project.project_id.substring(0, 10)}</div>
                        <div style={{width:'10%'}}> {item.user.first_name}{" "}
                            {item.user.last_name}
                            <p style={{ color: '#cbc5c5' }}>{item.user.user_type == 0 ? "Buyer" : "Seller"}</p>
                        </div>
                        <div style={{width:'10%'}}>                                    {item.status == 1 ? <div><span style={{ color: '#8AC53F' }}>Active</span><span><img src='/images/icons/tick.png' width={20} /> </span></div> : <span style={{ color: '#FF4C4C' }}>inactive</span>}
                        </div >
                        <div style={{width:'10%'}}><Button variant="primary" style={{ backgroundColor: item.status != 1 ? "#E9E9E9" : "", color: item.status != 1 ? "gray" : "" }} disabled={item.status != 1 ? true : false} onClick={() => navigate('/cs-vault', { state: item })}>
                            <i className="ti ti-user nav-small-cap-icon fs-4 pr-sm" />Add
                        </Button></div>
                        <div style={{width:'10%'}}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                onClick={() => setViewState(!(ViewState == index) ? index : -1)}
                                width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                            <div className={`card ${ViewState == index ? '' : 'd-none'} p-3 `} style={{ backgroundColor: "#eaeff4", position: "absolute", zIndex: '999999' }} >
                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                    {[{ title: "Edit", url: '#',stage:"" }, { title: "View", url: "/project-connection/" + item.project._id,stage:item.user_id}, { title: "Terminate", url: '#',stage:'' }].map((item1, idx, arr) => (
                                        <li key={item1}
                                            onClick={() => navigate(item1.url,{state:item1.stage})}
                                            style={{
                                                borderBottom: idx !== arr.length - 1 ? "1px solid rgb(245, 248, 251)" : 'none',
                                                cursor: "pointer",
                                                padding: '5px 0'

                                            }} >
                                            {item1.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>


                    {/* <table className="table border  table-bordered display text-nowrap dataTable"> */}
                    {/* <thead>
                        <tr> */}
                    {/* <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 0px", width: "10%" }}>S.No</th>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Project ID</th>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>client</th>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Status</th> */}
                    {/* <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Date Time</th> */}
                    {/* <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Count</th> */}
                    {/* <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Status</th> */}
                    {/* <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 5px" }}>Action</th> */}
                    {/* </tr>
                    </thead> */}
                    {/* <tbody>
                        {ProjectList.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.project.project_id.substring(0,10)}</td>
                                <td>
                                    {item.user.first_name}{" "}
                                    {item.user.last_name}
                                    <p style={{color:'#cbc5c5'}}>{item.user.user_type == 0? "Buyer" : "Seller"}</p>

                                    
                                </td>
                                <td>
                                    {item.status ==1?<div><span style={{color:'#8AC53F'}}>Active</span><span><img src='/images/icons/tick.png' width={20} /> </span></div> : <span style={{color:'#FF4C4C'}}>inactive</span>}
                                </td>  */}

                    {/* <td>{item.Invoice.length>0?item.Invoice.reduce((sum, invoice) => {
                                   return sum + parseFloat(invoice.amount || 0);
                                  }, 0):0}</td> */}

                    {/* <td>
                                    {DateFormate(new Date(item.date_time))}
                                </td> */}
                    {/* <td>
                                    {item.status ==1?<div><span style={{color:'#8AC53F'}}>Active</span><span><img src='/images/icons/tick.png' width={20} /> </span></div> : <span style={{color:'#FF4C4C'}}>inactive</span>}
                                </td>  */}
                    {/* <td>
                                    
                                    <Button variant="primary" style={{backgroundColor:item.status != 1 ?"#E9E9E9":"",color:item.status != 1 ?"gray":""}} disabled={item.status != 1 ? true : false} onClick={()=> navigate('/cs-vault',{state:item})}>
                                    <i className="ti ti-user nav-small-cap-icon fs-4 pr-sm"/>Add
                                    </Button>

                                    
                                </td> */}

                    {/* <td>

                                <svg xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setViewState(!(ViewState == index) ? index : -1)}
                                    width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                    <div className={`card ${ViewState == index ? '' : 'd-none'} p-3 `} style={{backgroundColor:"#eaeff4",position:"absolute"}} >
                                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                            {[ {title:"Edit",url:'#'},{title:"View",url:"/project-connection/" +item.project._id},{ title:"Terminate",url:'#'}].map((item1, idx, arr) => (
                                                <li key={item1}
                                            
                                                onClick={() => {window.location.href=item1.url}}
                                                    style={{
                                                        borderBottom: idx !== arr.length - 1 ? "1px solid rgb(245, 248, 251)" : 'none',
                                                        //   borderRadius: 1,
                                                        cursor: "pointer",
                                                        padding: '5px 0'
                                                    
                                                    }} >
                                                    {item1.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                    {/*<Button variant="primary" style={{backgroundColor:item.status != 1 ?"#E9E9E9":"",color:item.status != 1 ?"gray":""}} disabled={item.status != 1 ? true : false} onClick={()=> navigate('/cs-vault',{state:item})}>
                                    <i className="ti ti-user nav-small-cap-icon fs-4 pr-sm"/>Add
                                    </Button>

                                    
                                </td>

                                <td>
                                <Button variant="primary" style={{backgroundColor:item.status != 1 ?"#E9E9E9":"",color:item.status != 1 ?"gray":""}} disabled={item.status != 1 ? true : false}   onClick={() => navigate( "/project-connection/" + item.project._id , {state:item.user_id})}>
                                    </div>
                                <Button variant="primary" style={{backgroundColor:item.status != 1 ?"#E9E9E9":"",color:item.status != 1 ?"gray":""}} disabled={item.status != 1 ? true : false}   onClick={() => window.location.href = "/project-connection/" + item.project._id}>
                                        View
                                    </Button> */}
                    {/* <button className='border-0 background-0' style={{background:'none'}}>
                                    <img src="/images/icons/pencil.png" width={20} height={20}/>
                                    </button>
                                    <button className='border-0 background-0' style={{background:'none'}}>
                                    <img src="/images/icons/delete (1).png" width={20} height={20}/>
                                    </button> */}
                    {/* </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                </div>
            ))}

        </div>
    );
}
export default Projectlist;
