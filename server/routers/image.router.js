const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  newImage,
  getImg,
  getAllImages,
  deleteImg,
} = require("../controllers/image.controller");

router.use(fileUpload({}));

// GET IMAGE
router.get("/api/images/:id", async (req, res) => {
  getImg(req, res);
});

// GET ALL IMAGE
router.get("/api/images/", async (req, res) => {
  getAllImages(req, res);
});

// DELETE IMAGE
router.delete("/api/images/:id", async (req, res) => {
  deleteImg(req, res);
});

// POST IMAGE
router.post("/api/images", async (req, res) => {
  newImage(req, res);
});

module.exports = router;
