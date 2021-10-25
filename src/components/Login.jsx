import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { loginEmailPassword, loginGoogle } from '../actions/loginAction';
import { useForm } from '../hooks/useForm';

const StyldedDiv = styled.div`
        
display: flex;
justify-content: center;
margin: 50px;
padding: 15px;
color: #8d8f8f;
text-align: center;
flex-wrap: wrap;

input{
    margin:20px 0; 
}

img{
    margin: 10px 0;
    width: 150px;
}

button{
    margin-bottom: 20px;
}

`

export default function Login() {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginEmailPassword(email, password))
        reset();
      }
    
      const handleGoogle = () => {
        dispatch(loginGoogle(email, password))
      }
    return (<StyldedDiv>

        <form onSubmit={handleLogin} className="form-signin">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/175.png" alt="" />
            <h1 className="h4 mb-3 font-weight-normal">
                Sign in
            </h1>

            <input
                type="email"
                id="inputEmail"
                className="form-control mt-1"
                placeholder="Email"
                required=""
                name="email"
                value={email}
                onChange={handleInputChange}
            />

            <input
                type="Password"
                id="inputPassword"
                className="form-control mt-1"
                placeholder="Password"
                required=""
                name="password"
                value={password}
                onChange={handleInputChange}
            />

            <button
                type="button"
                className="btn btn-danger btn-block me-2"
                onClick={handleGoogle}
            >
                Login with Google
            </button>

            <button
                type="submit"
                className="btn btn-primary btn-block"
            >
                Login
            </button>


        </form>

    </StyldedDiv>)
}
