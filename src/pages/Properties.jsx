import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties as fetchProperties } from "../api/client";
import { getProperties as localProperties } from "../data/properties";

function Properties() {
  const [properties, setProperties] = useState(localProperties());
  const [filters, setFilters] = useState({
    priceRange: "all",
    propertyType: "all",
    location: "",
    experience: "all",
    sortBy: "newest",
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
    if (filters.propertyType !== "all" && property.type !== filters.propertyType) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.experience !== "all" && !property.experiences.includes(filters.experience)) return false;
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (max && (property.price < min || property.price > max)) return false;
      if (!max && property.price < min) return false;
    }
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === "priceAsc") return a.price - b.price;
    if (filters.sortBy === "priceDesc") return b.price - a.price;
    if (filters.sortBy === "sizeDesc") return b.sqft - a.sqft;
    return 0;
  });

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Marketplace</p>
          <h1 className="text-2xl font-semibold">Properties</h1>
          <p className="text-sm text-zinc-500">{sortedProperties.length} digital listings ready to tour</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-ink-800 p-4 md:grid-cols-5">
        <select className="input" value={filters.priceRange} onChange={(e) => handleFilterChange("priceRange", e.target.value)}>
          <option value="all">All prices</option>
          <option value="0-500000">Under $500k</option>
          <option value="500000-1000000">$500k – $1M</option>
          <option value="1000000">Over $1M</option>
        </select>
        <select className="input" value={filters.propertyType} onChange={(e) => handleFilterChange("propertyType", e.target.value)}>
          <option value="all">All types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
        </select>
        <input
          className="input col-span-2 md:col-span-1"
          placeholder="City or area"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
        <select className="input" value={filters.experience} onChange={(e) => handleFilterChange("experience", e.target.value)}>
          <option value="all">All experiences</option>
          <option value="3D">3D</option>
          <option value="AR">AR</option>
          <option value="VR">VR</option>
        </select>
        <select className="input col-span-2 md:col-span-1" value={filters.sortBy} onChange={(e) => handleFilterChange("sortBy", e.target.value)}>
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: low</option>
          <option value="priceDesc">Price: high</option>
          <option value="sizeDesc">Largest</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {sortedProperties.map((property) => (
          <article key={property.id} className="card">
            <Link to={`/properties/${property.id}`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium">
                  {property.status}
                </div>
              </div>
              <div className="space-y-2 p-3">
                <h2 className="line-clamp-2 font-semibold leading-tight">{property.title}</h2>
                <p className="truncate text-xs text-zinc-500">{property.location}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-zinc-500">Listed</p>
                    <p className="font-semibold">${property.price.toLocaleString()}</p>
                  </div>
                  <p className="text-[11px] text-zinc-500">{property.beds} bd · {property.sqft.toLocaleString()} sf</p>
                </div>
              </div>
            </Link>
            <div className="flex gap-2 px-3 pb-3">
              <Link to={`/properties/${property.id}/3d`} className="btn flex-1 !py-1.5 text-xs">
                3D
              </Link>
              {property.experiences.includes("AR") && (
                <Link to={`/properties/${property.id}/ar`} className="btn-secondary flex-1 !py-1.5 text-xs">
                  AR
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Properties;
