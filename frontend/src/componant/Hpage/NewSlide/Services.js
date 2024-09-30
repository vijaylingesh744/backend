import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Asset/style.css";
import Plx from "react-plx";
import { Fade } from "react-awesome-reveal";
import './Asset/scroll.css';
const dataObject = [
  {
    title: "Business owners Page",
    para: ` Connect Souq revolutionizes global business networking by connecting
business owners with a network of professionals who can drive potential
sales. Our innovative platform allows business owners to appoint "Business
Partners" who leverage their networks to generate sales leads and even
close deals on their behalf. As a Connect Souq member, you can engage
multiple Business Partners worldwide, creating a dynamic global sales
funnel managed by skilled professionals who earn sales commissions upon
successful deals.
This mutually beneficial arrangement ensures a "Win-Win" scenario for all
parties involved, propelling your business to new heights of success. Join
Connect Souq today and transform your global sales strategy!`,
  },
  {
    title: "Business Partner Page",
    para: `Connect Souq opens doors to vast opportunities for professionals seeking to
monetize their networks. On our platform, you can easily discover
businesses, products, and services that align with your network's interests
and offer your services as an official "Business Partner."
To ensure you receive your deserved compensation, Connect Souq provides
a secure payment gateway. This gateway ensures that contract terms are
adhered to, creating an escrow account for each party to fulfill their tasks
and for you to receive your sales commission directly into your bank
account.
Don't miss out on the chance to monetize your network effectively. Join
Connect Souq today and start leveraging your connections for financial
success!`,
  },
  {
    title: "G Pavilion Page (Government Pavilion)",
    para: `Connect Souq presents a unique opportunity for governments to boost their
export GDP potential by connecting with over 30 countries and thousands of
"Business Partners" ready to sell on behalf of your country's business
owners. In addition to SME and export funding and subsidy support,
governments can now seamlessly integrate all their export businesses into
Connect Souq, unlocking new export opportunities—all for FREE.
Moreover, Connect Souq provides governments with cutting-edge
technology features to support their trade promotion efforts and boost
national GDP. Click here to send us a message, and we'll be delighted to
discuss how Connect Souq can empower your country's export initiatives.`,
  },
  {
    title: "Technology Partners ",
    para: `Connect Souq revolutionizes global business networking by connecting
business owners with a network of professionals who can drive potential
sales. Our innovative platform allows business owners to appoint "Business
Partners" who leverage their networks to generate sales leads and even
close deals on their behalf. As a Connect Souq member, you can engage
multiple Business Partners worldwide, creating a dynamic global sales
funnel managed by skilled professionals who earn sales commissions upon
successful deals.
This mutually beneficial arrangement ensures a "Win-Win" scenario for all
parties involved, propelling your business to new heights of success. Join
Connect Souq today and transform your global sales strategy!`,
  },
];

