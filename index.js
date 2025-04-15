const {intializeDatabase}  = require("./mdb/md.connect")
intializeDatabase()
const Books = require("./model")
const express = require("express")
const app = express()
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())

app.post("/books",async(req,res)=>{
    try{
        const newbook =  new Books(req.body)
        const savedbook = await newbook.save()
        res.status(201).json({message:"Data adeed Sucessfully",data:savedbook})

    }
    catch{
        res.status(500).json({error:"data not found."})

    }

})
app.get("/books",async(req,res)=>{
    try{
        const finding = await Books.find()
        if(finding){
            res.status(201).json(finding)
        }
        
    }
    catch{
        res.status(404).json({error:"Data not found."})
    }
})
app.get("/books/:title",async(req,res)=>{
    try{
        
        const finddata = await Books.findOne({title:req.params.title})
        if(finddata){
            res.status(201).json(finddata)
        }

    }
    catch{
        res.status(404).json({error:"Data not found."})

    }
})
app.get("/books/authorname/:author",async(req,res)=>{
    try{
        const findByAuthor = await Books.find({author:req.params.author})
        if(findByAuthor){
            res.status(201).json(findByAuthor)
        }

    }
    catch{
        res.status(404).json({error:"Data not found."})

    }
})
app.get("/books/genretype/Business",async(req,res)=>{
    try{
        const genreType  = await Books.find({genre:"Business"})
        if(genreType){
            res.status(201).json(genreType)

        }

    }
    catch{
        res.status(404).json({error:"Data not found."})

    }
})

app.get("/books/releaseyear/2012",async(req,res)=>{
    try{
        const dataByrelease = await Books.find({publishedYear:2012})
        if(dataByrelease){
            res.status(201).json(dataByrelease)
        }

    }
    catch{
        res.status(404).json({error:"Data not found."})

    }
})

app.post("/books/:id",async(req,res)=>{
    try{
        const data = await Books.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(data){
            res.status(201).json({data})
        }

    }
    catch{
        res.status(404).json({error:"data not found."})

    }
})
app.post("/books/title/:title", async (req, res) => {
    try {
      const data = await Books.findOneAndUpdate(
        { title: req.params.title },
        req.body,
        { new: true }
      );
  
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ error: "Book not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
  });
app.delete("/books/:id",async(req,res)=>{
    try{
        const deleteData = await Books.findByIdAndDelete(req.params.id)
        if(deleteData){
            res.status(200).json({data:deleteData,message:"data deleted Sucessfully"})
        }

    }
    catch{
        res.status(404).json({error:"Data not found."})

    }
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server running on ",PORT)
})





