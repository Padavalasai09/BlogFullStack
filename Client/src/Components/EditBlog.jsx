import React, { useEffect, useState } from 'react'
import './EditBlog.css'
import { useNavigate, useParams } from 'react-router-dom';
const EditBlog = () => {
    const nav=useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [blog,setBlog]=useState({})
   const {id}=useParams()
   
    useEffect(()=>{
        fetch(`http://localhost:5000/blog_id/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data.data[0])
            const cur_data=data.data[0]
            setTitle(cur_data.title);
            setDescription(cur_data.description);
            setBlog(cur_data)
        })

        
    },[])
    const changeData=()=>{
       console.log(title,description,"lksdjlknlsdfnldnslndsln")
        if(!title || !description){
            setError('Please fill all the fields');
            setTimeout(()=>{
                setError(null);
            },2000);
            return;

        }
        fetch(`http://localhost:5000/modify/${id}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({"title":title,"description":description})
        })
        .then((res)=>res.json())
        .then(data=>{
            console.log(data)
        })
        
        console.log("successfully updated the data so please proceed with the next steps what you desired to do ")
        
        nav('/')
        
    }
    



    
  return (
    <div className='bg-gray-50 flex justify-center items-center h-screen'>
        <div className="w-full sm:w-[500px] h-auto bg-white p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Edit Your Blog</h2>
            <p className="text-sm text-gray-500">Make changes to your blog's title and description.</p>
        </div>

       
            <div className="mb-6">
                <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
                <input type="text" id="title" className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Enter title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>

            <div className="mb-6">
                <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
                <textarea id="description" rows="6" className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Enter description" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="flex justify-between items-center">
            
                <button type="button" className="edit-btn bg-pink-600 text-white px-6 py-3 rounded-md w-full sm:w-auto hover:bg-pink-700 cursor-pointer font-bold mr-2" onClick={()=>{nav('/')}}>Cancel</button>
                <button type="submit" className="submit-btn bg-teal-500 text-white px-6 py-3 rounded-md w-full sm:w-auto hover:bg-teal-600 cursor-pointer font-bold" onClick={changeData}>Save Changes</button>
            </div>
       
    </div>
    </div>
  )
}

export default EditBlog
