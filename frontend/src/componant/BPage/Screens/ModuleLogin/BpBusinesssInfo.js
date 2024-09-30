import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FetchData from '../../../fetch-api/Apifetch';
import Rightcolumn from '../../../screens/newRegister/layout/RightColumn';
import { SkipButton } from '../../../utils/Function';
import AllSkill from "../../../../all_skills";
import '../../../screens/newRegister/Style/configure.css'


const BpBusinesssInfo = () => {
        const navigate = useNavigate();
        const User = JSON.parse(localStorage.getItem("VERIFYDATA"));
        const Location = useLocation();
          const { state } = Location;
        const [formdata, setFormdata] = useState({
          city: "",
          country: "",
          area_of_interest: "",
          phone: "",
          email: "",
          annual_turnover: "",
          size: "",
          company_name: "",
          company_address: "",
          industry_id:"",
          user_id: User?._id,
          type: "2",
        });
        const [skill, Setskills] = useState([]);
        const [options, setOptions] = useState([]);
        const [skillview, Setskillsview] = useState(false);
        const [Individual, SetIndividual] = useState(false);
        const [isUserSet, setIsUserSet] = useState(false);
        const [type, setType] = useState(User?.user_type)
        const [toastShown, setToastShown] = useState(false);
        const [toastShown1, setToastShown1] = useState(false);
      
        useEffect(() => {
          setIsUserSet(true)
          dataList();
          setBusinessInfoData();
        }, []);
        const handleToastClose = () => {
          setToastShown(false);
        };
        const handleToastClose1 = () => {
          setToastShown1(false);
        };
      
        const setBusinessInfoData = async () => {
          const userdata = JSON.parse(localStorage.getItem("VERIFYDATA"))
          console.log(userdata);
          console.log(userdata._id);
          const res = await FetchData("detail/user/"+ userdata?._id, 'GET', null, true, false);
          if (res.success) {
              console.log(res.data);
              if(res.data.BusinessInfoData[0] ){
                  var data = res?.data?.BusinessInfoData[0]
                  setFormdata({
                    industry_id: data?.industry_id,
                  })
                  setSelectedItems(data.area_of_interest);
                }
           }}
        const dataList = async () => {
          const res = await FetchData("industry", "GET", null, false, false);
          setOptions(res.data.data);
        };
        const FetchApiData = async (id) => {
          const res = await FetchData("skill/" + id, "GET", null, false, false);
          Setskills(res.data.data);
        };
        const inputField = (
          title,
          col = 6,
          name,
          type,
          value,
          onChange,
          caplatize
        ) => {
          return (
            <div
              className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-3`}
            >
              <input
                type={type}
                className="w-100"
                name={name}
                value={value}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  var capitalizedValue = inputValue
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                  console.log(capitalizedValue);
                  if (!caplatize) {
                    if (name == "phone") {
                      capitalizedValue = e.target.value
                        .replace(/\D/, "")
                        .slice(0, 12);
                    } else {
                      capitalizedValue = inputValue;
                    }
                  }
                  onChange({
                    target: { name: e.target.name, value: capitalizedValue },
                  });
                }}
                placeholder=" "
              />
              <label for="test">{title}</label>
            </div>
          );
        };
        const [selectedItems,setSelectedItems] = useState([]);
        const handleCheckboxChange = (title, index = 0) => {
          const item = { title, index };
          if (selectedItems.some(selected => selected?.title === title)) {
            setSelectedItems(selectedItems.filter(selected => selected?.title !== title));
          } else {
            // setSelectedItems([...selectedItems, item]);
            // if (selectedItems.length < 5) {
              setSelectedItems([...selectedItems, item]);
            // } else {
              // if (!toastShown1) {
              //   toast.warning('Cannot add more than 5 items', {
              //     autoClose: 3000, 
              //     closeButton: false, 
              //     onClose: handleToastClose1, 
              //   });
              //   setToastShown1(true);
              // }
            // }
          }
          setFilterText('');
        };
        const [SelectedIndustry, setSelectedIndustry] = useState([]);
        const handleIndustrySelect = (title, index = 0) => {
          const item = { title, index };
          Setskillsview(true);
          console.log(item);
          if (SelectedIndustry.some(selected => selected?.title === title)) {
            setSelectedIndustry(SelectedIndustry.filter(selected => selected?.title !== title));
          }else{
            setSelectedIndustry([...SelectedIndustry, item]);
          }
        }
        
        const [btndisable, setBtndisable] = useState(false);
        const AddData = async () => {
          try {
            setBtndisable(true);
            const token = false;
            var updatedFormData = {
              area_of_interest: formdata.area_of_interest,
              user_id: User?._id,
              area_of_interest: selectedItems,
              industry_id: SelectedIndustry,
            };
      
            const keysWithEmptyValues = Object.keys(updatedFormData).filter(
              (key) => !updatedFormData[key]
            );
      
            if (keysWithEmptyValues.length > 0) {
              const missingKeys = keysWithEmptyValues.join(", ");
              setBtndisable(false);
              toast.error(
                `Please provide values for the following fields: ${missingKeys.replaceAll(
                  /_/gi,
                  " "
                )}`
              );
              return;
            }
            if(SelectedIndustry.length == 0){
              toast.error("Please select industry type");
              setBtndisable(false);
              return;
            }
            if(selectedItems.length == 0) {
              toast.error(`Please select the area of interest`);
              setBtndisable(false);
              return;
            }
            // if(selectedItems.length < 5){
            //   if (!toastShown) {
            //     toast.error('Please Select Atleast 5 Skills', {
            //       autoClose: 3000, 
            //       closeButton: false, 
            //       onClose: handleToastClose, 
            //     });
            //     setToastShown(true);
            //   }
            //   setBtndisable(false);
            //   return;
            // }
      
            updatedFormData = {
              city: formdata.city,
              country: formdata.country,
              phone: formdata.phone,
              email: formdata.email,
              type: formdata.type,
              company_name: formdata.company_name,
              company_address: formdata.company_address,
              user_id: User?._id,
              industry_id: SelectedIndustry,
              area_of_interest:selectedItems,
              registerType:"PERSONALSKILL"

            };
      
            updatedFormData.annual_turnover = formdata.annual_turnover;
            updatedFormData.size = formdata.size;
      
            const res = await FetchData(
              "update/user/"+User?._id,
              "POST",
              JSON.stringify(updatedFormData),
              token,
              false
            );
            setBtndisable(false);
            if (res.status) {
              toast.success("Business Data Stored Successfully");
            //   SkipButton()
              navigate("/bp/License");
            } else {
              toast.error("Please Check Crediential");
            }
            return null;
          } catch (error) {
            setBtndisable(false);
            return null;
          }
        };
      
        const [filterText, setFilterText] = useState("");
        const handleFilterChange = (event) => {
          setFilterText(event.target.value);
        };
        const handlePassKey =(e)=>{
          if (e.key === 'Enter') {
            AddData();
              
            } 
      }
        return (
          <div
            className="container-fluid card"
            style={{ backgroundColor: '#e9ecef', height: "auto", minHeight: "100vh" }}
          >
            <Fade direction="right">
              <div
                className="row mx-lg-5 marginall">
                <div
                  className="col-lg-6 col-sm-12 scroll"
                  style={{
                    maxHeight: "88vh",
                    overflowY: "scroll",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                  }}
                >
                  <div className="w-100 h-100">
                    <div className="p-lg-4 mt-4 mt-lg-0">
                    <a className='fontcontent1' style={{color:"black",cursor:'pointer'}} onClick={()=>{navigate("/personal_info")}}><i class="fa fa-chevron-left"  aria-hidden="true" style={{marginRight:"10px"}}></i> Back to Personal info</a>
                      <h3 className="fonttitle" style={{marginTop:"20px"}}>Business Skills</h3>
                      <p style={{ color: "gray"}} className="fontsubtitle">
                      Help us understand your interests and business by answering our questions. This will enable us to identify the most suitable leads for you.
                      </p>
                      <div className="row">
      
                      <div className="px-3">
                          <div className="pb-1 fontsubtitle"> Let us know your Industry:</div>
                          <ul
                            className="d-flex flex-row flex-wrap justify-content-start"
                            style={{ columnGap: 15, rowGap: 10 }}
                          >
                            {SelectedIndustry.map((item, index) => (
                              <div style={{ background: '#4535C1', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center">
                                <li
                                  key={index}
                                  className=" pl-2"
                                  style={{ cursor: "pointer",   fontSize: "13px" }}
                                  onClick={() => handleIndustrySelect(item.title)}
                                >{item.title} </li>
                                <span
                                  className="p-2"
                                  style={{ color: "#fff", cursor: "pointer" }}
                                  onClick={() => handleIndustrySelect(item.title)}
                                ><strong>&times;</strong></span>
                              </div>
                            ))}
                          </ul>
                        </div>
                        <div className="w-100 pt-3 pb-2">
                        <div className="col-lg-12  my-3 inputs-form ">
                        <div
                            className={`options mt-3`}
                            style={{
                              maxHeight: "auto",
                              overflowY: "scroll",
                              display: "flex",
                              flexWrap: "wrap"
                          }}
                          >
                        {options.map((item,index)=> ({ title: item.title, id:item._id }))
                              .filter(({ title }) => !SelectedIndustry.some(selected => selected.title === title)) // Exclude selected items
                              .map(({ title, id }) => (
                                <div
                                  className="option mx-1 px-1 py-1 my-1"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    width: "fit-content"
                                  }}
                                  onClick={() => handleIndustrySelect(title, id)}
                                >
                                  <label
                                    className='d-flex fontcontent2 justify-content-around p-2'
                                    style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                                    {title}
                                  </label>
                                </div>
                              ))}
                              </div>
      
                          {/* <select
                            className={`form-control inputcontrol w-100`}
                            id="exampleInputCountry"
                            placeholder=""
                            value={formdata?.industry_id}
                            onChange={(e) => {
                              FetchApiData(e.target.value);
                              Setskillsview(true);
                              setFormdata({...formdata,["industry_id"]:e.target.value})
                            }}
                            style={{ height: "2.5rem", border: "0.1px solid grey" }}
                            aria-describedby="countryHelp"
                          >
                            <option value="">Industry Type</option>
                            {options &&
                              options.map((item) => (
                                <option value={item._id}>{item.title}</option>
                              ))}
                          </select> */}
                          {/* <label htmlFor="test">Industry Type</label> */}
                        </div>
                        </div>
                        <div className="px-3">
                          <div className="pb-1 fontsubtitle"> Let us know your interests:</div>
                          <ul
                            className="d-flex flex-row flex-wrap justify-content-start"
                            style={{ columnGap: 15, rowGap: 10 }}
                          >
                            {selectedItems.map((item, index) => (
                              <div style={{ background: '#4535C1', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center">
                                <li
                                  key={index}
                                  className=" pl-2"
                                  style={{ cursor: "pointer",   fontSize: "13px" }}
                                  onClick={() => handleCheckboxChange(item.title)}
                                >{item.title} </li>
                                <span
                                  className="p-2"
                                  style={{ color: "#fff", cursor: "pointer" }}
                                  onClick={() => handleCheckboxChange(item.title)}
                                ><strong>&times;</strong></span>
                              </div>
                            ))}
                          </ul>
                        </div>
                        <div className="w-100 pt-3 pb-2">
                          <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-0`}>
                            <input
                              type="text"
                              value={filterText}
                              onChange={handleFilterChange}
                              className="w-100"
                              placeholder=""
                              onKeyDown={handlePassKey}
                              onClick={() => {if(formdata?.industry_id){
                                Setskillsview(true)}
                              }
                            }
                            />
                            <label for="test">Area of interests</label>
                          </div>
      
                          <div
                            className={`options mt-3`}
                            style={{
                              maxHeight: "100px",
                              overflowY: "scroll",
                              display: "flex",
                              flexWrap: "wrap"
                          }}
                          >
                       {skillview && (AllSkill.map((option, index) => ({ title: option, index })) // Map to objects containing title and index
          .filter(({ title }) => !selectedItems.some(selected => selected.title === title)) // Exclude selected items
          .filter(({ title }) => {
            if (filterText && filterText.length === 2) {
              const sanitizedFilterText = filterText.replace(/\s/g, ""); // Remove spaces from filterText
              return title
                .toLowerCase()
                .includes(sanitizedFilterText.toLowerCase());
            }
            if (filterText && filterText.length > 2) {
              return title
                .toLowerCase()
                .includes(filterText.toLowerCase());
            }
            return true; 
          })
          .slice(0, 100)
          .map(({ title, index }) => (
            <div
              key={index}
              className="option mx-1 px-1 py-1 my-1"
              style={{
                cursor: "pointer",
                fontSize: "12px",
                width: "fit-content"
              }}
              onClick={() => handleCheckboxChange(title, index)}
            >
              <label
                className='d-flex fontcontent2 justify-content-around p-2'
                style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                {title}
              </label>
            </div>
          ))
      )}
                          </div>
                        </div>
      
                        <button
                          className="btn btn-connect mx-3 my-3"
                          style={{ width: "94%" }}
                          onClick={() => AddData()}
                          disabled={btndisable}
                        >
                          Register
                        </button>
      
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-6 p-0 colorimage d-none d-md-block d-lg-block"
                  style={{ borderRadius: "0px 10px 10px 0px" }}
                >
                  {/* <div className="h-100 d-lg-flex d-md-flex d-none justify-content-center align-items-center">
                    <img
                      src={"/images/icons/logo.png"}
                      style={{
                        borderRadius: "0% 5% 5% 0%",
                        width: "300px", height: '190px'
                      }}
                    />
                  </div> */}
                <Rightcolumn someProp={isUserSet} settype={type}/>
                </div>
              </div>
            </Fade>
          </div>
        );
      };

export default BpBusinesssInfo