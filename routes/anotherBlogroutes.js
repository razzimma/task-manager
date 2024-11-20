const router = require("express").Router();
const { Router } = require("express");
const blogController = require("../controllers/anotherblogcontroller")

router.get("/getblog", blogController.getAllBlog)
router.post("/addblog", blogController.addBlog)
router.delete("/deleteblog/:id", blogController.deleteBlog)


module.exports = router;