import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react'
import owner from "./vectors/owner.png";
import partner from "./vectors/businesspartner.png";
import pavilion from './vectors/pavilion.png';
import tech from './vectors/tech1.png'
import slide1BG from './vectors/slide1bg.jpg'
import slide3BG from './vectors/slide3bg.jpg'
import slide4BG from './vectors/slide4bg.jpg'
import { Fade } from 'react-awesome-reveal';
const Scrollcircle = () => {
  gsap.registerPlugin(ScrollTrigger);

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
          if(progress >= 0.10 && progress < 0.30){
            const slidethree = (-740 *(progress- 0.10))/0.20;
            const slideone = (-250 * (progress - 0.10))/0.20
            const blurAmount = ((progress - 0.10) / 0.20) * 10; // Adjust blur amount as needed
            // const blurAmountSlidethree = 8 - ((progress - 0.10) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidetwo",{translateY:slidethree}) 
            gsap.to(".slideone",{translateY:slideone,filter:`blur(${blurAmount}px)`})

          }
          else if(progress >= 0.40 && progress < 0.60){
            const slidetwo = (-740 * (progress - 0.40))/0.20;
            const slidethree = -740 + (-250 * (progress - 0.40)) / 0.20
            const blurAmount = ((progress - 0.40) / 0.20) * 10; // Adjust blur amount as needed
            // const blurAmountSlidetwo = 8 - ((progress - 0.40) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidethree",{translateY:slidetwo})   
            gsap.to(".slidetwo",{translateY:slidethree,filter:`blur(${blurAmount}px)`}) 

          }
          else if(progress >= 0.70 && progress < 0.90){
            const slidelast = (-740 * (progress - 0.70))/0.20;
            const slidetwo = -740 + (-250 * (progress - 0.70))/0.20
            const blurAmount = ((progress - 0.70) / 0.20) * 10; // Adjust blur amount as needed
            // const blurAmountSlidelast = 8 - ((progress - 0.70) / 0.20) * 8; // SlideThree blur to clear
            gsap.to(".slidelast",{translateY:slidelast})
            gsap.to(".slidethree",{translateY:slidetwo,filter:`blur(${blurAmount}px)`})   
          }
        },
      });
    });
    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div className="pageslides" style={{ height: "1100vh", width: "100%", overflow: "hidden" ,background:'#FFF'}}>
      <div className="pageset">

        <div className='slideone' style={{width:'100%',height:'110vh',backgroundImage:`url(${slide1BG})`,position:'relative',top:'0%'}}>
        <Fade  direction='left' delay={400} style={{position:'relative',top:'25%'}}>
        <img
          src={owner}
          className="Owner"
          width={150}
          style={{ position: "relative", top: "25%", left: 200 }}
        /></Fade>
        <Fade direction='right' delay={400} style={{position:'relative',top:'-35%'}}>
        <div className='businessOwner card px-4 py-4' style={{position:'relative',top:'-30%',left:'44%',background:'rgb(205 211 213 / 50%)',width:650,borderRadius:20}}>
          <h1  style={{
            position: "relative",
            color: "black",
            fontFamily: 'Inter',
            fontWeight: 600,
          }}>
            Business Owner
          </h1>
          <p className='mt-4' style={{
            position: "relative",
            color: "black",
            fontSize:17,
            width: '100%',
            textAlign: "left",
            fontWeight: 500,
            fontFamily: 'Inter',
            letterSpacing:0.5
          }}>
            Connect Souq revolutionizes global business networking by connecting
          business owners with a network of professionals who can drive
          potential sales. Our innovative platform allows business owners to
          appoint "Business Partners" who leverage their networks to generate
          sales leads and even close deals on their behalf. As a Connect Souq
          member, you can engage multiple Business Partners worldwide, creating
          a dynamic global sales funnel managed by skilled professionals who
          earn sales commissions upon successful deals. <br />
          This mutually beneficial arrangement ensures a "Win-Win" scenario for
          all parties involved, propelling your business to new heights of
          success. Join Connect Souq today and transform your global sales
          strategy!
          </p>
        </div>
        </Fade>
        </div>
        <div className='slidetwo' style={{width:'100%',height:'110vh',backgroundImage:`url(${slide4BG})`,position:'relative',top:'-1%'}}>
        <Fade direction='left' delay={400} style={{position:"relative",top:'30%'}}>
        <img
          src={partner}
          className="partner"
          width={250}
          style={{ position: "relative", top: "30%", left: 180 }}
        />
        </Fade>
        <Fade direction='right' delay={400} style={{position:'relative' ,top : '-17%'}}>
        <div className='businesspartners card px-4 py-4 border-0' style={{position:'relative',top:'-0%',left:'44%',width:650,borderRadius:20,background:'rgb(205 211 213 / 50%)'}}>
          <h1  style={{
            position: "relative",
            color: "black",
            fontFamily: 'Inter',
            fontWeight: 600,
          }}>
            Business Partner
          </h1>
          <p className='mt-4' style={{
            position: "relative",
            color: "black",
            fontSize:17,
            width: '100%',
            textAlign: "left",
            fontWeight: 500,
            fontFamily: 'Inter',
            letterSpacing:0.5
          }}>
            Connect Souq opens doors to vast opportunities for professionals
          seeking to monetize their networks. On our platform, you can easily
          discover businesses, products, and services that align with your
          network's interests and offer your services as an official "Business
          Partner." To ensure you receive your deserved compensation, Connect
          Souq provides a secure payment gateway. This gateway ensures that
          contract terms are adhered to, creating an escrow account for each
          party to fulfill their tasks and for you to receive your sales
          commission directly into your bank account.<br /> Don't miss out on the
          chance to monetize your network effectively. Join Connect Souq today
          and start leveraging your connections for financial success!
          </p>
        </div>
        </Fade>
        </div>
        <div className='slidethree' style={{width:'100%',height:'110vh',backgroundImage:`url(${slide3BG})`,position:'relative',top:'-26%'}}>
        <Fade style={{position:'relative',top:'35%'}} direction="left" delay={400}>
        <img
          src={pavilion}
          className="pavilion"
          width={300}
          style={{ position: "relative", top: "40%", left: 180 }}
        />
        </Fade>
        <Fade direction='right' delay={400} style={{position:'relative',top:'-20%'}}>
        <div className='paviliontext card px-4 py-4 border-0' style={{position:'relative',top:'-0%',left:'44%', width:650,borderRadius:20,background:'rgb(205 211 213 / 50%)'}}>
          <h1  style={{
            position: "relative",
            color: "black",
            fontFamily: 'Inter',
            fontWeight: 600,
          }}>
            G-Pavilion
          </h1>
          <p className='mt-4' style={{
            position: "relative",
            color: "black",
            fontSize:17,
            width: '100%',
            textAlign: "left",
            fontWeight: 500,
            letterSpacing:0.5,
            fontFamily: 'Inter',
          }}>
            Connect Souq presents a unique opportunity for governments to boost their
