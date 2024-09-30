import React from 'react';
import 'swiper';
import './style/screen.css';

// import Swiper styles

const SlideScreen = () => {

  
  // const [parallaxSwiper, setParallaxSwiper] = useState(null);
  // const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0;
  // const parallaxOpacity = 0.3;

  // const swiperRef = useRef(null);

  // useEffect(() => {
  //   const swiper = new Swiper('.swiper-container', {
  //     // Your swiper configuration options here
  //     // Make sure to keep the same options you have in your existing Swiper component
  //     containerClass: 'swiper-container hero-slider',
  //     parallax: true,
  //     centeredSlides: true,
  //     grabCursor: true,
  //     speed: 500,
  //     spaceBetween: 0,
  //     effect: 'scrollbar',
  //     // More options...
  //   });

  //   // Set swiper instance to state or prop if needed
  //   swiperRef.current = swiper;

  //   // Add scroll event listener
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     // Clean up the event listener
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []); // Ensure this effect runs only once

  // const handleScroll = () => {
  //   const swiper = swiperRef.current;

  //   // Check if swiper instance exists and if the user is scrolling down
  //   if (swiper && window.scrollY > window.innerHeight / 2) {
  //     swiper.slideNext(); // Move to the next slide
  //   }
  // };


  return (


    

    <div className="banner-area">
    <div className="swiper-container main-slider">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: "url('/assets/Slides/city--1-min-min.jpeg')" }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 1
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: "url(images/pic2.jpg)" }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 2
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: "url(images/pic3.jpg)" }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 3
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: "url(images/pic4.jpg)" }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 4
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: "url(assets/Slides/city--1-min-min.jpeg)" }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 5
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-image" data-swiper-parallax-x="35%">
            <div
              className="swiper-image-inner"
              style={{ backgroundImage: `url('/assets/Slides/city--1-min-min.jpeg')` }}
            >
              <div className="banner-content">
                <h2
                  data-swiper-parallax-duration={1500}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-700}
                >
                  {" "}
                  Slide 6
                </h2>
                <p
                  data-swiper-parallax-duration={1700}
                  data-swiper-parallax-opacity={0}
                  data-swiper-parallax={-1000}
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper-button-prev swiper-button-white" />
      <div className="swiper-button-next swiper-button-white" />
    </div>
    <div className="swiper-container thumb-slider">
      <div className="swiper-wrapper" role="navigation">
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic1.jpg)" }}
          >
            <span>Slide 1</span>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic2.jpg)" }}
          >
            <span>Slide 2</span>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic3.jpg)" }}
          >
            <span>Slide 3</span>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic4.jpg)" }}
          >
            <span>Slide 4</span>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic5.jpg)" }}
          >
            <span>Slide 5</span>
          </div>
        </div>
        <div className="swiper-slide">
          <div
            className="slide-bgimg"
            style={{ backgroundImage: "url(images/pic6.jpg)" }}
          >
            <span>Slide 6</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    // <Swiper
    //   containerClass='swiper-container hero-slider'
    //   parallax={true}
    //   centeredSlides={true}
    //   grabCursor={true}
    //   speed={500}
    //   spaceBetween={0}
    //   effect='scrollbar' // corrected from 'scrollbar' to "scrollbar"
    //   getSwiper={setParallaxSwiper}
    // >
    // <Swiper
    //   containerClass='swiper-container hero-slider'
    //   parallax={true}
    //   centeredSlides={true}
    //   grabCursor={true}
    //   speed={500}
    //   spaceBetween={0}
    //   effect='scrollbar'
    //   getSwiper={(swiper) => (swiperRef.current = swiper)}
    // >
    //   <div className="hero-slide" style={{backgroundColor:'blue'}}>
    //     <div
    //       className="slide-image"
          
    //     >
    //       <img src="/assets/Slides/city--1-min-min.jpeg" alt="image1" />
    //     </div>
    //     <div className="col-md-6 offset-md-3 my-auto text-center text-white">
    //       <h1 className="text-uppercase mb-2 font-weight-bold">Slide 1</h1> {/* Change the title accordingly */}
    //       <p className="mb-5 small">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
    //         ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
    //         ab quia neque, porro laborum error, autem facilis voluptates
    //         laboriosam?
    //       </p>
    //     </div>
    //   </div>
    //   <div className="hero-slide">
    //     <div
    //       className="slide-image"
    //       // data-swiper-parallax={parallaxAmount}
    //       // data-swiper-parallax-opacity={parallaxOpacity}
    //     >
    //       <img src="/assets/Slides/city--1-min-min.jpeg" alt="image1" />
    //     </div>
    //     <div className="col-md-6 offset-md-3 my-auto text-center text-white">
    //       <h1 className="text-uppercase mb-2 font-weight-bold">Slide 2</h1> {/* Change the title accordingly */}
    //       <p className="mb-5 small">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
    //         ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
    //         ab quia neque, porro laborum error, autem facilis voluptates
    //         laboriosam?
    //       </p>
    //     </div>
    //   </div>
    //   <div className="hero-slide">
    //     <div
    //       className="slide-image"
    //       // data-swiper-parallax={parallaxAmount}
    //       // data-swiper-parallax-opacity={parallaxOpacity}
    //     >
    //       <img src="/assets/Slides/city--1-min-min.jpeg" alt="image1" />
    //     </div>
    //     <div className="col-md-6 offset-md-3 my-auto text-center text-white">
    //       <h1 className="text-uppercase mb-2 font-weight-bold">Slide 3</h1> {/* Change the title accordingly */}
    //       <p className="mb-5 small">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
    //         ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
    //         ab quia neque, porro laborum error, autem facilis voluptates
    //         laboriosam?
    //       </p>
    //     </div>
    //   </div>
    //   {/* Add more slides similarly */}
    // </Swiper>
  );
};

