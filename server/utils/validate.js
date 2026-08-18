const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function requireFields(body, fields) {
  const missing = fields.filter((field) => !String(body?.[field] || "").trim());
  if (missing.length) {
    fail(`${missing.join(", ")} required`);
  }
}

function requireEmail(email) {
  if (!EMAIL.test(String(email || "").trim())) {
    fail("A valid email is required");
  }
}

function requirePassword(password) {
  if (!password || String(password).length < 8) {
    fail("Password must be at least 8 characters");
  }
}

module.exports = { fail, requireFields, requireEmail, requirePassword };
