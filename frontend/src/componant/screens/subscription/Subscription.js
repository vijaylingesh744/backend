import React, { useEffect, useState } from "react";
import Header from "../layout/SubHeader";
import "./style/style.css";
import "./style/payment.css";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import FetchData from "../../fetch-api/Apifetch";
import { addMonths } from 'date-fns';
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LeftSide from "../FeedPage/PostData/LeftSide";

function Subscription() {

  const { t } = useTranslation();
  const navigate = useNavigate()
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
  const [showModal, setShowModal] = useState(false);
  const [ShowHighlight, SetShowHighlight] = useState()
  const [ismodalOpen, setismodalOpen] = useState(false);
  const [listsub, setlistSub] = useState([])
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({
    card_number: '',
    month: '',
    year: '',
    cvc: '',
  });
  const [Form, setForm] = useState({
    user_id: user?._id,
    Sub_id: '',
    transaction_id: '',
    valid_from: '',
    valid_to: '',
    payment: ''
  })


  const planData = [
    { title: "MONTHLY BASIC", price: "$100", description: "Mobile only", validity_month: "1 month", admin_id: "required", type: '0' },
    { title: "MONTHLY Digital", price: "$300", description: "Mobile + Desktop", validity_month: "3 month", admin_id: "required", type: '1' },
    { title: "MONTHLY BASIC", price: "$600", description: "Mobile + Desktop + 5 Users", validity_month: "6 month", admin_id: "required", type: '0' }
  ]


  const handleMouseEnter = (columnIndex) => {
    setHoveredColumn(columnIndex);
  };

  const handleMouseLeave = () => {
    setHoveredColumn(null);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleProceed = (e) => {
    e.preventDefault();
    closeModal();
    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: "Your payment has been processed successfully!",
    });
  };

  const ListSubscription = async () => {

    try {
      const res = await FetchData("subscription", "GET", null, false, false);
      if (res.status) {
        setlistSub(res.data)
      }
    }
    catch (err) {
      console.log(err);
    }

  }
  useEffect(() => {
    ListSubscription();



  }, []);

  const AddPlanSubscription = async () => {
    console.log(Form);
    setismodalOpen(true)
    return;

    try {
      const res = await FetchData("add/plan", "POST", JSON.stringify(Form), false, false);
      console.log(res);
      toast.success('Plan Subscrption purchased.')
    } catch (err) {
      console.log(err);
    }
  }

  const timeupdate = async (period) => {
    console.log(period);
    const currentDateTime = new Date();
    if (isNaN(currentDateTime.getTime())) {
      console.error('Invalid current date');
      return;
    }

    const currentDateTimeISO = currentDateTime.toISOString();

    const futureDate = addMonths(currentDateTime, period);
    if (isNaN(futureDate.getTime())) {
      console.error('Invalid future date');
      return;
    }

    const futureDateISO = futureDate.toISOString();

    return { currentDateTimeISO, futureDateISO };
  }

  const getplanData = async (item, index) => {

    const dates = await timeupdate(item.validity_month);

    if (dates) {
      console.log('Current Date:', dates.currentDateTimeISO);
      console.log('Future Date:', dates.futureDateISO);
    }

    // const currentDateTime = new Date();
    // const currentDateTimeISO = currentDateTime.toISOString();
    //         console.log(currentDateTime);
    //     const futureDate = addMonths(currentDateTime, item.validity_month);
    //     const futureDateISO = futureDate.toISOString();
    SetShowHighlight(index)
    setForm({
      ...Form,
      payment: item.price,
      Sub_id: item._id,
      valid_from: dates.currentDateTimeISO,
      valid_to: dates.futureDateISO
    })
  }
  const handleInputChangepersonal = (e) => {
    const { name, value } = e.target;
    let error = '';
    setErrors({ ...errors, [name]: error });
    setformData({ ...formData, [name]: value });

  }
  const InputField = (label, name, type, value, onChange, placeholder, caplatize, col) => (
    <div className={`outlined-input ${name == 'card_number' ? 'px-0' : ''} col-lg-${col} col-12 mb-2 mt-3 inputs-form`}>
      <label htmlFor={`exampleInput${name}`} className=" mr-3 fontcontent1 titleproof" style={{ fontWeight: "500", color: 'grey' }}>
        {label}
      </label>
      <input
        type="text"
        className="fontcontent1 w-100"
        name={name}
        value={value}
        style={{ color: 'black', height: '2.5rem' }}
        onChange={(e) => {
          let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters

          if (inputValue.length > 16) {
            inputValue = inputValue.slice(0, 16); // Ensure it does not exceed 16 digits
          }

          // Format the input value to have spaces between every 4 digits
          inputValue = inputValue.replace(/(.{4})/g, '$1 ').trim();

          onChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder=" "
      />
    </div>
  );
  const SelectOption = (title, col = 4, name, type, value, onChange) => {
    var options = []
    var con = true

    let defaultValue = "";
    // if (name == "user_type") {
    //     options = [
    //         "Buyer",
    //         "Seller",
    //         "Business Partner",
    //     ]
    //     if (value === "0") {
    //     defaultValue = "Buyer";
    // } else if (value === "1") {
    //     defaultValue = "Business Partner";
    // } else if (value === "2") {
    //     defaultValue = "Seller";
    // }
    // } else
    if (name == "month") {
      console.log(value);
      options = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
    else if (name == "year") {
      options = [
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ]
    }
    else {
      con = false
    }
    return (
      <div className={`col-lg-${col} col-${col} mb-2 mt-3 outlined-input inputs-form`}>
        <label htmlFor={`exampleInput${title}`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
          {title}
        </label>
        <select
          name={name}
          value={con ? (defaultValue || value) : value}
          className='form-control rounded fontcontent1'
          onChange={onChange}
          style={{ color: 'black', border: '1px solid #767676' }}>
          <option value={""}>Select Option</option>
          {options.map(item => (
            con ? <option value={item}>{item}</option> : <option value={item.userdata._id}>
              {item.userdata.first_name} {item.userdata.last_name}
            </option>
          ))}
        </select>

      </div>
    )
  }

  const hidemodal = () => {
    setismodalOpen(false)
  }

  return (
    <div>
      <header id="main-header">
        <Header />
      </header>
      {/* <div className="container-fluid bg-white px-0 ">
        <div className="d-flex justify-content-around">
          <div className="align-items-center d-flex flex-column justify-content-center">
            <p className="text-center pt-4 connectsub">
             {t('connectSouqSubscriptionPlans')}
            </p>
            <p className="text-center planhint">
               <br />
              {t('chooseSubscriptionPlan')}
            </p>
          </div>
          <div>
            <div className="container py-3 px-5 height">
              <div className="row">
                <div className={`col-4 smooth-transition ${hoveredColumn === 0 ? '' : 'pt-5'}`} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={handleMouseLeave}>
                  <div className=" h-100">
                    <div className="  border px-0  rounder h-auto mt-5">
                      <div className="bg-green h-25 rounder1">
                        <p className="plan1 py-4">$10.00</p>
                      </div>
                      <div className="d-flex flex-column align-items-center py-4 gap">
                        <div className="rewards"><img src="/images/icons/medal.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 15 {t('bronze')}</div>
                        <div className="rewards"><img src="/images/icons/star.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 10 {t('silver')}</div>
                        <div className="rewards"><img src="/images/icons/coin.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 5 {t('gold')}</div>
                        <div className="rewards"><img src="/images/icons/diamond.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 0 {t('diamond')}</div>
                        <div className="valid">{t('validity')} - 6 {t('months')}</div>
                        <button className="btn btn-purchase mt-3" onClick={openModal}>
                         {t('purchase')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`col-4 pb-4 smooth-transition ${hoveredColumn === 1 ? '' : 'pt-5'}`} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                  <div className=" h-100">
                    <div className="  border px-0 rounder h-auto">
                      <div className="bg-warning rounder1">
                        <p className="planpopular pt-2">{t('mostPopular')}</p>
                      </div>
                      <div className="bg-green h-25 ">
                        <p className="plan1 py-4">$19.00</p>
                      </div>
                      <div className="d-flex flex-column align-items-center py-4 gap">
                        <div className="rewards"><img src="/images/icons/medal.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 25 {t('bronze')}</div>
                        <div className="rewards"><img src="/images/icons/star.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 20 {t('silver')}</div>
                        <div className="rewards"><img src="/images/icons/coin.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 15 {t('gold')}</div>
                        <div className="rewards"><img src="/images/icons/diamond.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 1 {t('diamond')}</div>
                        <div className="valid">{t('validity')} - 12 {t('months')}</div>
                        <button className="btn btn-purchase mt-2" onClick={openModal}>
                        {t('purchase')}
                        </button>
                      </div>
                    </div>
                  </div>         
                </div>
                <div className={`col-4 smooth-transition ${hoveredColumn === 2 ? '' : 'pt-5'}`} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                  <div className=" h-100">
                    <div className="  border px-0 rounder h-auto mt-5">
                      <div className="bg-green h-25 rounder1">
                        <p className="plan1 py-4">$35.00</p>
                      </div>
                      <div className="d-flex flex-column align-items-center py-4 gap">
                        <div className="rewards"><img src="/images/icons/medal.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 40 {t('bronze')}</div>
                        <div className="rewards"><img src="/images/icons/star.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 30  {t('silver')}</div>
                        <div className="rewards"><img src="/images/icons/coin.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 25 {t('gold')}</div>
                        <div className="rewards"><img src="/images/icons/diamond.png" style={{ width: '20px', height: '20px' }} className="mr-2" /> 5 {t('diamond')}</div>
                        <div className="valid">{t('validity')} - Unlimited</div>
                        <button className="btn btn-purchase mt-3" onClick={openModal}>
                          {t('purchase')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        <div className="feed_doublecontainer" style={{display:'grid'}}>
          <section id='ads'></section>
       
        <div id="main-wrapper" className='pr-lg-3 '>
          <main id="main-section" style={{border: "0.5px solid rgb(219, 219, 219)"}} className='mt-2 bg-white rounded-3 mt-lg-0' >
          <div className="container-fluid d-flex mt-2">
          <span className="text-dark1 fontsubtitle font-weight-normal pt-3" role="button" onClick={() => navigate(-1)}><i class="fa fa-long-arrow-left text-dark1" aria-hidden="true"></i>&nbsp;Back</span>
        </div>
          <div className="d-flex flex-column py-3"
          style={{
            overflow:"hidden"
          }}
          >
            <div className="d-flex align-items-center flex-column">
              <h3 className="text-connect font-weight-bold fonttitle" style={{ letterSpacing: '1px' }}>Connect Souq Subscription Plans</h3>
              <h5 className="text-secondary1 text-center fontcontent1 mt-2" style={{ lineHeight: '1.3rem' }}>Choose the subscription plan thatsuits you <br /> and your business best</h5>

              <div className="d-flex column-gap-5 mt-3 align-items-end">
                {listsub && listsub.map((item, index) => (
                  <div className={`card shadow rounded-0 ${ShowHighlight == index && 'borderhover'}`} style={{ width: '210px', height: item.type == 0 ? '250px' : null }} onClick={() => getplanData(item, index)}>
                    {item.type == 1 && <div className="container-fluid d-flex justify-content-center align-items-center w-95 mt-1" style={{ height: '40px', background: '#4535C1' }}>
                      <span className="text-white fontsubtitle font-weight-bold">Most Popular</span></div>}
                    <div className="px-3 pt-3 d-flex flex-column" style={{ height: '250px' }}>
                      <span className="text-dark1 fonttitle font-weight-bold text-center">{item.title}</span>
                      <span className="text-dark1 fontsubtitle text-center mt-2" style={{ height: '50px' }}>{item.description}</span>
                      <p className="text-dark1 fonttitle font-weight-bold text-center">{item.price}</p>
                      <p className="text-dark1 fontcontent1 font-weight-bold text-center">Pay {item.price} / {item.validity_month} month</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <button className="btn btn-connect fontsubtitle font-weight-bold" onClick={() => AddPlanSubscription()}>Purchase</button>
              </div>
            </div>
          </div>
          </main>
        </div>
        <div className="d-none d-md-block d-lg-block">
          <LeftSide/>
        </div>
      </div>

      {/* <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-body">
          <form className="credit-card" onSubmit={handleProceed} >
            <div class="form-header">
            <span className="step ml-5" style={{ fontSize: 23,float:'right',cursor:'pointer'  }} onClick={closeModal} >&times;</span>
              <h4 class="title">Credit card detail</h4>
            </div>
            <div className="form-body">
              <label htmlFor="">Name on card</label>
              <input type="email" className="form-control card-details" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Name" />
              <label htmlFor="">Card Number</label>
              <input type="email" className="form-control card-details" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="X X X X- X X X X-X X 0 9" />
              <div className="d-flex">
                <div>
                  <label htmlFor="" className="mt-1">Year</label>
                  <div className="month">
                    <select name="Month">
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                      <option value="april">April</option>
                      <option value="may">May</option>
                      <option value="june">June</option>
                      <option value="july">July</option>
                      <option value="august">August</option>
                      <option value="september">September</option>
                      <option value="october">October</option>
                      <option value="november">November</option>
                      <option value="december">December</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="mt-1">Month</label>
                  <div className="year">
                    <select name="Year" className="ml-2">
                      <option value={2016}>2016</option>
                      <option value={2017}>2017</option>
                      <option value={2018}>2018</option>
                      <option value={2019}>2019</option>
                      <option value={2020}>2020</option>
                      <option value={2021}>2021</option>
                      <option value={2022}>2022</option>
                      <option value={2023}>2023</option>
                      <option value={2024}>2024</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-verification">
                <label htmlFor="">CVV</label>
                <div className="cvv-input">
                  <input type="text" placeholder="CVV" />
                </div>
                <div className="cvv-details">
                  <p>
                    3 or 4 digits usually found <br /> on the signature
                    strip
                  </p>
                </div>
              </div>
              <button type="submit" className="proceed-btn">
              Proceed
              </button>
            </div>
          </form>
        </div>
      </div> */}
      <Modal show={ismodalOpen} onHide={hidemodal} className="modelfilter modal-lg mx-auto" size="lg1">
        <Modal.Body>
          <div className="container-fluid row">
            <div className="col-6">
              <div className="container-fluid py-4">
                <span className="fontsubtitle text-dark1 font-weight-bold mb-2" style={{ letterSpacing: '0.6px' }}>Checkout</span>
                <p className="fontcontent1 text-secondary1 mb-5">a checkout is a counter where you pay for things you are buying</p>

                <span className="font-weight-bold fontsubtitle text-dark1" style={{ letterSpacing: '0.6px' }}>Payment method</span>

                <div className="d-flex justify-content-around mt-3 column-gap-3">
                  <div className="border border-info px-3 py-2 w-50">
                    <div class="form-check ">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <div className="d-flex column-gap-2 align-items-center"><img src="/images/icons/credit-card.png" width={25} height={25} />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Credit card
                        </label>
                      </div>
                    </div></div>
                  <div className="border border-info px-3 py-2 w-50">
                    <div class="form-check ">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <div className="d-flex column-gap-2 align-items-center"><img src="/images/icons/paypal.png" width={25} height={25} />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Paypal
                        </label>
                      </div>
                    </div></div>
                </div>
                <div className="mt-5">
                  {InputField('Card Number', 'card_number', 'text', formData.card_number, handleInputChangepersonal, 'xxxx xxxx xxxx xxxx', false, 12)}

                  <div className="row container mx-0 px-0">
                    {SelectOption('Month', 4, 'month', 'text', formData.month, handleInputChangepersonal)}
                    {SelectOption('Year', 4, 'year', 'text', formData.year, handleInputChangepersonal)}
                    {InputField('CVV', 'cvc', 'text', formData.cvc, handleInputChangepersonal, 'xxx', false, 4)}


                  </div>
                </div>
              </div>
            </div>
            <div className="col-6"></div>

          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Subscription;

