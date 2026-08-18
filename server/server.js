const { port } = require("./config/env");
const app = require("./app");

const server = app.listen(port, () => {
  console.log(`Viresta API running on ${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${port} is already in use. The API is already running.`);
    return;
  }
  throw err;
});
