import React from 'react'
import "./style.css"
const Index = () => {
    return (
        <div className="footer my-3" >
        <div className="contain row">
          <div className='col-12 col-lg-3 pl-5 pl-lg-0  d-flex justify-content-around gap-3 align-items-lg-center flex-column align-items-start '>
          <img src="assets/icons/connectlogo3.png" width={180}/>
          <span className="text-dark font-weight-bold">Copyrights@2024 ConnectSouq</span>
          </div>
          <div className="col-12 col-lg-3 pt-4 pl-5">
          <h1 style={{fontSize:28}} className="text-dark font-weight-bold">About us</h1>
          <ul className='pt-3 pl-0'>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Home</li>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Business Partner</li>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Business Owner</li>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>G pavilion</li>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Technology Partner</li>
          <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Why Us</li>

          </ul>
          </div>
          <div className="col-12 col-lg-3 pt-4 pl-5 pl-lg-0">
            <h1 style={{fontSize:28}} className="text-dark font-weight-bold">Contact us</h1>
            <ul className='pt-3 pl-0'>
              <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates</li>
              <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>CONNECT SOUQ INTERNATIONAL - FZCO</li>
              <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>+97142285285</li>
              <li className='py-2 text-dark font-weight-bold' style={{fontSize:15}}>info@connectsouq.com</li>
            </ul>
          </div>
          <div className="col-12 col-lg-3 social pt-4 pl-5">
            <h1 style={{fontSize:28}} className="text-dark font-weight-bold">Get in touch</h1>
            <ul className='pt-3 pl-0'>
              <li className='m-2'>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png"
                  width={32}
                  style={{ width: 32 }}
                />
              </li>
              <li className='m-2'>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png"
                  width={32}
                  style={{ width: 32 }}
                />
              </li>
              <li className='m-2'>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png"
                  width={32}
                  style={{ width: 32 }}
                />
              </li>
            </ul>
            {/* <ul className='pl-0'>
              <li>
                www.qcodesinfotech.com
              </li>
              <li>
                
              </li>
            </ul> */}
          </div>
          
          <div className="clearfix" />
        </div>
      </div>
    )
}

export default Index
