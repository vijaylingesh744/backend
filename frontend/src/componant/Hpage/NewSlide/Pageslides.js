import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import vector1 from "./vectors/slide1vector.png";
import vector2 from "./vectors/slide2vector.png";
import vector3 from "./vectors/slidevector3.png";
import vector4 from "./vectors/slidevector4.png";
import vector5 from "./vectors/slidevector5.png";
import slide1BG from "./vectors/GreenBg.png";
import slide4BG from "./vectors/purpleBg.png";
import slide3BG from "./vectors/lightGreenBg.png";
import slide2BG from "./vectors/BlueBg.png";
import partner from "./vectors/partnerline.png";
import techline from "./vectors/techline.png";
import pavilionline from "./vectors/pavilionline.png";
import "./Asset/Pageslide.css";

const Scrollcircle = () => {
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
    // const getRotationValues = () => {
    //   if (window.matchMedia("(min-width: 1350px)").matches) {
    //     return {
    //       containerBX:1300,
    //       containerRX:-1300,
    //       containerBY:450,
    //       containerRY:450
    //     }
    //   }else if (window.matchMedia("(min-width: 768px) and (max-width: 1349px)").matches) {
    //     return {
    //       containerBX:1130,
    //       containerRX:-1130,
    //       containerBY:350,
    //       containerRY:350
    //     };
    //   } else {
    //     return {
    //       containerBX:1130,
    //       containerRX:-1130,
    //       containerBY:350,
    //       containerRY:350
    //     };
    //   }
    // }
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
          if (progress >= 0 && progress < 0.02) {
            const slidevector1 = (-150 * (progress - 0)) / 0.01;
            const sideimage1 = (180 * (progress - 0)) / 0.01;
            gsap.to(".sideimage1", { translateX: sideimage1, duration: 0.9 });
            gsap.to(".vector1", { translateY: slidevector1 });
          } else if (progress >= 0.1 && progress < 0.3) {
            const slidethree = (-740 * (progress - 0.1)) / 0.2;
            const slideone = (-250 * (progress - 0.1)) / 0.2;
            const blurAmount = ((progress - 0.1) / 0.2) * 10; // Adjust blur amount as needed
            gsap.to(".slidetwo", { translateY: slidethree });
            gsap.to(".slideone", {
              translateY: slideone,
              filter: `blur(${blurAmount}px)`,
            });
            const slidevector2 = (-180 * (progress - 0.25)) / 0.035;
            gsap.to(".vector2", { translateY: slidevector2, duration: 0.9 });
            const slideimage2 = (210 * (progress - 0.25)) / 0.035;
            gsap.to(".slideimage2", { translateX: slideimage2, duration: 0.9 });
          } else if (progress >= 0.4 && progress < 0.6) {
            const slidetwo = (-740 * (progress - 0.4)) / 0.2;
            const slidethree = -740 + (-250 * (progress - 0.4)) / 0.2;
            const blurAmount = ((progress - 0.4) / 0.2) * 10; // Adjust blur amount as needed
            // const blurAmountSlidetwo = 8 - ((progress - 0.40) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidethree", { translateY: slidetwo });
            gsap.to(".slidetwo", {
              translateY: slidethree,
              filter: `blur(${blurAmount}px)`,
            });
            const slidevector3 = (-280 * (progress - 0.55)) / 0.05;
            gsap.to(".vector3", { translateY: slidevector3, duration: 0.9 });
            const sideimage3 = (210 * (progress - 0.55)) / 0.03;
            gsap.to(".sideimage3", { translateX: sideimage3, duration: 0.9 });
          } else if (progress >= 0.7 && progress < 0.9) {
            const slidelast = (-740 * (progress - 0.7)) / 0.2;
            const slidetwo = -740 + (-250 * (progress - 0.7)) / 0.2;
            const blurAmount = ((progress - 0.7) / 0.2) * 10; // Adjust blur amount as needed
            // const blurAmountSlidelast = 8 - ((progress - 0.70) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidelast", { translateY: slidelast });
            gsap.to(".slidethree", {
              translateY: slidetwo,
              filter: `blur(${blurAmount}px)`,
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
    <div
      className="pageslides"
      style={{
        height: "1100vh",
        width: "100%",
        overflow: "hidden",
        background: "#FFF",
      }}
    >
      <div className="pageset">
        <div
          className="slideone"
          style={{
            width: "100%",
            height: "110vh",
            backgroundImage: `url(${slide1BG})`,
            backgroundSize: "contain",
            position: "relative",
            top: "0%",
          }}
        >
          <img
            src={partner}
            width={300}
            alt=""
            className="sideimage1 position-relative"
            style={{ top: "20%", left: "-25%" }}
          />
          <div className="position-relative" style={{ top: "-35%" }}>
            <p
              ref={textRef}
              className="position-relative mb-0 text-reveal"
              style={{
                fontFamily: "poppins",
                fontSize: 65,
                lineHeight: "72px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#ffffff",
                width: "fit-content",
                top: "10%",
                left: "30%",
              }}
            >
              Business Partner
            </p>
            <div
              className="position-relative"
              style={{
                width: "65%",
                height: 5,
                background: "#ffffff",
                left: "30%",
              }}
            ></div>
            <p
              ref={contentRef}
              className="position-relative mt-1 mb-0 content-reveal"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                top: "8%",
                left: "30%",
                width: "65%",
                fontFamily: "poppins",
              }}
            >
              Connect Souq opens doors to vast opportunities for professionals
              seeking to monetize their networks. On our platform, you can
              easily discover businesses, products, and services that align with
              your network's interests and offer your services as an official
              "Business Partner." To ensure you receive your deserved
              compensation, Connect Souq provides a secure payment gateway. This
              gateway ensures that contract terms are adhered to, creating an
              escrow account for each party to fulfill their tasks and for you
              to receive your sales commission directly into your bank account.
              Don't miss out on the chance to monetize your network effectively.
              Join Connect Souq today and start leveraging your connections for
              financial success!
            </p>
          </div>
          <img
            src={vector1}
            className=" vector1 position-relative"
            style={{ top: "8%", left: "35%", width: "55%" }}
          />
        </div>
        <div
          className="slidetwo"
          style={{
            width: "100%",
            height: "110vh",
            backgroundImage: `url(${slide2BG})`,
            backgroundSize: "contain",
            position: "relative",
            top: "-1%",
          }}
        >
          <img
            src={pavilionline}
            width={300}
            alt=""
            className="slideimage2 position-relative"
            style={{ top: "29%", left: "-21%" }}
          />
          <div className="position-relative" style={{ top: "-14%" }}>
            <p
              ref={textRef2}
              className="position-relative mb-0 text-reveal"
              style={{
                fontFamily: "poppins",
                fontSize: 65,
                lineHeight: "72px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#ffffff",
                width: "fit-content",
                top: "10%",
                left: "30%",
              }}
            >
              G-pavilion
            </p>
            <div
              className="position-relative"
              style={{
                width: "65%",
                height: 5,
                background: "#ffffff",
                left: "30%",
              }}
            ></div>
            <p
              ref={contentRef2}
              className="position-relative mt-1 mb-0 content-reveal"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                top: "8%",
                left: "30%",
                width: "65%",
                fontFamily: "poppins",
              }}
            >
              Connect Souq presents a unique opportunity for governments to
              boost their export GDP potential by connecting with over 30
              countries and thousands of "Business Partners" ready to sell on
              behalf of your country's business owners. In addition to SME and
              export funding and subsidy support, governments can now seamlessly
              integrate all their export businesses into Connect Souq, unlocking
              new export opportunities—all for FREE. Moreover, Connect Souq
              provides governments with cutting-edge technology features to
              support their trade promotion efforts and boost national GDP.
              Click here to send us a message, and we'll be delighted to discuss
              how Connect Souq can empower your country's export initiatives.
            </p>
          </div>
          <img
            src={vector2}
            className=" vector2 position-relative"
            style={{ top: "25%", left: "35%", width: "55%" }}
          />
        </div>
        <div
          className="slidethree"
          style={{
            width: "100%",
            height: "110vh",
            backgroundImage: `url(${slide3BG})`,
            backgroundSize: "contain",
            position: "relative",
            top: "-26%",
          }}
        >
          <img
            src={techline}
            width={350}
            alt=""
            className="sideimage3 position-relative"
            style={{ top: "29%", left: "-25%" }}
          />
          <div className="position-relative" style={{ top: "-7%" }}>
            <p
              ref={textRef3}
              className="position-relative mb-0 text-reveal"
              style={{
                fontFamily: "poppins",
                fontSize: 65,
                lineHeight: "72px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#ffffff",
                width: "fit-content",
                top: "10%",
                left: "30%",
              }}
            >
              Technology Partner
            </p>
            <div
              className="position-relative"
              style={{
                width: "65%",
                height: 5,
                background: "#ffffff",
                left: "30%",
              }}
            ></div>
            <p
              ref={contentRef3}
              className="position-relative mt-1 mb-0 content-reveal"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                top: "8%",
                left: "30%",
                width: "65%",
                fontFamily: "poppins",
              }}
            >
              Page Attention, technology innovators! Are you eager to expand
              your reach to over 30 countries? We're excited to discuss "White
              Label" partnership opportunities with you for Connect Souq. Click
              here to drop us a line and tell us about your technology. Share
              why we should consider partnering with you for white labeling and
              let's explore the possibilities together. Join us in
              revolutionizing global connectivity and innovation!
            </p>
          </div>
          <img
            src={vector3}
            className="vector3 position-relative"
            style={{ top: "40%", left: "35%", width: "55%" }}
          />
        </div>
        <div
          className="slidelast"
          style={{
            width: "100%",
            height: "110vh",
            backgroundImage: `url(${slide4BG})`,
            backgroundSize: "contain",
            position: "relative",
            top: "-50%",
          }}
        >
          <div className="position-relative" style={{ top: "10%" }}>
            <p
              className="position-relative mb-0"
              style={{
                fontFamily: "poppins",
                fontSize: 65,
                lineHeight: "72px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#ffffff",
                width: "fit-content",
                top: "10%",
                left: "30%",
              }}
            >
              Business Owner
            </p>
            <div
              className="position-relative"
              style={{
                width: "65%",
                height: 5,
                background: "#ffffff",
                left: "30%",
              }}
            ></div>
            <p
              className="position-relative mt-1 mb-0"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#ffffff",
                top: "8%",
                left: "30%",
                width: "65%",
                fontFamily: "poppins",
              }}
            >
              Connect Souq revolutionizes global business networking by
              connecting business owners with a network of professionals who can
              drive potential sales. Our innovative platform allows business
              owners to appoint "Business Partners" who leverage their networks
              to generate sales leads and even close deals on their behalf. As a
              Connect Souq member, you can engage multiple Business Partners
              worldwide, creating a dynamic global sales funnel managed by
              skilled professionals who earn sales commissions upon successful
              deals. This mutually beneficial arrangement ensures a "Win-Win"
              scenario for all parties involved, propelling your business to new
              heights of success. Join Connect Souq today and transform your
              global sales strategy!
            </p>
          </div>
          <img
            src={vector5}
            className="vector4 position-relative"
            style={{ top: "53%", left: "38%", width: "48%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Scrollcircle;
