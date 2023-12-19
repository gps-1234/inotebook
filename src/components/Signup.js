import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const host="http://localhost:5000"
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
   
   let navigate=useNavigate();
   const{name,email,password}=credentials;
    const handlesubmit=async (e)=>{
       e.preventDefault();
       //console.log(credentials.email,credentials.password);
       const response=await fetch(`${host}/api/auth/createUser`
       ,{
       method:'POST',
       headers:{
           'Content-Type':'application/json',
           
       },
       body:JSON.stringify({name:credentials.name[0],email:credentials.email[0],password:credentials.password[0]})
     });
          const json=await response.json();
        console.log(json);
        if(json.success){
           localStorage.setItem('token',json.authToken);
           navigate("/");
           props.showAlert("Account created successfully","success");
        }   
        else{
          props.showAlert("Invalid details","danger");
        }
     }
       const onchange=(e)=>{
           setCredentials({...credentials,[e.target.name]:[e.target.value]})
        }




  return (
    <div className='container'>
      <form onSubmit={handlesubmit}>
      <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" name="name" id="name" onChange={onchange} />
    
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" id="password"onChange={onchange} minLength={5} required/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" name="cpassword" id="cpassword" onChange={onchange} minLength={5} required/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


</div>
  )
}

export default Signup