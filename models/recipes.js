const mongoose = require("mongoose")
const slugify = require("slugify")
const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    ingredients:{
        type:String,
        required:true
    },
    recipea:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
})


recipeSchema.pre("validate", function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower:true, strict:true})
    }
    next()
})
module.exports = mongoose.model("Recipe", recipeSchema);