import { steps } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import './style.css'

const SliderContainer = ({setstepservice ,setsteptop}) => {
    const [delta, setDelta] = useState('');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [scale, setScale] = useState(1);
    const [grayScale, setGrayScale] = useState(0);
    const [scrollback , setScrollBack] =useState(false)
    const divRef = useRef(null);
    let isScrolling = false;
    const debounceTimeoutRef = { current: null };
    const [isDivBottomInView, setIsDivBottomInView] = useState(false); 
    let handleScrollCalled = false; // Flag to track if handleScroll has been called


    //1st step
    useEffect(() => {
      // Function to handle the event
      const handleWheel = (event) => {
        if (currentSlideIndex === 1 || currentSlideIndex === 2) {
          event.preventDefault(); // Prevent default scrolling behavior
        }
        // Add your event handling logic here
      };
  
      // Access the current value of the ref
      const divElement = divRef.current;
  
      // Add wheel event listener to the div
      if (currentSlideIndex === 3) {
        divElement.removeEventListener('wheel', handleWheel);
      } else {
        divElement.addEventListener('wheel', handleWheel);
      }
  
      divElement.addEventListener('wheel', debounce(handleScrolls,200));

      // Cleanup function to remove the event listener when component unmounts
      return () => {
        divElement.removeEventListener('wheel', handleWheel);
        divElement.removeEventListener('wheel', handleScrolls);

      };
    }, [currentSlideIndex]);

    // 2nd step
    useEffect(() => {
      function handleScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (windowHeight + scrollTop >= documentHeight && currentSlideIndex === 3) {
          setstepservice(true);
        }
      }
  
      window.addEventListener('wheel', handleScroll);
      return () => window.removeEventListener('wheel', handleScroll);
    }, [currentSlideIndex]); 

    // 3rd steps
    useEffect(() => {
      function handleWheel(event) {
        // Add your event handling logic here for the wheel event
        if (currentSlideIndex === 1 || currentSlideIndex === 2 || currentSlideIndex == 3) {
          event.preventDefault(); // Prevent default scrolling behavior
        }
      }
    
      function handleScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        const divElement = divRef.current;
    
        if (windowHeight + scrollTop >= documentHeight && currentSlideIndex === 3) {
          if (currentSlideIndex === 0) {
            divElement.removeEventListener('wheel', handleWheel);
          } else {
            divElement.addEventListener('wheel', handleWheel, { passive: false });
            divElement.addEventListener('wheel', debounce(handleScrolls,200));

          }
        }
      }
    
      window.addEventListener('wheel', handleScroll);
    
      return () => {
        window.removeEventListener('wheel', handleScroll);
        // Cleanup function to remove event listener when component unmounts
        const divElement = divRef.current;
        divElement.removeEventListener('wheel', handleWheel);
      };
    },); 

    ///////4th Step to stop the scroll when scrolling to top
  //   useEffect(() => {
  //     const handleScroll = (event) => {
  //         if (divRef.current) {
  //             const rect = divRef.current.getBoundingClientRect();
  //             const topPosition = rect.top;
  //             if (topPosition >= 0 && topPosition < window.innerHeight) {
  //                 event.preventDefault();
  //                 window.scrollTo(0, divRef.current.offsetTop - 10);
  //             }
  //         }
  //     };

  //     window.addEventListener('scroll', handleScroll, { passive: false });

  //     return () => {
  //         window.removeEventListener('scroll', handleScroll);
  //     };
  // });

  //5th Step To check webpage reached back top
  useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check if the user has scrolled to the top of the document
        if (scrollTop === 0) {
            setTimeout(() => {
                setstepservice(false);
                setCurrentSlideIndex(0);
            }, 300);
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}); 


      // useEffect(() => {
        

      //   const div = divRef.current;

      //     if(currentSlideIndex !== 0){

      //     console.log("Div bottom reached the top of viewport",currentSlideIndex);
      //     div.addEventListener('wheel', handleScroll, { passive: false });
      //     div.addEventListener('wheel', debounce(handleScrolls, 190), { passive: false });
      //     }

      // }, [isDivBottomInView]);



      


      
      //Scroll down works correctly in this
      // useEffect(() => {
      //   const div = divRef.current;
      //   const handleScroll = (event) => {
      //     const rect = div.getBoundingClientRect();
      //     const top = rect.top;
          
      //     if (top <= 10 && currentSlideIndex !== 3) {
      //       event.preventDefault();
      //     }
          
      //   };
      
      //   div.addEventListener('wheel', handleScroll, { passive: false });
      //   div.addEventListener('wheel', debounce(handleScrolls, 200), { passive: false });
      //   return () => {
      //     div.removeEventListener('wheel', handleScroll);
      //     // div.removeEventListener('wheel', handleScrolling);
      //   };
      // }, [currentSlideIndex]);

    //  // useEffect(()=>{
      //   // if(currentSlideIndex == 3){
      //   //     setTimeout(() => {
      //   //       setstepservice(true)
      //   //     }, 1000);
      //   // }
  // // },[currentSlideIndex])

      // useEffect(() => {
      //   const handleScroll = () => {
      //     const divBottom = divRef.current.getBoundingClientRect().bottom;

      //     const viewportTop = 0; // Top of the viewport
    
      //     setIsDivBottomInView(divBottom <= viewportTop);
      //   };

      
        
      //   window.addEventListener('wheel', handleScroll);
    
      //   // Cleanup the event listener
      //   return () => {
      //     window.removeEventListener('wheel', handleScroll);
      //   };
      // }, []);


      //to check webpage bottom reached
    //   useEffect(() => {
    //     const handleScroll = () => {
    //         const windowHeight = window.innerHeight;
    //         const documentHeight = document.body.scrollHeight;
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
    //         // Check if the user has scrolled to the bottom of the document
    //         if (windowHeight + scrollTop === documentHeight) {

              
    //             setIsDivBottomInView(true);
                
    //               setTimeout(() => {
    //                 setstepservice(true)
    //               }, 1000);
    //         }
    //     };
    
    //     window.addEventListener('scroll', handleScroll);
        
    //     // Cleanup the event listener
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // });


   


    //   useEffect(() => {
        
    //     var div = divRef.current;
    //     const handleScrolling =(event) =>{
    //     if (currentSlideIndex !== 3) {
    //           event.preventDefault();
    //         }
    //         }
  
    //     // if (currentSlideIndex !== 0) {
    //         console.log("Div bottom reached the top of viewport", isDivBottomInView);
    //         div.addEventListener('scroll', handleScrolling,{passive : false})
    //         div.addEventListener('wheel', debounce(handleScrolls, 190), { passive: false });
    //       // }
    //       return(
    //         div.removeEventListener('wheel', handleScrolling,{passive : false})

    //       )
        
    // }, [isDivBottomInView]);


     

    // useEffect(()=>{
    //   if(currentSlideIndex ==0){
    //     console.log(currentSlideIndex);
    //   window.removeEventListener('wheel', handleScroll, { passive: false });
    //   }
    // },[currentSlideIndex])

    
    


      

      // const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

      // const handleScroll = () => {
      //   const div = divRef.current;
      //   if (!div) return; // Handle potential null reference
    
      //   const scrollHeight = document.documentElement.scrollHeight;
      //   const scrollTop = window.scrollY || document.documentElement.scrollTop;
      //   const clientHeight = window.innerHeight;
    
      //   const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 100; // Adjust threshold as needed
    
      //   if (isNearBottom && !isScrolledToBottom) {
      //     setIsScrolledToBottom(true); // Set flag when near bottom
      //   } else if (!isNearBottom && isScrolledToBottom) {
      //     setIsScrolledToBottom(false); // Reset flag when scrolled up
      //     // Call your event listener here
      //     console.log('Scrolled up from bottom!');
      //   }
      // };
    
      // useEffect(() => {
      //   window.addEventListener('scroll', handleScroll);
    
      //   // Cleanup function to remove event listener on unmount
      //   return () => window.removeEventListener('scroll', handleScroll);
      // }, []);
  


