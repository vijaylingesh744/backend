import React, {useState } from 'react';
import { Fade } from 'react-awesome-reveal';


const Whychooseus = () => {
  const [show, setShow] = useState(Array(3).fill(false));

  const toggleContent = (index) => {
    const updatedShow = [...show];
    updatedShow[index] = !updatedShow[index];
    setShow(updatedShow);
  };
  const accordionItems = [
    { title: 'Seamless Search', content: 'It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand.' },
    { title: 'Hire top talents', content: 'It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand.' },
    { title: 'Protected payments, every time', content: 'It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand.' },
  ];

  return (
    <div
  className="elementor-element elementor-element-e4f5d3a e-flex e-con-boxed e-con e-parent"
  data-id="e4f5d3a"
  data-element_type="container"
  data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
  data-core-v316-plus="true"
>
  <div className="e-con-inner">
    <div
      className="elementor-element elementor-element-73f4cfe e-flex e-con-boxed e-con e-child"
      data-id="73f4cfe"
      data-element_type="container"
      data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-2b4b3c6 e-flex e-con-boxed elementor-invisible e-con e-child"
          data-id="2b4b3c6"
          data-element_type="container"
          data-settings='{"animation":"fadeInRight","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
        >
          <div className="e-con-inner">
            <div
              className="elementor-element elementor-element-22d165a elementor-widget elementor-widget-heading"
              data-id="22d165a"
              data-element_type="widget"
              data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}'
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-heading-title elementor-size-default">
                  Why choose us?
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-d83e0fa elementor-widget elementor-widget-heading"
              data-id="d83e0fa"
              data-element_type="widget"
              data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}'
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  World of talent at your fingertips
                </h2>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-c94b48a elementor-widget elementor-widget-spel_accordion"
              data-id="c94b48a"
              data-element_type="widget"
              data-widget_type="spel_accordion.default"
            >
              <div className="elementor-widget-container">
              <div className="accordion">
              <div className="card doc_accordion spe_accordion_inner ezd-accord-item-eb731fa">
                    <div
                      className="card-header spe-accordion"
                      id="heading-eb731fa"
                    >
              {accordionItems.map((item, index) => (
              <div className="elementor-element" key={index}>
                <div className="card doc_accordion spe_accordion_inner ezd-accord-item">
                  <div className="card-header spe-accordion">
                    <h6 className="title">
                      <button className="btn btn-link" onClick={() => toggleContent(index)}>
                        {item.title}
                        <span className="icon-wrapper">
                          <span className="expanded-icon" style={{ display: show[index] ? 'none' : 'block' }}>
                          <i class="fa fa-angle-down" style={{ fontSize:"25px" }} aria-hidden="true"></i>
                          </span>
                          <span className="collapsed-icon" style={{ display: show[index] ? 'block' : 'none' }}>
                          <i class="fa fa-angle-up " style={{ color:"#4535C1", fontSize:"25px" }} aria-hidden="true"></i>


                          </span>
                        </span>
                      </button>
                    </h6>
                  </div>
                  <div id={`toggle-${index}`} className={`collapse ${show[index] ? 'show' : ''}`}>
                    <div className="card-body toggle_body d-block">
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

              </div>
            </div>
            </div>
            <div
              className="elementor-element elementor-element-2ce36ee elementor-widget elementor-widget-button"
              data-id="2ce36ee"
              data-element_type="widget"
              data-widget_type="button.default"
            >
              <div className="elementor-widget-container">
                <div className="elementor-button-wrapper">
                  <a
                    className="elementor-button elementor-button-link elementor-size-sm"
                    href="#"
                  >
                    <span className="elementor-button-content-wrapper">
                      <span className="elementor-button-text">Learn More</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-3ab18d6 e-con-full e-flex e-con e-child"
          data-id="3ab18d6"
          data-element_type="container"
          data-settings='{"background_background":"classic","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
        >
          <div
            className="elementor-element elementor-element-2e98fec e-flex e-con-boxed e-con e-child"
            data-id="2e98fec"
            data-element_type="container"
            data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
          >
            <div className="e-con-inner">
              <div
                className="elementor-element elementor-element-da814fb elementor-widget__width-initial elementor-widget-mobile__width-initial elementor-invisible elementor-widget elementor-widget-image"
                data-id="da814fb"
                data-element_type="widget"
                data-settings='{"_animation_delay":100,"_animation":"fadeIn"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <Fade direction='left'>
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/img_37.jpg"
                    loading="lazy"
                    decoding="async"
                    width={321}
                    height={197}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_37.jpg"
                    className="attachment-large size-large wp-image-101"
                    alt=""
                    data-srcset="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_37.jpg 321w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_37-300x184.jpg 300w"
                    data-sizes="(max-width: 321px) 100vw, 321px"
                  />
                 </Fade>
                </div>
              </div>
              <div
                className="elementor-element elementor-element-0ff227f elementor-absolute elementor-widget-mobile__width-initial elementor-widget-tablet_extra__width-initial elementor-invisible elementor-widget elementor-widget-image"
                data-id="0ff227f"
                data-element_type="widget"
                data-settings='{"_position":"absolute","_animation":"fadeInRight"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <Fade direction='right'>
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/screen_01.png"
                    loading="lazy"
                    decoding="async"
                    width={503}
                    height={209}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_01.png"
                    className="attachment-large size-large wp-image-111"
                    alt=""
                    data-srcset="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_01.png 503w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_01-300x125.png 300w"
                    data-sizes="(max-width: 503px) 100vw, 503px"
                  />
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          <div
            className="elementor-element elementor-element-e8ccc67 e-flex e-con-boxed e-con e-child"
            data-id="e8ccc67"
            data-element_type="container"
            data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
          >
            <div className="e-con-inner">
              <div
                className="elementor-element elementor-element-67be467 elementor-widget-mobile__width-initial elementor-invisible elementor-widget elementor-widget-image"
                data-id="67be467"
                data-element_type="widget"
                data-settings='{"_animation":"fadeIn"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <Fade direction='right'>
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/img_04.jpg"
                    loading="lazy"
                    decoding="async"
                    width={296}
                    height={323}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_04.jpg"
                    className="attachment-large size-large wp-image-65"
                    alt=""
                    data-srcset="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_04.jpg 296w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_04-275x300.jpg 275w"
                    data-sizes="(max-width: 296px) 100vw, 296px"
                  />
                  </Fade>
                </div>
              </div>
              <div
                className="elementor-element elementor-element-b2c028a elementor-invisible elementor-widget elementor-widget-image"
                data-id="b2c028a"
                data-element_type="widget"
                data-settings='{"_animation":"fadeIn"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/img_38.jpg"
                    loading="lazy"
                    decoding="async"
                    width={195}
                    height={175}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/img_38.jpg"
                    className="attachment-large size-large wp-image-102"
                    alt=""
                  />
                </div>
              </div>
              <div
                className="elementor-element elementor-element-c6c4ae2 elementor-widget__width-auto elementor-absolute elementor-widget-mobile_extra__width-initial elementor-widget-tablet_extra__width-initial elementor-invisible elementor-widget elementor-widget-image"
                data-id="c6c4ae2"
                data-element_type="widget"
                data-settings='{"_position":"absolute","_animation":"fadeInUp"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/screen_02.png"
                    loading="lazy"
                    decoding="async"
                    width={325}
                    height={182}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_02.png"
                    className="attachment-large size-large wp-image-112"
                    alt=""
                    data-srcset="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_02.png 325w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_02-300x168.png 300w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_02-270x152.png 270w"
                    data-sizes="(max-width: 325px) 100vw, 325px"
                  />
                </div>
              </div>
              <div
                className="elementor-element elementor-element-dccbb6f elementor-widget__width-auto elementor-absolute elementor-widget-tablet__width-initial elementor-widget-mobile_extra__width-initial elementor-widget-tablet_extra__width-initial elementor-widget-mobile__width-initial elementor-invisible elementor-widget elementor-widget-image"
                data-id="dccbb6f"
                data-element_type="widget"
                data-settings='{"_position":"absolute","_animation":"fadeInUp"}'
                data-widget_type="image.default"
              >
                <div className="elementor-widget-container">
                  <Fade direction="up">
                  <img
                    data-lazyloaded={1}
                    src="/images/homeImages/screen_03.png"
                    loading="lazy"
                    decoding="async"
                    width={418}
                    height={250}
                    data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_03.png"
                    className="attachment-large size-large wp-image-113"
                    alt=""
                    data-srcset="https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_03.png 418w, https://wordpress-theme.spider-themes.net/jobi/wp-content/uploads/2023/07/screen_03-300x179.png 300w"
                    data-sizes="(max-width: 418px) 100vw, 418px"
                  />
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Whychooseus