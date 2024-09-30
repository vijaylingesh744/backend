import React from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import Modal from './common/Modal'
import Banner from './split/Banner'
import Companycategory from './split/Companycategory'
import Jobscategory from './split/Jobscategory' 
import Applyjobs from './split/Applyjobs'
import Whychooseus from './split/Whychooseus'
import CompanyList from './split/CompanyList'
import Rating from './split/Rating'
import QuestionsAnswer from './split/QuestionsAnswer'
import Guides from './split/Guides'
import UploadCv from './split/UploadCV'


const Home1 = () => {
  return (  
  <div class="main-page-wrapper">
  <Header />
  <div
  data-elementor-type="wp-page"
  data-elementor-id={831}
  className="elementor elementor-831"
  data-elementor-post-type="page"
>
<Banner />
<Companycategory />
<Jobscategory />
<Applyjobs />
<Whychooseus />
<CompanyList />
<Rating />
<QuestionsAnswer />
<Guides />
<UploadCv />
</div>
<Footer />
<Modal />
</div>
  )
}

export default Home1