import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Rating = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Advance to the next set of slides
      sliderRef.current.slickNext();
    }, 3000); // Change interval as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  // Feedback data
  const feedbackData = [
    {
      logoSrc: "/images/homeImages/media_27.png",
      alt: "Seattle Opera",
      quote: "“Seattle opera simplifies Performance planning with deski eSignature.”",
      name: "Rashed kabir",
      role: "Lead Designer",
      rating: "4.8",
      stars: 5
    },
    {
      logoSrc: "/images/homeImages/media_28.png",
      alt: "Seattle Opera",
      quote: "“Seattle opera simplifies Performance planning with deski eSignature.”",
      name: "Karina",
      role: "Lead Designer",
      rating: "5.0",
      stars: 5
    },
    {
      logoSrc: "/images/homeImages/media_27.png",
      alt: "Seattle Opera",
      quote: "“Seattle opera simplifies Performance planning with deski eSignature.”",
      name: "Karina",
      role: "Lead Designer",
      rating: "3.8",
      stars: 5
    }
  ];

  return (
    <div className="elementor-element elementor-element-66bd356 e-flex e-con-boxed e-con e-parent" data-id="66bd356" data-element_type="container" data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}' data-core-v316-plus="true">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-cbb3353 e-flex e-con-boxed e-con e-child" data-id="cbb3353" data-element_type="container" data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'>
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-8c35596 elementor-widget__width-initial elementor-widget-laptop__width-initial elementor-widget-tablet_extra__width-initial elementor-widget elementor-widget-heading" data-id="8c35596" data-element_type="widget" data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}' data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Trusted by leading startups.
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-ea0e49a elementor--star-style-star_fontawesome elementor-widget elementor-widget-docy_testimonial" data-id="ea0e49a" data-element_type="widget" data-widget_type="docy_testimonial.default">
              <div className="elementor-widget-container">
                <div className="feedback_section_one">
                  <div className="feedback-slider-one" style={{ height: '520px' }}>
                    <Slider
                      ref={sliderRef}
                      dots={false}
                      infinite={true}
                      arrows={true}
                      speed={500}
                      slidesToShow={2}
                      slidesToScroll={1}
                    >
                      {feedbackData.map((item, index) => (
                        <div key={index} className="item">
                          <div className="feedback-block-one">
                            <div className="logo">
                              <img
                                data-lazyloaded={1}
                                src={item.logoSrc}
                                loading="lazy"
                                decoding="async"
                                width={239}
                                height={56}
                                alt={item.alt}
                              />
                            </div>
                            <h3>{item.quote}</h3>
                            <div className="name">
                              <span className="fw-500">{item.name},</span>
                              {item.role}
                            </div>
                            <div className="review pt-40 md-pt-20 mt-40 md-mt-30 ezd-d-flex ezd-justify-content-between ezd-align-items-center">
                              <div className="text-md fw-500">{item.rating} Awesome</div>
                              <div>
                                {[...Array(item.stars)].map((_, i) => (
                                  <span key={i} className="fa fa-star" style={{ color: i < 4 ? "#f2b01e" : "" }}></span>
                                ))}
                                <span className="elementor-screen-only">{item.stars}/5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  {/* <ul className="slider-arrows slick-arrow-one d-flex justify-content-center">
                    <li className="prev_f">
                      <i className="arrow_left" />
                    </li>
                    <li className="next_f">
                      <i className="arrow_right" />
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
