import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const StyledDiv = styled.div`

    .card{
        border-radius: 0 20px;
        list-style: none;
        font-size: 1.5rem;
        border: solid 1px black;
        padding: 10px;
        background-color: #FF0A17;
        cursor: pointer;
    }

    .cont{
        display: flex;
        justify-content: center;
    }

    .cont2{
        margin-left: 15px;
    }

    .imagen{
        border: solid 2px #1C1C1C;
        border-radius: 10px;
        background-color: white;
    }

    .titulo{
        margin-top: 5px;
        display: flex;
        justify-content: center;
    }

    .titulo h5{
        margin-right: 0px;
        text-align: right;
        width: 150px;
    }

    .titulo p{
        font-size: 14px;
        height: auto;
        color: white;
        background: gray;
        border-radius: 4px;
        padding: 3px;
    }

    .titulo2{
        display: flex;
        justify-content: center;
    }

    .titulo2 h5{
        width: 150px;
    }

    .titulo2 span{
        font-size: 18px;
        margin-right: 0px;
        text-align: right;
        width: 100px;
        height: 60px;
        color: white;
    }

    @media (min-width: 600px) {

        .card{
            border-radius: 0 20px;
            opacity: 0.92;
            list-style: none;
            font-size: 1.5rem;
            border: solid 1px black;
            padding: 10px;
            background-color: #C52C2F;
        }

        .card:hover{
            transform: scale(1.02);
            opacity: 1;
            cursor: pointer;
        }

      }

`

export default function PokeCard(props) {

    const history = useHistory();
    const URL = props.url;
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {

        fetch(URL)
            .then(result => result.json())
            .then(data => setPokemon(data))
    }, [URL]);

    const handleDetalles = (e) => {
        e.stopPropagation();
        history.replace(`/detalles/${props.nombre}`)
    }

    return (<StyledDiv>

        <li onClick={handleDetalles} className="card">

            <div className="cont">
                {pokemon &&
                    <img width={140} height={150} className="imagen" src={pokemon.sprites.front_default} alt={props.nombre} />
                }
                <div className="cont2">
                    <h4 className="text-success">◉</h4>
                    <h4 className="text-primary">⦿</h4>
                    <h4 className="text-dark">⊙</h4>
                </div>
            </div>

            <div className="titulo">
                {pokemon &&
                    <p className="fw-bold">#{pokemon.id}</p>
                }
                <h5 className="text-warning">{props.nombre.toUpperCase()}</h5>
            </div>
            {pokemon &&
                <div className="titulo2">
                    <h5 className="text-dark">Type: </h5>
                    < span className="fw-bold"> {pokemon.types.map(tipos => tipos.type.name).join("\n")}</span>
                </div>
            }
        </li>

    </StyledDiv >)
}
