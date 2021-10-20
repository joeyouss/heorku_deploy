const express = require("express");
const Recipe = require("./../models/recipes")
const router = express.Router();
// router.get("/", (req, res)=>{
//     res.send("in another page");
// })

router.get("/new", (req,res)=>{
    res.render("recipes/new", {recipe : new Recipe()})
})

router.get('/:slug', async (req,res)=>{
    const rec = await Recipe.findOne({slug : req.params.slug})
    if(rec==null) res.redirect("/")
    res.render("recipes/show", {recipe : rec})
})

router.post("/", async (req,res)=>{
    let reci = new Recipe({
        title:req.body.title,
        ingredients:req.body.ingredients,
        recipea:req.body.recipes,
        createdAt:req.body.createdAt
    })
       try{
        reci = await reci.save()
        res.redirect(`/recipes/${reci.slug}`)
       }catch(e){
            res.render("recipes/new", {recipe: reci})
       }
})


router.delete("/:id", async (req, res)=>{
    await Recipe.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
// exporting router for use
module.exports = router;
// router.get("/");