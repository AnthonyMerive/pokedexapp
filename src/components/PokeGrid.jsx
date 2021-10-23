import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PokeCard from './PokeCard'

const StyledContainer = styled.div`

    .imagenGrid{
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        gap: 40px;
        padding: 40px;
        justify-content: center;
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

        <StyledPagination className="mt-5">
            {page >= 2 &&
                <button className="btn btn-outline-secondary m-3" onClick={handlePrevPage}>◀</button>
            }

            <h3 className="text-dark m-3">{page}</h3>

            <button className="btn btn-outline-secondary m-3" onClick={handleNextPage}>▶</button>
        </StyledPagination>

        <ul className="imagenGrid">

            {pokemones.results ?
                pokemones.results.map((data, index) =>
                    <PokeCard key={index} url={data.url} nombre={data.name} />
                )
                :
                <h3>Cargando...</h3>
            }
        </ul>

        <StyledPagination className="mt-1 mb-3">
            {page >= 2 &&
                <button className="btn btn-outline-secondary m-3" onClick={handlePrevPage}>◀</button>
            }

            <h3 className="text-dark m-3">{page}</h3>

            <button className="btn btn-outline-secondary m-3" onClick={handleNextPage}>▶</button>
        </StyledPagination>

    </StyledContainer>)
}

