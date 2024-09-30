import React,{useState} from 'react'
import Model from '../../Agreement/Model'
import { RedirectRoute } from '../../../utils/Function'
const Notify = ({selectedItem,isHide,handleItemClick}) => {
    const [agreement ,setAgreement] = useState(false)
    const UserImg = ["img01.png", "img02.png", "img03.png", "img04.png", "img05.png"]
    const randomIndex = 1;
    return (
        <div id="main-wrapper" className={`mx-2 ${isHide ? 'd-block' : 'd-none'} d-lg-block`}>
            <Model modalIsOpen={agreement} setModalIsOpen={setAgreement} />
            {agreement == false && selectedItem && (
                <>
                    <div className='border container d-flex justify-content-between py-2 rounded-0 background4'>
                        <div className='d-flex column-gap-2 align-items-center' onClick={() => handleItemClick(-1)}>
                            <img src="/images/icons/arrow.png" style={{ width: "20px", height: "20px" }} />
                            <img src={"/images/profile/" + UserImg[1]} style={{ width: '50px', height: '50px' }} />
                            <div className='d-flex flex-column gap'>
                                <span className='name1grey'>{selectedItem.users.first_name} {selectedItem.users.last_name} </span>
                                <span className='name2'>$10M+ Sales</span>
                                <span className='name2'>3 Coins </span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center column-gap-3'>
                            <button className="connect-btn d-flex justify-content-center align-items-center"
                                onClick={() => RedirectRoute(`/terms/${selectedItem.users._id}`)}>
                                Lets Connect
                            </button>
                        </div>
                    </div>
                    <div className='chat-container container-fluid background mt-1 py-3'>
                        <div class="chat-messages">
                            <p>Rating and Reviews</p>
                            <div className="container d-flex justify-content-around py-3 column-gap-3 align-items-center">
                                <div className="align-items-center d-flex flex-column justify-content-center">
                                    <h1>4.1</h1>
                                    <span className="d-flex name2">
                                        {Array(5)
                                            .fill()
                                            .map((_, i) => (
                                                <i className="fas fa-star" style={{ color: i < 4 ? "yellow" : null }} />
                                            ))}
                                    </span>
                                </div>
                                <div>
                                    <div className="d-flex flex-column-reverse  gap align-items-end">
                                        {Array(5)
                                            .fill()
                                            .map((item, index) => (
                                                <div className="d-flex justify-content-around align-items-center range-slider column-gap-2">
                                                <span>{index + 1}</span>
                                                <div>
                                                <div className="range"></div>
                                                </div>
                                             </div>
                                          ))}
                                    </div>
                                </div>
                            </div>
                            <div className="container d-flex justify-content-between py-3">
                                <div className="align-items-center d-flex">
                                    <img
                                        src={"/images/profile/" + UserImg[randomIndex]}
                                        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                                    />
                                </div>
                                {selectedItem && (
                                    <div className="px-3">

                                        <div className="chat">{selectedItem.users.first_name}</div>
                                        <p className="chatname">
                                            Your shared interests have aligned with this potential buyer or seller. To engage in a conversation with them, kindly pay $3 and proceed to chat.
                                        </p>
                                    </div>
                                )}
                                <div>...</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Notify
