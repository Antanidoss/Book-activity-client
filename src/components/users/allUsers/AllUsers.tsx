import React from "react";
import { PropsType } from "./AllUsersContainer";
import UserForList from "./userForList/UserForList";

const AllUser: React.FC<PropsType> = (props) => {
    return <>{props.users.map(u => <UserForList {...u} />)}</>
}

export default AllUser;