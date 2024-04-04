import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const navigate = useNavigate();

    const [creds, setcreds] = useState({ name: "", email: "", password: "", location: "", });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/createuser`, {
            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: creds.name,email: creds.email,password: creds.password,location: creds.location,})
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid data");
        }else{
            navigate('/login');
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={creds.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' value={creds.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' value={creds.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" name='location' value={creds.location} onChange={onChange} className="form-control" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already user? Login here</Link>
                </form>
            </div>

        </>
    )
}
