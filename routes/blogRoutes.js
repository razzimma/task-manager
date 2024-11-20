const router = require("express").Router();
const { Router } = require("express");
const blogController = require("../controllers/blogcontroller")

router.get("/getblog", blogController.getAllBlog)
router.post("/addblog", blogController.addBlog)


module.exports = router;