const express = require("express");
const path = require("path");
const process = require("process");

process.on('SIGINT', () => {
    console.info("Interrupted");
    process.exit(0);
  });

app = express();

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static("/src"));
app.use("/css", express.static(__dirname + "/src/css"));
app.use("/js" ,express.static(__dirname+ "/src/js"));

const port = 80
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(port,(err) =>{
    if(err){
        console.log(`Error: ${err.message}`);
    }
    else{
        console.log(`Running on port: ${port}`);
    }
});
  