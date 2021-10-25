import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import Swal from 'sweetalert2';
import { agregarPokemon, borrarPokemon, editarPokemon, mostrarAsincronico } from '../actions/myPokemonsAction';
import { useForm } from '../hooks/useForm';

const StyledDiv = styled.div`

    .card{
        border-radius: 0 20px;
        list-style: none;
        font-size: 1.5rem;
        border: solid 1px black;
        padding: 10px;
        background-color: #FF0A17;
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

    .agregar{
        font-size: 10px;
        background: green;
        border-radius: 10px;
        padding: 3px;
    }

   
    .borrar{
        font-size: 12px;
        background: red;
        border-radius: 30%;
        padding: 7px;
        border: solid 1px black;
        
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

        .card img:hover{
            transform: scale(1.02);
            opacity: 1;
            cursor: pointer;
        }

        .agregar:hover{
            opacity: 0.8;
            cursor: pointer;
        }
    
        .borrar:hover{
            opacity: 0.6;
            cursor: pointer;
        }
    
        .editName:hover{
            opacity: 0.6;
            transform: scale(1.05);
            cursor: pointer;
        }
    

      }

`

export default function PokeCard(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    const URL = props.url;
    const [pokemon, setPokemon] = useState(null);
    const [editNombre, setEditNombre] = useState(false)
    const user = useSelector(store => store.login.correo)

    const [values, handleInputChange] = useForm({
        name: props.nombre
    })

    const { name } = values;

    useEffect(() => {

        fetch(URL)
            .then(result => result.json())
            .then(data => setPokemon(data))
    }, [URL]);

    const handleDetalles = (e) => {
        e.stopPropagation();
        history.replace(`/detalles/${props.nombre}`)
    }

    const handleAddPokemon = (e) => {
        e.stopPropagation();
        Swal.fire({
            icon: 'info',
            title: `Do you want to add ${props.nombre}? `,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(agregarPokemon(
                    props.nombre,
                    pokemon.sprites.front_default,
                    pokemon.types,
                    props.user.correo
                ))
            }
        })

    }

    const handleDelete = (e) => {
        e.stopPropagation();
        Swal.fire({
            icon: 'info',
            title: `Do you want to Delete ${props.nombre}? `,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(borrarPokemon(props.id))
                dispatch(mostrarAsincronico(user))
            }
        })

    }

    const handleEditName = (e) => {
        e.stopPropagation();
        setEditNombre(true);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (props.nombre === name) {
            setEditNombre(false)
        } else {
            Swal.fire({
                icon: 'info',
                title: `Do you want change the name ${props.nombre} to ${name}? `,
                showConfirmButton: true,
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(editarPokemon(name, props.id))
                    dispatch(mostrarAsincronico(user))
                    setEditNombre(false)
                }
            })
        }
    }

    return (<StyledDiv>

        <li className="card">

            <div className="cont">
                {pokemon &&
                    <img onClick={handleDetalles} width={140} height={150} className="imagen" src={pokemon.sprites.front_default} alt={props.nombre} />
                }
                <div className="cont2">
                    {props.auth ?
                        <span onClick={handleAddPokemon} className="agregar fw-bold">ADD</span>
                        : props.edit ?
                            <span onClick={handleDelete} className="borrar fw-bold">X</span>
                            :
                            <h4 className="text-success">◉</h4>
                    }
                    <h4 className="text-primary">⦿</h4>
                    <h4 className="text-dark">⊙</h4>
                </div>
            </div>

            <div className="titulo">
                {pokemon &&
                    <p className="fw-bold">#{pokemon.id}</p>
                }
                {!props.edit ?
                    <h5 className="text-warning">{props.nombre.toUpperCase()}</h5>
                    : editNombre ?
                        <form onSubmit={handleEdit} className="d-flex">
                            <input
                                type="text"
                                id="inputName"
                                className="form-control ms-1"
                                required=""
                                name="name"
                                placeholder="Edit name"
                                value={name}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="btn btn-success btn-block ms-1"
                            >
                                ✔
                            </button>
                        </form>
                        :
                        props.pseudoName ?
                            <h5 className="text-warning">{props.pseudoName.toUpperCase()}</h5>
                            :
                            <h5 onClick={handleEditName} className="text-warning editName">{props.nombre.toUpperCase()}</h5>
                }
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
