import React from "react"
import { Navigate } from "react-router-dom";

export const withAuthRedirect = (Component: React.ComponentType<any>) => {
    function RedirectComponent<P extends { isAuthenticated: boolean }>(props: P) {

        if (!props.isAuthenticated)
            return <Navigate to="/login"></Navigate>;

        return <Component { ...props }></Component>
    }

    return RedirectComponent;
}