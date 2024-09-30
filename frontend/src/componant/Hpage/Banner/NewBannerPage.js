import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react'
import mainbackground from './vectors/backgroud image.png'
import connectlogo from './vectors/connectlogo.png'
import linearbuilding from './vectors/linearbuilding1.png'
import './vectors/Mouseaniamtion.css'
gsap.registerPlugin(ScrollTrigger);
const NewBannerPage = () => {
    useEffect(() => {
        const getRotationValues = () => {
      if (window.matchMedia("(min-width: 1350px)").matches) {
        return {
            Connect:770,
            Souq:-650,
            Welcome: 370,
            ConnectImage:-540,
            welcomeback:-330,
            imageback:-1050,
            connectsmall:-240,
            buildings : -510,
            connectplus :110,
            souqplus :-90  
        }  
      }else if (window.matchMedia("(min-width: 768px) and (max-width: 1349px)").matches) {
        return {
          Connect:660,
          Souq:-560,
          Welcome: 320,
          ConnectImage:-450,
          welcomeback:-280,
          imageback:-850,
          connectsmall:-220,
          buildings : -440,
          connectplus :100,
            souqplus :-100

        };
      }else if(window.matchMedia("(min-width : 290px) and (max-width:540px)").matches){
        return {
          buildings:-150,
          Connect:200,
          Souq:-160,
          Welcome: 480,
          ConnectImage:-580,
          welcomeback:-500,
          imageback:-650,
          connectplus :40,
            souqplus :-40,
            connectsmall:-270,

        }
      }else {
        return {
          Connect:660,
          Souq:-560,
          Welcome: 320,
          ConnectImage:-450,
          welcomeback:-280,
          imageback:-850,
          connectsmall:-220,
          buildings : -440,
          connectplus :100,
            souqplus :-100


        };
      }
    }
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ".firstDiv",
                start: "top top",
                end: "bottom bottom",
                pin: ".firstdivinside",
                scrub: true,
                onUpdate:(self)=>{
                    const progress = self.progress;
                    const { Connect , Souq ,Welcome,ConnectImage,welcomeback,imageback,connectsmall,buildings,connectplus,souqplus } = getRotationValues();
                    if(progress>0 && progress < 0.25){
                        const welcometo = (Welcome * (progress - 0))/0.24
                        gsap.to(".welcome",{translateY:welcometo}) 
                        const connect = (Connect * (progress - 0))/0.24
                        const souq = (Souq * (progress - 0))/0.24
                        gsap.to(".connect",{translateX:connect})
                        gsap.to(".souq",{translateX:souq})
                        const mouseblur = ((progress - 0) / 0.05) * 0.5;
                        const connectimage = (ConnectImage  * (progress - 0))/0.24
                        const blurAmountSlidelast = ((progress - 0.15) / 0.10) * 2;
                        gsap.to(".connectimage",{translateY:connectimage,filter:`blur(${blurAmountSlidelast}px)`})
                        const mouseopacity = 1 - ((progress - 0) / 0.05) * 1;
                        const mousemove = (-50 * (progress - 0))/0.05
                        gsap.to(".mouse",{opacity:mouseopacity,translateY:mousemove});
                    }
                    else if(progress >= 0.40 && progress < 0.85){
                      if(progress >= 0.40 && progress < 0.60){
                        const welcometo = Welcome + ( welcomeback * (progress - 0.40))/0.20
                        gsap.to(".welcome",{translateY:welcometo}) 
                        const connectimage = ConnectImage + (imageback  * (progress - 0.40))/0.20
                        gsap.to(".connectimage",{translateY:connectimage})
                        const connect = (connectsmall * (progress - 0.40))/0.20
                        const souq = (connectsmall * (progress - 0.40))/0.20
                        const scale = 1 - ((progress - 0.40) / 0.20) * 0.5; // Example: scale down to 0.5
                        const connectX = Connect + (connectplus * (progress - 0.40))/0.20
                        const souqX = Souq + (souqplus * (progress - 0.40))/0.20
                        gsap.to(".connect",{translateY:connect,scale:scale,translateX:connectX})
                        gsap.to(".souq",{translateY:souq,scale:scale,translateX:souqX})
                        
                      }
                      if(progress >= 0.45 && progress < 0.85){
                        const building  = (buildings * (progress - 0.45))/0.40
                            gsap.to(".linearbuilding",{translateY:building})
                      }
                      if(progress >= 0.65 && progress < 0.85){
                        const opacty = 0 + ((progress - 0.65) / 0.20) * 1;
                        gsap.to(".countries",{opacity:opacty})
                        const opacty1 = 0 + ((progress - 0.65) / 0.20) * 1;
                        gsap.to(".slogan",{opacity:opacty1})
                      }
                    }
                }
            });
        });
        return () => {
            ctx.revert();
          };
    },[])
  return (
    <>
    <div className='firstDiv' style={{height:'1000vh',width:'100%',overflow:'hidden'}}>
        <div className='firstdivinside' style={{height:'100vh',width:'100%',background:'black'}}>
            <img src='assets/bg-image/plainbackground.png' style={{height:'100%',width:'100%'}}/>
            <div className='d-flex position-absolute justify-content-center w-100' style={{top:'75%'}}>
            <div className="mouse m-5"></div>
            </div>
            <div className='position-absolute connectimage d-flex justify-content-center w-100' style={{top:'100%'}} ><img width={300} src={connectlogo}/></div>
            <div className='position-absolute d-flex justify-content-center w-100 welcome' style={{top:'-18%'}}><p className='mb-0' >Welcome to </p></div>
            <p className='mb-0 connect position-absolute' >Connect</p>
            <p className='mb-0 souq position-absolute'>Souq</p>
            <div className='position-absolute d-flex justify-content-center w-100' style={{top:'18.5%'}}><p className='mb-0 slogan'>Connecting people around the <b>globe</b></p></div>
            {/* <div className='position-absolute d-flex justify-content-center w-100' style={{top:'25%'}}><p className='countries textoutline text-center' style={{opacity:0,lineHeight:'30px'}}>We have established our presence in <span className='countries textoutline1' style={{opacity:0,color:'#ffffff'}}>36</span> countries<br /> and continue to expand.</p></div> */}
            <div className='position-absolute d-flex justify-content-center w-100' style={{top:'28%'}}><p className='countries textoutline text-center' style={{opacity:0,lineHeight:'30px'}}>Connect Souq is spread across <span className='countries textoutline1' style={{opacity:0,color:'#ffffff'}}>40+</span> countries</p></div>
            <div className='position-absolute d-flex justify-content-center w-100' style={{top:'39%'}}><p className='countries textoutline text-center' style={{opacity:0,lineHeight:'30px'}}>Turn your Network into your networth</p></div>
            <img className='linearbuilding' src={linearbuilding} style={{width:'100%',position:'absolute',top:'100%',left:0}}/>
            <img />
        </div>

    </div>
    </>
  )
}
// const NewBannerPage = () => {
//   useEffect(() => {
    // Pin the container to the viewport and animate text within it
    // gsap.fromTo(
    //   '.left-word',
    //   { xPercent: -100, opacity: 0 }, // Start from outside the left side and hidden
    //   {
    //     xPercent: -10, // Move to the visible position
    //     opacity: 1,
    //     duration: 4,
    //     scrollTrigger: {
    //       trigger: '.pin-container',
    //       start: 'top top',
    //       end: 'bottom top',
    //       scrub: true,
    //     },
    //   }
    // );

    // // Animate the "Souq" text from the right
    // gsap.fromTo(
    //   '.right-word',
    //   { xPercent: 100, opacity: 0 }, // Start from outside the right side and hidden
    //   {
    //     xPercent: 13, // Move to the visible position
    //     opacity: 1,
    //     duration: 4,
    //     scrollTrigger: {
    //       trigger: '.pin-container',
    //       start: 'top top',
    //       end: 'bottom top',
    //       scrub: true,
    //     },
    //   }
    // );

    // // Animate the "Welcome" text from the top
    // gsap.fromTo(
    //   '.top-word',
    //   { yPercent: -100, opacity: 0 }, // Start from outside the top and hidden
    //   {
    //     yPercent: 35, // Move to the visible position
    //     opacity: 1,
    //     duration: 4,
    //     scrollTrigger: {
    //       trigger: '.pin-container',
    //       start: 'top top',
    //       end: 'bottom top',
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   '.bottom-word',
    //   { yPercent: 100, opacity: 0 }, // Start from outside the bottom and hidden
    //   {
    //     yPercent: 25, // Move to the visible position
    //     opacity: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: '.pin-container',
    //       start: 'top top',
    //       end: 'bottom top',
    //       scrub: true,
    //     },
    //   }
    // );
    // gsap.to('scroll-pin-container', {
    //   opacity: 1,
    //   scrollTrigger: {
    //     trigger: '.scroll-pin-container',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     pin: '.pin-container',
    //     pinSpacing: false,
    //     scrub: true,
    //   },
    // })
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.scroll-pin-container',
//         start: 'top top',
//         end: 'center top',
//         scrub: true,
//         pin: '.pin-container',
//         pinSpacing: false,
//       },
//     });

