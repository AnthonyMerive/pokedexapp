import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {

    return (
        <>
        <Route {...rest}>
        {
            rest.auth?
           <Component/>
           :
           <Redirect to="/" />
        }
        </Route>

        </>
    )
}
