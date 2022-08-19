import React from "react"
import { useNavigate } from "react-router-dom";

export const withAuthRedirect = (Component: React.ComponentType<any>) => {
    function RedirectComponent<P extends { isAuthenticated: boolean }>(props: P) {
        let navigate = useNavigate();

        if (!props.isAuthenticated)
            return navigate("/login");

        return <Component { ...props }></Component>
    }

    return RedirectComponent;
}