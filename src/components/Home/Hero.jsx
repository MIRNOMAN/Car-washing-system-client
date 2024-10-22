

const Hero = () => {
    const [currentSlider, setCurrentSlider] = useState(0);

    const sliders = [
        { img: "https://images.unsplash.com/photo-1628261536713-76846c247a37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { img: "https://plus.unsplash.com/premium_photo-1719306279910-b6e98a1cc513?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { img: "https://images.unsplash.com/photo-1468818461933-b1d79f62434e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { img: "https://images.unsplash.com/photo-1485321586038-4cc99992a06f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    ];


    const titles = [
        <h1 className=" font- md:text-left text-white">
            We offer the best rates in the market, ensuring you get the most value for your money with transparent pricing and no surprises.<br /> <span className="text-rose-600 text-2xl uppercase font-bold md:text-left  sm:text-5xl">Unbeatable Prices, No Hidden Fees</span>
        </h1>,
        <h1 className=" font- md:text-left text-white">
            Choose from a wide range of vehicles, from economy cars to luxury models, tailored to meet your specific needs and preferences. <br /> <span className="text-rose-600 text-2xl uppercase font-bold md:text-left  sm:text-5xl">Extensive Fleet Selection</span>
        </h1>,
        <h1 className=" font- md:text-left text-white">
            Our dedicated customer service team is available around the clock to assist you with any questions or issues, ensuring a smooth rental experience. <br /> <span className="text-rose-600 text-2xl uppercase font-bold md:text-left  sm:text-5xl">24/7 Customer Support</span>
        </h1>,
        <h1 className=" font- md:text-left text-white">
            We provide customizable rental options, whether you need a car for a few hours, days, or even weeks, giving you the flexibility to travel on your terms.<br /> <span className="text-rose-600 text-2xl uppercase font-bold md:text-left  sm:text-5xl">Flexible Rental Plans</span>
        </h1>,
        <h1 className=" font- md:text-left text-white">
            With numerous pickup and drop-off points across the country, renting a car has never been easier, no matter where your journey takes you.<br /> <span className="text-rose-600 text-2xl uppercase font-bold md:text-left  sm:text-5xl">Convenient Locations Nationwide</span>
        </h1>,
    ]

  return (
    <div>Hero</div>
  )
}

export default Hero