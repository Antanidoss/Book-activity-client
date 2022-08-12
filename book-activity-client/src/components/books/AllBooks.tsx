import React from "react";
import { PropsType } from "./AllBooksContainer";
import Book from "./book/Book";

const AllBooks: React.FC<PropsType> = (props) => {
    let books = props.books.map(b => <Book key={b.id} {...b}></Book>)
    return (
        <div>
            { books }
        </div>
    );
}

export default AllBooks;