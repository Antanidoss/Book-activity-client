import { Row } from 'antd';
import React from 'react'
import ActiveBookForList, { PropsType as ActiveBookForListProps} from './activeBookForList/ActiveBookForList';
import { PropsType } from './AllCurUserActiveBooksContainer'

const AllCurUserActiveBooks: React.FC<PropsType> = (props) => {
    return (
        <Row gutter={[24, 16]}>
            {props.activeBooks.map(a => {
                let activeBookForListProps: ActiveBookForListProps = {
                    activeBook: a,
                    removeActiveBook: props.removeActiveBook
                }
            return <ActiveBookForList key={a.id} {...activeBookForListProps}></ActiveBookForList>
            })}
        </Row>
    )
}

export default AllCurUserActiveBooks;