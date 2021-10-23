import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
                <div className="container-fluid ">
                    <Link to="/" className="navbar-brand text-dark fw-bold">
                        <img width="28" src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Images.png" alt="pokeball" className="me-1 mb-1" />
                        POKEDEX</Link>
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/CRUD" className="nav-link active text-white">CRUD</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <form className="d-flex justify-content-end">
                    <input className="form-control me-1" type="search" placeholder="Buscar" aria-label="Search" />
                    <button className="btn btn-outline-info me-3" type="submit">Buscar</button>
                </form>
            </nav>
        </>
    )
}