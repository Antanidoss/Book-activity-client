import React from 'react'
import ActiveBookForList from './activeBookForList/ActiveBookForList';
import { PropsType } from './AllCurUserActiveBooksContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    return <>{props.activeBooks.map(a => <ActiveBookForList {...a}></ActiveBookForList>)}</>
}

export default AllCurUserActiveBooks;