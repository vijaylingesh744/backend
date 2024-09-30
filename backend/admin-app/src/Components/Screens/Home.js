import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../ReUsable/Context.js';

const Home = () => {
const {userRoute, setRoute } = useUserContext();
const navigate = useNavigate();

const LoginClient=(RouteNO)=>{
localStorage.setItem('userRoute',RouteNO)
setRoute(RouteNO);
window.location.href ='/'
}

useEffect(()=>{
    setRoute(null);
    localStorage.removeItem('userRoute')
},[])

return(
    <div>
        <div className="container" style={{ position: 'relative', top: '30vh' }}>
          <div className="row">
            <div className="col-md-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img
                    src="/assets/images/profile/user-1.jpg"
                    alt=""
                    className="rounded-circle mb-3"
                    width={80}
                    height={80}
                  />
                  <h5 className="fw-semibold mb-0 fs-5">Business partner</h5>
                  <span className="text-dark fs-2">----</span>
                </div>
                <div className="px-2 py-2 list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <button className="btn btn-primary w-100 fw-normal py-8" onClick={() => LoginClient(3)}>Login</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img
                    src="/assets/images/profile/user-2.jpg"
                    alt=""
                    className="rounded-circle mb-3"
                    width={80}
                    height={80}
                  />
                  <h5 className="fw-semibold mb-0 fs-5">Client</h5>
                  <span className="text-dark fs-2">----</span>
                </div>
                <div className="px-2 py-2 list-unstyled d-flex align-items-center justify-content-center mb-0">
                  {/* <button className="btn btn-primary w-100 fw-normal py-8" onClick={() => LoginClient(2)}>Login</button> */}
                  <button className="btn btn-primary w-100 fw-normal py-8" onClick={() => window.location.href="/register"}>Login</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card hover-img">
                <div className="card-body p-4 text-center border-bottom">
                  <img
                    src="/assets/images/profile/user-3.jpg"
                    alt=""
                    className="rounded-circle mb-3"
                    width={80}
                    height={80}
                  />
                  <h5 className="fw-semibold mb-0 fs-5">Super Admin</h5>
                  <span className="text-dark fs-2">----</span>
                </div>
                <div className="px-2 py-2 list-unstyled d-flex align-items-center justify-content-center mb-0">
                  <button className="btn btn-primary w-100 fw-normal py-8" onClick={()=> window.location.href="login"}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
