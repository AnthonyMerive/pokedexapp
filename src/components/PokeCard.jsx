import React, { useEffect, useState } from 'react'

export default function PokeCard(props) {

    const URL = props.url;
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {

        fetch(URL)
            .then(result => result.json())
            .then(data => setPokemon(data))

    }, [URL]);

    return (<>

        <li className="card">
            {pokemon ?
                <img width={200} height={200} className="imagen" src={pokemon.sprites.other.dream_world.front_default} alt={props.nombre} />
                :
                <h4>cargando..</h4>
            }
            <div className="titulo">
                <h5>{props.nombre}</h5>
            </div>
        </li>

    </>)
}
