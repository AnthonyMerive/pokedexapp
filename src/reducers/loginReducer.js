import { types } from "../types/types"

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:

            return {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                correo: action.payload.correo
            }


        case types.logout:
            return {

            }

        default:
            return state;
    }
}