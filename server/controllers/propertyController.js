const asyncHandler = require("../middleware/asyncHandler");
const propertyService = require("../services/propertyService");

exports.list = asyncHandler(async (req, res) => {
  res.json({ success: true, properties: propertyService.list(req.query) });
});

exports.getOne = asyncHandler(async (req, res) => {
  const property = propertyService.getById(req.params.id);
  if (!property) {
    return res.status(404).json({ success: false, message: "Property not found" });
  }
  res.json({ success: true, property });
});

exports.create = asyncHandler(async (req, res) => {
  const property = propertyService.create(req.body, req.user);
  res.status(201).json({ success: true, property });
});

function canManage(user, property) {
  return user.role === "admin" || property.agentId === user.id;
}

exports.update = asyncHandler(async (req, res) => {
  const existing = propertyService.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ success: false, message: "Property not found" });
  }
  if (!canManage(req.user, existing)) {
    return res.status(403).json({ success: false, message: "Not allowed" });
  }
  const property = propertyService.updateById(req.params.id, req.body);
  res.json({ success: true, property: propertyService.getById(property.id) });
});

exports.remove = asyncHandler(async (req, res) => {
  const existing = propertyService.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ success: false, message: "Property not found" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Not allowed" });
  }
  propertyService.remove(req.params.id);
  res.json({ success: true, message: "Property deleted" });
});
