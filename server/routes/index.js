const express = require("express");
const { requireAuth, requireRoles } = require("../middleware/auth");
const authController = require("../controllers/authController");
const propertyController = require("../controllers/propertyController");
const inquiryController = require("../controllers/inquiryController");
const postController = require("../controllers/postController");
const tourController = require("../controllers/tourController");

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.get("/auth/me", requireAuth, authController.me);

router.get("/properties", propertyController.list);
router.get("/properties/:id", propertyController.getOne);
router.post("/properties", requireAuth, requireRoles("agent", "developer", "admin"), propertyController.create);
router.put("/properties/:id", requireAuth, requireRoles("agent", "developer", "admin"), propertyController.update);
router.delete("/properties/:id", requireAuth, requireRoles("admin"), propertyController.remove);

router.post("/inquiries", inquiryController.create);
router.get("/inquiries", requireAuth, requireRoles("agent", "admin"), inquiryController.list);
router.put("/inquiries/:id", requireAuth, requireRoles("agent", "admin"), inquiryController.update);

router.get("/posts", postController.list);
router.get("/posts/:slug", postController.getOne);

router.post("/tours", tourController.record);
router.get("/analytics", requireAuth, requireRoles("admin"), tourController.summary);

module.exports = router;
