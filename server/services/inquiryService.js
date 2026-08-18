const { read, update } = require("../store/jsonStore");
const propertyService = require("./propertyService");
const { requireFields, requireEmail, fail } = require("../utils/validate");

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function create({ propertyId, name, email, phone, message, type = "walkthrough" }) {
  requireFields({ name, email, message }, ["name", "email", "message"]);
  requireEmail(email);
  const property = propertyId ? propertyService.getById(propertyId) : null;
  return update((db) => {
    const inquiry = {
      id: nextId(db.inquiries),
      propertyId: property ? property.id : null,
      propertyTitle: property ? property.title : null,
      name,
      email,
      phone: phone || "",
      message,
      type,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    db.inquiries.push(inquiry);
    return inquiry;
  });
}

function list(user) {
  const db = read();
  let inquiries = [...db.inquiries];
  if (user && user.role === "agent") {
    const ownedIds = db.properties.filter((property) => property.agentId === user.id).map((property) => property.id);
    inquiries = inquiries.filter((inquiry) => ownedIds.includes(inquiry.propertyId));
  }
  return inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function updateStatus(id, status, user) {
  const allowed = ["new", "contacted", "closed"];
  if (!allowed.includes(status)) {
    fail("Status must be new, contacted, or closed");
  }

  const db = read();
  const inquiry = db.inquiries.find((item) => item.id === Number(id));
  if (!inquiry) return null;

  if (user.role === "agent") {
    const property = db.properties.find((item) => item.id === inquiry.propertyId);
    if (property && property.agentId !== user.id) {
      fail("Not allowed", 403);
    }
  }

  return update((state) => {
    const item = state.inquiries.find((entry) => entry.id === Number(id));
    item.status = status;
    item.updatedAt = new Date().toISOString();
    return item;
  });
}

module.exports = { create, list, updateStatus };
