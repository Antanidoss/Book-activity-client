import { Col } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import { PropsType } from "./UserFilterContainer";

const UserFilter: React.FC<PropsType> = (props) => {
    const onUserSerach = (searchValue: string) => {
        props.updateUserFilter({ name: searchValue });
        props.getUsers();
    }

    return (
        <Col style={{"margin": "0 auto", "marginTop": "50px"}} span="6">
            <Search placeholder="Input user name" defaultValue={props.userFilter.name as string} enterButton onSearch={onUserSerach} />
        </Col>
    )
}

export default UserFilter;