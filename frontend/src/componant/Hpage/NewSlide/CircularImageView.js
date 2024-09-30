import React,{useState,useEffect, useRef} from 'react'
import "./Asset/circle.css"
const CircularImageView = ({CircleProps}) => {


  const {
    carouseldiv,
    next,
    prev,
    carouselDeg,
    carousel,
    getCssClass,
  } = CircleProps
  // const [carouselDeg, setCarouselDeg] = useState(0);
  // const [itemDeg, setItemDeg] = useState(0);
  // const [centerItem, setCenterItem] = useState(0);
  // const [prevItem, setPrevItem] = useState(5);
  // const [lastItem] = useState(5);
  // const [nextItem, setNextItem] = useState(1);
  //   const carouseldiv = useRef(null)
  // const [carousel] = useState([
  //   { name: "Jone", id: 0, position: 1,srcItem:"/assets/Circleimages/image1.png" },
  //   { name: "Wong", id: 1, position: 2,srcItem:"/assets/Circleimages/image2.png" },
  //   { name: "Kaylem", id: 2, position: 3,srcItem:"/assets/Circleimages/image3.png" },
  //   { name: "Aila", id: 3, position: 4,srcItem:"/assets/Circleimages/image4.png" },
  //   { name: "Amin", id: 4, position: 5,srcItem:"/assets/Circleimages/image5.png" },
  //   { name: "Jannat", id: 5, position: 6,srcItem:"/assets/Circleimages/image6.png" },
  //   // { name: "Rohaan", id: 6, position: 7,src:"" },
  //   // { name: "Malaki", id: 7, position: 8,src:"" },
  //   // { name: "Kade", id: 8, position: 9,src:"" },
  //   // { name: "Alex", id: 9, position: 10 }
  // ]);

  // const prevNext = (itemId) => {
  //   if (itemId === lastItem) {
  //     setNextItem(0);
  //     setPrevItem(lastItem - 1);
  //   } else if (itemId === 0) {
  //     setPrevItem(lastItem);
  //     setNextItem(1);
  //   } else {
  //     setNextItem(centerItem + 1);
  //     setPrevItem(centerItem - 1);
  //   }
  // };

  // const getIdItems = (side) => {
  //   if (side) {
  //     setCenterItem(nextItem);
  //     prevNext(nextItem);
  //   } else {
  //     setCenterItem(prevItem);
  //     prevNext(prevItem);
  //   }
  // };

  // const next = () => {
  //   getIdItems(true);
  //   setCarouselDeg((prev) => prev - 60);
  //   setItemDeg((prev) => prev + 60);
  // };

  // const prev = () => {
  //   getIdItems(false);
  //   setCarouselDeg((prev) => prev + 60);
  //   setItemDeg((prev) => prev - 60);
  // };

  // const getCssClass = (id) => {
  //   if (id === centerItem) {
  //     return "active";
  //   } else if (id === nextItem) {
  //     return "next";
  //   } else if (id === prevItem) {
  //     return "prev";
  //   }
  // };

  // useEffect(()=>{
  //   const handleWheel = () =>{
  //     next()
  //   };
  //   const div = carouseldiv.current

  //   div.addEventListener('wheel',debounce(handleWheel,200))

  //   return () =>{
  //     div.removeEventListener('wheel',handleWheel)
  //   }
  // },[])
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };

  return (
    <div ref={carouseldiv} className="App">
    {/* <div className="App"> */}
      {/* <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button> */}
      <div className="test" />
      <div
        className="carousel"
        style={{ transform: `rotate(${carouselDeg}deg)` }}
      >
        {carousel.map((item, index) => (
          <div
            className={`item-carousel ${getCssClass(index)}`}
            key={item.id}
            id={item.id}
            // style={{ transform: `rotate(${itemDeg}deg)` }}
          >
          
            <img src={item.srcItem}  style={{width:"100px",height:"100px"}}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CircularImageView