export default SlideScreen;



// import React,{useState} from 'react'
// import 'swiper/css/swiper.min.css';
// import Swiper from 'react-id-swiper';
// import '../Sliderscreen/styles/Sliders.css';

  
// const SlideScreen = () => {

//     const [parallaxSwiper, setParallaxSwiper] = useState(null);
//   const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0;
//   const parallaxOpacity = 0.5;

//   return (
//              <Swiper containerClass='swiper-container hero-slider' parallax={true}
//              centeredSlides={true}
//         grabCursor= {true}
//         speed= {500}
//         spaceBetween={0}
//         effect='scrollbar'
//          getSwiper={setParallaxSwiper}>
// <div className="hero-slide">
//         <div
//           className="slide-image"
//           data-swiper-parallax={parallaxAmount}
//           data-swiper-parallax-opacity={parallaxOpacity}
//         >
//           <img src="/assets/Slides/city--1-min-min.jpeg" alt="image1"></img>
//         </div>
//         <div className="col-md-6 offset-md-3 my-auto text-center text-white">
//           <h1 className="text-uppercase mb-2 font-weight-bold">Slide 1</h1>
//           <p className="mb-5 small">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
//             ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
//             ab quia neque, porro laborum error, autem facilis voluptates
//             laboriosam?
//           </p>
//         </div>
//       </div>
//       <div className="hero-slide">
//         <div
//           className="slide-image"
//           data-swiper-parallax={parallaxAmount}
//           data-swiper-parallax-opacity={parallaxOpacity}
//         >
//           <img src="/assets/Slides/city--2-min-min.jpeg" alt="image2"></img>
//         </div>
//         <div className="col-md-6 offset-md-3 my-auto text-center text-white">
//           <h1 className="text-uppercase mb-2 font-weight-bold">Slide 1</h1>
//           <p className="mb-5 small">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
//             ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
//             ab quia neque, porro laborum error, autem facilis voluptates
//             laboriosam?
//           </p>
//         </div>
//       </div>
//       <div className="hero-slide">
//         <div
//           className="slide-image"
//           data-swiper-parallax={parallaxAmount}
//           data-swiper-parallax-opacity={parallaxOpacity}
//         >
//           <img src="/assets/Slides/city--1-min-min.jpeg" alt="image3"></img>
//         </div>
//         <div className="col-md-6 offset-md-3 my-auto text-center text-white">
//           <h1 className="text-uppercase mb-2 font-weight-bold">Slide 1</h1>
//           <p className="mb-5 small">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque,
//             ex quibusdam dolorem quae itaque velit. Nobis nesciunt sed corrupti
//             ab quia neque, porro laborum error, autem facilis voluptates
//             laboriosam?
//           </p>
//         </div>
//       </div>
//             </Swiper>


//   )
// }

// export default SlideScreen
