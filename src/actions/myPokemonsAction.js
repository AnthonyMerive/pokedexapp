import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { typesMyPokemons } from "../types/types";

export const agregarPokemon = (
    nombre,
    imagen,
    tipos,
    usuario,) => {

    return async (dispatch) => {
        const newPokemon = {
            nombre,
            imagen,
            tipos,
            usuario,
            pseudoName: null
        }
        addDoc(collection(db, "pokemones"), newPokemon)
            .then(resp => {
                Swal.fire('successfully added!', '', 'success')
            })
            .catch(err => {
                Swal.fire(`${err}`, '', 'error')
            })
    }
}

export const editarPokemon = (
    nombre,
    id) => {

    return async () => {
        
        const docRef = await doc(db, `pokemones`, `${id}`);

        await updateDoc(docRef, {
            pseudoName: nombre
        })
        Swal.fire('successfully Eddited!', '', 'success')
    }
}

export const mostrarAsincronico = (correo) => {
    return async (dispatch) => {
        const coleccion = collection(db, "pokemones")
        const q = query(coleccion, where("usuario", "==", correo))
        const result = await getDocs(q)
        const pokemones = [];
        result.forEach((document) => {
            pokemones.push({
                id: document.id,
                ...document.data()
            })
        })
        dispatch(mostrarSincrono(pokemones))
    }
}

export const mostrarSincrono = (pokemones) => {
    return {
        type: typesMyPokemons.mostrar,
        payload: pokemones
    }
}

export const resetEmprendimientos = () => {
    return {
        type: typesMyPokemons.reset,
        payload: []
    }
}

export const borrarPokemon = (id) => {
    return  async () => {
        await deleteDoc(doc(db, `pokemones`, `${id}`));
        Swal.fire('successfully Deleted!', '', 'success')
    }  
}