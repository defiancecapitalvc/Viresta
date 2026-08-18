const express = require("express");
const { cors, cookies } = require("./middleware/http");
const { ensureDatabase } = require("./store/jsonStore");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

ensureDatabase();

const app = express();

app.use(cors);
app.use(express.json({ limit: "1mb" }));
app.use(cookies);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, service: "viresta-api" });
});

app.use("/api", routes);
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: `No route for ${req.method} ${req.originalUrl}` });
});
app.use(errorHandler);

module.exports = app;
