import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiArrowRight, FiHome } from 'react-icons/fi';
import { getProperties as fetchProperties } from '../api/client';
import { getProperties as localProperties } from '../data/properties';

function Properties() {
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState(localProperties());
  const [filters, setFilters] = useState({
    priceRange: 'all',
    propertyType: 'all',
    location: '',
    experience: 'all',
    sortBy: 'newest'
  });

  useEffect(() => {
    const params = {
      type: filters.propertyType,
      location: filters.location,
      experience: filters.experience,
      sortBy: filters.sortBy,
    };
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-");
      params.minPrice = min;
      if (max) params.maxPrice = max;
    }
    fetchProperties(params)
      .then((data) => setProperties(data.properties || []))
      .catch(() => setProperties(localProperties()));
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProperties = properties.filter((property) => {
    if (filters.propertyType !== 'all' && property.type !== filters.propertyType) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.experience !== 'all' && !property.experiences.includes(filters.experience)) return false;

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (property.price < min || property.price > max)) return false;
      if (!max && property.price < min) return false;
    }

    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'sizeDesc':
        return b.sqft - a.sqft;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white shadow">
        <div className="container py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Properties to explore</h1>
              <p className="text-secondary-600 mt-1">Interactive 3D, AR, and VR listings</p>
            </div>
            <button
              className={`p-2 rounded-md ${showFilters ? 'bg-primary-100 text-primary-600' : 'hover:bg-secondary-100'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter size={20} />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white shadow-md border-t">
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Price range</label>
                <select className="input" value={filters.priceRange} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
                  <option value="all">All prices</option>
                  <option value="0-500000">Under $500,000</option>
                  <option value="500000-1000000">$500,000 – $1,000,000</option>
                  <option value="1000000">Over $1,000,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Property type</label>
                <select className="input" value={filters.propertyType} onChange={(e) => handleFilterChange('propertyType', e.target.value)}>
                  <option value="all">All types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Location</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Experience</label>
                <select className="input" value={filters.experience} onChange={(e) => handleFilterChange('experience', e.target.value)}>
                  <option value="all">All experiences</option>
                  <option value="3D">3D</option>
                  <option value="AR">AR</option>
                  <option value="VR">VR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Sort by</label>
                <select className="input" value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
                  <option value="newest">Newest first</option>
                  <option value="priceAsc">Price: low to high</option>
                  <option value="priceDesc">Price: high to low</option>
                  <option value="sizeDesc">Largest first</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/properties/${property.id}`}>
                <div className="relative h-48">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-primary-600 font-semibold">
                    {property.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-secondary-600 mb-4">{property.location}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-secondary-500">Listed at</p>
                      <p className="font-semibold">${property.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right text-sm text-secondary-600">
                      <p>{property.beds} bed · {property.baths} bath</p>
                      <p>{property.sqft.toLocaleString()} sqft</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.experiences.map((experience) => (
                      <span key={experience} className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                        {experience}
                      </span>
                    ))}
                  </div>

                  <div className="btn w-full flex items-center justify-center">
                    <FiHome className="mr-2" />
                    Open listing
                    <FiArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-6 space-y-2">
                <Link
                  to={`/properties/${property.id}/3d`}
                  className="btn w-full flex items-center justify-center"
                >
                  Open 3D tour
                </Link>
                {property.experiences.includes('AR') && (
                  <Link
                    to={`/properties/${property.id}/ar`}
                    className="btn-secondary w-full flex items-center justify-center"
                  >
                    AR Preview
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;
