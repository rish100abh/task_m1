const express= require("express");
const app = express();

let port = 8080;


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});

app.get("/",(req,res)=>{
    res.send("hello i am root path");
});

app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params; 
    res.send(`Welcome to the page of @${username}.`);
   // res.send(`Welcome to the page of @${username} with ID ${id}.`);
});

app.get("/search",(req,res)=>{
    // console.log(req.query);
    // res.send("no result");
    let{q}=req.query;
    if(!q)
    {
        res.send("no search query");
    }

    res.send(`These are the result for: ${q}`);

});




// app.get("/apple",(req,res)=>{
//     res.send("you contacted apple path");
// });

// app.get("/orange",(req,res)=>{
//     res.send("you contacted orange path");
// });

// app.use((req ,res)=>{
//     // console.log(req);
//     console.log("request recived");

//     let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>";
//     res.send(code);
//     // res.send({
//     //     name:"apple",
//     //     color:"red",
//     // });

//     // res.send("this is a basic response");
// });


 