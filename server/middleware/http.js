const { clientOrigin } = require("../config/env");

function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", clientOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
}

function cookies(req, _res, next) {
  req.cookies = {};
  const header = req.headers.cookie || "";
  header.split(";").forEach((part) => {
    const [key, ...rest] = part.trim().split("=");
    if (key) {
      req.cookies[key] = decodeURIComponent(rest.join("="));
    }
  });
  next();
}

module.exports = { cors, cookies };
