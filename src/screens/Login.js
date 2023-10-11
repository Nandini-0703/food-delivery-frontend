import React, {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom' 
import axios from 'axios'


const Login = () => {
  const [credentials,setCredentials] = useState({ email:"",password:""});
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
      e.preventDefault();
      const data = {
     password:credentials.password ,
     email:credentials.email ,
      
      };
    console.log(credentials);
    axios.post('http://localhost:4000/api/loginuser' , data)
      
      .then(
         () => {
           
           console.log(data); 
           navigate('/');           
        }
      )
      .catch((error) => {
        
        alert('error occurred . please check the console');
        console.log(error);
    
      });
      };
  return (
    <div>
      
        <div  className = 'container'>
            <form onSubmit = {HandleSubmit} >
           
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"  value={credentials.email}   onChange={((e) => setCredentials({...credentials , [e.target.name]:e.target.value}))}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  name="password"  value={credentials.password} onChange={((e) => setCredentials({...credentials , [e.target.name]:e.target.value}))}/>
                </div>
               
               <button type="submit" className=" m-3 btn btn-primary">Submit</button>
               <Link to ='/createuser' className = 'm-3 btn btn-danger'>I am a new user </Link>
            </form>
        </div>
    </div>
  )
}

export default Login