// useEffect(()=>{

//   const div = divRef.current;
//   const handleScroll = (event) => {
//     if(window.scrollY>950){
//       event.preventDefault();
//     }
//   };

//   div.addEventListener('wheel', handleScroll, { passive: false });
//           div.addEventListener('wheel', debounce(handleScrolls, 200), { passive: false });

// // if(window.scrollY>1067){
// //   alert("event")
// // }
//     return () => {
//           div.removeEventListener('wheel', handleScroll);
//         };
// },[window.scrollY])

// const scroller =() =>{
   
//     const div = divRef.current
//     div.addEventListener('wheel', scroll, { passive: false });
//     div.addEventListener('wheel', debounce(handleScrolls, 200), { passive: false });

//   return () => {
//     div.removeEventListener('wheel', scroll, {passive : false});
//     div.removeEventListener('wheel', handleScrolls);
//   };

// }
// const togglePassiveOption = (passive) => {
//   const div = divRef.current;
//   div.removeEventListener('wheel', scroll);
// };


// const scroll =(event) =>{
//   if(currentSlideIndex !== 3){
//   event.preventDefault();
//   }
// }

//Delay to run the next and prev method once in each scroll

const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}


//main method to slide working up and down
// const handleScrolls = (event) => {

//   const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
//     if (!handleScrollCalled) {
//       if (scrollDirection === 'up') {
//         console.log('up');
//         if (debounceTimeoutRef.current) {
//           clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
//         }
//         debounceTimeoutRef.current = setTimeout(() => {
//           prevSlide();
//           isScrolling = false; // Reset scrolling flag after debounce
//           debounceTimeoutRef.current = null;
//         }, 100);
//         handleScrollCalled = true; // Set flag to true to indicate slide transition has been triggered
//       } else if (scrollDirection === 'down') {
//         console.log('down');
//         if (debounceTimeoutRef.current) {
//           clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
//         }
//         debounceTimeoutRef.current = setTimeout(() => {
//           // console.log("Scrolled up!");
//           nextSlide();
//           isScrolling = false; // Reset scrolling flag after debounce
//           debounceTimeoutRef.current = null;
//         }, 100);         
//          handleScrollCalled = true; // Set flag to true to indicate slide transition has been triggered
//       }
//   }
   
