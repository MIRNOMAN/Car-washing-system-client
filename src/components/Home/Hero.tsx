import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Hero = () => {
    const [currentSlider, setCurrentSlider] = useState(0);

    const sliders = [
        { img: "https://i.ibb.co.com/TKCgZG5/car-wash-detailing-station.jpg" },
        { img: "https://i.ibb.co.com/kcgvwLP/car-wash-detailing-station-1.jpg" },
        { img: "https://i.ibb.co.com/D8HpLqF/man-washing-his-car-garage.jpg" },
        { img: "https://i.ibb.co.com/nb4bkWH/car-wash-detailing-station-2.jpg" },
        { img: "https://i.ibb.co.com/jgM1T41/professional-washer-blue-uniform-washing-luxury-car-with-water-gun-open-air-car-wash.jpg" },
    ];


    const carWashTitles = [
        <h1 className="font- md:text-left text-white">
            Experience top-tier car wash services that ensure your vehicle shines like new, all at unbeatable prices.<br /> 
            <span className="text-rose-600 text-2xl uppercase font-bold md:text-left sm:text-5xl">Affordable, High-Quality Car Wash</span>
        </h1>,
        <h1 className="font- md:text-left text-white">
            From basic wash to full detailing, we offer a range of services designed to meet your specific needs.<br /> 
            <span className="text-rose-600 text-2xl uppercase font-bold md:text-left sm:text-5xl">Comprehensive Service Options</span>
        </h1>,
        <h1 className="font- md:text-left text-white">
            Our expert team uses advanced cleaning techniques to give your car a spotless finish every time.<br /> 
            <span className="text-rose-600 text-2xl uppercase font-bold md:text-left sm:text-5xl">Expert Care, Every Wash</span>
        </h1>,
        <h1 className="font- md:text-left text-white">
            Choose from our flexible packages, whether you need a quick wash or a deep clean, all customized for you.<br /> 
            <span className="text-rose-600 text-2xl uppercase font-bold md:text-left sm:text-5xl">Flexible Packages for Every Need</span>
        </h1>,
        <h1 className="font- md:text-left text-white">
            With convenient locations across the city, getting your car cleaned has never been easier.<br /> 
            <span className="text-rose-600 text-2xl uppercase font-bold md:text-left sm:text-5xl">Convenient Locations for You</span>
        </h1>,
    ];
      useEffect(() => {
        const intervalId = setInterval(() => setCurrentSlider(currentSlider === sliders.length - 1 ? 0 : currentSlider + 1), 3000);
        return () => clearInterval(intervalId);
    }, [currentSlider, sliders.length]);

  return (
    <>
            <div className="w-full h-96 sm:h-96 md:h-screen flex flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-center before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear"
                style={{ backgroundImage: `url(${sliders[currentSlider].img})` }}>
                {/* text container here */}

                <div className="drop-shadow-lg text-white text-center w-full">

                    <div className="relative flex justify-between mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8" >
                        <div className="max-w-3xl Oswald text-center ltr:sm:text-left rtl:sm:text-right">
                            {carWashTitles[currentSlider]}
                            <p className="mt-4 Montserrat max-w-lg text-white md:text-left sm:text-xl/relaxed">
                             Keep your car spotless with ShinePro Wash—offering affordable, top-quality car wash services. Enjoy flexible packages, fast service, and convenient locations. Drive clean and shine every time!
                             </p>


                            <div className="mt-8 flex flex-wrap gap-4 text-center !justify-start md:justify-center">

                                <Link to={`/services`} className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                                    Book Now
                                </Link>
                            </div>
                        </div>

                        {/* filter */}
                        {/* <HeroFilter /> */}
                    </div>
                </div>
            </div>
        </>
  )
}

export default Hero