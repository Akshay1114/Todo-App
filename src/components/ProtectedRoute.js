import React from 'react'
import {Redirect,Route} from 'react-router-dom'
const ProtectedRoute = ({component:Protect, ...rest})=> (
    <Route
    {...rest}
    render ={(props)=>(
        localStorage.getItem('access_token') ? (
            <Protect {...props}/>
        ) :
        <Redirect to='/' />
        )}
    />
)

export default ProtectedRoute
