import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthService from '../../services/AuthService'

export default function ProtectedRouteAdmin({component: Component, ...rest}){
    const user = AuthService.getCurrentUserRole()
    return(
        <Route 
            {...rest}
            render = {props => {
                if(user == "USER"){
                    return <Redirect to="/welcomeUser"/>
                }else if(user == "ADMIN"){
                    return <Component {...props}/>
                }else{
                    return <Redirect to="/"/>
                }
            }}

        />

        
    )
}