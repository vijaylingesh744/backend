import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';
import mainbackground from './vectors/backgroud image.png';
import connectlogo from './vectors/connectlogo.png';
import linearbuilding from './vectors/linearbuilding1.png';
import './vectors/Mouseaniamtion.css';
gsap.registerPlugin(ScrollTrigger);

const BannerZoom = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'top top',
          end: 'center top',
          scrub: true,
          pin: '.pin-container',
          pinSpacing: false,
          onUpdate: self => {
            const progress = self.progress;
            gsap.to('.mouse', {
              opacity: progress < 0.5 ? 1 : 0,
              duration: 0.1,
              ease: 'ease'
            });
          },
        },
      });

      tl.fromTo('.left-word', { xPercent: -100, opacity: 0 }, { xPercent: -10, opacity: 1, duration: 4 })
        .fromTo('.right-word', { xPercent: 100, opacity: 0 }, { xPercent: 13, opacity: 1, duration: 4 }, "<")
        .fromTo('.top-word', { yPercent: -100, opacity: 0 }, { yPercent: 35, opacity: 1, duration: 4 }, "<")
        .fromTo('.bottom-word', { yPercent: 100, opacity: 0 }, { yPercent: 25, opacity: 1, duration: 3 }, "<");

      gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'center top',
          end: 'bottom bottom',
          scrub: true,
          pin: '.pin-container',
          pinSpacing: false,
          onUpdate: self => {
            const progress = self.progress;
            gsap.to('.fade-in-text', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
            gsap.to('.fade-in-text2', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
            gsap.to('.fade-in-text1', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
          },
        },
      })
      .to('.left-word', { yPercent: -82, fontSize: 30, xPercent: -4, duration: 4 })
      .to('.right-word', { yPercent: -82, fontSize: 30, xPercent: 5.5, duration: 4 }, "<")
      .to('.top-word', { yPercent: -100, duration: 4 }, "<")
      .to('.bottom-word', { yPercent: -100, duration: 3 }, "<")
      .to('.bottom-image', { yPercent: -67, duration: 5 });

      gsap.to('.mouse', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'top top',
          end: 'center top',
          scrub: true,
          onUpdate: self => {
            gsap.to('.mouse', {
              opacity: self.progress < 0.1 ? 1 : 0,
              duration: 0.1,
              ease: 'none'
            });
          },
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'top top',
          end: 'center top',
          scrub: true,
          pin: '.pin-container',
          pinSpacing: false,
          onUpdate: self => {
            const progress = self.progress;
            gsap.to('.mouse', {
              opacity: progress < 0.5 ? 1 : 0,
              duration: 0.1,
              ease: 'ease'
            });
          },
        },
      });

      tl.fromTo('.left-word', { xPercent: -100, opacity: 0 }, { xPercent: -1, opacity: 1, duration: 4 })
        .fromTo('.right-word', { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 4 }, "<")
        .fromTo('.top-word', { yPercent: -100, opacity: 0 }, { yPercent: 35, opacity: 1, duration: 4 }, "<")
        .fromTo('.bottom-word', { yPercent: 100, opacity: 0 }, { yPercent: 30, opacity: 1, duration: 3 }, "<");

      gsap.timeline({
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'center top',
          end: 'bottom bottom',
          scrub: true,
          pin: '.pin-container',
          pinSpacing: false,
          onUpdate: self => {
            const progress = self.progress;
            gsap.to('.fade-in-text', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
            gsap.to('.fade-in-text2', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
            gsap.to('.fade-in-text1', { opacity: progress < 0.5 ? 0 : (progress - 0.5) * 2, duration: 0.1, ease: 'none' });
          },
        },
      })
      .to('.left-word', { yPercent: -82, fontSize: 20, xPercent: -10, duration: 4 })
      .to('.right-word', { yPercent: -41, fontSize: 20, xPercent: 11, duration: 4 }, "<")
      .to('.top-word', { yPercent: -100, duration: 4 }, "<")
      .to('.bottom-word', { yPercent: -100, duration: 3 }, "<")
      .to('.bottom-image', { yPercent: -30, duration: 5 });

      gsap.to('.mouse', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.scroll-pin-container',
          start: 'top top',
          end: 'center top',
          scrub: true,
          onUpdate: self => {
            gsap.to('.mouse', {
              opacity: self.progress < 0.1 ? 1 : 0,
              duration: 0.1,
              ease: 'none'
            });
          },
        }
      });
    });

    return () => mm.revert(); // Clean up on unmount
  }, []);

  return (
    <div className="scroll-pin-container">
      <div className="pin-container">
        <div className="left-word">Connect</div>
        <div className="right-word">Souq</div>
        <div className="top-word">Welcome</div>
        <div className="bottom-word">
          <img src={connectlogo} alt="Description of image" width={300} />
        </div>
        <div className="bottom-image">
          <img src={linearbuilding} alt="Description of image" className="linearImage"/>
        </div>
        <div className="fade-in-text">Connecting people around the <b>globe</b></div>
        <div className="fade-in-text1 textoutline">Connect Souq is spread across <span className='countries textoutline1'>40+</span> countries</div>
        <div className="fade-in-text2 textoutline">Turn your Network into your networth</div>
        <div className='d-flex position-absolute justify-content-center w-100' style={{ top: '75%' }}>
          <div className="mouse m-5"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerZoom;
