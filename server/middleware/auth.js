const { verifyToken } = require("../utils/token");
const { read } = require("../store/jsonStore");

function getToken(req) {
  if (req.cookies && req.cookies.token) return req.cookies.token;
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7);
  return null;
}

function publicUser(user) {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
}

exports.optionalAuth = (req, _res, next) => {
  try {
    const token = getToken(req);
    if (token) {
      const payload = verifyToken(token);
      req.user = publicUser(read().users.find((user) => user.id === payload.id));
    }
  } catch (_error) {
    req.user = null;
  }
  next();
};

exports.requireAuth = (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ success: false, message: "Please sign in" });
    }
    const payload = verifyToken(token);
    const user = read().users.find((item) => item.id === payload.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Account not found" });
    }
    req.user = publicUser(user);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

exports.requireRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Not allowed" });
  }
  next();
};
