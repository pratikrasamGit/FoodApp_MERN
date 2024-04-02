import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [creds, setcreds] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: creds.email, password: creds.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid data");
    } else {
      localStorage.setItem("userEmail", creds.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  }

  const onChange = (event) => {
    setcreds({ ...creds, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container text-white'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' onChange={onChange} className="form-control" id="exampleInputPassword1" />
          </div>


          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New user? Sign up here</Link>
        </form>
      </div>

    </>
  )
}
