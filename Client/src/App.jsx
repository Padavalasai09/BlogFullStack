import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Blog from './Components/Blog'
import AddBlog from './Components/AddBlog'
import EditBlog from './Components/EditBlog'
import ViewBlog from './Components/ViewBlog'
import { Routes, Route } from'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/editBlog/:id" element={<EditBlog/>}/>
        <Route path="/viewBlog/:id" element={<ViewBlog />}/>
        

        
      </Routes>
    </>
  )
}

export default App
