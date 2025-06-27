import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from '../Components/Form'
import CategoryPage from '../Pages/CategoryPage.jsx'
import VideoUpload from '../Pages/VideoUpload.jsx'
import VideosPage from '../Pages/VideosPage.jsx'
import VideoPlayPage from '../Pages/VideoPlayPage.jsx'
import VideoEdit from '../Pages/VideoEdit.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={
            <Form 
              fullName={false}
              backendUrl={`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`}
              type="Login"
              headerText="Login"
            />
          } />
          
        <Route path="login" 
          element={
            <Form 
              fullName={false}
              backendUrl={`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`}
              type="Login"
              headerText="Login"
            />
          } />


        <Route path="register" 
          element={
            <Form 
              fullName={true}
              backendUrl={`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`}
              type="Registeration"
              headerText="Create an Account"
            />
          } />


        <Route path="home/" >
          <Route index element={<VideosPage />}/>
          <Route path='play/' element={<VideoPlayPage/>} />
        </Route>

          <Route path='categories'
            element={
              <CategoryPage/>
            }/>
          <Route path='video/'>
            <Route path='upload'  
              element = {<VideoUpload/>}
              />

            <Route path='edit'  
              element = {<VideoEdit/>}
              />


        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