//     // First set of animations
//     tl.fromTo(
//       '.left-word',
//       { xPercent: -100, opacity: 0 },
//       {
//         xPercent: -10,
//         opacity: 1,
//         duration: 4,
//       }
//     )
//     .fromTo(
//       '.right-word',
//       { xPercent: 100, opacity: 0 },
//       {
//         xPercent: 13,
//         opacity: 1,
//         duration: 4,
//       },
//       "<" // Synchronize with previous animation
//     )
//     .fromTo(
//       '.top-word',
//       { yPercent: -100, opacity: 0 },
//       {
//         yPercent: 35,
//         opacity: 1,
//         duration: 4,
//       },
//       "<" // Synchronize with previous animation
//     )
//     .fromTo(
//       '.bottom-word',
//       { yPercent: 100, opacity: 0 },
//       {
//         yPercent: 25,
//         opacity: 1,
//         duration: 3,
//       },
//       "<" // Synchronize with previous animation
//     );

//     // Second Timeline: Starts when the scroll reaches center
//     gsap.timeline({
//       scrollTrigger: {
//         trigger: '.scroll-pin-container',
//         start: 'center top', // Start when the container reaches the center of the viewport
//         end: 'bottom bottom', // Adjust as needed
//         scrub: true,
//         pin:'.pin-container',
//         pinSpacing:false
//       },
//     })
//     .to('.left-word', {
//       yPercent: -30, // Move up
//       duration: 4,
//     })
//     .to('.right-word', {
//       yPercent: -30, // Move up
//       duration: 4,
//     }, "<") // Synchronize with previous animation
//     .to('.top-word', {
//       yPercent: -100, // Move to center or adjust as needed
//       duration: 4,
//     }, "<") // Synchronize with previous animation
//     .to('.bottom-word', {
//       yPercent: -100, // Move to center or adjust as needed
//       duration: 3,
//     }, "<");
//   }, []);

//   return (
//     <div className="scroll-pin-container">
//       <div className="pin-container">
//       <div className="left-word">Connect</div>
//         <div className="right-word">Souq</div>
//         <div className="top-word">Welcome</div> 
//         <div className="bottom-word">
//           <img src={connectlogo} alt="Description of image" width={300} />
//         </div>     
//         </div>
//     </div>
//   );
// };


export default NewBannerPage