const Home = () => {
  const horizontalWrapperRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalWrapperRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "650%",
      },
    });
    const distanceToScroll = getDistanceToScroll(); // Get the distance to scroll based on viewport size

    timeline.to(horizontalWrapperRef.current, {
      x: distanceToScroll, // Adjust the distance as needed
      duration: 1,
    });
    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
     console.log(1);
    };
  
    const div = horizontalWrapperRef.current;
    div.addEventListener('wheel', handleScroll);
  
    return () => {
      div.removeEventListener('wheel', handleScroll);
    };
  });

  const getDistanceToScroll = () => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    let distance = 0;
    // Adjust distance based on viewport width
    if (vw >= 1200) {
      distance = -horizontalWrapperRef.current.offsetWidth * 1.195; // Large screens
    } else if (vw >= 768) {
      distance = -horizontalWrapperRef.current.offsetWidth * 1.21; // Medium screens
    } else if (vw <= 540) {
      distance = -horizontalWrapperRef.current.offsetWidth * 1.22; // Small screens
    }
    return distance;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.my-image', {
      x: '100%', // Adjust the distance as needed
      scrollTrigger: {
        trigger: '.my-image',
        start: 'center',
        // start: 'top center',
        // end: 'bottom center',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="scroller-div" ref={horizontalWrapperRef} style={{width: "250%",height: "100vh",display: "flex",}}>
      <div className="scrollimage">
        <img
          src="assets/bg-image/One(1).png"
          style={{ height: "100vh", width: "100vw", position: "absolute" }}
        />
        <div
          style={{ zIndex: "111", width: "100vw" }}
          class="ml-2 mt-5 position-relative pt-5 text-white row"
        >
          <div className="col-4 d-flex align-items-center flex-column">
            <Plx
              style={{ zIndex: 1 }}
              parallaxData={[
                {
                  start: 1300,
                  end: 1900,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 800,
                      property: "translateX",
                    },
                  ],
                },
              ]}
            >
              <img
                src="assets/number/One.png"
                style={{ height: "150px" }}
                className="my-image d-none d-md-block d-lg-block"
              />
            </Plx>
            <br />
            <h1
              className="font-weight-bold my-4 contenthead"
              style={{ fontSize: 55, paddingLeft: 25 }}
            >
              {dataObject[0].title}
            </h1>
          </div>
          <div className="py-4 my-4 col-8 pr-5" style={{ zIndex: 2 }}>
            <Fade direction="right" damping={0} triggerOnce={true}>
              <div
                className="card  rounded-5"
                style={{ backgroundColor: "rgb(79 78 59 / 50%)" }}
              >
                <p className="h-2 contentpara p-5">{dataObject[0].para}</p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="scrollimage">
        <img
          src="assets/bg-image/ImgTwo.png"
          style={{ height: "100vh", width: "100vw", position: "absolute" }}
        />
        <div
          style={{ zIndex: "111", width: "100vw" }}
          class="ml-2 mt-5 position-relative pt-5 text-white row"
        >
          <div className="col-4 d-flex align-items-center flex-column">
            <Plx
              style={{ zIndex: 1 }}
              parallaxData={[
                {
                  start: 2150,
                  end: 2700,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 800,
                      property: "translateX",
                    },
                  ],
                },
              ]}
            >
              <img
                src="assets/number/Two.png"
                style={{ height: "150px" }}
                className="my-image d-none d-md-block d-lg-block"
              />
            </Plx>
            <br />
            <h1
              className="font-weight-bold my-4 contenthead"
              style={{ fontSize: 55, paddingLeft: 25 }}
            >
              {dataObject[1].title}
            </h1>
          </div>
          <div className="py-4 my-4 col-8 pr-5" style={{ zIndex: 2 }}>
            <Fade direction="right" damping={0} triggerOnce={true}>
              <div
                className="card  rounded-5"
                style={{ backgroundColor: "rgb(79 59 59 / 50%)" }}
              >
                <p className="h-2 contentpara p-5">{dataObject[1].para}</p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="scrollimage">
        <img
          src="assets/bg-image/ImgThree.png"
          style={{ height: "100vh", width: "100vw", position: "absolute" }}
        />
        <div
          style={{ zIndex: "111", width: "100vw" }}
          class="ml-2 mt-5 position-relative pt-5 text-white row"
        >
          <div className="col-4 d-flex align-items-center flex-column">
            <Plx
              style={{ zIndex: 1 }}
              parallaxData={[
                {
                  start: 3100,
                  end: 4100,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 800,
                      property: "translateX",
                    },
                  ],
                },
              ]}
            >
              <img
                src="assets/number/Three.png"
                style={{ height: "150px" }}
                className="my-image d-none d-md-block d-lg-block"
              />
            </Plx>
            <br />
            <h1
              className="font-weight-bold my-4 contenthead"
              style={{ fontSize: 55, paddingLeft: 25 }}
            >
              {dataObject[2].title}
            </h1>
          </div>
          <div className="py-4 my-4 col-8 pr-5" style={{ zIndex: 2 }}>
            <Fade direction="right" damping={0} triggerOnce={true}>
              <div
                className="card  rounded-5"
                style={{ backgroundColor: "rgb(59 79 74 / 50%)" }}
              >
                <p className="h-2 contentpara p-5">{dataObject[2].para}</p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className="scrollimage">
        <img
          src="assets/bg-image/ImgFour.png"
          style={{ height: "100vh", width: "100vw", position: "absolute" }}
        />
        <div
          style={{ zIndex: "111", width: "100vw" }}
          class="ml-2 mt-5 position-relative pt-5 text-white row"
        >
          <div className="col-4 d-flex align-items-center flex-column">
            <Plx
              style={{ zIndex: 1 }}
              parallaxData={[
                {
                  start: 4700,
                  end: 5300,
                  properties: [
                    {
                      startValue: 0,
                      endValue: 900,
                      property: "translateX",
                    },
                  ],
                },
              ]}
            >
              <img
                src="assets/number/Four.png"
                style={{ height: "150px" }}
                className="my-image d-none d-md-block d-lg-block"
              />
            </Plx>{" "}
            <br />
            <h1
              className="font-weight-bold my-4 contenthead"
              style={{ fontSize: 55, paddingLeft: 25 }}
            >
              {dataObject[3].title}
            </h1>
          </div>
          <div className="py-4 my-4 col-8 pr-5" style={{ zIndex: 2 }}>
            <Fade direction="right" damping={0} triggerOnce={true}>
              <div
                className="card  rounded-5"
                style={{ backgroundColor: "rgb(75 59 79 / 50%)" }}
              >
                <p className="h-2 contentpara p-5">{dataObject[3].para}</p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
