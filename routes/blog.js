const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
bodyParser = require("body-parser");



// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });


// INDEX --> show all the blogs in the list
router.get("/blogs",(req,res)=>{
    // get all the blogs from the DB
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }else{
             res.render("blog/index",{blogs:blogs});
        }
    });
});


// CREATE --> add new blog to the list
router.post("/blogs",urlencodedParser,(req,res)=>{
    // get data from FORM and add to the DB
    const ImageName = req.body.ImageName;
    const ImageUrl = req.body.ImageUrl;
    const ImageDetails = req.body.ImageDetails;
    

    const newBlog = {
        ImageName: ImageName,
        ImageUrl: ImageUrl,
        ImageDetails: ImageDetails
        
    };

    // create new blog and save to DB
    Blog.create(newBlog,(err,blog)=>{
        if(err){
            console.log(err);
        }else{
        // redirect again to home page
            res.redirect("/blogs");
        }
    });
   
   
});

// NEW --> show form to add new blog to the existing list.
router.get("/new/blogs",(req,res)=>{
    res.render("blog/new");
});

// SHOW --> show more info about the selected blog
router.get("/blogs/:id",(req,res)=>{

    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(foundBlog);
            // render show template with the foundBlog
            res.render("blog/show",{blog:foundBlog});
        }
    });
    
});

// EDIT EXISTING BLOG ROUTE
router.get("/blogs/:id/edit",urlencodedParser,(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
       res.render("blog/edit",{blog:foundBlog});
      });

});

// UPDATE EXISTING blog ROUTE
router.put("/blogs/:id",urlencodedParser,(req,res)=>{
    Blog.findByIdAndUpdate(
        req.params.id,
        req.body.blog,
        (err,updatedblog)=>{
    if(err){
        console.log(err);
        res.redirect("/blogs")
    }else{
        console.log(updatedblog);
        res.redirect("/blogs/"+ req.params.id);
    }
   });
});

// deleting a particular blog

router.delete("/blogs/:id",urlencodedParser,(req,res)=>{
    Blog.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

module.exports = router;