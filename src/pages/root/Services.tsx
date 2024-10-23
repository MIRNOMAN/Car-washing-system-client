import { Select } from "antd";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import { FormEvent, useState } from "react";
import { TServiceResponse } from "../../types/response.services.type";
import { useGetServicesQuery } from "../../redux/features/services/services.api";
import ServiceCard from "../../components/Card/ServiceCard";

const Services = () => {
  const [priceRange, setPriceRange] = useState<number[]>([10, 500]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("ascending");
  const { data: product, error, isLoading } = useGetServicesQuery({});
  const services: TServiceResponse[] = product?.data || [];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPriceRange((prev) =>
      name === "min" ? [Number(value), prev[1]] : [prev[0], Number(value)]
    );
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // handle search logic if needed
  };

  const handleClearFilters = () => {
    setPriceRange([0, 100]);
    setSearchQuery("");
    setSortOrder("ascending");
  };

  // Filter services based on selected filters
  const filteredServices = services.filter((service: TServiceResponse) => {
    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];

    // Normalize both searchQuery and service name by removing spaces
    const normalizedSearchQuery = searchQuery.replace(/\s+/g, "").toLowerCase();
    const normalizedServiceName = service.name
      .replace(/\s+/g, "")
      .toLowerCase();

    const matchesSearch = normalizedServiceName.includes(normalizedSearchQuery);

    return matchesPrice && matchesSearch;
  });

  // Sort services based on price
  const sortedServices = filteredServices.sort((a: TServiceResponse, b: TServiceResponse) => {
    return sortOrder === "ascending" ? a.price - b.price : b.price - a.price;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <Navbar />
      <div data-aos='fade-left' className="min-h-screen m-5 md:m-10">
        <div className="">
          <div className="md:flex hidden justify-between items-center">

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-5">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                placeholder="Search..."
                className="py-1 px-3 border rounded-l-md"
                required
              />
              <button type="submit" className="py-1 px-3 border border-rose-600 bg-rose-600 text-white rounded-r-md">
                Search
              </button>
            </form>

            <div className="flex justify-between flex-wrap mb-5">
              <div className="mr-2">
                <Select
                  id="price"
                  showSearch
                  placeholder='Sort Price'
                  optionFilterProp="label"
                  options={[
                    { value: 'asc', label: 'Low To High' },
                    { value: 'desc', label: 'High To Low' },
                  ]}
                  aria-label="Price"
                  onChange={setSortOrder}
                />
              </div>

              <div className="flex ml-3">
                <div className="flex justify-center items-center border rounded-md px-2">
                  <p className="mr-1 text-gray-400 font-thin">Min Price $:</p>
                  <input
                    onChange={handlePriceChange}
                    name="min"
                    className="rounded-md w-16"
                    type="number"
                  />
                </div>
              </div>

              <div className="flex ml-3">
                <div className="flex justify-center items-center border rounded-md px-2">
                  <p className="mr-1 text-gray-400 font-thin">Max Price $:</p>
                  <input
                    onChange={handlePriceChange}
                    name="max"
                    className="rounded-md w-16"
                    type="number"
                  />
                </div>
              </div>

              <button className="px-2 py-1 bg-rose-600 text-white ml-3 rounded-md" onClick={handleClearFilters}>
                Clear
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {sortedServices.map((service, indx) => (
              <ServiceCard key={indx} service={service} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Services;
