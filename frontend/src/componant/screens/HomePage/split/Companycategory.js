import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Companycategory = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Advance to the next set of slides
      sliderRef.current.slickNext();
    }, 3000); // Change interval as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []); // Run th

  const imageSources = [
    "/images/homeImages/Slick/Fictional-company-logo-4.svg",
    "/images/homeImages/Slick/Fictional-company-logo-3.svg",
    "/images/homeImages/Slick/Fictional-company-logo-2.svg",
    "/images/homeImages/Slick/Fictional-company-logo-1.svg",
    "/images/homeImages/Slick/Fictional-company-logo.svg"
  ];

  return (
    <div className="elementor-element elementor-element-bd86cd2 e-con-full e-flex e-con e-parent" data-id="bd86cd2" data-element_type="container" data-settings='{"background_background":"classic","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}' data-core-v316-plus="true">
      <div className="elementor-element elementor-element-0aae4b8 elementor-widget elementor-widget-image-carousel" data-id="0aae4b8" data-element_type="widget" data-widget_type="image-carousel.default">
        <div className="elementor-widget-container">
          <Slider
            ref={sliderRef}
            dots={false}
            infinite={true}
            arrows={false}
            speed={500}
            slidesToShow={5}
            slidesToScroll={1}
          >
            {imageSources.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`logo-${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Companycategory;
