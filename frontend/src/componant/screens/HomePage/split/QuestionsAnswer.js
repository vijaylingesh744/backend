import React, { useState } from 'react';

const QuestionsAnswer = () => {
  const questions = [
    {
      id: 0,
      question: "How does the free trial work?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 1,
      question: "How do you find different criteria in your process?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 2,
      question: "What do you look for in a founding team?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 3,
      question: "Do you recommend Pay as you go or Pre pay?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 4,
      question: "What do I get for $0 with my plan?",
      answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];

  const [show, setShow] = useState(Array(questions.length).fill(false));

  const toggleContent = (index) => {
    const updatedShow = [...show];
    updatedShow[index] = !updatedShow[index];
    setShow(updatedShow);
  };

  return (
    <div className="elementor-element elementor-element-053c8ff e-flex e-con-boxed e-con e-parent" data-id="053c8ff" data-element_type="container" data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}' data-core-v316-plus="true">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-8eb8da0 e-flex e-con-boxed e-con e-child" data-id="8eb8da0" data-element_type="container" data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'>
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-7d02ade elementor-widget elementor-widget-heading" data-id="7d02ade" data-element_type="widget" data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}' data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">Questions &amp; Answers</h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-40c5f76 elementor-widget elementor-widget-spel_accordion" data-id="40c5f76" data-element_type="widget" data-widget_type="spel_accordion.default">
              <div className="elementor-widget-container">
                <div className="accordion">
                  {questions.map((item, index) => (
                    <div className="card doc_accordion spe_accordion_inner ezd-accord-item" key={index}>
                      <div className="card-header spe-accordion" id={`heading-${index}`}>
                        <h6 className="title">
                          <button className="btn btn-link" onClick={() => toggleContent(index)}>
                            {item.question}
                            <span className="icon-wrapper">
                              <span className="expanded-icon">
                                <i aria-hidden="true" className={`fas ${show[index] ? 'fa-minus' : 'fa-plus'}`} />
                              </span>
                              <span className="collapsed-icon">
                                <i aria-hidden="true" className="fas fa-minus" />
                              </span>
                            </span>
                          </button>
                        </h6>
                      </div>
                      <div id={`toggle-${index}`} className={`collapse ${show[index] ? 'show' : ''}`}>
                        <div className="card-body toggle_body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-20b3e03 e-flex e-con-boxed e-con e-child" data-id="20b3e03" data-element_type="container" data-settings='{"spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'>
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-b0a79da e-con-full e-flex elementor-invisible e-con e-child" data-id="b0a79da" data-element_type="container" data-settings='{"background_background":"classic","animation":"fadeInUp","spe_features_box_enable":"no","spe_fb_badge_enable":"no"}'>
              <div className="elementor-element elementor-element-7d9337d elementor-widget elementor-widget-heading" data-id="7d9337d" data-element_type="widget" data-settings='{"spe_reveal_anim_enable":"no","spe_highlighted_text_enable":"no"}' data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <div className="elementor-heading-title elementor-size-default">Don’t find the answer? We can help.</div>
                </div>
              </div>
              <div className="elementor-element elementor-element-6ed56d4 elementor-widget elementor-widget-button" data-id="6ed56d4" data-element_type="widget" data-widget_type="button.default">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <a className="elementor-button elementor-button-link elementor-size-sm">
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">Click here</span>
                      </span>
                    </a>
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

export default QuestionsAnswer;