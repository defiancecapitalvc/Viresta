const { read, update } = require("../store/jsonStore");

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function withAgent(property) {
  const agent = read().users.find((user) => user.id === property.agentId);
  return {
    ...property,
    agent: agent
      ? {
          name: agent.name,
          role: agent.role === "agent" ? "Listing Specialist" : agent.role,
          phone: agent.phone || "",
          email: agent.email,
          image: agent.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        }
      : null,
  };
}

function list(query = {}) {
  let properties = read().properties.map(withAgent);

  if (query.type && query.type !== "all") {
    properties = properties.filter((property) => property.type === query.type);
  }
  if (query.location) {
    const location = query.location.toLowerCase();
    properties = properties.filter((property) => property.location.toLowerCase().includes(location));
  }
  if (query.experience && query.experience !== "all") {
    properties = properties.filter((property) => property.experiences.includes(query.experience));
  }
  if (query.minPrice) {
    properties = properties.filter((property) => property.price >= Number(query.minPrice));
  }
  if (query.maxPrice) {
    properties = properties.filter((property) => property.price <= Number(query.maxPrice));
  }

  const sortBy = query.sortBy || "newest";
  properties.sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "sizeDesc") return b.sqft - a.sqft;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return properties;
}

function getById(id) {
  const property = read().properties.find((item) => item.id === Number(id));
  return property ? withAgent(property) : null;
}

function create(payload, user) {
  if (!payload.title || !payload.price || !payload.location) {
    const error = new Error("Title, price, and location are required");
    error.statusCode = 400;
    throw error;
  }
  return withAgent(
    update((db) => {
      const property = {
        id: nextId(db.properties),
        title: payload.title,
        price: Number(payload.price),
        location: payload.location,
        image: payload.image || payload.images?.[0] || "",
        images: payload.images || [],
        type: payload.type || "house",
        status: payload.status || "3D Tour Ready",
        beds: Number(payload.beds) || 0,
        baths: Number(payload.baths) || 0,
        sqft: Number(payload.sqft) || 0,
        yearBuilt: Number(payload.yearBuilt) || new Date().getFullYear(),
        lotSize: payload.lotSize || "",
        parkingSpaces: Number(payload.parkingSpaces) || 0,
        experiences: payload.experiences || ["3D"],
        description: payload.description || "",
        features: payload.features || [],
        agentId: user.id,
        createdAt: new Date().toISOString(),
      };
      db.properties.push(property);
      return property;
    })
  );
}

const EDITABLE_FIELDS = [
  "title",
  "price",
  "location",
  "image",
  "images",
  "type",
  "status",
  "beds",
  "baths",
  "sqft",
  "yearBuilt",
  "lotSize",
  "parkingSpaces",
  "experiences",
  "description",
  "features",
];

function updateById(id, payload) {
  return update((db) => {
    const index = db.properties.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    const next = { ...db.properties[index] };
    EDITABLE_FIELDS.forEach((field) => {
      if (payload[field] !== undefined) {
        next[field] = payload[field];
      }
    });
    if (payload.price !== undefined) next.price = Number(payload.price);
    if (payload.beds !== undefined) next.beds = Number(payload.beds);
    if (payload.baths !== undefined) next.baths = Number(payload.baths);
    if (payload.sqft !== undefined) next.sqft = Number(payload.sqft);
    if (payload.yearBuilt !== undefined) next.yearBuilt = Number(payload.yearBuilt);
    if (payload.parkingSpaces !== undefined) next.parkingSpaces = Number(payload.parkingSpaces);
    if (payload.images) next.image = payload.image || payload.images[0] || next.image;
    db.properties[index] = next;
    return next;
  });
}

function remove(id) {
  return update((db) => {
    const index = db.properties.findIndex((item) => item.id === Number(id));
    if (index === -1) return false;
    db.properties.splice(index, 1);
    return true;
  });
}

module.exports = { list, getById, create, updateById, remove };
