
import React from 'react';
import './App.css';
import  Login  from './Component/Login';
import Register  from './Component/Register';
import  Home  from './Component/Home';
import  Layout  from './Component/Layout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Notfound from './Component/Notfound';

// import ParticlesComponent from './Component/Partices';





function App() {

  let routers = createBrowserRouter([
    {path:'/', element:<Layout/>,children:[
      {path:"home", element:<Home/>},
      {path:"login", element:<Login/>},
      {path:"register", element:<Register/>}, 
      {path:"*", element:<Notfound/>}
    ]}

  ]);



  return <>
      
     
      <RouterProvider router={routers}/>
      {/* <ParticlesComponent/> */}
   
  </>
}
export default App;