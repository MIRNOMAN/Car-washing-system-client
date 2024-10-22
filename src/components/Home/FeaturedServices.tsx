import React, { useEffect, useRef } from 'react';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { useGetVehiclesQuery } from '../../redux/features/vehicle/vehicle.api';
import { TVehicleResponse } from '../../interface/response.vehicle.interface';
import LoadingSpinier from '../global/LoadingSpinier';
import { Link } from 'react-router-dom';


const FeaturedServices = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderInstanceRef = useRef<KeenSliderInstance | null>(null);
    const { isError, isLoading, data } = useGetVehiclesQuery(undefined);

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
    }, [data]);

  return (
    <div>FeaturedServices</div>
  )
}

export default FeaturedServices