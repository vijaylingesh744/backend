import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import vector2 from "./vectors/bo10@4x.png";
import vector1 from "./vectors/bp3 green@4x.png";
import vector3 from "./vectors/gpavilion23.png";
import vector4 from "./vectors/ruwaize @4x.png";
import "./Asset/Pageslide.css";

const NewSlidecontent = () => {
  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const contentRef = useRef(null);
  const contentRef2 = useRef(null);
  const contentRef3 = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const textElement2 = textRef2.current;
    const textElement3 = textRef3.current;
    const contentElement = contentRef.current;
    const contentElement2 = contentRef2.current;
    const contentElement3 = contentRef3.current;

    gsap.set(textElement, { y: "-100%", opacity: 0 });
    gsap.set(textElement2, { y: "-100", opacity: 0 });
    gsap.set(textElement3, { y: "-100", opacity: 0 });
    gsap.set(contentElement, { y: "100%", opacity: 0 });
    gsap.set(contentElement2, { y: "100%", opacity: 0 });
    gsap.set(contentElement3, { y: "100%", opacity: 0 });

    gsap.to(textElement, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slideone",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
    gsap.to(textElement2, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slidetwo",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
    gsap.to(textElement3, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slidethree",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
    gsap.to(contentElement, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slideone",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
    gsap.to(contentElement2, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slidetwo",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
    gsap.to(contentElement3, {
      y: "0%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".slidethree",
        start: "top top", // Adjust this to control when the animation starts
        toggleActions: "play none none none",
      },
    });
  }, []);
  useEffect(() => {
    const getRotationValues = () => {
      if (window.matchMedia("(min-width: 1350px)").matches) {
        return {
          slideup: -880,
        };
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 1349px)").matches
      ) {
        return {
          slideup: -740,
        };
      }else if (
        window.matchMedia("(min-width : 290px) and (max-width:540px)").matches
      ){
        return {
          slideup : -960,
        }
      }
       else {
        return {
          slideup: -740,
        };
      }
    };
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".pageslides",
        start: "top top",
        end: "bottom bottom",
        pin: ".pageset",
        pinType: "fixed",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const { slideup } = getRotationValues();
          if (progress >= 0 && progress < 0.02) {
            const slidevector1 = (-150 * (progress - 0)) / 0.01;
            const sideimage1 = (180 * (progress - 0)) / 0.01;
            gsap.to(".sideimage1", { translateX: sideimage1, duration: 0.9 });
            gsap.to(".vector1", { translateY: slidevector1 });
          } else if (progress >= 0.1 && progress < 0.3) {
            const slidethree = (slideup * (progress - 0.1)) / 0.2;
            const slideone = (-250 * (progress - 0.1)) / 0.2;
            // const blurAmount = ((progress - 0.1) / 0.2) * 10; // Adjust blur amount as needed
            gsap.to(".slidetwo", { translateY: slidethree });
            gsap.to(".slideone", {
              translateY: slideone,
            });
            const slidevector2 = (-180 * (progress - 0.25)) / 0.035;
            gsap.to(".vector2", { translateY: slidevector2, duration: 0.9 });
            const slideimage2 = (210 * (progress - 0.25)) / 0.035;
            gsap.to(".slideimage2", { translateX: slideimage2, duration: 0.9 });
          } else if (progress >= 0.4 && progress < 0.6) {
            const slidetwo = (slideup * (progress - 0.4)) / 0.2;
            const slidethree = slideup + (-250 * (progress - 0.4)) / 0.2;
            // const blurAmountSlidetwo = 8 - ((progress - 0.40) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidethree", { translateY: slidetwo });
            gsap.to(".slidetwo", {
              translateY: slidethree,
            });
            const slidevector3 = (-280 * (progress - 0.55)) / 0.05;
            gsap.to(".vector3", { translateY: slidevector3, duration: 0.9 });
            const sideimage3 = (210 * (progress - 0.55)) / 0.03;
            gsap.to(".sideimage3", { translateX: sideimage3, duration: 0.9 });
          } else if (progress >= 0.7 && progress < 0.9) {
            const slidelast = (slideup * (progress - 0.7)) / 0.2;
            const slidetwo = slideup + (-250 * (progress - 0.7)) / 0.2;
            // const blurAmountSlidelast = 8 - ((progress - 0.70) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidelast", { translateY: slidelast });
            gsap.to(".slidethree", {
              translateY: slidetwo,
            });
            const slidevector4 = (-280 * (progress - 0.85)) / 0.05;
            gsap.to(".vector4", { translateY: slidevector4, duration: 0.9 });
          }
        },
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div className="pageslides"
      style={{
        height: "1100vh",
        width: "100%",
        overflow: "hidden",
        background: "#FFF",
      }}>
      <div className="pageset">
        <div className="slideone m-0 row align-items-center"
          style={{
            width: "100%",
            height: "110vh",
            background: "white",
            position: "relative",
            top: "0%",
          }}>
          <div className="col-lg-5 col-sm-12 pl-lg-5 pl-4 " style={{zIndex:1}}>
            <p className="text-reveal mb-2"
              style={{
                top: "10%",
                left: "7%",
                fontFamily: "poppins",
                fontSize: 32,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
              }}>
              Business Partner
            </p>
            <p
              className="content-reveal"
              style={{
                color: "black",
                fontSize: 17,
                lineHeight:'28px'

              }}
            >
              Join “CS Network”<br />
              Secure your commission effortlessly by managing your deals through CS Network. Follow these three straightforward steps: <br /><br />
              Step 1: If you have a seller interested in working with you, register on CS Network. Use the E-Agreement feature to legally contract your seller. <br />
              Step 2: Once you find a buyer, register them on the E-Agreement, outlining the agreed terms, conditions, and price. <br />
              Step 3: Complete the transaction using the CS Network Payment Gateway, ensuring your commission is deposited directly into your bank account.<br />
              These three simple steps guarantee that you get paid every time.<br /><br />
              Additionally, leverage CS Network’s AI Global Search to discover more opportunities and earn commissions.
            </p>
            <div><button className='button-53' onClick={()=>window.location.href="/login"} style={{border: 'none',color: 'white',fontSize: 20,fontWeight: 600,fontFamily:'poppins',width:150,height:45}}></button></div>

          </div>
          <img
            className="col-lg-7 col-sm-12"
            src={vector1}
            style={{
              objectFit: "contain",
              // position: "absolute",
              // left: "40%",
              // width: "60%",
            }}
          />
        </div>

        <div className="slidetwo row m-0 align-items-center"
          style={{
            width: "100%",
            height: "110vh",
            background: "white",
            position: "relative",
            top: "-1%",
          }}
        >
          <div className="col-lg-5 col-sm-12 pl-lg-5 pl-4 " style={{zIndex:1}}>
            <p className=" text-reveal mb-2"
              style={{
                top: "15%",
                left: "7%",
                fontFamily: "poppins",
                fontSize: 32,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
              }}
            >
              Business Owner
            </p>
            <p className="content-reveal"
              style={{
                // position: "absolute",
                top: "25%",
                left: "7%",
                color: "black",
                fontSize: 18,
                lineHeight:'28px'

              }}
            >
              <span>Transform Your Global Sales Strategy with Connect Souq (CS Network){" "}</span>
              Connect Souq (CS Network) revolutionizes global business networking by linking business owners with a network of professionals dedicated to driving sales. Our innovative platform enables business owners to appoint "Business Partners" who use their networks to generate leads and 
              close deals on their behalf. As a Connect Souq (CS Network) member, you can engage multiple Business Partners worldwide, creating a dynamic global
               sales funnel managed by skilled professionals who earn commissions upon successful deals<br /> <br />
                This mutually beneficial arrangement ensures a "win-win" scenario for all parties, propelling your business 
                to new heights. Join Connect Souq (CS Network) today and transform your global sales strategy!
            </p>
            <div><button className='button-53' onClick={()=>window.location.href="/login"} style={{border: 'none',color: 'white',fontSize: 20,fontWeight: 600,fontFamily:'poppins',width:150,height:45}}></button></div>
          </div>
          <img
            className="col-lg-7 col-sm-12"
            src={vector2}
            style={{
              objectFit: "contain",
              // position: "absolute",
              // left: "40%",
              // width: "60%",
            }}
          />
        </div>

        <div  className="slidethree row m-0 align-items-center"
          style={{
            width: "100%",
            height: "110vh",
            background: "white",
            position: "relative",
            top: "-26%",
          }}
        >
          <div className="col-lg-5 col-sm-12 pl-lg-5 pl-4 pt-lg-5" style={{zIndex:1}}>
            <p className=" text-reveal mb-2"
              style={{
                top: "15%",
                left: "7%",
                fontFamily: "poppins",
                fontSize: 32,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
              }}>
              G-pavilion
            </p>
            <p className="content-reveal"
              style={{
                top: "25%",
                left: "7%",
                color: "black",
                fontSize: 18,
                lineHeight:'28px'
              }}>
                <span>Enhance Your Country's Export GDP with Connect Souq (CS Network){" "}</span>
                Connect Souq (CS Network) offers governments a unique opportunity to boost export GDP potential by connecting with over 30 countries and thousands of "Business Partners" ready to sell on behalf of your nation's businesses. Alongside SME and export funding and subsidy support, governments can now integrate all their export businesses into Connect Souq (CS Network), unlocking new export opportunities—at no cost.
                 <br /> <br /> Furthermore, Connect Souq (CS Network) provides cutting-edge technology features to support trade promotion efforts and boost national GDP. Contact us today to discuss how Connect Souq can empower your country's export initiatives.
            </p>
            <div><button className='button-53' onClick={()=>window.location.href="/login"} style={{border: 'none',color: 'white',fontSize: 20,fontWeight: 600,fontFamily:'poppins',width:150,height:45}}></button></div>
          </div>
          <img className="col-lg-7 col-sm-12"
            src={vector3}
            style={{
            objectFit: "contain",
            }}
          />
        </div>

        <div  className="slidelast m-0 row align-items-center"
          style={{
            width: "100%",
            height: "110vh",
            background: "white",
            position: "relative",
            top: "-50%",
          }}
        >
          <div className="col-lg-5 col-sm-12 pl-lg-5 pl-4 " style={{zIndex:1}}>
            <p
              className=" text-reveal mb-2"
              style={{
                top: "15%",
                left: "7%",
                fontFamily: "poppins",
                fontSize: 32,
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
              }}
            >
              Technology Partner
            </p>
            <p className="content-reveal"
              style={{
                // position: "absolute",
                top: "25%",
                left: "7%",
                color: "black",
                fontSize: 18,
                lineHeight:'28px'
              }}
            >
              <span>Attention, Technology Innovators!{" "}</span>
              Are you ready to expand your reach to over 30 countries? We are thrilled to discuss "White Label" partnership opportunities for Connect Souq (CS Network). Click here to contact us and share your technology. Tell us why we should consider partnering with you for white labeling, and let's explore the possibilities together. Join us in revolutionizing global connectivity and innovation!
            </p>
            <div><button className='button-53' onClick={()=>window.location.href="/login"} style={{border: 'none',color: 'white',fontSize: 20,fontWeight: 600,fontFamily:'poppins',width:150,height:45}}></button></div>
          </div>
          <img
            className="col-lg-7 col-sm-12"
            src={vector4}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewSlidecontent;
