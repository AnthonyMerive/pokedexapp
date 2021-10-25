export const obtenerLocalStorage = () => {
    const logueadoStorage = localStorage.getItem('login');
    if(logueadoStorage === null){
        return undefined
    }
    return JSON.parse(logueadoStorage)
}

export const guardarLocalStorage = (state) => {
const logueadoState = JSON.stringify(state);
localStorage.setItem('login', logueadoState)
}