export GDP potential by connecting with over 30 countries and thousands of
"Business Partners" ready to sell on behalf of your country's business
owners. In addition to SME and export funding and subsidy support,
governments can now seamlessly integrate all their export businesses into
Connect Souq, unlocking new export opportunities—all for FREE.
Moreover, Connect Souq provides governments with cutting-edge
technology features to support their trade promotion efforts and boost
national GDP. Click here to send us a message, and we'll be delighted to
discuss how Connect Souq can empower your country's export initiatives.
          </p>
        </div>
        </Fade>
        </div>
        <div className='slidelast' style={{width:'100%',height:'110vh',backgroundImage:`url(${slide4BG})`,position:'relative',top:'-52%'}}>
         <Fade direction='left' delay={400} style={{position:'relative' ,top : '33%'}}>
          <img
          src={tech}
          className="tech"
          width={250}
          style={{ position: "relative", top: "30%", left: 180 }}
        />
        </Fade>
        <Fade  direction='right' delay={400} style={{position:'relative' ,top : '-8%'}}>
<div className='techtext card px-4 py-4 border-0' style={{position:'relative',top:'-15%',left:'44%',width:650,borderRadius:20,background:'rgb(205 211 213 / 50%)'}}>
          <h1  style={{
            position: "relative",
            color: "black",
            fontWeight: 600,
            fontFamily: 'Inter',
          }}>
          Technology Innovations
          </h1>
          <p className='mt-4' style={{
            position: "relative",
            color: "black",
            fontSize:17,
            fontFamily: 'Inter',
            width: '100%',
            textAlign: "left",
            fontWeight: 500,
            letterSpacing:0.5
          }}>
            Connect Souq revolutionizes global business networking by connecting
business owners with a network of professionals who can drive potential
sales. Our innovative platform allows business owners to appoint "Business
Partners" who leverage their networks to generate sales leads and even
close deals on their behalf. As a Connect Souq member, you can engage
multiple Business Partners worldwide, creating a dynamic global sales
funnel managed by skilled professionals who earn sales commissions upon
successful deals.<br />
This mutually beneficial arrangement ensures a "Win-Win" scenario for all
parties involved, propelling your business to new heights of success. Join
Connect Souq today and transform your global sales strategy!
          </p>
        </div>
        </Fade>
        </div>
        </div>
        </div>
  )
}

export default Scrollcircle

