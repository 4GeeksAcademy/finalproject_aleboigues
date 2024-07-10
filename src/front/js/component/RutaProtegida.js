import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const RutaProtegida = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
    
    
    }
        

    export default RutaProtegida;