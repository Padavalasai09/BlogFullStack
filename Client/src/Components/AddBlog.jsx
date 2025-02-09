import React, { useEffect } from 'react'
import './AddBlog.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
    const [title,setTitle]=useState('');
    const [description,setDescription] = useState('');
    const [success,setSuccess] = useState(false);
    const [image,setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [error,setError] = useState(null);
    console.log("data");
    var blog=[];
    const nav=useNavigate()
    const submit=()=>{
        const data={"title":title,"description":description,"image":imageFile}
        console.log(data)
        if(!title || !description || !image){
            setError('Please fill all the fields');
            setTimeout(()=>{
                setError(null);
            },2000);
            return;
        }
        console.log("It is saved")
        fetch('http://localhost:5000/addBlog',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then((res)=>{
            console.log("successfully saved",res);
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
                nav('/')
            },2000)

            
        })
        .catch((err)=>{
            console.log("error");
        })
        console.log("IT is completed ");
        
        
        
    }
    const handleImageChange = (e) => {
        const file=e.target.files[0]; 
        if(file){
            setImage( file); 
            setImageFile(URL.createObjectURL(file))
        }
    }

   return (
    <div className="container " >
        {success && <div className='success-message'> ✔ Blog Added Successfully!</div>}
        
        
       <div className={success?"blur-background":""}>
        <h1>Create Your Blog</h1>
        <button className="btn-create">Create Blog</button>
        
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title"onChange={(e)=>setTitle(e.target.value) } />
        </div>
       
        <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="6" onChange={(e)=>setDescription(e.target.value) }></textarea>
            
           
        </div>  
        <div>
                <label htmlFor="image">Upload Image</label>
                <input type="file" id="image" accept="image/*" onChange={(e)=>handleImageChange(e)} />
                {image && <img src={imageFile} alt="preview" style={{ maxWidth: '200px', marginTop: '10px' }} />} 
        </div>
        

        <div className='mt-5'>
        {error && <div className="error-message">{error}</div>}
            <button type="submit" onClick={submit}>Submit</button>
        </div>
    </div>
    </div>
  )
}

export default AddBlog
