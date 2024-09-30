import React, { useEffect, useState } from "react";
import WebContent from "../ContentScreen/WebContent";
import Footer from "../Footer/Index";
import Mockup from "../Mockupscreen/Mockup";
import "../NewSlide/Asset/style.css";
import "./styles/Styles.css";
import Pageslides from "../NewSlide/Pageslides";
import NewBannerPage from "../Banner/NewBannerPage";
import NewSlidecontent from "../NewSlide/NewSlidecontent";
import WhyCS from "../OurUses/WhyCS";
import Loader from "../screen/Loader";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import cornerlogo from './styles/connectlogowhite.png'
import BannerZoom from "../Banner/BannerZoom";

function Homepage() {

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = 'assets/bg-image/plainbackground.png';
      img.onload = () => setLoader(false);
    }, 4000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
      let ctx = gsap.context(() => {
        ScrollTrigger.create({
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate:(self)=>{
              const progress = self.progress;
              console.log(progress);
              if(progress > 0.46){
                const opacity = 1 - ((progress - 0.46) / 0.01) * 1;
                gsap.to(".navbarcolor", { opacity: Math.max(opacity, 0), duration: 1 });
      

              }
            }
          })
        })
    },[])


  return (
<>
{ loader ? (
    <Loader />
):(
    <div
      className="scroll-container"
      style={{ overflowX: "hidden", background: "white" }}
    >
      <div className=' navbarcolor px-3 w-100 d-flex align-items-center justify-content-between' style={{height:100,zIndex:999,position:'fixed'}}>
            <img src={cornerlogo} width={120} className="ml-2"/>
            <div className="pr-3"><button className='button-52' onClick={()=>window.location.href="/login"} style={{border: 'none',color: 'white',fontSize: 20,fontWeight: 600,fontFamily:'poppins',width:150,height:45}}></button></div>
            </div>
      <BannerZoom />
      <WebContent />

      <NewSlidecontent />
      <Mockup />
      <WhyCS />
      <Footer />
    </div>
    )}
    </>
  );
}

export default Homepage;
