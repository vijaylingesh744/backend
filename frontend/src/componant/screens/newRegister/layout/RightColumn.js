import React, { useEffect, useState } from 'react'
import bp from '../Assets/bpindicator.png';
import seller from '../Assets/sellerIndicator.png'
import buyer from '../Assets/buyerindicator.png'
import { useLocation } from 'react-router-dom';

const Rightcolumn = ({someProp,settype}) => {
    
    const [show, setshow] = useState(false)
    const Location = useLocation()
    const { state } = Location;
    const [showstatus, setshowstatus] = useState(localStorage.getItem("type"))
    
    useEffect(() => {
        console.log(state);
        if(window.location.pathname == '/personal_info'){
            setshowstatus(settype)
        }
        if (someProp) {
          setshow(true);
        }

      }, [someProp,settype]);

  return (
    <div className='d-lg-flex d-md-flex flex-column d-none h-100 justify-content-center align-items-center'>  
    <img src={"/images/icons/logo.png"}  style={{ borderRadius: "0%", width: "300px", height: '190px'  }}  onClick={()=>{console.log(settype);}}/>
        
        {/* {show &&
        <div style={{background:'rgb(224 224 224)', top:'10%'}} className="d-flex position-relative w-100 py-2 justify-content-center align-items-center  column-gap-1">
        {showstatus == 0 ? (
            <>
            <img src={buyer} style={{ width: "25px", height:'25px'}} />
             <span className='fontcontent1 font-weight-bold'style={{letterSpacing:1}}>Buyer</span>
             </>
             ): showstatus == 1 ? (
                 <>
            <img src={bp} style={{ width: "25px", height:'25px'}} />
                 <span className='fontcontent1 font-weight-bold'style={{letterSpacing:1}}>Business Partner</span>
             </>
        ): (
            <>
            <img src={seller} style={{ width: "25px", height:'25px'}} />
                 <span className='fontcontent1 font-weight-bold' style={{letterSpacing:1}}>Seller</span>
             </>
        )
    }
        </div>
} */}
    </div> 
      )
}

export default Rightcolumn