import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import PokeCard from './PokeCard'

const StyledContainer = styled.div`

background: url('https://wallpaperaccess.com/full/194932.jpg') no-repeat center center;
background-size: cover;
background-attachment: fixed;
height: 100%;
overflow: scroll;

    .imagenGrid{
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        gap: 40px;
        padding: 40px;
        justify-content: center;
    }

    @media (min-width: 600px) {
        background: url('https://cdn.wallpapersafari.com/77/10/wFzJro.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;

      }
`

const StyledPagination = styled.div`
    display: flex;
    justify-content: center;

`

export default function PokeGrid(props) {

    const [pokemones, setPokemones] = useState([])
    const [pokemonBuscado, setPokemonBuscado] = useState(null)
    const [page, setPage] = useState(1)
    const [offSet, setOffSet] = useState(0)
    const busqueda = props.busqueda

    useEffect(() => {
        if (busqueda) {

            if (busqueda >= 650) {
                Swal.fire({
                    icon: 'error',
                    title: `Invalid input search`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
                    .then(result => result.json())
                    .then(data => setPokemonBuscado(data))
                    .catch(error =>
                        Swal.fire({
                            icon: 'error',
                            title: `Invalid input search`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    )
            }

        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=25`)
                .then(result => result.json())
                .then(data => setPokemones(data))
        }
    }, [offSet, busqueda]);

    const handlePrevPage = (e) => {
        e.stopPropagation()
        setOffSet(offSet - 25)
        setPage(page - 1)

    }

    const handleNextPage = async (e) => {
        e.stopPropagation()
        setOffSet(offSet + 25)
        setPage(page + 1)


    }

    return (<>
        {
            pokemonBuscado ?
                <StyledContainer>
                    <ul className="imagenGrid">
                        <PokeCard key={pokemonBuscado.id} url={`https://pokeapi.co/api/v2/pokemon/${busqueda}`} nombre={pokemonBuscado.name} auth={props.auth} user={props.user}/>
                    </ul>
                </StyledContainer>
                :
                <StyledContainer>
                    <StyledPagination className="pt-2">
                        {page >= 2 &&
                            <button className="btn btn-outline-light m-3" onClick={handlePrevPage}>◀ Prev</button>
                        }

                        <h3 className="text-light m-3">{page}</h3>

                        <button className="btn btn-outline-light m-3" onClick={handleNextPage}>Next ▶</button>
                    </StyledPagination>

                    <ul className="imagenGrid">

                        {pokemones.results ?
                            pokemones.results.map((data, index) =>
                                <PokeCard key={index} url={data.url} nombre={data.name} auth={props.auth} user={props.user}/>
                            )
                            :
                            <h3>Loading...</h3>
                        }
                    </ul>
                    <StyledPagination className="pb-3">
                        {page >= 2 &&
                            <button className="btn btn-outline-dark m-3" onClick={handlePrevPage}>◀ Prev</button>
                        }

                        <h3 className="text-dark m-3">{page}</h3>

                        <button className="btn btn-outline-dark m-3" onClick={handleNextPage}>Next ▶</button>
                    </StyledPagination>
                </StyledContainer>
        }
    </>)
}

