const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    price: 850000,
    location: "Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    type: "villa",
    status: "3D Tour Ready",
    beds: 5,
    baths: 4,
    sqft: 4200,
    yearBuilt: 2020,
    lotSize: "0.5 acres",
    parkingSpaces: 3,
    experiences: ["3D", "AR", "VR"],
    description:
      "Walk this villa room by room before you visit. Explore the open living spaces, outdoor kitchen, and pool terrace in an interactive 3D environment, then preview furniture placement with AR.",
    features: [
      "Swimming Pool",
      "Smart Home System",
      "Gourmet Kitchen",
      "Home Theater",
      "Wine Cellar",
      "Outdoor Kitchen",
      "Fire Pit",
      "Three-Car Garage",
    ],
    agent: {
      name: "Jordan Hale",
      role: "Listing Specialist",
      phone: "+1 (555) 123-4567",
      email: "jordan@viresta.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
  },
  {
    id: 2,
    title: "Luxury Downtown Apartment",
    price: 1200000,
    location: "Manhattan, NY",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    type: "apartment",
    status: "VR Walkthrough",
    beds: 3,
    baths: 2,
    sqft: 2100,
    yearBuilt: 2019,
    lotSize: "Penthouse floor",
    parkingSpaces: 2,
    experiences: ["3D", "AR", "VR"],
    description:
      "A first-person walkthrough of a downtown penthouse. Move from the terrace to the living room, inspect finishes, and understand the layout without booking an on-site visit.",
    features: ["Doorman", "Private Terrace", "Floor-to-Ceiling Windows", "Gym Access", "Smart Lighting"],
    agent: {
      name: "Ava Chen",
      role: "City Listings Lead",
      phone: "+1 (555) 234-8901",
      email: "ava@viresta.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    },
  },
  {
    id: 3,
    title: "Waterfront Estate",
    price: 2100000,
    location: "Miami Beach, FL",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=800&q=80",
    ],
    type: "house",
    status: "AR Preview",
    beds: 6,
    baths: 5,
    sqft: 6100,
    yearBuilt: 2021,
    lotSize: "1.2 acres",
    parkingSpaces: 4,
    experiences: ["3D", "AR", "VR"],
    description:
      "Experience the scale of this waterfront estate remotely. Use the 3D model to move between wings, then place the home in your surroundings with AR to understand true size and orientation.",
    features: ["Waterfront", "Private Dock", "Wine Cellar", "Guest House", "Infinity Pool"],
    agent: {
      name: "Marcus Reid",
      role: "Estate Advisor",
      phone: "+1 (555) 345-6789",
      email: "marcus@viresta.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
  },
];

export function getProperties() {
  return properties;
}

export function getPropertyById(id) {
  return properties.find((property) => property.id === Number(id)) || properties[0];
}
