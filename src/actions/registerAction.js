import { types } from '../types/types'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Swal from 'sweetalert2';

export const registroEmailPasswordNombre = (name, email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,
            email,
            password
        ).then(async ({ user }) => {

            await updateProfile(auth.currentUser, {
                displayName: name,
            })

            dispatch(registerSincrono(user.uid, user.displayName, user.email))
            Swal.fire({
                icon: 'success',
                title: `Register Success!`,
                showConfirmButton: false,
                timer: 1500
              })
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: `${error}`,
                showConfirmButton: false,
                timer: 1500
              })
        })

    }
}


export const registerSincrono = (uid, displayName, email) => {
    return {
        type: types.register,
        payload: {
            uid,
            displayName,
            email,
        }
    }
}

export const resetRegister = () => {
    return {
        type: types.reset
    }
}
