import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from '../Components/Form'
import VideosPage from '../Components/VideosPage.jsx'
import CategoryPage from '../Pages/CategoryPage.jsx'
import VideoUpload from '../Pages/VideoUpload.jsx'

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


        <Route path="home" 
          element={
            <VideosPage />
          } />

          <Route path='categories'
            element={
              <CategoryPage/>
            }/>
        <Route path='video/'>
            <Route path='upload'  
              element = {<VideoUpload/>}
              />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
)
