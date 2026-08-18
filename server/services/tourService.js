const { read, update } = require("../store/jsonStore");
const propertyService = require("./propertyService");

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function record({ propertyId, experience = "3D", durationSeconds = 0 }) {
  const property = propertyService.getById(propertyId);
  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }
  return update((db) => {
    const session = {
      id: nextId(db.tours),
      propertyId: property.id,
      experience,
      durationSeconds: Number(durationSeconds) || 0,
      createdAt: new Date().toISOString(),
    };
    db.tours.push(session);
    return session;
  });
}

function summary() {
  const db = read();
  const byExperience = db.tours.reduce((acc, tour) => {
    acc[tour.experience] = (acc[tour.experience] || 0) + 1;
    return acc;
  }, {});
  return {
    properties: db.properties.length,
    inquiries: db.inquiries.length,
    tourSessions: db.tours.length,
    byExperience,
  };
}

module.exports = { record, summary };
