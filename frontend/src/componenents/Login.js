//login page
import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom';



const Login = (props) => {
  
    const[credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
     e.preventDefault(); 
     const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzZDMyODQ1M2ZmYzY2MTUzYWFkNGE1In0sImlhdCI6MTcxNTI4NzU3NH0.OigyaVs26_W6ZNUEllJwbNNDMgF-fFSL6vl-Q5Tkadk",
        },
        body: JSON.stringify({email:credentials.email , password:credentials.password})
      });
      const json = await response.json(); 
      console.log(json); 
      if(json.success)
        {
         //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("logged in successfully","success");
        }
        else{
          props.showAlert("Invalid credentials","danger");
      }
    }
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value });
     }

  return (
    <div className='mt-3'>
    <h2>Login to continue to iNotebook</h2>
    <form onSubmit={handleSubmit} className='my-3'>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name = "email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ="password" onChange={onChange} value={credentials.password}/>
    </div>
    <button type="submit" className="btn btn-success">Submit</button>
    </form>
    </div>
  )
}

export default Login
