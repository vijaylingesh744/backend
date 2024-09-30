// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Asset/style.css";
// import Plx from "react-plx";
// import { Fade } from "react-awesome-reveal";
// import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion';
// // import Fade from 'react-reveal/Fade';
// import './Asset/scroll.css';
// import Slide1 from './Asset/Slide1.png'
// import { Background } from "react-parallax";
// const dataObject = [
//   {
//     title: "Business owners Page",
//     para: ` Connect Souq revolutionizes global business networking by connecting
// business owners with a network of professionals who can drive potential
// sales. Our innovative platform allows business owners to appoint "Business
// Partners" who leverage their networks to generate sales leads and even
// close deals on their behalf. As a Connect Souq member, you can engage
// multiple Business Partners worldwide, creating a dynamic global sales
// funnel managed by skilled professionals who earn sales commissions upon
// successful deals.
// This mutually beneficial arrangement ensures a "Win-Win" scenario for all
// parties involved, propelling your business to new heights of success. Join
// Connect Souq today and transform your global sales strategy!`,
//   },
//   {
//     title: "Business Partner Page",
//     para: `Connect Souq opens doors to vast opportunities for professionals seeking to
// monetize their networks. On our platform, you can easily discover
// businesses, products, and services that align with your network's interests
// and offer your services as an official "Business Partner."
// To ensure you receive your deserved compensation, Connect Souq provides
// a secure payment gateway. This gateway ensures that contract terms are
// adhered to, creating an escrow account for each party to fulfill their tasks
// and for you to receive your sales commission directly into your bank
// account.
// Don't miss out on the chance to monetize your network effectively. Join
// Connect Souq today and start leveraging your connections for financial
// success!`,
//   },
//   {
//     title: "G Pavilion Page (Government Pavilion)",
//     para: `Connect Souq presents a unique opportunity for governments to boost their
// export GDP potential by connecting with over 30 countries and thousands of
// "Business Partners" ready to sell on behalf of your country's business
// owners. In addition to SME and export funding and subsidy support,
// governments can now seamlessly integrate all their export businesses into
// Connect Souq, unlocking new export opportunities—all for FREE.
// Moreover, Connect Souq provides governments with cutting-edge
// technology features to support their trade promotion efforts and boost
// national GDP. Click here to send us a message, and we'll be delighted to
// discuss how Connect Souq can empower your country's export initiatives.`,
//   },
//   {
//     title: "Technology Partners ",
//     para: `Connect Souq revolutionizes global business networking by connecting
// business owners with a network of professionals who can drive potential
// sales. Our innovative platform allows business owners to appoint "Business
// Partners" who leverage their networks to generate sales leads and even
// close deals on their behalf. As a Connect Souq member, you can engage
// multiple Business Partners worldwide, creating a dynamic global sales
// funnel managed by skilled professionals who earn sales commissions upon
// successful deals.
// This mutually beneficial arrangement ensures a "Win-Win" scenario for all
// parties involved, propelling your business to new heights of success. Join
// Connect Souq today and transform your global sales strategy!`,
//   },
// ];

// const Home = () => {
//   const horizontalWrapperRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: horizontalWrapperRef.current,
//         pin: true,
//         scrub: true,
//         start: "top top",
//         end: "650%",
//       },
//     });
//     const distanceToScroll = getDistanceToScroll(); // Get the distance to scroll based on viewport size

//     timeline.to(horizontalWrapperRef.current, {
//       x: distanceToScroll, // Adjust the distance as needed
//       duration: 1,
//     });
//     return () => {
//       timeline.kill();
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = (event) => {
//      console.log(1);
//     };
  
//     const div = horizontalWrapperRef.current;
//     div.addEventListener('wheel', handleScroll);
  
//     return () => {
//       div.removeEventListener('wheel', handleScroll);
//     };
//   });

//   const getDistanceToScroll = () => {
//     const vw = Math.max(
//       document.documentElement.clientWidth || 0,
//       window.innerWidth || 0
//     );
//     let distance = 0;
//     // Adjust distance based on viewport width
//     if (vw >= 1200) {
//       distance = -horizontalWrapperRef.current.offsetWidth * 1.210; // Large screens
//     } else if (vw >= 768) {
//       distance = -horizontalWrapperRef.current.offsetWidth * 1.21; // Medium screens
//     } else if (vw <= 540) {
//       distance = -horizontalWrapperRef.current.offsetWidth * 1.22; // Small screens
//     }
//     return distance;
//   };

//   const { ref, inView } = useInView({
//     triggerOnce: false, // We want to trigger the animation multiple times
//     threshold: 0.5, // Adjust this as needed
//   });

//   // useEffect(() => {
//   //   gsap.registerPlugin(ScrollTrigger);

//   //   gsap.to('.my-image', {
//   //     x: '100%', // Adjust the distance as needed
//   //     scrollTrigger: {
//   //       trigger: '.my-image',
//   //       start: 'center',
//   //       // start: 'top center',
//   //       // end: 'bottom center',
//   //       scrub: true,
//   //     },
//   //   });
//   // }, []);

//   // const images = [
//   //   { src: Slide1, alt: 'Slide 1', style: { position: 'relative', left: -240, width: 600 } },
//   //   { src: Slide1, alt: 'Slide 2', style: { position: 'relative', left: -240, width: 600 } },
//   //   { src: Slide1, alt: 'Slide 3', style: { position: 'relative', left: -240, width: 600 } },
//   //   { src: Slide1, alt: 'Slide 4', style: { position: 'relative', left: -240, width: 600 } },
//   // ];

//   return (
    // <div className="scroller-div" ref={horizontalWrapperRef} style={{width: "250%",height: "100vh",display: "flex",}}>
    //   <div className="scrollimage">
      
//         <div style={{ height: "100vh", width: "101vw", background:"white" }}>
//           <motion.div
//           ref={ref}
//           initial={{ opacity: 0, x: -200 }}
//           animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -200 }}
//           transition={{ duration: 2 }}
//         >
//           <img src={Slide1} style={{ position: "relative", left: -240, width: 600 }} alt="Slide" />
//         </motion.div>
//         {/* <motion.div
//           ref={ref}
//           initial={{ opacity: 0,y: 200 }}
//           animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 200 }}
//           transition={{ duration: 1 }}
//         >
//          <div className="position-relative bg-dark" style={{top:-300,left:550,width:'fit-content'}}><h1 className="text-white">Section 1</h1></div>
//         </motion.div> */}
//         </div>
        
//       </div>
//       <div className="scrollimage">
//         <div style={{ height: "100vh", width: "101vw", background:"lightyellow" }}>
//         <Fade direction="left"  fraction={0.9} >
//         <img src={Slide1} width={600} style={{position:"relative",left:-240,width:600}}/>
//         </Fade>
//         </div>
//       </div>
//       <div className="scrollimage">
//         <div style={{ height: "100vh", width: "101vw", background:"lightgrey" }}>
//         <Fade direction="left" fraction={0.9}>
//         <img src={Slide1} width={600} style={{position:"relative",left:-240,width:600}}/>
//         </Fade>
//         </div>
//       </div>
//       <div className="scrollimage">
//         <div style={{ height: "100vh", width: "101vw", background:"cyan" }}>
//         <Fade direction="left"  fraction={0.9}>
//         <img src={Slide1} width={600} style={{position:"relative",left:-240,width:600}}/>
//         </Fade>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
