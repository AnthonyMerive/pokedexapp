import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { logout } from '../actions/loginAction'
import { resetRegister } from '../actions/registerAction'
import { useForm } from '../hooks/useForm'
import OffCanvas from './OffCanvas'

const StyledContainer = styled.div`

.navbar{
    background: #D33535;
}

.navbar-brand{
    cursor:pointer;
}

.boton{
    background: white;
    border-radius: 4px;
    border: solid 2px black;
}


@media (min-width: 600px) {

    .navbar{
        background: #B60101;
    }

  }

  @media (min-width: 990px) {

    .boton{
        background: none;
        border-radius: none;
        border: none;
    }

  }

`

export default function NavBar(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);

    const [values, handleInputChange, reset] = useForm({
        busq: ''
    })

    const { busq } = values;

    const handleBuscar = (e) => {
        e.preventDefault();
        props.setBusqueda(busq)
        reset();
    }

    const handleRegister = () => {
        setRegister(true)
        setLogin(false)
    }

    const handleLogin = () => {
        setRegister(false)
        setLogin(true)
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetRegister())
        localStorage.clear();
        window.location.reload();
    }

    const handleMyPokemons = () => {
        history.replace('/mypokemons')
    }



    return (
        <StyledContainer>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid ">
                    <span onClick={() => window.location.reload()} className="navbar-brand text-warning fw-bold">
                        <img width="28" src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Images.png" alt="pokeball" className="me-1 mb-1" />
                        POKEDEX</span>
                    <div className="boton">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            More
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {props.auth &&
                                    <span className="nav-link active text-white">▶ {props.user.displayName}</span>
                                }
                            </li>
                        </ul>
                        {
                            !props.auth ?
                                <div>
                                    <a onClick={handleRegister} className="btn btn-outline-light me-1" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                        Register
                                    </a>
                                    <a onClick={handleLogin} className="btn btn-outline-light me-3" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                                        Login
                                    </a>
                                </div>
                                :
                                <div>
                                    <span onClick={handleMyPokemons} className="btn btn-outline-light me-1">
                                        My pokemon's
                                    </span>
                                    <span onClick={handleLogout} className="btn btn-outline-danger me-3">
                                        Logout
                                    </span>
                                </div>

                        }
                        <form onSubmit={handleBuscar} className="d-flex ">
                            <input
                                className="form-control me-1"
                                type="search"
                                placeholder="Name - Max # 649"
                                aria-label="Search"
                                name="busq"
                                value={busq}
                                onChange={handleInputChange}
                            />
                            <button className="btn btn-outline-warning me-3" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <OffCanvas register={register} login={login} />

        </StyledContainer>


    )
}