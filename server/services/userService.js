const { read, update } = require("../store/jsonStore");
const { hashPassword, verifyPassword } = require("../utils/password");
const { requireFields, requireEmail, requirePassword } = require("../utils/validate");

function publicUser(user) {
  const { password, ...safe } = user;
  return safe;
}

function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function findByEmail(email) {
  return read().users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function register({ name, email, password, role = "buyer" }) {
  requireFields({ name, email, password }, ["name", "email", "password"]);
  requireEmail(email);
  requirePassword(password);
  if (findByEmail(email)) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }
  const allowedRoles = ["buyer", "agent", "developer"];
  return publicUser(
    update((db) => {
      const user = {
        id: nextId(db.users),
        name,
        email: email.toLowerCase(),
        password: hashPassword(password),
        role: allowedRoles.includes(role) ? role : "buyer",
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      return user;
    })
  );
}

function login({ email, password }) {
  requireFields({ email, password }, ["email", "password"]);
  const user = findByEmail(email);
  if (!user || !verifyPassword(password, user.password)) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
  return publicUser(user);
}

function getById(id) {
  const user = read().users.find((item) => item.id === Number(id));
  return user ? publicUser(user) : null;
}

module.exports = { register, login, getById, publicUser };
