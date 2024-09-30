import React from 'react';

const CompanyList = () => {
  const companies = [
    {
      logo: "/images/homeImages/media_29.png",
      name: "Payoneer",
      location: "Sydney, Australia",
      jobs: 2
    },
    {
      logo: "/images/homeImages/ST.png",
      name: "SpiderDevs",
      location: "Sydney, Australia",
      jobs: 3
    },
    {
      logo: "/images/homeImages/media_42.png",
      name: "Bootstrap",
      location: "Berlin, Germany",
      jobs: 3
    },
    {
      logo: "/images/homeImages/media_31.png",
      name: "Linkedin",
      location: "Sydney, Australia",
      jobs: 2
    }
  ];

  return (
    <div
      className="elementor-element elementor-element-6962fd9 e-flex e-con-boxed e-con e-parent"
      data-id="6962fd9"
      data-element_type="container"
      data-settings='{"background_background":"classic","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
      data-core-v316-plus="true"
    >
      <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-8a237f6 e-flex e-con-boxed e-con e-child"
          data-id="8a237f6"
          data-element_type="container"
          data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
        >
          <div className="e-con-inner">
            <div
              className="elementor-element elementor-element-e549fce elementor-widget elementor-widget-heading"
              data-id="e549fce"
              data-element_type="widget"
              data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}'
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Top Company
                </h2>
              </div>
            </div>
            
            <div
              className="elementor-element elementor-element-cb84114 elementor-hidden-mobile elementor-widget elementor-widget-button"
              data-id="cb84114"
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
                        <i aria-hidden="true" className=" arrow_carrot-right" />{" "}
                      </span>
                      <span className="elementor-button-text">Explore More</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-5246a7e e-flex e-con-boxed elementor-invisible e-con e-child"
          data-id="5246a7e"
          data-element_type="container"
          data-settings='{"animation":"fadeInUp","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
        >
          <div className="e-con-inner">
            <div
              className="elementor-element elementor-element-8540201 elementor-widget elementor-widget-jobly_companies"
              data-id={8540201}
              data-element_type="widget"
              data-widget_type="jobly_companies.default"
            >
              <div className="elementor-widget-container">
                <section className="top-company-section">
                  <div className="row gy-4">
                    {companies.map((company, index) => (
                      <div key={index} className="col-lg-3 col-sm-6">
                        <div className="card-style-ten text-center tran3s wow fadeInUp">
                          <img
                            data-lazyloaded={1}
                            src={company.logo}
                            loading="lazy"
                            decoding="async"
                            width={85}
                            className="lazy-img m-auto wp-post-image"
                            height={85}
                            alt={`logo-${index}`}
                          />
                          <div className="text-lg fw-500 text-dark mt-15 mb-30">{company.name}</div>
                          <p className="mb-20 text-capitalize">{company.location}</p>
                          <a href="#" className="open-job-btn fw-500 tran3s">{company.jobs} open jobs</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
