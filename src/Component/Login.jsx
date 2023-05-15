import React,{useState} from 'react'
import axios  from 'axios';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loding, setLoding] = useState(false);
  const baseUrl = "https://sticky-note-fe.vercel.app/";
  const [user, setUser] = useState(
    {
        "email":"",
        "password":"",    
    })

  const getUserData = (e)=>{
    //  console.log('hello');
    // console.log(e.target.value);
    // console.log(e.target.name);
   
    // setUser(e.target.value);
    setUser({...user,[e.target.name]: e.target.value});
    console.log(user);
};


const addUser = async (e) =>{
  e.preventDefault();
  setLoding(true);
  let{data} = await axios.post(baseUrl + 'signin', user);
  // console.log(data);
  setLoding(false);
  if(data.message === 'success'){
       localStorage.setItem("userToken", data.token);
      //navigate to home
      navigate('/home'); 

  }
  else
  {
      setError(data.message);
      // console.log(error);
  }

}


  return <>
  <div className="container my-5 py-5">
    <div className="col-md-5 m-auto text-center">
        <form onSubmit = {addUser}>
            
            <div className="form-group">
                <input onChange={getUserData} placeholder="Enter your email" type="email" name="email" className="form-control" />
            </div>
            <div className="form-group my-2">
                <input onChange={getUserData} placeholder="Enter your password" type="password" name="password" className=" form-control" />
            </div>
          
         
            {loding ? (
            <button type="submit" className='btn btn-info w-100'><i className='fa fa-spin'></i>Loading...</button>)
            : (
            <button type="submit" className='btn btn-info w-100'><i className='fa fa-spin'></i> Login </button>)
            }

            {error ?  <div className='alert alert-danger mt-2' >{error}</div>
            :''}
          
           
        </form>
    </div>
  </div>
</>
}
