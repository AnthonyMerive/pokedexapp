import React, { useState }  from 'react'
import NavBar from '../components/Navbar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Crud from '../components/Crud';
import PokeGrid from '../components/PokeGrid';
import PokeDetails from '../components/PokeDetails';

export default function AppRouter() {

    const [busqueda, setBusqueda] = useState(null)

    return (<>

        <Router>
            <NavBar setBusqueda={setBusqueda} />
            <Switch>
                <Route exact path="/">
                    <PokeGrid busqueda={busqueda}/>
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
