import React from 'react';

const Jobscategory = () => {
  const jobCategories = [
    {
      icon: "/images/homeImages/icons/icon_28.svg",
      title: "Accounting",
      vacancies: 3
    },
    {
      icon: "/images/homeImages/icons/icon_24.svg",
      title: "Development",
      vacancies: 9
    },
    {
      icon: "/images/homeImages/icons/icon_29.svg",
      title: "Editing",
      vacancies: 1
    },
    {
      icon: "/images/homeImages/icons/icon_26.svg",
      title: "Marketing",
      vacancies: 1
    },
    {
      icon: "/images/homeImages/icons/icon_16.svg",
      title: "Programing & Code",
      vacancies: 1
    },
    {
      icon: "/images/homeImages/icons/icon_27.svg",
      title: "Telemarketing",
      vacancies: 1
    },
    {
      icon: "/images/homeImages/icons/icon_24.svg",
      title: "UI Design",
      vacancies: 2
    },
  ];

  return (
    <div
      className="elementor-element elementor-element-968a235 e-flex e-con-boxed e-con e-parent"
      data-id="968a235"
      data-element_type="container"
      data-settings='{"background_background":"classic","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
      data-core-v316-plus="true"
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-1a60777 e-flex e-con-boxed e-con e-child"
          data-id="1a60777"
          data-element_type="container"
          data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
        >
          <div className="e-con-inner">
            <div
              className="elementor-element elementor-element-bb8ac95 e-flex e-con-boxed e-con e-child"
              data-id="bb8ac95"
              data-element_type="container"
              data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
            >
              <div className="e-con-inner">
                <div
                  className="elementor-element elementor-element-f40b269 elementor-widget-mobile_extra__width-initial elementor-widget-tablet__width-initial elementor-widget elementor-widget-heading"
                  data-id="f40b269"
                  data-element_type="widget"
                  data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}'
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      Most Demanding Categories.
                    </h2>
                  </div>
                </div>
                <div
                  className="elementor-element elementor-element-37aea9c elementor-hidden-mobile elementor-widget elementor-widget-button"
                  data-id="37aea9c"
                  data-element_type="widget"
                  data-widget_type="button.default"
                >
                  <div className="elementor-widget-container">
                    <div className="elementor-button-wrapper">
                      <a
                        className="elementor-button elementor-button-link elementor-size-sm elementor-animation-grow"
                        href="#"
                      >
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-icon elementor-align-icon-right">
                            <i aria-hidden="true" className=" arrow_carrot-right" />
                          </span>
                          <span className="elementor-button-text">
                            All Categories
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="elementor-element elementor-element-aa7bf4a elementor-invisible elementor-widget elementor-widget-jobly_job_categories"
              data-id="aa7bf4a"
              data-element_type="widget"
              data-settings='{"_animation":"fadeInUp"}'
              data-widget_type="jobly_job_categories.default"
            >
              <div className="elementor-widget-container">
                <div className="card-wrapper-three row">
                  {jobCategories.map((category, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 d-flex">
                      <div
                        className="card-style-four tran3s w-100 wow fadeInUp"
                        data-wow-delay={`${index * 0.2 + 0.1}s`}
                      >
                        <a href="#" className="d-block">
                          <div className="icon tran3s d-flex align-items-center justify-content-center">
                            <img
                              data-lazyloaded={1}
                              src={category.icon}
                              decoding="async"
                              width={21}
                              height={20}
                              className="lazy-img"
                              alt=""
                            />
                          </div>
                          <div className="title tran3s fw-500 text-lg">
                            {category.title}
                          </div>
                          <div className="total-job">{category.vacancies} vacancy</div>
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
                  <div
                    className="card-style-four bg-color tran3s w-100 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <a href="#" className="d-block">
                      <div className="title text-white">10+</div>
                      <div className="text-lg text-white">Job already posted</div>
                      <div className="d-flex align-items-center justify-content-end mt-50">
                        <img
                          data-lazyloaded={1}
                          src="/images/homeImages/icons/shape_22.svg"
                          decoding="async"
                          data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/plugins/jobly/assets/images/icons/shape_22.svg"
                          alt="shape"
                          className="lazy-img"
                        />
                        <div className="icon tran3s d-flex align-items-center justify-content-center ms-5">
                          <img
                            data-lazyloaded={1}
                            src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="
                            decoding="async"
                            data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/plugins/jobly/assets/images/icons/icon_19.svg"
                            alt="Arrow Icon"
                            className="lazy-img"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobscategory;
