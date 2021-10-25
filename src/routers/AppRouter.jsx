import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Crud from '../components/Crud';
import PokeGrid from '../components/PokeGrid';
import PokeDetails from '../components/PokeDetails';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import MyPokemons from '../components/MyPokemons';

export default function AppRouter() {

    const [busqueda, setBusqueda] = useState(null)
    const [auth, setAuth] = useState(false)

    const user = useSelector(store => store.login)

    useEffect(() => {
        if (user.uid) {
            setAuth(true)
        }
    }, [user.uid])

    return (<>

        <Router>
            <NavBar setBusqueda={setBusqueda} auth={auth} user={user} />
            <Switch>

                <PrivateRoute auth={auth} exact path="/mypokemons" component={MyPokemons} />

                <Route exact path="/">
                    <PokeGrid busqueda={busqueda} auth={auth} user={user}/>
                </Route>

                <Route exact path="/detalles/:nombre">
                    <PokeDetails />
                </Route>

                <Route exact path="/CRUD">
                    <Crud />
                </Route>

            </Switch>

        </Router>


    </>)
}
