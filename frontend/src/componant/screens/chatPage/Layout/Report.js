import React from 'react'

export const ReportBP = ({ setSwipe, selectedItem, UserImg }) => {

  return (
    <div id="main-wrapper background4" className=" d-block h-100">
      <div className="container-fluid d-flex justify-content-between py-2 pl-4 "
        style={{ position: "sticky", top: "-1%",zIndex:'10000',backgroundColor:'white'}}
        >
        <div className="d-flex column-gap-2 align-items-center" >
          <img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`}
            style={{ width: 33, height: 33 }} />
          <div className="d-flex flex-column" >
          <span className="chatname">{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name + " ("}{selectedItem?.project_data?.project_id + ")"}</span>
          <span className="chatactive">last seen 3 hours ago</span>
          </div>
        </div>
      </div>
      <div className=' d-flex justify-content-center flex-column text-center'>
       <span className='fontsubtitle font-weight-bold mb-2' style={{fontSize:"16px"}}>Report spam accounts in ConnectSouq Website</span>
       <p className='fontcontent2 font-weight-light'>Help us understand whats's wrong with the page</p>
       </div>
      <div className='row mt-3 d-flex justify-content-center'>
        <div className='d-flex justify-content-center card p-3 mt-3 w-75' style={{ borderRadius: "15px" }}>
        <span  className='mb-4 mt-2'>What’s wrong with this account?</span>
          <div className="card mx-3 mt-1" style={{ borderRadius: "15px",backgroundColor:'#4535C1',color:'white' }}>
            <div className="d-flex py-2">
              <div className='p-2' style={{ width: '100%', fontSize: '14px', fontWeight: '400' }}>
                <p className=''>This Account seems to be spam.</p>
              </div>
            </div>
          </div>
          <div className="card mx-3 mt-1" style={{ borderRadius: "15px" }}>
            <div className="d-flex py-2">
              <div className='p-2' style={{ width: '100%', fontSize: '14px', fontWeight: '400' }}>
                <p className=''>Inadequate Business Information.</p>
              </div>
            </div>
          </div>
          <div className="card mx-3 mt-1" style={{ borderRadius: "15px" }}>
            <div className="d-flex py-2">
              <div className='p-2' style={{ width: '100%', fontSize: '14px', fontWeight: '400' }}>
                <p className=''>Wrong Business Information/User Information.</p>
              </div>
            </div>
          </div>
          <div className="card mx-3 mt-1" style={{ borderRadius: "15px" }}>
            <div className="d-flex py-2">
              <div className='p-2' style={{ width: '100%', fontSize: '14px', fontWeight: '400' }}>
                <p className=''>Asking for money.</p>
              </div>
            </div>
          </div>     
        </div>
      </div>
      <div className='row mt-3 w-50 d-flex justify-content-center ml-5'>
        <span>Description</span>
      </div>
      <div className='row mt-3 w-100 d-flex justify-content-center' style={{margin:'auto'}} >
       <div className='d-flex justify-content-center flex-column text-center w-75'>
      <textarea className='p-2' rows={4} style={{ border: '1px solid #dcdcdc',borderRadius:'10px' }}>
       </textarea>
       <div className='d-flex justify-content-around mt-3 mb-4'>
        <button className='btn btn-secondary mt-2 w-25'>Cancel</button>
        <button className='btn  mt-2 w-25' style={{backgroundColor:'#4535C1',color:'white'}}>Report</button>  
       </div>
      </div>
     </div>
    </div>
  )
}
