import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom';


const Signup1 = (props) => {
    const[credentials,setCredentials] = useState({name:"",email:"",password:"" ,cpassword:""});
    const navigate = useNavigate();
  
  
    const handleSubmit = async(e)=>{
      e.preventDefault(); 
      const{name ,email,password} = credentials
      const response = await fetch("http://localhost:5000/api/auth/createUser", {
         method: "POST", 
         headers: {
           "Content-Type": "application/json",
           "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTI4NzU3NH0.OigyaVs26_W6ZNUEllJwbNNDMgF-fFSL6vl-Q5Tkadk",
         },
         body: JSON.stringify({name ,email ,password})
       });
       const json = await response.json(); 
       console.log(json); 
        if(json.success)
         {
             //save the auth token and redirect
             localStorage.setItem('token',json.authtoken);
             navigate('/');
             props.showAlert("Account Created Successfully","success");
         }
         else{
             props.showAlert("Invalid Details","danger");
         }
     }
     const onChange =(e)=>{
         setCredentials({...credentials,[e.target.name]:e.target.value })
     }

    return (
    <div className='container mt-2'>
      <h2>Create an Account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <label htmlFor="name" className="form-label">Enter Your Name</label>
      <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
       <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name='password'  onChange={onChange} minLength={5}required/>
      </div>
      <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5}required />
      </div>
    <button type="submit" className="btn btn-primary">Submit</button>
   </form>
    </div>
    )
  }
  


export default Signup1
