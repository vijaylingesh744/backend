import React from 'react';

const Guides = () => {
  const guidesData = [
    {
      imgSrc: "/images/homeImages/1.png",
      imgAlt: "Designer’s Checklist for Every UX/UI Project.",
      date: "10 Feb 2024",
      title: "Designer’s Checklist for Every UX/UI Project.",
      tag: "Docuemntation",
      link: "#"
    },
    {
      imgSrc: "/images/homeImages/2.png",
      imgAlt: "Print, publishing qui visual ux quis layout mockups.",
      date: "10 Feb 2024",
      title: "Print, publishing qui visual ux quis layout mockups.",
      tag: "Editing",
      link: "#"
    }
  ];

  return (
    <div
    className="elementor-element elementor-element-d424430 e-flex e-con-boxed e-con e-parent"
    data-id="d424430"
    data-element_type="container"
    data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
    data-core-v316-plus="true"
  >
     <div className="e-con-inner">
    <div
      className="elementor-element elementor-element-368f668 e-flex e-con-boxed e-con e-child"
      data-id="368f668"
      data-element_type="container"
      data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
    >
         <div className="e-con-inner">
        <div
          className="elementor-element elementor-element-12370be elementor-widget elementor-widget-heading"
          data-id="12370be"
          data-element_type="widget"
          data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}'
          data-widget_type="heading.default"
        >
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">
              Connect Souq Guides
            </h2>
          </div>
        </div>
        <div
          className="elementor-element elementor-element-0aa7f14 elementor-hidden-mobile elementor-widget elementor-widget-button"
          data-id="0aa7f14"
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
      <div
      className="elementor-element elementor-element-225604b e-flex e-con-boxed elementor-invisible e-con e-child"
      data-id="225604b"
      data-element_type="container"
      data-settings='{"animation":"fadeInUp","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'
    >
      <div className="e-con-inner">
      <div
          className="elementor-element elementor-element-7b6bbeb elementor-widget elementor-widget-docy_blog_grid"
          data-id="7b6bbeb"
          data-element_type="widget"
          data-widget_type="docy_blog_grid.default"
        >
          <div className="elementor-widget-container">
            <div className="ezd-grid ezd-grid-cols-12">
            {guidesData.map((guide, index) => (
              <div key={index} className="ezd-lg-col-6 ezd-sm-col-6 blog-grid">
                <div className="blog-meta-two">
                  <figure className="post-img">
                    <a href={guide.link} className="img blog1-img">
                      <img
                        data-lazyloaded={1}
                        src={guide.imgSrc}
                        loading="lazy"
                        decoding="async"
                        width={797}
                        className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                        height={428}
                        alt={guide.imgAlt}
                      />
                    </a>
                    <a href="#" className="tags">
                      {guide.tag}
                    </a>
                  </figure>
                  <div className="post-data">
                    <div className="date">
                      <a href="#" className="meta-item">
                        {guide.date}
                      </a>
                    </div>
                    <div>
                      <a className="blog-one-title" href={guide.link}>
                        <h2 className="tran3s blog-title">
                          {guide.title}
                        </h2>
                      </a>
                      <a href={guide.link} className="continue-btn tran3s d-flex align-items-center">
                        Continue Reading <i className="fa fa-arrow-right" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>
   
  );
};

export default Guides;
