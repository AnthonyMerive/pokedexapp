import { typesMyPokemons } from "../types/types"

const initialState = {
    MyPokemons: []
}

export const myPokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case typesMyPokemons.mostrar:
            return {
                MyPokemons: action.payload
            }
        case typesMyPokemons.actualizar:
            return {
                MyPokemons: [...state.MyPokemons, action.payload]
            }
        case typesMyPokemons.eliminar:
            return {
                MyPokemons: action.payload
            }
        case typesMyPokemons.reset:
            return {
                MyPokemons: action.payload
            }


        default:
            return state;
    }
}