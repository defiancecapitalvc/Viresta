const asyncHandler = require("../middleware/asyncHandler");
const userService = require("../services/userService");
const { signToken } = require("../utils/token");
const { cookieDays } = require("../config/env");

function sendAuth(res, user, statusCode = 200) {
  const token = signToken({ id: user.id, role: user.role });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: cookieDays * 24 * 60 * 60 * 1000,
    })
    .json({ success: true, user, token });
}

exports.register = asyncHandler(async (req, res) => {
  const user = userService.register(req.body);
  sendAuth(res, user, 201);
});

exports.login = asyncHandler(async (req, res) => {
  const user = userService.login(req.body);
  sendAuth(res, user);
});

exports.logout = asyncHandler(async (_req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 0 }).json({ success: true, message: "Signed out" });
});

exports.me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});
