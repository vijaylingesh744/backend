import React from 'react'
import './style/whyus.css'
import spain from './flags/Spain.png'
import germany from './flags/germany.png'
import japan from './flags/Japan.png'
import turkey from './flags/turkey.png'
import UK from './flags/uk.png'
import US from './flags/usa.png'
import italy from './flags/italy.png'
import brazil from './flags/Brazil.png'
import ireland from './flags/Ireland.png'
import bangladesh from './flags/Bangladesh.png'
import bolivia from './flags/Bolivia.png'
import argentina from './flags/Argentina.png'
import algeria from './flags/algeria.png'
import chile from './flags/chile.png'
import jamaica from './flags/Flag_of_Jamaica.svg.png'
import kuwait from './flags/Flag_of_Kuwait.svg.png'
import ghana from './flags/Ghana.png'
import morocco from './flags/Flag_of_Morocco.svg.png'
import paraguay from './flags/Flag_of_Paraguay_(reverse).svg.png'
import netherland from './flags/Flag_of_the_Netherlands.svg.png'
import phillipines from './flags/philliphines.png'
import UAE from './flags/Flag_of_the_United_Arab_Emirates.svg.png'
import india from './flags/indian-flag.png'
import indonesia from './flags/indonesia.png'
import peru from './flags/peru.png'
import seirraleone from './flags/seirra leone.png'
import singapore from './flags/singapore.png'
import nigeria from './flags/nigeria.png'
import malaysia from './flags/malaysia.png'
import pakistan from './flags/pakistan.png'
import latvia from './flags/Lativa.png'
import newZealand from './flags/new Zealand.png'
import southafrica from './flags/south africa.png'
import srilanka from './flags/srilanka.png'
import kazakhstan from './flags/Flag_of_Kazakhstan.svg.png'
import mexico from './flags/Flag_of_Mexico.svg.png'
import { Fade } from 'react-reveal'

const WhyCS = () => {

  const country1 = 
  [
    {country:"India",url:india},
    {country:"Spain",url:spain},
    {country:"Japan",url:japan},
    {country:"Turkey",url: turkey},
    {country:"United Kingdom",url:UK},
    {country:"United States",url:US},
    {country:"Italy",url:italy},
    {country:"Brazil",url:brazil},
    {country:"Germany",url:germany},
    
  ]
  const country2=[
    {country:"Bangladesh",url:bangladesh},
    {country:"Bolivia",url:bolivia},
    {country:"Ireland",url:ireland},
    {country:"Argentina",url:argentina},
    {country:"Algeria",url:algeria},
    {country:"Chile",url:chile},
    {country:"Jamaica",url:jamaica},
    {country:"Kuwait",url:kuwait},
    {country:"Ghana",url:ghana},
    
  ]
  const country3 =[
    {country:"Morocco",url:morocco},
    {country:"Netherlands",url:netherland},
    {country:"Nigeria",url:nigeria},
    {country:"Pakistan",url:pakistan},
    {country:"Peru",url:peru},
    {country:"Philippines",url:phillipines},
    {country:"UAE",url:UAE},
    {country:"Indonesia",url:indonesia},
    {country:"Singapore",url:singapore},

  ]
  const country4 = [
    {country:"Latvia",url:latvia},
    {country:"Malaysia",url:malaysia},
    {country:"New Zealand",url:newZealand},
    {country:"South Africa",url:southafrica},
    {country:"Sri Lanka",url:srilanka},
    {country:"Seirra leone",url:seirraleone},
    {country:"Paraguay",url:paraguay},
    {country:"Kazakhstan",url:kazakhstan},
    {country:"Mexico",url:mexico},



  ]

  return (
    <div style={{width:'100%'}} className="container-fluid py-3 full-height-lg">
      <div className='d-flex justify-content-center'>
        <span className='text-center' style={{fontSize:'26px',fontWeight:600,color:'black'}}>We have established our presence in 36 countries and continue to expand.</span>
      </div>
      <div className='container-fluid mt-5'>
        <div className='d-flex column-gap-4 row-gap-3 justify-content-center flex-wrap'>
          {country1.map((item,index)=>(
            <div className='card bg-light px-4 py-2 align-items-center justify-content-around cardwidth'>
              <img src={item.url} width={75} className="rotate-on-hover"/>
              <span className="country-text" style={{fontSize:13,width:'max-content'}}>{item.country}</span>
            </div>
          ))}
        </div>
        <div className='d-flex column-gap-4 row-gap-3 justify-content-center mt-3 flex-wrap'>
          {country2.map((item)=>(
            <div className='card bg-light px-4 py-2 align-items-center justify-content-around cardwidth' >
              <img src={item.url} width={75} className="rotate-on-hover"/>
              <span className="country-text" style={{fontSize:13,width:'max-content'}}>{item.country}</span>
            </div>
          ))}
        </div>
        <div className='d-flex column-gap-4 row-gap-3 justify-content-center mt-3 flex-wrap'>
          {country3.map((item)=>(
            <div className='card bg-light px-4 py-2 align-items-center justify-content-around cardwidth' >
              <img src={item.url} width={75} className="rotate-on-hover"/>
              <span className="country-text" style={{fontSize:13,width:'max-content'}}>{item.country}</span>
            </div>
          ))}
        </div>
        <div className='d-flex column-gap-4 row-gap-3 justify-content-center mt-3 flex-wrap'>
          {country4.map((item)=>(
            <div className='card bg-light px-4 py-2 align-items-center justify-content-around cardwidth' >
              <img src={item.url} width={75} className="rotate-on-hover"/>
              <span className="country-text" style={{fontSize:13,width:'max-content'}}>{item.country}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyCS