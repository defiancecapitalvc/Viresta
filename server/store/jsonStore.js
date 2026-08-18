const fs = require("fs");
const path = require("path");
const { seedDatabase } = require("./seed");

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "db.json");

function ensureDatabase() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seedDatabase(), null, 2));
  }
}

function read() {
  ensureDatabase();
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function write(db) {
  ensureDatabase();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function update(mutator) {
  const db = read();
  const result = mutator(db);
  write(db);
  return result;
}

module.exports = { read, write, update, ensureDatabase };
