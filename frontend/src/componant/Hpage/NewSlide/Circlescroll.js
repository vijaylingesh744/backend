import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import Box from "@mui/material/Box";
import SlideImg from "./Asset/Icon1.png";
import { Bounce } from "react-awesome-reveal";
import './Asset/style.css';
import './Asset/circle.css';

const Circlescroll = () => {
	const divElement = useRef(null);
	gsap.registerPlugin(ScrollTrigger);

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 1 });
			const animation = gsap.to(".photo:not(:first-child)", {
				opacity: 1, duration: 3, stagger: 3
			});
			ScrollTrigger.create({
				trigger: ".gallery",
				start: "top top",
				end: "bottom bottom",
				pin: ".rightblock",
				animation: animation,
				scrub: true,
				onUpdate: (self) => {
					const progress = self.progress;
					const imgRotation = -200 * progress;
					const imgmove = -600 * progress;
					const imgmove1 = -600 * progress;
					gsap.to(".rotating-img", { rotate: imgRotation });
					gsap.to(".clouding", { translateY: imgmove });
					gsap.to(".clouding1", { translateY: imgmove1 });
				}
			});
		});
		return () => ctx.revert();
	}, []);

	const [carouselDeg, setCarouselDeg] = useState(0);
	const [centerItem, setCenterItem] = useState(0);
	const [nextItem, setNextItem] = useState(1);
	const [prevItem, setPrevItem] = useState(5);
	const lastItem = 5;
	const carouseldiv = useRef(null);
	const carousel = [
		{ name: "Jone", id: 0, srcItem: "/assets/Circleimages/image1.png" },
		{ name: "Wong", id: 1, srcItem: "/assets/Circleimages/image2.png" },
		{ name: "Kaylem", id: 2, srcItem: "/assets/Circleimages/image3.png" },
		{ name: "Aila", id: 3, srcItem: "/assets/Circleimages/image4.png" },
		{ name: "Amin", id: 4, srcItem: "/assets/Circleimages/image5.png" },
		{ name: "Jannat", id: 5, srcItem: "/assets/Circleimages/image6.png" },
	];

	const prevNext = (itemId) => {
		if (itemId === lastItem) {
			setNextItem(0);
			setPrevItem(lastItem - 1);
		} else if (itemId === 0) {
			setPrevItem(lastItem);
			setNextItem(1);
		} else {
			setNextItem(itemId + 1);
			setPrevItem(itemId - 1);
		}
	};

	const getIdItems = (side) => {
		if (side) {
			setCenterItem(nextItem);
			prevNext(nextItem);
		} else {
			setCenterItem(prevItem);
			prevNext(prevItem);
		}
	};

	const next = () => {
		getIdItems(true);
		setCarouselDeg((prev) => prev - 16.5);
		setCurrentIndex((prev) => (prev + 1) % carousel.length);
	};

	const prev = () => {
		getIdItems(false);
		setCarouselDeg((prev) => prev + 16.5);
		setCurrentIndex((prev) => (prev - 1 + carousel.length) % carousel.length);
	};

	const getCssClass = (id) => {
		if (id === centerItem) {
			return "active";
		} else if (id === nextItem) {
			return "next";
		} else if (id === prevItem) {
			return "prev";
		}
	};

	const handleWheel = (e) => {
		const deltaY = e.deltaY;
		if (deltaY > 0) {
			next();
		} else if (deltaY < 0) {
			prev();
		}
	};

	useEffect(() => {
		const div = divElement.current;
		div.addEventListener('wheel', debounce(handleWheel, 200));

		return () => {
			div.removeEventListener('wheel', handleWheel);
		};
	}, []);

	const debounce = (func, delay) => {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	};

	const CheckRotate = (id) => {
		return id == 0 ? 346 : id == 1 ? 50 : id == 2 ? 113 : id == 3 ? 170 : id == 4 ? 228 : 284;
	};

	const StyleObject ={
		position: 'absolute',
    left: '120px'
	}
	return (
		<div ref={divElement}>
			<React.Fragment>
				<Box className="gallery" sx={{ display: "flex",height:'600vh'}}>
					{/* <Box className="left" sx={{
						width: "0%",
						height: '600vh'
					}}>
					</Box> */}
					<Box className="rightblock" sx={{
						width: "100%",
						height: "100vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}>
						<Box sx={{
							width: "100vw", height: "200vw", position: "relative",
							"& .photo": {
								position: "absolute", width: "100%", height: "100%",
								"& img": { height: "100%", width: "100%", }
							}
						}}>
							{Array(6).fill().map((item, index) => (
								<Box className="photo" key={index} sx={{ background: 'antiquewhite' }}>
									<div style={{ position: "absolute", left: "25%", top: "104px" }} className='my-4 row w-50'>
										<h1 className="font-weight-bold text-white">Lorum Heading {index + 1} </h1>
										<p style={{ borderBottom: "2px solid black" }} className="my-4"></p>
										<p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
										{currentIndex === index && (
											<Bounce triggerOnce={true}>
												<img src={SlideImg} />
											</Bounce>
										)}
									</div>
									<img src={`/assets/bgslide/bg${index + 1}.png`} alt="" />
								</Box>
							))}
						</Box>
						<div style={{ position: "absolute", left: -350 }}>
							<div ref={carouseldiv} className="App">
								<div className="test" />
								<div className="carousel" style={{ transform: `rotate(${carouselDeg}deg)` }}>
									{carousel.map((item, index) => (
										<div
											className={`item-carousel ${getCssClass(index)}`}
											key={item.id}
											id={item.id}
											style={{ transform: `rotate(${CheckRotate(item.id)}deg)` }}
										>
											{currentIndex+1 == item.id ?
											<img src={item.srcItem} style={{...StyleObject,width: "175px", height: "175px" }} />:
											<img src={item.srcItem} style={{ width: "175px", height: "175px" }} />

}
										</div>
									))}
								</div>
							</div>
						</div>
					</Box>
				</Box>
			</React.Fragment>
		</div>
	);
};

export default Circlescroll;
