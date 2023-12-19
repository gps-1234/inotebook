import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {

const host="http://localhost:5000"
 const [credentials, setCredentials] = useState({email:"",password:""})

let navigate=useNavigate();
 const handlesubmit=async (e)=>{
    e.preventDefault();
    //console.log(credentials.email,credentials.password);
    const response=await fetch(`${host}/api/auth/login`
    ,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        
    },
    body:JSON.stringify({email:credentials.email[0],password:credentials.password[0]})
  });
       const json=await response.json();
     console.log(json);
     if(json.success){
        localStorage.setItem('token',json.authToken);
        props.showAlert("Logged in successfully","success");
        navigate("/");
        
     }   
     else{
        props.showAlert("Invalid credentials","danger");
     }
  }
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:[e.target.value]})
     }
  return (
    <div>
      
      <h3 className='mt-3'>Login to continue to iNotebook</h3>
         <form onSubmit={handlesubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" onChange={onchange} id="password"/>
  </div>
  
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>

    </div>
  )
}

export default Login