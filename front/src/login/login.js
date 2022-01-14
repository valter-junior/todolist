import React from 'react';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { Login } from '../lib/api';

const LoginUser = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    
    const handleLogin = () =>{
        props.history.push('/')
    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
    
        try {
            const body = {email, password};
            console.log(body)
            const response = await Login(body);
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    } 
    
    return (
        <div>
            <h1 className="text-center mt-5">Login</h1>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <label>
                    Email:
                    <input type="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="password" className="form-control" value={password} onChange={e=> setPass(e.target.value)}/>
                </label>
                <input type="button" value="submit" onClick={handleLogin} />
            </form>
        </div>
    );
    }
    export default LoginUser;

/**function Login () {
    const {register, handleSubmit} = useForm();
    const onSubmit = (d) => alert(JSON.stringify(d));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email:
                <input {...register("login")} />
            </label>
            <label>
                Password:
                <input type="password" {...register("password")} />
            </label> 
            <input type="submit" value="submit" />
        </form>
    );
}

export default Login; */

