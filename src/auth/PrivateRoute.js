import React from "react";
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'

const PrivateRoute = ({ component: Component, ...rest }) => (
  //Private Route is to protect authentication when link is copied to another browser and require login
<Route 
    {...rest} 
    render={props => isAuthenticated() ? (
      <Component {...props} />
      ):(
      <Redirect 
        to={{
        pathname: "/signin",
        state: { from: props.location }
      }}
      />
    )}
  />
)

export default PrivateRoute
