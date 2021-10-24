import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PokeCard from './PokeCard'

const StyledContainer = styled.div`

background: url('https://wallpaperaccess.com/full/194932.jpg') no-repeat center center;
background-size: cover;
background-attachment: fixed;
height: 100%;

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
        height: 100%;

      }
`

const StyledPagination = styled.div`
    display: flex;
    justify-content: center;

`

export default function PokeGrid() {

    const [pokemones, setPokemones] = useState([])
    const [page, setPage] = useState(1)
    const [offSet, setOffSet] = useState(0)

    useEffect(() => {

        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offSet}&limit=25`)
            .then(result => result.json())
            .then(data => setPokemones(data))

    }, [offSet]);

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

    return (<StyledContainer>

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
                    <PokeCard key={index} url={data.url} nombre={data.name} />
                )
                :
                <h3>Loading...</h3>
            }
        </ul>

        <StyledPagination className="mt-1 mb-3">
            {page >= 2 &&
                <button className="btn btn-outline-secondary m-3" onClick={handlePrevPage}>◀ Prev</button>
            }

            <h3 className="text-dark m-3">{page}</h3>

            <button className="btn btn-outline-secondary m-3" onClick={handleNextPage}>Next ▶</button>
        </StyledPagination>

    </StyledContainer>)
}

