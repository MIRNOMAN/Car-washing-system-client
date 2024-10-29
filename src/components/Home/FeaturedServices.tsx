import fImg1 from "../../assets/feature/f1.jpg";
import fImg2 from "../../assets/feature/f2.jpg";
import fImg3 from "../../assets/feature/f3.jpg";
import fImg4 from "../../assets/feature/f4.jpg";
import fImg5 from "../../assets/feature/f5.jpg";
import fImg6 from "../../assets/feature/f6.jpg";
import  { useEffect, useRef } from 'react';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';


const featuredServices = [
    {
      name: "Premium Car Wash",
      description: "Get your car sparkling clean with our premium wash service.",
      image: fImg1,
      price: 30,
      duration: 45, // duration in minutes
    },
    {
      name: "Interior Detailing",
      description:
        "Deep cleaning of your car’s interior for a fresh and clean look.",
      image: fImg2,
      price: 50,
      duration: 60,
    },
    {
      name: "Express Wash",
      description: "Quick and thorough wash for those on the go.",
      image: fImg3,
      price: 15,
      duration: 20,
    },
    {
      name: "Tire & Wheel Cleaning",
      description:
        "Specialized cleaning for tires and wheels to make them shine.",
      image: fImg4,
      price: 20,
      duration: 30,
    },
    {
      name: "Full Service Detailing",
      description:
        "Comprehensive detailing service covering both interior and exterior.",
      image: fImg5,
      price: 100,
      duration: 120,
    },
    {
      name: "Engine Cleaning",
      description:
        "Thorough cleaning of your car’s engine for better performance.",
      image: fImg6,
      price: 70,
      duration: 75,
    },
  ];
  

const FeaturedServices = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderInstanceRef = useRef<KeenSliderInstance | null>(null);


    useEffect(() => {
        if (sliderRef.current) {
            sliderInstanceRef.current = new KeenSlider(
                sliderRef.current,
                {
                    loop: true,
                    slides: {
                        origin: 'center',
                        perView: 1.25,
                        spacing: 16,
                    },
                    breakpoints: {
                        '(min-width: 1024px)': {
                            slides: {
                                origin: 'auto',
                                perView: 1.5,
                                spacing: 32,
                            },
                        },
                    },
                },
                []
            );
        }

        return () => {
            sliderInstanceRef.current?.destroy();
        };
    }, []);

    const handlePrev = () => {
        sliderInstanceRef.current?.prev();
    };

    const handleNext = () => {
        sliderInstanceRef.current?.next();
    };


  return (
    <section className="">
            <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Experience a Sparkling Clean Ride
                     </h2>
                     <p className="mt-4 text-gray-700">
                     Keep your vehicle shining like new with our premium car washing services, designed for those who appreciate quality and care.
                    </p>

                        <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                            <button
                                aria-label="Previous slide"
                                onClick={handlePrev}
                                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 rtl:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <button
                                aria-label="Next slide"
                                onClick={handleNext}
                                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                            >
                                <svg
                                    className="size-5 rtl:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 5l7 7-7 7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div data-aos='fade-left' className="-mx-6 lg:col-span-2 lg:mx-0">
                        <div ref={sliderRef} className="keen-slider">

                            {featuredServices?.slice(2, 5).map((service, indx: number) => {
                                return (
                                    <Link to={`/services/details/${service?._id}`} key={service._id}>
                                        <div key={indx} className="keen-slider__slide">
                                            <blockquote
                                                className="flex h-full flex-col justify-between shadow-sm"
                                            >
                                                    <div  className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                        {/* Image */}
                                                        <div>
                                                            <img className="rounded-t-lg w-full h-48 object-cover" src={service.image} alt={service?.name} />
                                                        </div>

                                                        {/* Popularity Tag */}
                                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                                            Popular
                                                        </span>

                                                        {/* Description */}
                                                        <div className="p-5 bg-rose-600 text-white">
                                                            <p className="md:block hidden">{service?.description.slice(0, 100)}...</p>
                                                            <p className="md:hidden">{service?.description.slice(0, 50)}...</p>
                                                        </div>
                                                        </div>
                                            </blockquote>
                                        </div>

                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default FeaturedServices