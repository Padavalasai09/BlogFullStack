import React, { useEffect} from 'react';
import Header from './Header';
import { Calendar, Eye, UserSearch } from 'lucide-react'; // Importing icons
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ViewBlog = () => {
    const [image,setImage]=useState("https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const {id}=useParams()
    const [blog,setBlog]=useState({})
    console.log(id)
    useEffect(()=>{
        fetch(`http://localhost:5000/update/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            console.log("Views are updated");
        })

        fetch(`http://localhost:5000/blog_id/${id}`,{
            method:"GET",
            headers:{
                "Content-type":"apllication/json",
            }
        })
        .then(res=>res.json())
        .then(data=>{
            const cur_data=data.data[0]
            console.log(cur_data)

            setBlog(cur_data)
            console.log(blog,"jkdhssk")
            console.log(blog.imageFile  ,"kjdk")
        })

        console.log("update api going to be called")

        

            
      
            
        
    } ,[])
    

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <marquee behavior="scroll" direction="left" className="text-lg font-semibold text-yellow-500 bg-gray-200 py-2">
                🔥 Trending Blogs | Stay Updated with the Latest Articles ✍️
            </marquee>

  
            <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">

                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                    <img 
                        src= "https://tse2.mm.bing.net/th?id=OIP.XIEQoNCr2Qa2zWFYp1468wHaHa&pid=Api&P=0&h=180"
                        alt="Author" 
                        className="w-12 h-12 rounded-full border-2 border-gray-300"
                    />
                    <div>
                        {/* <h2 className="text-xl font-semibold text-gray-800">{blog.author}</h2> */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar size={16} />
                            {/* <span>{blog.date}</span> */}
                        </div>
                    </div>
                </div>

                <h1 className="text-center text-3xl font-bold text-blue-700 mb-4 ">{blog.title}</h1>

                <div className="w-full mb-6">
                    <img 
                        src={blog.imageFile}
                        alt="Blog Cover" 
                        className="w-full rounded-lg shadow-md "
                    />
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
                    <p className="text-lg text-gray-800 font-medium">{blog.description}</p>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                    <Eye size={18} />
                    <span>{blog.views} views</span>
                </div>
            </div>
        </div>
    );
};

export default ViewBlog;
