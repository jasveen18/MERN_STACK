import React,{useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginUser = async (e)=>{
    e.preventDefault();

    const res = await fetch('/signin', {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert('Invalid Credentials');
    }
    else{
      dispatch({type:'USER', payload:true});
      window.alert('Login Succcessful');
      history.push('/');
    }
    
  }

  return (
    <>
      <h1 className="text-center mt-4">Log in</h1>

      <div className="container">
        <form method='POST'>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>


          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>


          <div className="text-center">
            <button type="submit" class="btn btn-primary  m-4" onClick={loginUser}>
              Login
            </button>  
          </div>


        </form>
      </div>
    </>
  );
}

export default Login;
