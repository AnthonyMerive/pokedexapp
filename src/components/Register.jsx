import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { loginGoogle } from '../actions/loginAction';
import { registroEmailPasswordNombre } from '../actions/registerAction';
import { useForm } from '../hooks/useForm';

const StyldedDiv = styled.div`
        
display: flex;
justify-content: center;
margin-top: 50px;
color: #8d8f8f;
text-align: center;

img{
    width: 150px;
}

input{
    margin:20px 0;
}

button{
    margin-bottom: 20px;
}
`

export default function Register() {

    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: '',
        nombreCompleto: ''
    })

    const { email, password, nombreCompleto } = values;

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registroEmailPasswordNombre(
            nombreCompleto,
            email,
            password))

        reset()
    }

    const handleGoogle = () => {
        dispatch(loginGoogle())
    }

    return (
        <StyldedDiv>
            <form className="form-signin" onSubmit={handleRegister}>

                <img
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png"
                    alt="" />
                <h3>Register</h3>

                <input
                    type="text"
                    name="nombreCompleto"
                    className="form-control mt-1"
                    placeholder="Full Name"
                    required=""
                    value={nombreCompleto}
                    onChange={handleInputChange}
                />

                <input
                    type="email"
                    name="email"
                    className="form-control mt-1"
                    placeholder="Email"
                    required=""
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="Password"
                    name="password"
                    className="form-control mt-1"
                    placeholder="Password"
                    required=""
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="button"
                    className="btn btn-danger btn-block me-2"
                    onClick={handleGoogle}
                >
                    Register with Google
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Register
                </button>
                <br />
                <br />

            </form>
        </StyldedDiv>
    )
}
