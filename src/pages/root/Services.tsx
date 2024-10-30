/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

import { useGetAllServicesQuery } from "../../redux/features/services/services.api";
import { maxDurationOptions, minDurationOptions, sortOptions } from "../../utils/list.utils";
import { TService } from "../../types/redux.type";

const { Option } = Select;

const Services = () => {
  const [searchValues, setSearchValues] = useState({
    keyword: "",
    sort: "asc",
    minDuration: "",
    maxDuration: "",
  });

  const { data, isLoading } = useGetAllServicesQuery(searchValues);
  const [filteredServices, setFilteredServices] = useState<TService[]>([]);

  useEffect(() => {
    if (data) {
      let filtered = [...data.data];

      // Apply keyword search
      if (searchValues.keyword) {
        filtered = filtered.filter(service => 
          service.name.toLowerCase().includes(searchValues.keyword.toLowerCase()) ||
          service.description.toLowerCase().includes(searchValues.keyword.toLowerCase())
        );
      }

      // Apply duration filters
      if (searchValues.minDuration) {
        filtered = filtered.filter(service => service.duration >= Number(searchValues.minDuration));
      }

      if (searchValues.maxDuration) {
        filtered = filtered.filter(service => service.duration <= Number(searchValues.maxDuration));
      }

      // Apply sorting
      if (searchValues.sort) {
        filtered.sort((a, b) => 
          searchValues.sort === "asc" ? a.price - b.price : b.price - a.price
        );
      }

      setFilteredServices(filtered);
    }
  }, [data, searchValues]);

  const handleSortChange = (value: string) => {
    setSearchValues(prev => ({ ...prev, sort: value }));
  };

  const handleMinDurationChange = (value: string) => {
    setSearchValues(prev => ({ ...prev, minDuration: value }));
  };

  const handleMaxDurationChange = (value: string) => {
    setSearchValues(prev => ({ ...prev, maxDuration: value }));
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(prev => ({ ...prev, keyword: e.target.value }));
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="container">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800">What We Offer</h2>
        <p className="mt-2 text-gray-600">
          Delivering quality services across a wide range of specialties
        </p>
      </div>
      <div className="flex gap-4 mb-4">
        <Form.Item label="Sort by price">
          <Select 
            placeholder="Sort by price" 
            style={{ width: 150 }} 
            onChange={handleSortChange}
          >
            {sortOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Min Duration">
          <Select 
            placeholder="Minimum duration" 
            style={{ width: 150 }} 
            onChange={handleMinDurationChange}
          >
            {minDurationOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Max Duration">
          <Select 
            placeholder="Maximum duration" 
            style={{ width: 150 }} 
            onChange={handleMaxDurationChange}
          >
            {maxDurationOptions.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Search">
          <Input 
            placeholder="Query" 
            style={{ width: 200 }} 
            onChange={handleKeywordChange}
          />
        </Form.Item>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
        {filteredServices.map((item: TService) => (
          <div key={item?._id} className="bg-primary-foreground/5 p-5 rounded-md">
            <h3 className="text-xl font-semibold mb-2">{item?.name}</h3>
            <p className="">{item?.description.slice(0, 50)}...</p>
            <div className="flex gap-x-5 w-full mt-2">
              <p className="font-medium">Duration: {item?.duration}</p>
              <p className="font-medium flex items-center">
                Price: {item?.price} <BsCurrencyDollar />
              </p>
            </div>
            <div className="flex justify-between">
              <Link
                to={`/service-details/${item?._id}`}
                className="flex flex-row items-center text-primary-foreground font-semibold rounded w-[180px] mt-2"
              >
                Learn more <MdOutlineDoubleArrow className="mt-1 ms-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
