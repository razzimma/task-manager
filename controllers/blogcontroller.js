const {Blogmodel} = require("../models");

const getAllBlog = async(req, res)=>{
    try {
        const data = await Blogmodel.findAll();
        res.status(200).send({
            message: "All Blog items Retrieved Successfully",
            blog: data,
        })
    } catch (error) {
        res.status(405).send(error.message)
    }
}

const addBlog = async (req, res)=>{
    const { title, content, image} = req.body;
    try {
        if(!title){
            throw new Error("Title must be provided")
        }
        if(!content){
            throw new Error("Content must be provided")
        }
        if(!image){
            throw new Error("Image must be provided")
        }
        const data = await Blogmodel.create({
            title:title,
            content:content,
            image:image,
        })
        res.status(200).send("Product added Successfully")
    } catch (error) {
        res.status(405).send(error.message)
    } 

    const deleteBlog = async(req,res)=>{
        const {id} = req.params
        try {
            if(!id){
                throw new Error("ID Required")
            }
            const exists = await Blogmodel.findOne({where: {id}})
            if(!exists){
                throw new Error("Couldn't find Blog")
            }
            await Blogmodel.destroy({where: id})
            res.status(200).send("Deleted successfully")
        } catch (error) {
            res.status(405).send(error.message)
        }
    }
}

module.exports = {
    getAllBlog,
    addBlog,
    deleteBlog,
}