// }

const handleScrolls = (event) => {
  const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

  if (!handleScrollCalled) {
    if (scrollDirection === 'up') {
      if(currentSlideIndex != 0){
      console.log('up');
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
      }
      debounceTimeoutRef.current = setTimeout(() => {
        prevSlide();
        isScrolling = false; // Reset scrolling flag after debounce
        debounceTimeoutRef.current = null;
      }, 100);
      handleScrollCalled = true; 
    }// Set flag to true to indicate slide transition has been triggered
    } else if (scrollDirection === 'down') {
      if(currentSlideIndex != 3){
      console.log('down');
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
      }
      debounceTimeoutRef.current = setTimeout(() => {
        nextSlide();
        isScrolling = false; // Reset scrolling flag after debounce
        debounceTimeoutRef.current = null;
      }, 100);         
      handleScrollCalled = true;
     } // Set flag to true to indicate slide transition has been triggered
    }
  } else {
    // If handleScrollCalled is already true, do nothing
    // This may be optional depending on your requirements
  }
}


//Next SLide Button method
const nextSlide = () => {
    setScale(0.85);
    setGrayScale(100);
    // Your logic for handling next slide
    setCurrentSlideIndex(prevIndex => Math.min(prevIndex + 1, 3));
     // Assuming 4 slides (0-3)
    setTimeout(() => {
        setScale(1)
        setGrayScale(0)
    }, 1000);
  };

  //Previous slide button method
  const prevSlide = () => {
    setScale(0.85);
    setGrayScale(100);
    // Your logic for handling previous slide
    setCurrentSlideIndex(prevIndex => Math.max(prevIndex - 1, 0));
    if(currentSlideIndex == 0){
      setstepservice(false)
    }
    setTimeout(() => {
        setScale(1)
        setGrayScale(0)
    }, 1000);
  };


  
  return (
    <div className="mt-2 pt-2">
    <div ref={divRef}>
    <main style={{height:'100vh'}}  id='slidediv'>
      <section className="slides" id='slidedivchild'>
        <section className="slides-nav">
          <nav className="slides-nav__nav">
            <button className="slides-nav__prev js-prev" onClick={prevSlide}>
              Prev
            </button>
            <button className="slides-nav__next js-next" onClick={nextSlide}>
              Next
            </button>
          </nav>
        </section>

        <section className={"slide " + (currentSlideIndex === 0 ? "is-active" : "")}>
          <div className="slide__content">
            <figure className="slide__figure" style={{ transform: `scale(${scale})`, filter :`grayscale(${grayScale})` }}>
              <div
                className="slide__img"
                style={{
                  backgroundImage:"url('/bp-assets/images/img1.jpg')"
                }}
              ></div>
            </figure>
            <header className="slide__header">
              <h2 className="slide__title">
                <span className="title-line">
                  <span>Connect Souq revolutionizes global business networking by connecting</span>
                </span>
                <span className="title-line">
                  <span>business owners with a network of professionals who can drive potential</span>
                </span>
                <span className="title-line">
                  <span>sales. Our innovative platform allows business owners to appoint "Business</span>
                </span>
                <span className="title-line">
                  <span>Partners" who leverage their networks to generate sales leads and even</span>
                </span>
                <span className="title-line">
                  <span>close deals on their behalf. As a Connect Souq member, you can engage</span>
                </span>
                <span className="title-line">
                  <span>multiple Business Partners worldwide, creating a dynamic global sales</span>
                </span>
                <span className="title-line">
                  <span>funnel managed by skilled professionals who earn sales commissions upon</span>
                </span>
                <span className="title-line">
                  <span>successful deals.</span>
                </span>
                <span className="title-line">
                  <span> </span>
                </span>
                <span className="title-line">
                  <span>This mutually beneficial arrangement ensures a "Win-Win" scenario for all</span>
                </span>
                <span className="title-line">
                  <span>parties involved, propelling your business to new heights of success. Join</span>
                </span>
                <span className="title-line">
                  <span>Connect Souq today and transform your global sales strategy!</span>
                </span>
              </h2>
            </header>
          </div>
        </section>

        <section className={'slide ' +(currentSlideIndex === 1 ? "is-active" : "")}>
          <div className="slide__content">
            <figure className="slide__figure" style={{ transform: `scale(${scale})`, filter :`grayscale(${grayScale})` }}>
              <div
                className="slide__img"
                style={{
                  backgroundImage:"url('assets/images/img2.jpg')"

                }}
              ></div>
            </figure>
            <header className="slide__header">
              <h2 className="slide__title">
                <span className="title-line">
                  <span>Connect Souq opens doors to vast opportunities for professionals seeking to</span>
                </span>
                <span className="title-line">
                  <span>monetize their networks. On our platform, you can easily discover</span>
                </span>
                <span className="title-line">
                  <span>businesses, products, and services that align with your network's interests</span>
                </span>
                <span className="title-line">
                  <span>and offer your services as an official "Business Partner."</span>
                </span>
                <span className="title-line">
                  <span> </span>
                </span>
                <span className="title-line">
                  <span>To ensure you receive your deserved compensation, Connect Souq provides</span>
                </span>
                <span className="title-line">
                  <span>a secure payment gateway. This gateway ensures that contract terms are</span>
                </span>
                <span className="title-line">
                  <span>adhered to, creating an escrow account for each party to fulfill their tasks</span>
                </span>
                <span className="title-line">
                  <span>and for you to receive your sales commission directly into your bank</span>
                </span>
                <span className="title-line">
                  <span>account.</span>
                </span>
                <span className="title-line">
                  <span> </span>
                </span>
                <span className="title-line">
                  <span>Don't miss out on the chance to monetize your network effectively. Join</span>
                </span>
                <span className="title-line">
                  <span>Connect Souq today and start leveraging your connections for financial</span>
                </span>
                <span className="title-line">
                  <span>success!</span>
                </span>
              </h2>
            </header>
          </div>
        </section>

        <section className={"slide " + (currentSlideIndex === 2 ? "is-active" : "")}>
          <div className="slide__content">
            <figure className="slide__figure" style={{ transform: `scale(${scale})`, filter :`grayscale(${grayScale})` }}>
              <div
                className="slide__img"
                style={{
                  backgroundImage:"url('/bp-assets/images/img3.jpg')"
                }}
              ></div>
            </figure>
            <header className="slide__header">
              <h2 className="slide__title">
                <span className="title-line">
                  <span>Connect Souq presents a unique opportunity for governments to boost their</span>
                </span>
                <span className="title-line">
                  <span>export GDP potential by connecting with over 30 countries and thousands of</span>
                </span>
                <span className="title-line">
                  <span>"Business Partners" ready to sell on behalf of your country's business</span>
                </span>
                <span className="title-line">
                  <span>owners. In addition to SME and export funding and subsidy support,</span>
                </span>
                <span className="title-line">
                  <span>governments can now seamlessly integrate all their export businesses into</span>
                </span>
                <span className="title-line">
                  <span>Connect Souq, unlocking new export opportunities—all for FREE.</span>
                </span>
                <span className="title-line">
                  <span> </span>
                </span>
                <span className="title-line">
                  <span>Moreover, Connect Souq provides governments with cutting-edge</span>
                </span>
                <span className="title-line">
                  <span>technology features to support their trade promotion efforts and boost</span>
                </span>
                <span className="title-line">
                  <span>national GDP. Click here to send us a message, and we'll be delighted to</span>
                </span>
                <span className="title-line">
                  <span>discuss how Connect Souq can empower your country's export initiatives.</span>
                </span>
              </h2>
            </header>
          </div>
        </section>

        <section className={"slide " + (currentSlideIndex === 3 ? "is-active" : "")}
>
          <div className="slide__content">
            <figure className="slide__figure" style={{ transform: `scale(${scale})`, filter :`grayscale(${grayScale})` }}>
              <div
                className="slide__img"
                style={{
                  backgroundImage:"url('assets/images/Group 1000002094 (2).jpg')"

                }}
              ></div>
            </figure>
            <header className="slide__header">
              <h2 className="slide__title">
                <span className="title-line">
                  <span>Page Attention, technology innovators! Are you eager to expand your reach</span>
                </span>
                <span className="title-line">
                  <span>to over 30 countries? We're excited to discuss "White Label" partnership</span>
                </span>
                <span className="title-line">
                  <span>opportunities with you for Connect Souq. Click here to drop us a line and tell</span>
                </span>
                <span className="title-line">
                  <span>us about your technology. Share why we should consider partnering with</span>
                </span>
                <span className="title-line">
                  <span>you for white labeling and let's explore the possibilities together. Join us in</span>
                </span>
                <span className="title-line">
                  <span>revolutionizing global connectivity and innovation!</span>
                </span>
              </h2>
            </header>
          </div>
        </section>
      </section>
    </main>
    </div>
    </div>
  );
};
// const handleScroll = () => {
//   // Check if scrolling action is already in progress (using a flag)
//   if (isScrolling) {
//     return; // Exit if scrolling is already happening
//   }

//   isScrolling = true; // Set scrolling flag to true

//   const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

//   if (currentScrollTop > lastScrollTop) {
//     // Scrolled down
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
//     }
//     debounceTimeoutRef.current = setTimeout(() => {
//       console.log("Scrolled Down!");
//       nextSlide();
//       isScrolling = false; // Reset scrolling flag after debounce
//       debounceTimeoutRef.current = null;
//     }, 100);
//   } else if (currentScrollTop < lastScrollTop) {
//     // Scrolled up
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current); // Clear any existing timeout
//     }
//     debounceTimeoutRef.current = setTimeout(() => {
//       console.log("Scrolled up!");
//       prevSlide();
//       isScrolling = false; // Reset scrolling flag after debounce
//       debounceTimeoutRef.current = null;
//     }, 100);
//   }

//   lastScrollTop = currentScrollTop;
// };

export default SliderContainer;
