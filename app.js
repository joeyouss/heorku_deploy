const express = require("express")
const mongoose = require("mongoose");
const Recipee = require('./models/recipes')
const app = express();
const recipeRouter = require("./routes/recipes")
const methodOverride = require("method-override")

const host = '0.0.0.0';
const port = process.env.port || 3000;
const server = app.listen(port, host,()=>{
    console.log("app running on specified port and host");
});

const DATABASE = 'mongodb+srv://joeyous:fgbjjgci@cluster0.34ov6.mongodb.net/recipesApp?retryWrites=true&w=majority'
mongoose.connect(DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
   console.log("connection successfullll");
}) 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })git


// ----

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
// -----
app.get("/", async (req, res)=>{
    const recipes = await Recipee.find().sort({
        createdAt: 'desc'
    })
    res.render("recipes/index", {recipes : recipes});
})
app.use("/recipes", recipeRouter)


// app.listen(3000);
