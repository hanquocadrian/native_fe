import React from "react";
import { Route, Redirect } from "react-router-dom";
import authCus from "./authCus";

export const ProtectedCusRoute = ({
  component: Component,
  ...rest
}) => {
    return (
        <Route {...rest}
        render={props => {
            if (authCus.isAuth()) {
                return <Component {...props} />;
            } else {
            return (
                <Redirect to={{
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }} />
            );
            }
        }} />
    );
};
