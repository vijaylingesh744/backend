import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../../utils/ApiRoute';
import { handleImagePageError, slugify,CheckTick } from '../../../../utils/Function';

const Rightside = ({ pages }) => {
    const navigate = useNavigate()
    return (
        <div className='mb-5 mb-lg-0' >
            {pages.length > 0 &&
                <div className='container-fluid py-3 newsbox position-sticky' style={{top:'60px'}} >
                    <h3 className='fontcontent2 mb-1 text-dark1 font-weight-1 pb-2'>Following Pages</h3>
                    {pages && pages.slice(0, 3).map((item, index) => (
                        <div style={{ borderBottom: "1px solid #E8E8E8" }}>
                            <div className='d-flex flex-row py-2 align-items-end justify-content-around'>
                                <img src={BASE_URL + item?.profile_icon} className='blog-img' alt='image' style={{ objectFit: 'contain' }} onError={handleImagePageError} />
                                <div className='mr-2 my-auto w-50' style={{ maxWidth: '45%' }}>
                                    <h3 className='mb-0 fonttext ' style={{
                                        width: '165%',whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                    }}>{item?.title}{" "}{CheckTick(item?.user_id)}</h3>
                                    <p className='mb-0 fonttext text-secondary1' style={{
                                        width: 'max-content', whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                                    }}>
                                        {item?.industry_data?.title}
                                    </p>
                                    <p className='newsfeed1 mb-0 fonthint'>
                                        {item?.page_follow_data?.length}&nbsp;Followers
                                    </p>
                                </div>
                                <div className='my-auto' >
                                    <button onClick={() =>
                                        window.location.href = `/pages/${slugify(item?.title)}`}
                                        className='btn btn-outline-connect d-flex justify-content-center rounded-2 text-center fonthint py-1 px-2' style={{ fontWeight: '600' }}>
                                        View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex justify-content-center pt-3' role='button' ><span className='fontcontent1 font-weight-normal text-dark1' onClick={() => navigate(`/list_page`)}>See all pages</span></div>

                </div>
            }
        </div>
    )
}

export default Rightside