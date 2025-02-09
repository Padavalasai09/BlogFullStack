const express=require('express')
const mysql=require('mysql2')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"sai123",
    database:'sai'

    
})
db.connect((err)=>{
    if(err){
        console.log("Error in connecting the database")
    }
    else{
        console.log("Connected to the database")
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            imageFile VARCHAR(255),
            views INT DEFAULT 0
        )`;

        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error("Error creating Blogs table:", err);
            } else {
                console.log("Blogs table is ready");
            }
        });
    }
})


app.post('/addBlog',(req,res)=>{
    console.log("added");
    const {title,description,image}=req.body;
    console.log(title,description,image)
    db.query("insert into Blogs (title,description,imageFile) values (?,?,?)",[title,description,image])
    console.log("successfuly inserted");
    res.json({message:"Successfully saved the blog"});
    
})
app.get('/getBlogs',(req,res)=>{
    const data=db.query("select * from blogs",(err,results)=>{
        if(err){
            console.log("error")
        }
        else{
            console.log(results)
            res.json({"data":results})
        }
    })
    
})
app.get('/blog_id/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id,"consoled");
    db.query("select * from blogs where id=?",[id],(err,result)=>{

        if (err){
            res.json({message:"Not Retieved"})
        }
        else{
            console.log(result)
            res.json({data:result})
        }
    })

})
app.put('/update/:id',(req,res)=>{
    console.log("update api call is recieved");
    const id=req.params.id;
    db.query("update blogs set views=views+1 where id=?",[id],(err,res)=>{
        if(!err){
            console.log("Successfully updated");
        }
    })
})
app.put('/modify/:id',(req,res)=>{
    console.log("edit api")
    const id=req.params.id;
    const {title,description}=req.body
    db.query("update blogs set title=?,description=? where id=?",[title,description,id])
    console.log("Edited the blog")
})
app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    console.log(id)
    db.query("delete from blogs where id=?",[id])
    console.log("deleted by the server");
    res.json({"message":"successfully deletedd"})
})
app.listen(5000,()=>{
    console.log(`Server is running on the port ${5000}`)
})