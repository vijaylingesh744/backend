import React, { useState } from 'react'
import location from '../../../../utils/location.json'
import AllSkill from '../../../../../all_skills'
import { useLocation } from 'react-router-dom'

  const FilterColumn = ({ FilterData }) => {
    const locations = useLocation();
    const {
      setFormData,
      Formdata,
      FetchApiData,
      options,
      HandleSubmit,
    } = FilterData
  
    const [cityList, setCityList] = useState([]);
    const Citylist = (title) => {
        const filteredCities = [];
        var data = location.find(item => item.name == Formdata.country)
        data.states.forEach(state => {
          state.cities.forEach(city => {
            if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
              filteredCities.push({ name: city.name, state: state.name });
            }
          });
        });
        setCityList(filteredCities)
    }
  
    // const Citylist = (title) => {
    //   const filteredCities = [];
    //   location.forEach(country => {
    //     country.states.forEach(state => {
    //       state.cities.forEach(city => {
    //         const fullName = `${city.name} ${state.name} ${country.name}`;
    //         if (fullName.toLowerCase().includes(title.toLowerCase())) {
    //           filteredCities.push({ city: city.name, state: state.name, country: country.name });
    //         }
    //       });
    //     });
    //   });
    //   setCityList(filteredCities);
    // };
  
    return (
      <>
      <div className='container-fluid d-flex py-3 px-0 justify-content-between'>
        <div className='d-flex align-items-center w-100 column-gap-1 mr-2'>
          <div className='w-20 filterinput'>
      <select
              name="country"
              className="form-control mb-2 rounded-pill"
              value={Formdata.country}
              placeholder=" "
              onChange={(e) => {
                setFormData({ ...Formdata, ["country"]: e.target.value })
              }}>
              <option value="">Country</option>
              {location.map(item => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='w-20 filterinput'>
            <input list="citys"
              name="city"
              className="form-control mb-2 rounded-pill"
              placeholder='Enter location'
              disabled={Formdata.country ? false : true}
              onChange={(e) => {
                const { name,value } = e.target;
                Citylist(value)
                setFormData({...Formdata, ["location"]: value });
              }}
            />
            <datalist id="citys">
              {cityList.map(item => (
                <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
              ))}
            </datalist>
          </div>
          {locations.pathname != '/bp/find_business' &&
          <div className='w-20 filterinput' style={{display:Formdata.filter_by == "1" ?"none":"block"}} >
            <select
              className='select-form mb-2 rounded-pill form-control'
              onChange={(e) => {
                var { value } = e.target;
                setFormData({ ...Formdata, ["user_type"]: value });
              }}
            >
              <option value="-1" key="">Type</option>
              <option value="0" key="">Buyer</option>
              <option value="2" key="">Seller</option>
            </select>
          </div>}
          <div className='w-20 filterinput'>
            <select className={`form-control inputcontrol rounded-pill mb-2 w-100`}
              id="exampleInputCountry"
              placeholder=" "
              onChange={(e) => {
                FetchApiData(e.target.value);
              }}
              // style={{ border: "0.1px solid black" }}
              aria-describedby="countryHelp">
              <option value="">Industry</option>
              {options && options.map((item) => (
                <option value={item._id}>{item.title}</option>
              ))}
            </select>
          </div>
          {/* <div className='w-20 filterinput'>
            <label htmlFor="accountNumber">Skills</label>
            <input
              type="text"
              className="form-control mb-2 rounded-pill"
              value={filterText}
              onChange={handleFilterChange}
            />
  
  {selectedItems.length != 0 &&
              <div className='py-1 px-2'>
                <label htmlFor="accountNumber">Selected items:</label>
  
                <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 2 }}>
                  {selectedItems.map((item, index) => (
                    <div  style={{background:'#592C92',color:'#fff',borderRadius:25}} className="d-flex card flex-row align-items-center my-1">
                      <li key={index} className=' px-2'
                        style={{ cursor: "pointer",fontSize:"12px" }}
                        onClick={() => handleCheckboxChange(item)} >{item}</li>
                      <span className='p-1' style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => handleCheckboxChange(item)}>
                        <strong>&times;</strong>
                      </span>
                    </div>
                  ))}
                </ul>
              </div>}
  
  
              <div className='card p-2'>
                <h5>Suggested</h5>
                <hr style={{marginBottom:"0%",marginTop:"0%"}} />
            <div
              className={`options ${true ? "d-flex" : "d-none"}`}
              style={{ maxHeight: "180px", overflowY: "scroll",flexWrap:"wrap" }}
            >
              {AllSkill.filter(
                (option) => !selectedItems.includes(option)
              ) // Exclude selected items
                .filter((option) => {
                  if (filterText && filterText.length === 2) {
                    const sanitizedFilterText = filterText.replace(
                      /\s/g,
                      ""
                    ); // Remove spaces from filterText
                    return option
                      .toLowerCase()
                      .includes(sanitizedFilterText.toLowerCase());
                  }
                  if (filterText && filterText.length > 2) {
                    return option
                      .toLowerCase()
                      .includes(filterText.toLowerCase());
                  }
                  return true;
                })
                .slice(0, 100)
                .map((optiontext, index) => (
                  <div key={index} className="option mx-1 px-1 py-1 my-1"
                    style={{ cursor: "pointer",fontSize:"12px" ,display:"flex",flexWrap:"wrap" }}
                    onClick={() => handleCheckboxChange(optiontext)}
                  >
                    <div className='d-flex justify-content-around p-2 ' style={{borderRadius:"20px",backgroundColor:"#e9ecef",width:"fit-content"}}>
                      {optiontext} 
                    <span>     
                      <i className="fa fa-plus" aria-hidden="true"  style={{ cursor: "pointer",marginLeft:'4px'}}></i></span>
                    </div>
                  </div>
                ))}
            </div>
            </div>
          </div> */}
          </div>
          <button className='btn btn-connect px-3 py-2 h-100 rounded-pill' onClick={() => HandleSubmit()}>Filter</button>
      </div>
      </>

    )
  }

  
  export default FilterColumn
