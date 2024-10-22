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
  return (
    <div>FeaturedServices</div>
  )
}

export default FeaturedServices