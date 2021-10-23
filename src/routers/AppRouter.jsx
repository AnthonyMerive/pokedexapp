import React from 'react'
import NavBar from '../components/Navbar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Crud from '../components/Crud';
import PokeGrid from '../components/PokeGrid';

export default function AppRouter() {
    return (<>

        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <PokeGrid />
                </Route>

                <Route exact path="/CRUD">
                    <Crud />
                </Route>

            </Switch>

        </Router>


    </>)
}
