import React from 'react';
import { TServiceResponse } from "../../types/response.services.type";
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: TServiceResponse;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

  return (
    <Link to={`/services/details/${service._id}`}>
    <div className="group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
        <p className="text-gray-600 mb-4 group-hover:text-white">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${service.price}</span>
          <span className="text-sm text-gray-500 group-hover:text-white">{service.duration} min</span>
        </div>
      </div>
      <div className="bg-blue-500 h-1 transition-transform duration-300 transform group-hover:scale-x-100" style={{ height: '4px' }}></div>
    </div>
    </Link>
  );
};

export default ServiceCard;
