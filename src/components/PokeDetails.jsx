import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'

const StyledDiv = styled.div`
background: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d8anydd-7c081a1c-cc9b-4bac-a5d7-b5b4c7576d40.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDhhbnlkZC03YzA4MWExYy1jYzliLTRiYWMtYTVkNy1iNWI0Yzc1NzZkNDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og6LldyQAtcNhFPb_00Buldx1gQ5riFUZsvw0XXhkz4') center;
background-size: contain;
height: 100%;
overflow: scroll;

    .container{
        display: flex;
        justify-content: center;
        padding: 15px;
        color: black;
        text-align: justify;
        flex-wrap: wrap;
    }

    .container img{
        width: 200px; 
        margin: 20px;
        border-radius: 10px;
    }

    .container strong{
        color: black;
    }

    .titulo{
        display: flex;
        justify-content: center;
        font-size: 1.5rem;
    }

    .buttons{
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    .back{
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        background-color: #FF0A17;
        cursor: pointer;
    }

    .back strong{
        color: white;
    }

    .back:hover{
        transform: scale(1.05);
        opacity: 0.8;
    }

    .col{
        background: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4737963-5b42-4d6b-8550-753704a2ee92/d6wijho-e2e32e5d-3e13-4128-b785-cfd632d36a74.png/v1/fill/w_463,h_595,strp/pergamino_png_by_basketcrazyidiotgirl_d6wijho-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvYTQ3Mzc5NjMtNWI0Mi00ZDZiLTg1NTAtNzUzNzA0YTJlZTkyXC9kNndpamhvLWUyZTMyZTVkLTNlMTMtNDEyOC1iNzg1LWNmZDYzMmQzNmE3NC5wbmciLCJ3aWR0aCI6Ijw9NDYzIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.u3aB-oQzIce_dE5ev2UtWuidKTiN0GDjOONISQU6VZA') no-repeat center center;
        background-size: cover;
        max-width: 600px;
        padding: 30px;
        font-size: 15px;
    }

    @media (min-width: 800px) {
        background: url('https://media-s3-us-east-1.ceros.com/hype-beast/images/2018/07/13/a9a51bc0b8d626db493ab5f9a971b043/background-hero.png?imageOpt=1&fit=bounds&width=2163')no-repeat center center;
        background-size: cover;
        height: 100%;

        .container img{
            width: 450px; 
        }

        .col{
            background: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4737963-5b42-4d6b-8550-753704a2ee92/d6wijho-e2e32e5d-3e13-4128-b785-cfd632d36a74.png/v1/fill/w_463,h_595,strp/pergamino_png_by_basketcrazyidiotgirl_d6wijho-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvYTQ3Mzc5NjMtNWI0Mi00ZDZiLTg1NTAtNzUzNzA0YTJlZTkyXC9kNndpamhvLWUyZTMyZTVkLTNlMTMtNDEyOC1iNzg1LWNmZDYzMmQzNmE3NC5wbmciLCJ3aWR0aCI6Ijw9NDYzIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.u3aB-oQzIce_dE5ev2UtWuidKTiN0GDjOONISQU6VZA') no-repeat center center;
            background-size: cover;
            max-width: 600px;
            padding: 60px;
        }
      }
`

export default function PokeDetails() {

    const { nombre } = useParams();
    const [detalle, setDetalle] = useState(null)

    useEffect(() => {

        fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then(result => result.json())
            .then(data => setDetalle(data))

    }, [nombre]);

    return (<StyledDiv>
        {detalle &&
            <div className="container">

                <img src={detalle.sprites.other.dream_world.front_default} alt={detalle.name} />

                <div className="col">
                    <p className="titulo"><strong>{detalle.name.toUpperCase()}</strong></p>
                    <p><strong>Number:</strong> {detalle.id}</p>
                    <p><strong>Height:</strong> {detalle.height}</p>
                    <p><strong>Weight:</strong> {detalle.weight}</p>
                    <p><strong>Type:</strong> {detalle.types.map(tipos => tipos.type.name).join("/")}</p>
                    <p><strong>Moves:</strong> {detalle.moves.map(mov => mov.move.name).join(", ")}</p>
                    <p><strong>Base Experience:</strong> {detalle.base_experience} EXP</p>
                    <div className="buttons">
                        <Link to="/"><button className="back"><strong>Back</strong></button></Link>
                    </div>

                </div>

            </div>
        }
    </StyledDiv>)
}
