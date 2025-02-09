import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react'; 
import { useState,useEffect } from 'react';
import axios from 'axios';
const CurrentBlogs = () => {
   
    const nav = useNavigate();
    const blogs=[]
    const  [data,setData]=useState([]);
    const [delete1,setDelete]=useState(false)
    useEffect(()=>{
        fetch("http://localhost:5000/getBlogs", {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Content-Type": "application/json"
            }
        })
    .then((res)=>res.json())
    .then((data)=>{
        const data1=data.data
        console.log( data1,"sai")   
        setData(data1) 

    })
    
    .catch(err=>{
        console.log("error")
    }
    )
        
    },[delete1])
    
    
    const viewBlog = (id) => {
        
        nav(`/viewBlog/${id}`)
    };

    const editBlog = (id) => {
        nav(`/editBlog/${id}`)
        
    };

    const deleteBlog =   (id)=> {
            console.log("deleted api call is called")
            fetch(`http://localhost:5000/delete/${id}`,{
                method:"DELETE",
                headers: {
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache",
                    "Content-Type": "application/json"
                }
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("Great chance")
                console.log(data)
                setDelete(prev=>!prev)
                nav('/')
            })
            
            
        
           

    }

    return (
        <div>
            <div className='flex justify-end p-4'>
                <Link 
                    to='/addBlog' 
                    className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 cursor-pointer ml-auto"
                >
                    + Add Blog
                </Link>
            </div>
        
            <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {data.length > 0 ? (
                    data.map((item, index) => (

                        <div 
                            className="bg-white rounded-lg shadow-lg p-6 text-black transition-transform hover:scale-105 relative"
                            key={index}>

                            <div className="flex items-center gap-4 mb-4">
                                <img 
                                    src={ "https://tse2.mm.bing.net/th?id=OIP.XIEQoNCr2Qa2zWFYp1468wHaHa&pid=Api&P=0&h=180"} 
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 overflow-hidden">{item.title}</h3>
                            </div>

                            <p className="text-gray-700 text-sm h-24 overflow-hidden mb-4">
                                {item.description}
                            </p>
                            <div className="flex items-center gap-2 text-gray-600 text-sm absolute top-4 right-4">
                                <Eye size={18} />
                                <span>{item.views || 0} views</span>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button 
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    onClick={() => viewBlog(item.id)}
                                >
                                    <Eye size={18} />
                                    View
                                </button>

                                <button 
                                    className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                                    onClick={() => editBlog(item.id)}
                                >
                                    <Edit size={18} />
                                    Edit
                                </button>

                                <button 
                                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    onClick={() => deleteBlog(item.id)}
                                >
                                    <Trash2 size={18} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-3 text-lg font-semibold bg-gray-100 py-4 rounded-lg shadow-md">
            🚀 No blogs available. Start writing now!
</p>

                )}
            </div>
        </div>
    );
};

export default CurrentBlogs;
