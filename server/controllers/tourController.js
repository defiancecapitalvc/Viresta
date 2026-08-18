const asyncHandler = require("../middleware/asyncHandler");
const tourService = require("../services/tourService");

exports.record = asyncHandler(async (req, res) => {
  const session = tourService.record(req.body);
  res.status(201).json({ success: true, session });
});

exports.summary = asyncHandler(async (_req, res) => {
  res.json({ success: true, analytics: tourService.summary() });
});
