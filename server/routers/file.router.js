const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  newFile,
  getFile,
  getAllFiles,
  deleteFile,
} = require("../controllers/file.controller");

const {
  newImage,
  getImg,
  getAllImages,
  deleteImg,
} = require("../controllers/image.controller");

router.use(fileUpload({}));


// GET FILE
router.get("/api/files/:id", async (req, res) => {
  getFile(req, res);
});

// GET ALL FILES
router.get("/api/files/", async (req, res) => {
  getAllFiles(req, res);
});

// DELETE FILE
router.delete("/api/files/:id", async (req, res) => {
  deleteFile(req, res);
});

// POST FILE
router.post("/api/files", async (req, res) => {
  newFile(req, res);
});

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
