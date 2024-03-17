import React from "react"
import { Navigate } from "react-router-dom";
import { ROUT_PAGE_NAME } from "../types/constants"

export const withAuthRedirect = (Component: React.ComponentType<any>) => {
    function RedirectComponent<P extends { isAuthenticated: boolean }>(props: P) {

        if (!props.isAuthenticated)
            return <Navigate to={ROUT_PAGE_NAME.USER_LOGIN}></Navigate>;

        return <Component {...props}></Component>
    }

    return RedirectComponent;
}