const asyncHandler = require("../middleware/asyncHandler");
const inquiryService = require("../services/inquiryService");

exports.create = asyncHandler(async (req, res) => {
  const inquiry = inquiryService.create(req.body);
  res.status(201).json({ success: true, inquiry });
});

exports.list = asyncHandler(async (req, res) => {
  res.json({ success: true, inquiries: inquiryService.list(req.user) });
});

exports.update = asyncHandler(async (req, res) => {
  const inquiry = inquiryService.updateStatus(req.params.id, req.body.status, req.user);
  if (!inquiry) {
    return res.status(404).json({ success: false, message: "Inquiry not found" });
  }
  res.json({ success: true, inquiry });
});
