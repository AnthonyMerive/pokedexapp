import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { mostrarAsincronico } from '../actions/myPokemonsAction';
import PokeCard from './PokeCard';

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

    h2{
        margin-top: 50px;
        display: flex;
        justify-content: center;
        color: white;
    }

    @media (min-width: 600px) {
        background: url('https://cdn.wallpapersafari.com/77/10/wFzJro.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;

      }
`

export default function MyPokemons() {

    const user = useSelector(store => store.login.correo)
    const pokemones = useSelector(store => store.pokemones.MyPokemons)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(mostrarAsincronico(user))
    }, [user, dispatch])

    return (<>
        {
            pokemones.length > 0 ?
                <StyledContainer>
                    <ul className="imagenGrid">
                        {pokemones.map(data =>
                            < PokeCard
                                key={data.id}
                                url={`https://pokeapi.co/api/v2/pokemon/${data.nombre}`}
                                nombre={data.nombre}
                                edit={true}
                                id={data.id}
                                pseudoName={data.pseudoName}
                            />
                        )}
                    </ul>
                </StyledContainer>
                :
                <StyledContainer>
                    <h2>Has not added any pokemon..!</h2>
                </StyledContainer>
        }
    </>)
}
