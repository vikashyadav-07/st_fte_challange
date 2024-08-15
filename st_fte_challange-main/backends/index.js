const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {PrismaClient} = require("@prisma/client");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({"msg":"hii there"})
})

app.post("/api/postbanner",async (req,res)=>{
    const {desc,timer,visibility,type} = req.body;
    try{
        const newBanner = await prisma.banner.create({
            data:{
                desc,
                timer,
                visibility,
                type
            },
        });
        res.json(newBanner.id);
    } catch(error){
        console.log(error);
        res.status(500).json({error : "An error occured while creating the post"});
    }
});

app.get("/api/getbanner/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const bannerId = parseInt(id, 10);
        const Banner = await prisma.banner.findUnique({
            where:{
                id:bannerId
            },
        }); 
        res.json({banner:Banner});      
    }catch(error){
        console.log(error);
        res.status(500).json({error : "An error occured while rectriviging the post"});
    }
});

app.get("/api/getallbanners",async (req,res)=>{
    try{
        const Banners = await prisma.banner.findMany(); 
        res.json({banners:Banners});      
    }catch(error){
        console.log(error);
        res.status(500).json({error : "An error occured while rectriviging the post"});
    }
});

app.put("/api/updatebanner", async (req, res) => {
    const { id, desc, timer, visibility, type } = req.body;
  
    const data = {};
    if (desc !== undefined) data.desc = desc;
    if (timer !== undefined) data.timer = timer;
    if (type !== undefined) data.type = type;
    if (visibility !== undefined) data.visibility = visibility;
  
    try {
      const updatedBanner = await prisma.banner.update({
        where: { id: id },
        data: data,
      });
      res.json(updatedBanner);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the banner" });
    }
  });
  

app.listen(port,()=>{
    console.log(`server is listning on port: ${port}`);
});