import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [credentials,setCredentials] = useState({user:"" , email:"",password:"",geolocation:""})
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          name:credentials.user,
          password:credentials.password ,
          email:credentials.email ,
          location:credentials.geolocation ,
        };
      console.log(credentials);
      axios.post('http://localhost:4000/api' , data)
        
        .then(
           () => {
             
             console.log(data);            
          }
        )
        .catch((error) => {
          
          alert('error occurred . please check the console');
          console.log(error);
      
        });
        };
   
    return (
    <>
        <div  className = 'container'>
            <form onSubmit = {HandleSubmit}>
           <div className="mb-3">
                    <label htmlFor="Name" className="form-label" >Name</label>
                    <input type="text" className="form-control" name="user"  value={credentials.user} onChange={(e) => setCredentials((prev)=>{
	return {
		...prev,
		[e.target.name]:e.target.value
	}
})} />
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"  value={credentials.email}   onChange={((e) => setCredentials({...credentials , [e.target.name]:e.target.value}))}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  name="password"  value={credentials.password} onChange={((e) => setCredentials({...credentials , [e.target.name]:e.target.value}))}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Location" className="form-label" >Location</label>
                    <input type="text" className="form-control" id="exampleInputlocation" name="geolocation"  value={credentials.geolocation}  onChange={((e) => setCredentials({...credentials , [e.target.name]:e.target.value}))}/>
                </div>
               <button type="submit" className=" m-3 btn btn-primary">Submit</button>
               <Link to ='/login' className = 'm-3 btn btn-danger'>Already a user </Link>
            </form>
        </div>
        </>
    )
}

export default Signup