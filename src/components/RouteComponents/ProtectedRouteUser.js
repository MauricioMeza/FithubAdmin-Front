import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthService from '../../services/AuthService'

export default function ProtectedRouteUser({component: Component, ...rest}){
    const user = AuthService.getCurrentUserRole()
    return(
        <Route 
            {...rest}
            render = {props => {
                if(user === "USER"){
                    return <Component {...props}/>
                }else if(user === "ADMIN"){
                    return <Redirect to="/welcomeAdmin"/>
                }else{
                    return (<Redirect to="/"/>)
                }
            }}

        />

        
    )
}