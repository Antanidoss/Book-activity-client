import React from "react";
import { UserType } from "../../../../types/userType";

const UserForList: React.FC<UserType> = (user) => {
    return <div>{ user.name }</div>
}

export default UserForList;