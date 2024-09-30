import React from 'react'

const RightSide = ({ handler, dataList }) => {
    const UserImg = ["img01.png", "img02.png", "img03.png", "img04.png", "img05.png"]
    // const randomIndex = Math.floor(Math.random() * UserImg.length);
    const randomIndex = 2;
    return (
        <div id='right-aside' className="d-none d-lg-block">
            <div className='container background py-3 px-4 h-100 '>
                <span className='chat'>Suggestion</span>
                <div className='container-fluid mt-4 px-0'>
                    {dataList.map((item, index) => (
                        <div className='d-flex column-gap-3 align-items-center py-3 px-1 m-1' style={{ backgroundColor: "#dededee0" }}>
                            <img src={"/images/profile/" + UserImg[randomIndex]} style={{ width: '35px', height: '35px', borderRadius: "50%" }} />
                            <div className='d-flex flex-column gap w-50'>
                                <span className='msgname1'>{item.userdata.first_name} {item.userdata.last_name} </span>
                                <span className='msgtext1'>{item.industry.map(item => item.title).toString().slice(0, 20)}...
                                </span>
                            </div>
                            <button className='follow rounded d-flex justify-content-center align-items-center'
                                onClick={(e) => {
                                    handler(false, index)
                                }}
                            >View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSide
