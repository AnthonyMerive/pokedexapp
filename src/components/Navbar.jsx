import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
                                <Link to="/CRUD" className="nav-link active text-white">CRUD</Link>
                            </li>
                        </ul>
                        <form className="d-flex ">
                            <input className="form-control me-1" type="search" placeholder="Name or #" aria-label="Search" />
                            <button className="btn btn-outline-warning me-3" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </StyledContainer>
    )
}